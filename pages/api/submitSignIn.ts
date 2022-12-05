import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { callAPI } from '../../common/commonAction';
import { User } from '../../common/commonProps';

export default async function submitForm(
    req: NextApiRequest,
    res: NextApiResponse<{ status: string, errors?: string[]}>
) {
    try {
        const { username, password } = req.body;
        const data: any = {};

        if (username && password) {
            data.username = username;
            data.password = password;
            const result = await callAPI('signin', data);

            if (result === "INVALID_USERNAME_PASSWORD") {
                let loginError = "Mot de passe ou nom d'utilisateur invalide";
                res.status(400).json({ status: "erreur", errors: [loginError]})
                return
            }
            else {
                const key: string = result.key;
                const user: User = {
                    username: data.username,
                    userKey: key
                }
                const jsonString = JSON.stringify(user);

                fs.writeFile('./userSession.json', jsonString, (err) =>{
                    if (err) throw err;
                    console.log("User session info saved");
                })

                res.status(200).json({ status: "success"});
            }
        }
    }
    catch{res.status(400).json({ status: "erreur", errors: []}) }
}