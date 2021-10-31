import validator from 'validator'

import * as ICampaignProcessor from './campaign.type'
import { getCampaignList, getCampaign } from '../../service/campaign'

export default class CampaignProcessor {
  public static get = async () => {
    const output: ICampaignProcessor.getOut = {
      status: 'Success',
      result: { campaigns: await getCampaignList() },
    }
    return output
  }

  public static getIdv = async (input: ICampaignProcessor.getIdvIn) => {
    const output: ICampaignProcessor.getIdvOut = {
      status: 'Error',
    }

    if (!input.params.cpnId || !validator.isInt(input.params.cpnId)) {
      output.message = 'ERR_INVALID_CPN_ID'
      return output
    }

    const campaign = await getCampaign(input.params.cpnId)

    if (!campaign) {
      output.message = 'ERR_NONEXISTENT_CPN_ID'
      return output
    }

    output.status = 'Success'
    output.result = { campaign }
    return output
  }
}
