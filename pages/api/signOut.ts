import { NextApiRequest, NextApiResponse } from "next";
import { callAPI } from "../../common/commonAction";

export default async function signOut(req: NextApiRequest, res: NextApiResponse<{ status: string, errors?: string[], url: string }>) {
    const data: any = {}
    data.key = req.query.userKey

    if (req.query.logout) {
        const result = await callAPI('signout', data)
        if (result === 'SIGNED_OUT') {
            res.status(200).json({ status: 'redirect', url: '/' })
        }
    }
}
