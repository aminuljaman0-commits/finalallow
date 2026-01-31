
import React, { useState } from 'react';
import { BotConfig } from '../types';
import { Save, Link as LinkIcon, Key, Hash, FileText, Image as ImageIcon, Zap, Globe, RefreshCw, CheckCircle, AlertCircle, Shield, MessageCircle } from 'lucide-react';

interface ConfigFormProps {
  config: BotConfig;
  setConfig: React.Dispatch<React.SetStateAction<BotConfig>>;
  systemStatus: any;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, setConfig, systemStatus }) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleTestWebhook = async () => {
    if (!config.webhookUrl) return;
    setTesting(true);
    setTestResult(null);
    try {
      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          object: "page",
          entry: [{
            id: config.pageId || "12345",
            time: Date.now(),
            messaging: [{
              sender: { id: "test_user_id" },
              recipient: { id: config.pageId || "12345" },
              timestamp: Date.now(),
              message: { text: config.triggerKeyword, mid: "mid.test_message_id" }
            }]
          }]
        })
      });
      if (response.ok) setTestResult('success');
      else setTestResult('error');
    } catch (err) {
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Env Var Info Box */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
        <Shield className="text-blue-400 shrink-0 mt-1" />
        <div>
          <h4 className="text-blue-400 font-bold text-sm">Vercel Environment Integration</h4>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            নিচের এই ফর্মটি শুধুমাত্র লাইভ প্রিভিউ এবং টেস্ট করার জন্য। আপনার বটের স্থায়ী কনফিগারেশনের জন্য ভেরিয়েবলগুলো অবশ্যই **Vercel Dashboard** এ সেট করতে হবে।
          </p>
          <div className="flex gap-4 mt-3">
             <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${systemStatus?.PAGE_ACCESS_TOKEN ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Token Status</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${systemStatus?.TRIGGER_KEYWORD ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Keyword Status</span>
             </div>
          </div>
        </div>
      </div>

      {/* Logic Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl ring-1 ring-blue-500/10">
        <div className="p-6 border-b border-slate-800 bg-blue-500/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            Automation Logic
          </h3>
          <p className="text-sm text-slate-400">কোন শব্দ পাঠালে বট অটো-রিপ্লাই দিবে তা নির্ধারণ করুন।</p>
        </div>
        <div className="p-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <MessageCircle size={16} className="text-blue-400" />
              Trigger Keyword
            </label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                name="triggerKeyword" 
                value={config.triggerKeyword} 
                onChange={handleChange} 
                placeholder="যেমন: loan" 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-blue-400" 
              />
              <p className="text-[11px] text-slate-500 italic max-w-[200px]">
                এই শব্দটি পেজ থেকে পাঠালে কাস্টমার আপনার কার্ডটি পাবে।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
          <div>
            <h3 className="text-lg font-bold text-white">Facebook API & Webhook</h3>
            <p className="text-sm text-slate-400">মেটা ডেভেলপার পোর্টাল থেকে তথ্য দিন।</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Hash size={16} className="text-blue-400" />
                Facebook Page ID
              </label>
              <input type="text" name="pageId" value={config.pageId} onChange={handleChange} placeholder="Page ID" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Key size={16} className="text-blue-400" />
                Page Access Token
              </label>
              <input type="password" name="accessToken" value={config.accessToken} onChange={handleChange} placeholder="EAAI..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-mono" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Globe size={16} className="text-green-400" />
              Your Webhook URL
            </label>
            <div className="flex gap-2">
              <input type="text" name="webhookUrl" value={config.webhookUrl} onChange={handleChange} placeholder="https://your-vercel.app/api/webhook" className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-mono" />
              <button onClick={handleTestWebhook} disabled={!config.webhookUrl || testing} className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 border border-slate-700">
                {testing ? <RefreshCw className="animate-spin" size={18} /> : testResult === 'success' ? <CheckCircle className="text-green-500" size={18} /> : testResult === 'error' ? <AlertCircle className="text-red-500" size={18} /> : <RefreshCw size={18} />}
                Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 bg-slate-800/20">
          <h3 className="text-lg font-bold text-white">Message Card Design</h3>
          <p className="text-sm text-slate-400">মেসেঞ্জারের লিঙ্ক কার্ডটি কাস্টমাইজ করুন।</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <LinkIcon size={16} className="text-blue-400" />
              Target Destination URL
            </label>
            <input type="text" name="targetLink" value={config.targetLink} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-mono" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-blue-400" />
                Card Title
              </label>
              <input type="text" name="previewTitle" value={config.previewTitle} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-400" />
                Banner Image URL
              </label>
              <input type="text" name="previewImageUrl" value={config.previewImageUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-mono" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigForm;
