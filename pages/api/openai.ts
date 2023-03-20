import { NextApiRequest, NextApiResponse } from 'next';
import { createCompletion } from '../../lib/openai';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        switch (req.method) {
            case 'POST':
                const response = await createCompletion(req.body.query);
                res.status(200).json({ status: 'success', data: response });
                break;
            default:
                res.status(405).json({ status: 'error', error: 'Method not allowed' });
                break;
        }
}
