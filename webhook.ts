
// Vercel Serverless Function to handle FB Webhook
export default async function handler(req: any, res: any) {
  // 1. Webhook Verification (Meta Developer Portal checks this once)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // This token must be added to Vercel Env Vars as VERIFY_TOKEN
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_secure_token_123';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).end();
    }
  }

  // 2. Handle Message Events
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      for (const entry of body.entry) {
        const webhook_event = entry.messaging[0];
        
        // We catch messages sent by the Page Admin (is_echo: true)
        if (webhook_event.message && webhook_event.message.is_echo) {
          const message_text = webhook_event.message.text?.toLowerCase();
          const customer_id = webhook_event.recipient.id; // In an echo, recipient is the customer
          
          const TRIGGER = (process.env.TRIGGER_KEYWORD || 'loan').toLowerCase();

          if (message_text && message_text.includes(TRIGGER)) {
            await sendAutoReply(customer_id);
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    }
  }

  return res.status(405).send('Method Not Allowed');
}

// Function to send the "Link Card" back to the customer
async function sendAutoReply(recipientId: string) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  const TARGET_LINK = process.env.TARGET_LINK || 'https://example.com';
  const TITLE = process.env.PREVIEW_TITLE || 'Apply Now';
  const SUBTITLE = process.env.PREVIEW_SUBTITLE || 'Get your loan in 3 hours';
  const IMAGE_URL = process.env.PREVIEW_IMAGE_URL || '';

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
            default_action: {
              type: "web_url",
              url: TARGET_LINK,
              webview_height_ratio: "full"
            },
            buttons: [{
              type: "web_url",
              url: TARGET_LINK,
              title: "Apply Now"
            }]
          }]
        }
      }
    }
  };

  try {
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
