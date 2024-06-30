import {UserRole} from "../index";


export class User {
    constructor(
        public readonly uid:string,
        public readonly username:string,
        public readonly isOptedIn:boolean,
        public readonly isFirstTimeUser:boolean,
    ) {}

    copyWith(data:Partial<Record<keyof User, any>>) {
        return new User(
            data.uid ?? this.uid,
            data.username ?? this.username,
            data.isOptedIn ?? this.isOptedIn,
            data.isFirstTimeUser ?? this.isFirstTimeUser,
        );
    }
}
