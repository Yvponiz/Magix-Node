import { NextApiRequest, NextApiResponse } from "next";
import { callAPI } from "../../common/commonAction";

export default async function gameMode(
    req: NextApiRequest,
    res: NextApiResponse<{ status: string, errors?: string[], url?:string}>
) {
    try{
        let error: string = ""
        const data: any = {};
        data.key = req.query.userKey;

        if (req.query.play) {
            data.type = "PVP";
            const result = await callAPI("games/auto-match", data)

            if (result === "CREATED_PVP" || result === "JOINED_PVP") {
                res.status(200).json({ status: 'redirect', url: '/game' })
            }
            else {
                error = result;
            }
        }
        else if (req.query.practice) {
            data.type = "TRAINING"
            const result = await callAPI("games/auto-match", data)

            if (result === "JOINED_TRAINING") {
                res.status(200).json({ status: 'redirect', url: '/game' })
            }
            else {
                error = result;
            }
        }
    }
    catch{res.status(400).json({ status: "erreur", errors: []}) }
}