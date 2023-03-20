import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        switch (req.method) {
            case 'POST':
                res.status(200).json({ data: req.body.query })
                break;
            default:
                res.status(405).json({ error: 'Method not allowed' })
                break;
        }
}
