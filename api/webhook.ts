
// Vercel Serverless Function to handle FB Webhook
export default async function handler(req: any, res: any) {
  // 1. Webhook Verification (GET request)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_secure_token_123';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('--- WEBHOOK_VERIFIED ---');
      return res.status(200).send(challenge);
    }
    return res.status(403).end();
  }

  // 2. Handle Message Events (POST request)
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      console.log('--- RECEIVED_POST_EVENT ---');
      
      for (const entry of body.entry) {
        if (!entry.messaging) continue;
        
        for (const event of entry.messaging) {
          if (event.message && event.message.text) {
            const is_echo = !!event.message.is_echo;
            const text = event.message.text.trim().toLowerCase();
            const TRIGGER = (process.env.TRIGGER_KEYWORD || 'loan').trim().toLowerCase();
            
            console.log(`DEBUG: Text: "${text}" | Echo: ${is_echo} | Trigger: "${TRIGGER}"`);

            // চেক করা হচ্ছে কি-ওয়ার্ড মিলেছে কি না
            if (text.includes(TRIGGER)) {
              // Echo মোডে এডমিন পাঠালে recipient আইডি নিতে হয়
              // সাধারণ মোডে কাস্টমার পাঠালে sender আইডি নিতে হয়
              const targetId = is_echo ? event.recipient.id : event.sender.id;
              
              console.log(`MATCH_FOUND: Sending reply to ID: ${targetId}`);
              await sendAutoReply(targetId);
            } else {
              console.log(`NO_MATCH: Trigger word "${TRIGGER}" not found in "${text}"`);
            }
          } else {
            console.log('SKIP: Event is not a text message.');
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    }
    return res.status(404).send('Not Found');
  }

  return res.status(405).send('Method Not Allowed');
}

async function sendAutoReply(recipientId: string) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  const TARGET_LINK = process.env.TARGET_LINK || 'https://example.com';
  const TITLE = process.env.PREVIEW_TITLE || 'লোন আবেদন ফরম';
  const SUBTITLE = process.env.PREVIEW_SUBTITLE || '💸১ থেকে ৩ ঘন্টায় লোন কার্যকর হয়।';
  const IMAGE_URL = process.env.PREVIEW_IMAGE_URL || '';

  if (!PAGE_ACCESS_TOKEN) {
    console.error('CRITICAL: PAGE_ACCESS_TOKEN is missing!');
    return;
  }

  const payload = {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: TITLE,
            subtitle: SUBTITLE,
            image_url: IMAGE_URL,
            default_action: { type: "web_url", url: TARGET_LINK, webview_height_ratio: "full" },
            buttons: [{ type: "web_url", url: TARGET_LINK, title: "Apply Now" }]
          }]
        }
      }
    }
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result.error) console.error('FB_API_ERROR:', JSON.stringify(result.error));
    else console.log('✅ REPLY_SENT_SUCCESSFULLY');
  } catch (err) {
    console.error('NETWORK_ERROR:', err);
  }
}
