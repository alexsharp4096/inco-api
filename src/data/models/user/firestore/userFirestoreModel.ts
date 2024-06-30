import {User} from "../../../user";

export class UserFirestoreModel extends User {
    static kUid = 'uid';

    static fromEntity(entity: User): UserFirestoreModel {
        return Object.assign(UserFirestoreModel.empty(), entity);
    }

    static empty() : UserFirestoreModel {
        return new UserFirestoreModel('','',false,false);
    }

    toDocumentData() {
        return {
            [UserFirestoreModel.kUid]: this.uid,
        };
    }

}
