import { useQuery, UseQueryOptions } from 'react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import request, { gql } from 'graphql-request';
import { Proposal, SpaceData, SpaceStrategy, Vote } from '../../types';
import { getAddress } from 'ethers/lib/utils';
import { electionAuthor, SPACE_KEY } from './constants';
import { QueryContext } from '../../context';

export enum ProposalStates {
	ACTIVE = 'active',
	CLOSED = 'closed',
}

type HasVotedResult = {
	hasVoted: boolean;
};

const useHasVotedForElectionsQuery = (
	ctx: QueryContext,
	snapshotEndpoint: string,
	walletAddress: string | null,
	options?: UseQueryOptions<HasVotedResult>
) => {
	return useQuery<HasVotedResult>(
		['gov', 'hasVoted', snapshotEndpoint, walletAddress],
		async () => {
			const { proposals }: { proposals: Proposal[] } = await request(
				snapshotEndpoint,
				gql`
					query LatestElections(
						$councilKey: String
						$ambassadorKey: String
						$grantKey: String
						$treasuryKey: String
						$state: String
						$author: String
					) {
						proposals(
							first: 4
							where: {
								space_in: [$councilKey, $ambassadorKey, $grantKey, $treasuryKey]
								author: $author
								state: $state
							}
							orderBy: "created"
							orderDirection: desc
						) {
							id
							snapshot
						}
					}
				`,
				{
					councilKey: SPACE_KEY.COUNCIL,
					ambassadorKey: SPACE_KEY.AMBASSADOR,
					grantKey: SPACE_KEY.GRANTS,
					treasuryKey: SPACE_KEY.TREASURY,
					state: ProposalStates.ACTIVE,
					author: electionAuthor,
				}
			);

			// @notice Three DAO elections not currently active
			if (proposals.length < 4 || !proposals[0]) {
				return { hasVoted: true };
			}

			const latestSnapshot = parseInt(proposals[0].snapshot);

			const { space }: { space: SpaceData } = await request(
				snapshotEndpoint,
				gql`
					query Space($spaceKey: String) {
						space(id: $spaceKey) {
							domain
							about
							members
							name
							network
							skin
							symbol
							strategies {
								name
								params
							}
							filters {
								minScore
								onlyMembers
							}
						}
					}
				`,
				{ spaceKey: SPACE_KEY.COUNCIL }
			);

			let totalScore: number[];

			const latestProposal = proposals[0];

			if (latestProposal.state === 'closed') {
				const { votes }: { votes: Vote[] } = await request(
					snapshotEndpoint,
					gql`
						query Votes($proposal: String, $walletAddress: String) {
							votes(
								orderBy: "vp"
								orderDirection: desc
								where: { proposal: $proposal, vp_gt: 0, voter: $walletAddress }
							) {
								id
								voter
								choice
								vp
								vp_by_strategy
							}
						}
					`,
					{ proposal: latestProposal.id, walletAddress: walletAddress }
				);

				if (votes.length === 0) {
					return {
						hasVoted: true,
					};
				} else {
					totalScore = votes[0].vp_by_strategy;
				}
			} else {
				const scores = await snapshot.utils.getScores(
					SPACE_KEY.COUNCIL,
					latestProposal.space.strategies,
					latestProposal.space.network,
					[getAddress(walletAddress ?? '')],
					latestProposal.snapshot!
				);

				totalScore = latestProposal.space.strategies.map(
					(_: SpaceStrategy, key: number) => scores[key][getAddress(walletAddress!)] ?? 0
				);
			}

			const totalWeight = totalScore.reduce((a: number, b: number) => a + b);

			//@notice user has no voting weight
			if (totalWeight === 0) {
				return {
					hasVoted: true,
				};
			}

			const electionHashes = proposals.map((e) => e.id);

			const { votes } = await request(
				snapshotEndpoint,
				gql`
					query VotesForElections($electionHashes: [String!]!, $userAddress: String) {
						votes(where: { proposal_in: $electionHashes, voter: $userAddress }) {
							voter
							created
						}
					}
				`,
				{
					electionHashes: electionHashes,
					userAddress: walletAddress,
				}
			);

			if (votes.length === 4) {
				return { hasVoted: true };
			} else {
				return { hasVoted: false };
			}
		},
		{
			enabled: ctx.provider != null && !!walletAddress,
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...options,
		}
	);
};

export default useHasVotedForElectionsQuery;
