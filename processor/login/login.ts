import * as ILoginProcessor from "./login.type"
import { searchVoterAccount } from "../../service/login"
import * as bcrypt from 'bcryptjs'
import { generateAccessToken } from "../../middleware/authorization"
export default class LoginProcessor {
  public static post = async (input: ILoginProcessor.postIn) => {
    const output: ILoginProcessor.postOut = {
      status: 'Error'
    }

    const voter = await searchVoterAccount(input.params.username);
  
    if (!voter) {
      output.message = 'ERR_INVALID_USERNAME'
      return output
    }

    if (!await bcrypt.compare(input.params.claimedPassword, voter.passwordHash)) {
      output.message = 'ERR_INVALID_PASSWORD'
      return output
    }

    const { passwordHash, ...payload } = voter;
  
    const token = generateAccessToken(payload);
    output.status = 'Success'
    output.params = {
      username: voter.username,
      uid: voter.info.uid,
      token: token
    }
    return output
  }
}
  