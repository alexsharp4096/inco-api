# inco-api 

## Summary

A backend repository to run REST APIs used in future InCo Games projects.

Handles the following:

- Authentication
- Restricting routes access with custom claims and checking nuances
- Reject a request outside the controller easily by throwing `new HttpResponseError(status, codeString, message)`
- Log data to GCP

## Tech Stack
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![Express](https://img.shields.io/badge/Express-FFFFFF?style=for-the-badge&logo=express&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)

## How to work on this project

1. Clone this repository to your local machine
1. Contact a current admin to get firebase-credentials.json credential. Place the file in `src/environment`
1. Install the dependencies using `npm install`
1. Use `npm run dev` to start the server
1. Create a branch for your development
1. Add your name to the Team list below, as well as any relevant badges to the tech stack section
1. Create a PR to merge in the branch
1. Submit to the other InCo developers for review

⚠️ Keep `firebase-credentials.json` and `environment.ts` local, don't commit these files, keep both on `.gitignore`


## Errors and permissions

### 🚫 Permission errors

- #### "Only storeOwner can access"
Means you are not logged with a `buyer` claim rather than with a user that contains the  `storeOwner` claim.

- #### "You aren't the correct storeOwner"
Means you are logged with the correct claim, but you are trying to read others storeOwner's data.

- #### "Requires authentication"

## Authentication fields on Express Request Handler

This project adds 3 new fields to the request object on the express request handler, you can also customize this on `src/@types/express.d.ts` TypeScript file.

### `req.authenticated` 
type: `boolean`

Is true only if the client is authenticated, which means, the client informed `Authorization` on the headers, and these values were successfully validated.

### `req.auth` 
type: [UserRecord](https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.userrecord) | `null`

If authenticated: Contains user data of Firebase Authentication.

### `req.token` 
type: [DecodedIdToken](https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.decodedidtoken) | `null`

If authenticated: Contains token data of Firebase Authentication.

## Logs

GCP logging occurs using the following functions defined in `src/utils/logger.ts`

```javascript
logDebug("this is a debug");
logInfo("this is a info");
logWarn("this is a warn");
logError("this is a error");
```

## The Team

|  Developed By  |                                                                                                                                                  |                                                                                                                                                  |
| :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
| Lane Hamilton  |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aleyna-hamilton/)  |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaneEcho)    |
| Jimena Cuadros |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jimena-cuadros/)   |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jcuadrosj)   |
|   Alex Sharp   | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alex-nicole-sharp/) | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alexsharp4096) |
|  K.D. Hubbard  |    [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/k-d-hubbard/)    |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kdhubb)     |

## License

[MIT](LICENSE)

## Reference

This project used as reference part of the structure of the GitHub project [api-example-firebase-admin-nodejs ](https://github.com/RodrigoBertotti/api-example-firebase-admin-nodejs). Thank you [developer](https://github.com/RodrigoBertotti/)!

