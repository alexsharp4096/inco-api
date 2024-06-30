import {Controller, HttpServer} from "./index";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {usernameService} from "../../services/usernameService";
import {HttpResponseError} from "../../utils/httpResponseError";
import {User} from "../../data/user"
import {logInfo} from "../../utils/logger";
import { UserRecord } from "firebase-admin/auth";

export class UsernameController implements Controller {

    initialize(httpServer: HttpServer): void {
        httpServer.post ('/username', this.setUsername.bind(this));
        httpServer.get ('/username', this.getUsername.bind(this));
    }

    private readonly setUsername: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
        const inputUsername = req.body['username'];
        var result: any;
        console.log(inputUsername)
        if (inputUsername) {
            result = await usernameService.setUsername(inputUsername, {})
        } else {
            result = {
                message: 'No username provided',
                allowed: false
            }
        }

        res.send({
            message: result.message,
            success: result.allowed
        });
        next();
    }

    private readonly getUsername: RequestHandler = async (req:Request, res:Response) => {
        const username = await usernameService.getRandomUsername({})
        console.log(username)
        if (username === undefined) {
            res.status(500).send()
        }

        res.send({result:'fun fun fun until daddy took the tbird away'})
    }
}