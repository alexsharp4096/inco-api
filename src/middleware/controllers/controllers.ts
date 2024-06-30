import {RootController} from "./rootController";
import {AccountController} from "./accountController";
import {Controller} from "./index";
import {ProductController} from "./productController";
import {UsernameController} from "./usernameController"


export const getControllers = () : Array<Controller> => [
    new RootController(),
    new ProductController(),
    new AccountController(),
    new UsernameController()
];
