// noinspection HttpUrlsUsage

import express, {Express,} from 'express';
import {writeLog} from "./utils/logger";
import * as admin from "firebase-admin";
import {environment} from "./environment/environment";
import {interceptors} from "./middleware/interceptors";
import {HttpServer} from "./middleware/controllers";
import {myIPv4} from "./utils/ipv4";
import {getControllers} from "./middleware/controllers/controllers";
import * as dotenv from 'dotenv';
dotenv.config()

export type UserRole = "storeOwner" | "buyer";
export type MyClaims = 'authenticated' | UserRole; // TODO: add OR operation with our own claims;

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
if(!environment?.firebase?.credentials?.project_id?.length){
    throw Error('Missing Firebase Credentials. Please, check the "Getting Started" section');
}

admin.initializeApp({
    credential: admin.credential.cert(environment.firebase.credentials as any),
    projectId: environment.firebase.credentials.project_id,
    databaseURL: environment.firebase.databaseURL
});

const app: Express = express();
const httpServer = new HttpServer(app);
const port = process.env.PORT || 3000;

for(let i=0;i<interceptors.length;i++){
    app.use(interceptors[i]);
}

getControllers().forEach((controller) => {
   controller.initialize(httpServer);
});

app.listen(port, () => {
    writeLog('info',`⚡️ Server is running at http://${myIPv4()}:${port}`);
});

export const db = admin.firestore();