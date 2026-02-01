
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
    } else {
      console.error('VERIFICATION_FAILED: Tokens do not match or missing');
      return res.status(403).end();
    }
  }

  // 2. Handle Message Events (POST request)
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      console.log('--- NEW_EVENT_RECEIVED ---');
      
      for (const entry of body.entry) {
        if (!entry.messaging) {
          console.log('INFO: Entry has no messaging events.');
          continue;
        }
        
        const webhook_event = entry.messaging[0];
        
        // Check if it's a message
        if (webhook_event.message) {
          const is_echo = !!webhook_event.message.is_echo;
          const message_text = (webhook_event.message.text || '').trim().toLowerCase();
          const TRIGGER = (process.env.TRIGGER_KEYWORD || 'loan').trim().toLowerCase();
          
          console.log(`LOG: Message: "${message_text}" | is_echo: ${is_echo} | Expected Trigger: "${TRIGGER}"`);

          // Logic: ONLY trigger when Admin sends the keyword (Echo)
          if (is_echo) {
            if (message_text.includes(TRIGGER)) {
              const customer_id = webhook_event.recipient.id; // In echo, recipient is the customer
              console.log(`SUCCESS: Trigger matched! Sending card to customer ID: ${customer_id}`);
              await sendAutoReply(customer_id);
            } else {
              console.log('INFO: Echo detected but keyword did not match.');
            }
          } else {
            console.log('INFO: Standard message from customer received. Ignoring (Echo mode active).');
          }
        } else {
          console.log('INFO: Non-message event received (like delivery/read receipt).');
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
    console.error('ERROR: PAGE_ACCESS_TOKEN is not defined in environment variables.');
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
    console.log(`LOG: Attempting to call FB API for recipient ${recipientId}...`);
    const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (result.error) {
      console.error('FB_API_ERROR:', JSON.stringify(result.error));
    } else {
      console.log('FB_API_SUCCESS:', JSON.stringify(result));
    }
  } catch (error) {
    console.error("CRITICAL_NETWORK_ERROR:", error);
  }
}
