import { VoteRecord } from '../orm/entity/procedure/VoteRecord'
import { getRepository } from 'typeorm'
import { Campaign } from '../orm/entity/procedure/Campaigns'
import { VoterInfo } from '../orm/entity/voter/VoterInfo'
import { CandidateInfo } from '../orm/entity/candidate/CandidateInfo'
import { Ballot } from '../orm/entity/procedure/Ballots'

export const castVote = async (
  voterUid: string,
  cpnId: string,
  cid: string,
  votedProof: string,
  ballotProof: string
) => {
  if (
    await getRepository(VoteRecord).findOne({
      voter: { uid: parseInt(voterUid) },
    })
  ) {
    return { status: 'Error', message: 'ERR_VOTER_ALREADY_VOTED' }
  }
  const campaign = await getRepository(Campaign).findOne({
    cpnId: parseInt(cpnId),
  })
  if (!campaign) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_CPN_ID' }
  }
  const voter = await getRepository(VoterInfo).findOne({
    uid: parseInt(voterUid),
  })
  if (!voter) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_UID' }
  }
  const candidate = await getRepository(CandidateInfo).findOne({
    cid: parseInt(cid),
  })
  if (!candidate) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_CID' }
  }

  const voteRecord = new VoteRecord()
  voteRecord.voter = voter
  voteRecord.campaign = campaign
  voteRecord.signed_msg = votedProof

  const ballot = new Ballot()
  ballot.campaign = campaign
  ballot.candidate = candidate
  ballot.verificationStr = ballotProof

  return { status: 'Success' }
}
