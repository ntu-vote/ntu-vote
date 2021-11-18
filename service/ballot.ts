import { VoteRecord } from '../orm/entity/procedure/VoteRecord'
import { getRepository } from 'typeorm'
import { Campaign } from '../orm/entity/procedure/Campaigns'
import { VoterInfo } from '../orm/entity/voter/VoterInfo'
import { CandidateInfo } from '../orm/entity/candidate/CandidateInfo'
import { Ballot } from '../orm/entity/procedure/Ballots'

export const castVote = async (
  voterUid: string,
  cpnId: number,
  cid: number,
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
    cpnId: cpnId,
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
    cid: cid,
  })
  if (!candidate) {
    return { status: 'Error', message: 'ERR_NONEXISTENT_CID' }
  }

  const voteRecord = new VoteRecord()
  voteRecord.voter = voter
  voteRecord.campaign = campaign
  voteRecord.signed_msg = votedProof
  await getRepository(VoteRecord).save(voteRecord)

  const ballot = new Ballot()
  ballot.campaign = campaign
  ballot.candidate = candidate
  ballot.verificationStr = ballotProof
  await getRepository(Ballot).save(ballot)

  return { status: 'Success' }
}
