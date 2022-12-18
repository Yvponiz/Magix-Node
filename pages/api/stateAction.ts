import { NextApiRequest, NextApiResponse } from "next";
import { callAPI } from "../../common/commonAction";
import * as fs from 'fs';

// export default async function stateAction(req: NextApiRequest, res: NextApiResponse<{ status: string, errors?: string[] }>) {
//     const data: any = {}
//     data.key = req.query.userKey;

//     if (req.query.action) {
//         const result = await callAPI("signout", data)
//         if (result === "SIGNED_OUT") {
//             res.status(200).redirect("/")
//         }
//     }
// }

// const jsonString = fs.readFileSync('./userSession.json');
// const user = JSON.parse(jsonString.toString());

// const data: any = {}
// data.key = user.userKey

export const state = async (data: any) => {
    fetch(await callAPI("games/state", data), {   // Il faut créer cette page et son contrôleur appelle
        method: "POST",       // l’API (games/state)
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // contient les cartes/état du jeu.


            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}