import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextApiRequest, NextApiResponse } from 'next';
import { createCompletion } from '../../lib/openai';

const redis = new Redis({
    url: process.env.UPSTASH_REST_API_DOMAIN,
    token: process.env.UPSTASH_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(1, "5 s"),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        const identifier = "api";
        const result = await ratelimit.limit(identifier);
        res.setHeader("X-RateLimit-Limit", result.limit);
        res.setHeader("X-RateLimit-Remaining", result.remaining);

        if (!result.success) {
            res.status(429).json({ status: 'error', error: 'Too many requests' });
            return;
        }

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
