import { searchUsername, createNewVoter, searchStudentId } from "../../service/register";
import * as IRegistorProcessor from "./register.type"
import * as bcrypt from "bcryptjs"

export default class RegisterProcessor {
    public static post = async (input: IRegistorProcessor.postIn) => {
        const output: IRegistorProcessor.postOut = {
            status: 'Error'
        }

        const user_exist = await searchUsername(input.params.username);

        if (user_exist) {
            output.message = 'ERR_USERNAME_TAKEN'
            return output
        }

        const student_id_exist = await searchStudentId(input.params.student_id);
        
        if (student_id_exist) {
            output.message = 'ERR_STUDENT_ID_TAKEN'
            return output
        }

        input.params.passwordHash = await bcrypt.hash(input.params.passwordHash, 10);

        const voted_uid = await createNewVoter(input);

        output.status = 'Success'
        return output
    }

    public static checkUsername = async (input: IRegistorProcessor.checkIn) => {

        const exist = await searchUsername(input.params.check_for);

        if (exist) {
            const output: IRegistorProcessor.checkOut = {
                status: 'Success',
                result: 'INVALID'
            }
            return output
        } 
        const output: IRegistorProcessor.checkOut = {
            status: 'Success',
            result: 'VALID'
        }
        return output
    }

    public static checkStudentId = async (input: IRegistorProcessor.checkIn) => {

        const exist = await searchStudentId(input.params.check_for);

        if (exist) {
            const output: IRegistorProcessor.checkOut = {
                status: 'Success',
                result: 'INVALID'
            }
            return output
        } 
        const output: IRegistorProcessor.checkOut = {
            status: 'Success',
            result: 'VALID'
        }
        return output
    }
}