import type { NextRequest } from 'next/server';
import { createCompletion } from '../../lib/openai';
import { ipRateLimit } from '@/lib/ip-rate-limit';

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest) {
    console.log(req);
    const res = await ipRateLimit(req);

    if (res.status !== 200) {
        return res;
    }

    switch (req.method) {
        case 'POST':
            const response = await createCompletion(req.body.query);
            return new Response(JSON.stringify(response), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        default:
            return new Response(JSON.stringify({ status: 'error', error: 'Method not allowed' }), 
                { status: 405 }
            );
    }
}
