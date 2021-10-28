import { VoterInfo } from '../orm/entity/voter/VoterInfo'
import { getManager, getRepository, Like } from 'typeorm'

export const add = (a: number, b: number) => {
  return a + b
}

export const test = async () => {
  const voter = await getRepository(VoterInfo).findOne({ where: { uid: 123 } })

  const voters = await getRepository(VoterInfo).find({
    where: { uid: ['123', '234'] },
    order: { uid: 'ASC' },
  })

  const newVoter = new VoterInfo()
  newVoter.displayName = 'Tom'
  await getRepository(VoterInfo).save(newVoter)

  if (!voter) {
    throw 'No such voter'
  }
  voter.displayName = 'Tom'
  await getRepository(VoterInfo).save(voter)
}
