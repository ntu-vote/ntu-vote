import { VoterAccount } from '../orm/entity/voter/VoterAccounts'
import { getRepository } from 'typeorm'
import { VoterPublicKey } from '../orm/entity/voter/VoterPublicKeys'
import { VoterPrivateKey } from '../orm/entity/voter/VoterPrivateKeys'
import { VoterInfo } from '../orm/entity/voter/VoterInfo'
import * as IRegistorProcessor from "../processor/register/register.type"

export const createNewVoter = async ({ params }: IRegistorProcessor.postIn) => {
    const voter_info = new VoterInfo();
    voter_info.displayName = params.display_name;
    voter_info.realName = params.real_name;
    voter_info.studentId = params.student_id;
    const voter_uid = await getRepository(VoterInfo).save(voter_info);

    const voter_pub_key = new VoterPublicKey();
    voter_pub_key.key = params.public_key;
    const voter_pub_id = await getRepository(VoterPublicKey).save(voter_pub_key);

    const voter_prv_key = new VoterPrivateKey();
    voter_prv_key.key = params.private_key;
    const voter_prv_id = await getRepository(VoterPrivateKey).save(voter_prv_key);
 
    const voter_account = new VoterAccount();
    voter_account.username = params.username;
    voter_account.passwordHash = params.passwordHash;
    // strange, turns out it actually works!
    voter_account.info = voter_uid;
    voter_account.publicKey = voter_pub_id;
    voter_account.privateKey = voter_prv_id;
    await getRepository(VoterAccount).save(voter_account);

    return voter_uid;
}

export const searchUsername = async (username: string) => {
    return await getRepository(VoterAccount).findOne({
         where: { username: username }
    });
}

export const searchStudentId = async (student_id: string) => {
    return await getRepository(VoterInfo).findOne({
        where: { studentId: student_id}
    })
}