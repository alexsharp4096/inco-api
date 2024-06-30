import {UserRecord} from "firebase-admin/lib/auth";
import * as admin from "firebase-admin";
import {HttpResponseError} from "../utils/httpResponseError";
import {User} from "../data/user";
import {UserFirestoreModel} from "../data/models/user/firestore/userFirestoreModel";


class AccountsService {

    async createAccount(userInput:User, password: string) : Promise<User> {
        try {
            const createUserRes = await admin.auth().createUser({

                password: password,
            });
            const user = userInput.copyWith({ uid: createUserRes.uid });

            const documentData = UserFirestoreModel.fromEntity(user).toDocumentData();
            await admin.firestore().collection("users").doc(user.uid).set(documentData);
            return user;
        } catch (e){
            switch (e.code){
                case 'auth/email-already-exists':
                    throw new HttpResponseError(400,'EXISTING_EMAIL', 'Email is already in use');
            }
            throw e;
        }
    }
}


export const accountsService: AccountsService = new AccountsService();
