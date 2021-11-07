import { Campaign } from '../orm/entity/procedure/Campaigns'
import { getRepository } from 'typeorm'

export const getCampaignList = async () => {
  return await getRepository(Campaign).find({ relations: ['rule'] })
}

export const getCampaign = async (cpnId: string) => {
  const campaign = await getRepository(Campaign).findOne({
    where: { cpnId: cpnId },
    relations: [
      'rule',
      'candidates',
      'candidates.policies',
      'candidates.ballots',
    ],
  })
  if (!campaign) {
    return undefined
  }
  campaign.candidates.forEach((candidate) => {
    candidate.ballots = <any>candidate.ballots.length
  })
  return campaign
}
