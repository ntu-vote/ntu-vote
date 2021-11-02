import { VoterAccount } from '../orm/entity/voter/VoterAccounts'
import { getRepository } from 'typeorm'

export const searchVoterAccount = async (username: string) => {
    return await getRepository(VoterAccount).findOne({ 
        where: { username: username },
        relations: ['uid', 'pub_id', 'prv_id']
     });
}