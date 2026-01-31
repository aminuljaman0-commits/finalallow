
export default async function handler(req: any, res: any) {
  const status = {
    PAGE_ACCESS_TOKEN: !!process.env.PAGE_ACCESS_TOKEN,
    VERIFY_TOKEN: !!process.env.VERIFY_TOKEN,
    TARGET_LINK: !!process.env.TARGET_LINK,
    TRIGGER_KEYWORD: !!process.env.TRIGGER_KEYWORD,
    isReady: !!(process.env.PAGE_ACCESS_TOKEN && process.env.VERIFY_TOKEN)
  };

  res.status(200).json(status);
}
