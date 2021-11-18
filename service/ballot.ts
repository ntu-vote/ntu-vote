import { VoteRecord } from '../orm/entity/procedure/VoteRecord'
import { getRepository } from 'typeorm'
import { Campaign } from '../orm/entity/procedure/Campaigns'
import { VoterInfo } from '../orm/entity/voter/VoterInfo'
import { CandidateInfo } from '../orm/entity/candidate/CandidateInfo'
import { Ballot } from '../orm/entity/procedure/Ballots'
import { VoterAccount } from '../orm/entity/voter/VoterAccounts'

export const castVote = async (
  voterName: string,
  cpnId: number,
  cid: number,
  votedProof: string,
  ballotProof: string
) => {
  const voter = await getRepository(VoterAccount).findOne({
    where: {
      username: voterName,
    },
    relations: ['info'],
  })
  if (!voter) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_UID' }
  }
  if (
    await getRepository(VoteRecord).findOne({
      voter: voter.info,
    })
  ) {
    return { status: 'Error', message: 'ERR_VOTER_ALREADY_VOTED' }
  }
  const campaign = await getRepository(Campaign).findOne({
    cpnId: cpnId,
  })
  if (!campaign) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_CPN_ID' }
  }
  const candidate = await getRepository(CandidateInfo).findOne({
    cid: cid,
  })
  if (!candidate) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_CID' }
  }

  const voteRecord = new VoteRecord()
  voteRecord.voter = voter.info
  voteRecord.campaign = campaign
  voteRecord.signed_msg = votedProof
  await getRepository(VoteRecord).save(voteRecord)

  const ballot = new Ballot()
  ballot.campaign = campaign
  ballot.candidate = candidate
  ballot.verification = ballotProof
  await getRepository(Ballot).save(ballot)

  return { status: 'Success' }
}
