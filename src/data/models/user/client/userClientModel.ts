import {User} from "../../../user";
import {
    validateUserBirthDate,
    validateUserEmail,
    validateUserName,
    validateUserPassword,
    validateUserRole
} from "./validators";


export class UserClientModel extends User {
    static kUid = 'uid';
    static kName = 'name';
    static kRole = 'role';
    static kEmail = 'email';
    static kPassword = 'password';
    static kBirthDateMillisecondsSinceEpoch = 'birthDateMillisecondsSinceEpoch';

    static fromEntity(entity: User): UserClientModel {
        return Object.assign(UserClientModel.empty(), entity);
    }

    static empty() : UserClientModel {
        return new UserClientModel('','',false,false);
    }

    toBody() {
        return {
            [UserClientModel.kUid]: this.uid,
        };
    }

    static fromBody(body: any): UserClientModel & { password: string } {
        validateUserName(body[UserClientModel.kName]);
        validateUserEmail(body[UserClientModel.kEmail]);
        validateUserRole(body[UserClientModel.kRole]);
        validateUserBirthDate(body[UserClientModel.kBirthDateMillisecondsSinceEpoch]);
        validateUserPassword(body[UserClientModel.kPassword]);

        return Object.assign(
            new UserClientModel(
                '','',false,false
            ),
            {  password: body[UserClientModel.kPassword], }
        )
    }

}
