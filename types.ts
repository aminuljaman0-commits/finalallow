
export interface BotConfig {
  pageId: string;
  accessToken: string;
  webhookUrl: string;
  triggerKeyword: string;
  targetLink: string;
  previewTitle: string;
  previewSubtitle: string;
  previewImageUrl: string;
}

export interface MessageLog {
  id: string;
  timestamp: string;
  sender: 'User' | 'Bot' | 'PageAdmin';
  text: string;
  status: 'sent' | 'received' | 'triggered';
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  SETTINGS = 'settings',
  LOGS = 'logs',
  GUIDE = 'guide'
}
