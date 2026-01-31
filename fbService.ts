import { BotConfig } from './types';

/**
 * Note: Real Facebook Webhooks require a backend. 
 * This service provides the logic and API payload structures 
 * needed to send the "Generic Template" which guarantees the Link Preview.
 */

export const sendGenericTemplate = async (recipientId: string, config: BotConfig) => {
  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${config.accessToken}`;
  
  const payload = {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: config.previewTitle,
              image_url: config.previewImageUrl,
              subtitle: config.previewSubtitle,
              default_action: {
                type: "web_url",
                url: config.targetLink,
                messenger_extensions: false,
                webview_height_ratio: "full"
              },
              buttons: [
                {
                  type: "web_url",
                  url: config.targetLink,
                  title: "Apply Now"
                }
              ]
            }
          ]
        }
      }
    }
  };

  try {
    // In a real environment, this would be a fetch call to FB Graph API
    console.log("Sending Payload to FB:", payload);
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // return await response.json();
    return { success: true, message_id: "mid.simulate_" + Math.random() };
  } catch (error) {
    console.error("FB API Error:", error);
    return { success: false, error };
  }
};