import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, data } = body;

        // Get visitor info from headers (Vercel specific)
        const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';
        const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';
        const device = req.headers.get('user-agent') || 'Unknown Device';

        let message = '';

        if (type === 'visit') {
            message = `🔔 <b>New Visitor</b>\n\n` +
                `🌍 <b>Location:</b> ${city}, ${country}\n` +
                `🖥️ <b>Device:</b> ${device}\n` +
                `🔗 <b>Page:</b> ${data.url}\n` +
                `🔍 <b>Ref:</b> ${data.referrer || 'Direct'}`;
        } else if (type === 'interaction') {
            message = `👆 <b>Interaction</b>\n\n` +
                `🖱️ <b>Action:</b> ${data.action}\n` +
                `📝 <b>Label:</b> ${data.label}\n` +
                `🌍 <b>Location:</b> ${city}, ${country}\n` +
                `🔗 <b>Page:</b> ${data.url}`;
        } else {
            return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
        }

        await sendTelegramMessage(message);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
