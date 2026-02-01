
// Vercel Serverless Function to handle FB Webhook
export default async function handler(req: any, res: any) {
  // 1. Webhook Verification (GET request)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_secure_token_123';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WEBHOOK_VERIFIED_SUCCESSFULLY');
      return res.status(200).send(challenge);
    } else {
      console.error('❌ VERIFICATION_FAILED: Tokens do not match');
      return res.status(403).end();
    }
  }

  // 2. Handle Message Events (POST request)
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      console.log('📩 NEW_WEBHOOK_EVENT_RECEIVED');
      // এটি আপনাকে Vercel লগে দেখাবে ফেসবুক আসলে কি পাঠাচ্ছে
      console.log('FULL_BODY:', JSON.stringify(body, null, 2));
      
      for (const entry of body.entry) {
        if (!entry.messaging) continue;
        
        for (const webhook_event of entry.messaging) {
          // Check if it's a message
          if (webhook_event.message) {
            const is_echo = !!webhook_event.message.is_echo;
            const message_text = (webhook_event.message.text || '').trim().toLowerCase();
            const TRIGGER = (process.env.TRIGGER_KEYWORD || 'loan').trim().toLowerCase();
            
            console.log(`🔍 LOG: Msg: "${message_text}" | Echo: ${is_echo} | Trigger: "${TRIGGER}"`);

            // 💡 logic update: যদি অ্যাডমিন পাঠিয়ে থাকে (Echo) তবে recipient ই হলো কাস্টমার
            // আর যদি কাস্টমার পাঠিয়ে থাকে তবে sender ই হলো কাস্টমার
            if (message_text.includes(TRIGGER)) {
              let customer_psid = "";
              
              if (is_echo) {
                customer_psid = webhook_event.recipient.id;
                console.log('🎯 TRIGGER: Admin Echo matched. Recipient PSID:', customer_psid);
              } else {
                customer_psid = webhook_event.sender.id;
                console.log('🎯 TRIGGER: Customer Message matched. Sender PSID:', customer_psid);
              }

              if (customer_psid) {
                console.log('🚀 ATTEMPTING_TO_SEND_AUTO_REPLY...');
                await sendAutoReply(customer_psid);
              }
            } else {
              console.log('ℹ️ Keyword not found in message.');
            }
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
    console.error('❌ ERROR: PAGE_ACCESS_TOKEN is missing in Environment Variables');
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
    const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (result.error) {
      console.error('❌ FB_API_ERROR:', JSON.stringify(result.error));
    } else {
      console.log('✅ FB_API_SUCCESS: Message sent to', recipientId, "ID:", result.message_id);
    }
  } catch (error) {
    console.error("❌ CRITICAL_NETWORK_ERROR:", error);
  }
}
