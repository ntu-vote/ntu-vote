import { searchVoterAccount } from '../../service/login'
import * as IBallotProcessor from './ballot.type'
import validator from 'validator'
import { castVote } from '../../service/ballot'

export default class BallotProcessor {
  public static getKey = async (input: IBallotProcessor.getKeyIn) => {
    const output: IBallotProcessor.getKeyOut = {
      status: 'Error',
    }

    const voter = await searchVoterAccount(
      input.headers.authorization.split(' ')[1].split(':')[0]
    )
    if (!voter) {
      output.message = 'ERR_INVALID_USERNAME'
      return output
    }
    output.status = 'Success'
    output.result = {
      pubKey: voter.publicKey.key,
      prvKey: voter.privateKey.key,
    }
    return output
  }

  public static postCast = async (input: IBallotProcessor.postCastIn) => {
    const output: IBallotProcessor.postCastOut = {
      status: 'Error',
    }
    if (!input.body.cpnId || !validator.isInt(input.body.cpnId || '')) {
      output.message = 'ERR_INVALID_CPN_ID'
      return output
    }
    if (!input.body.cid || !validator.isInt(input.body.cid || '')) {
      output.message = 'ERR_INVALID_CID'
      return output
    }
    if (!input.body.ballotProof || !input.body.votedProof) {
      output.message = 'ERR_INVALID_PROOFS'
      return output
    }
    return await castVote(
      input.headers.authorization.split(' ')[1].split(':')[0],
      input.body.cpnId,
      input.body.cid,
      input.body.votedProof || '',
      input.body.ballotProof || ''
    )
  }
}
