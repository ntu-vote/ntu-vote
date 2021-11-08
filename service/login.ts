import { VoterAccount } from '../orm/entity/voter/VoterAccounts'
import { getRepository } from 'typeorm'

export const searchVoterAccount = async (username: string) => {
    return await getRepository(VoterAccount).findOne({ 
        where: { username: username },
        relations: ['info']
     });
}