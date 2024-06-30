import {db} from '../index';


export class Leaderboard{

    // declare properties here
    private leaderboardCollection: FirebaseFirestore.CollectionReference;

    constructor() {
        this.leaderboardCollection = db.collection('leaderboard');
    }

}