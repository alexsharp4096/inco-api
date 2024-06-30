import {Game} from './game'
import {User} from './user'

export class Score {
    constructor(
        public readonly gameId:Game,
        public readonly score:number,
        public readonly timestamp:FirebaseFirestore.Timestamp,
        public readonly userId:User
    ) {}
}