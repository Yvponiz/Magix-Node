import type { NextApiRequest, NextApiResponse } from 'next';
import { callAPI } from '../../common/callAPI';

export let testKey: any;

export default async function submitForm(
    req: NextApiRequest,
    res: NextApiResponse<{ status: string, errors?: string[], key?: string, isError?: boolean }>
) {
    const { username, password } = req.body;

    if (username && password) {
        const data: any = {};
        data.username = username;
        data.password = password;
        const result = await callAPI('signin', data);

        if (result === "INVALID_USERNAME_PASSWORD") {
            let loginError = "Mot de passe ou nom d'utilisateur invalide";
            res.status(400).json({ status: "erreur", errors: [loginError], isError: true })
            return
        }
        else {
            res.status(200).json({ status: "success", key: result.key });
            testKey = result;
        }
    }
}