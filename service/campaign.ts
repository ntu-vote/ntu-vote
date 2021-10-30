import { Campaign } from '../orm/entity/procedure/Campaigns'
import { getRepository } from 'typeorm'

export const getCampaignList = async () => {
  return await getRepository(Campaign).find({ relations: ['rule'] })
}

export const getCampaign = async (cpnId: string) => {
  return await getRepository(Campaign).findOne({
    where: { cpn_id : cpnId },
    relations: ['rule', 'candidates', 'candidates.policies'],
  })
}
