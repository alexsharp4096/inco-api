import {firestore} from "firebase-admin";
import { Auth } from "firebase-admin/auth";
import * as admin from "firebase-admin";
import {Response} from "express";
import {User} from '../models/user';
import BadWordNext from 'bad-words-next'
import { validateEmail } from "../utils/validators";
const en = require('bad-words-next/data/en.json')

// TODO: add multi-language support
// TODO: add custom dictionary
const badWords = new BadWordNext({data: en})

export class UsernameService {
    private collection () {
        return admin.firestore().collection('users');
    }

    //check if a user already exists with this username
    async isNameInUse (usernameTest:string) : Promise<boolean>{
        const userQuery = await this.collection()
            .where('username','==',usernameTest)
            .limit(1)
            .get();
        if (!userQuery.empty) {
            return true;
        }
        return false;
    }

    async isUsernameAllowed (usernameTest) : Promise<{allowed:boolean, message:string}>{
        var message = "";
        var allowed = true;
        const isInUse = await this.isNameInUse(usernameTest)
        if (isInUse) {
            message = "Username is in use";
            allowed = false;
        }
        //profanity filter - for now just doing the generic english
        if (badWords.preCheck(usernameTest)) {
            message = "Username does not meet community standards";
            allowed = false;
        }

        return {allowed, message}
    }

    async getRandomUsername (auth:object) : Promise<string | undefined> {
        const functionUrl = `https://us-central1-inco-games.cloudfunctions.net/generateRandomUsername`;
        let response: any;
        let data: any;
        let username: string;

        response = await fetch(functionUrl);
        data = await response.json();
        username = data.username
        console.log(username)
        
        return "all your base are belong to us";
    }

    async setUsername (username:string,auth:object) : Promise<{allowed:boolean, message:string}> {
        const result = await this.isUsernameAllowed(username);

        if (result.allowed) {
            return result;
        }

        return result;
    }
}

export const usernameService = new UsernameService;