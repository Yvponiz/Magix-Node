import { NextApiRequest, NextApiResponse } from "next";
import { callAPI } from "../../common/commonAction";

export default async function signOut(req: NextApiRequest, res: NextApiResponse<{ status: string, errors?: string[] }>) {
    const userKey: any = {}
    userKey.key = req.query.userKey;

    if (req.query.logout) {
        console.log("logout")
        const result = await callAPI("signout", userKey)
        if (result === "SIGNED_OUT") {
            res.status(200).redirect("/")
        }
    }
}