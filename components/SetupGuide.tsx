
import React from 'react';
import { Copy, AlertCircle, Terminal, HelpCircle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

const SetupGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 text-slate-300">
      
      {/* Critical Alert */}
      <div className="bg-red-600/20 border-2 border-red-500 rounded-3xl p-6 shadow-2xl animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <AlertCircle className="text-red-500 w-8 h-8" />
          <h2 className="text-xl font-bold text-white uppercase tracking-tighter">সাবধান: এটি চেক না করলে বট চলবে না!</h2>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          Meta Developer পোর্টালে আপনার অ্যাপের <strong>Webhooks</strong> সেটিংস এ গিয়ে অবশ্যই <strong>"messaging_echoes"</strong> ফিল্ডটি সাবস্ক্রাইব করতে হবে। এটি ছাড়া বট বুঝতে পারবে না যে আপনি (অ্যাডমিন) মেসেজ দিয়েছেন।
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <HelpCircle className="text-blue-400" />
          কেন কাজ করছে না? (চেকলিস্ট)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-blue-400 font-bold text-sm">১. এডমিন ইকো (Admin Echo)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              আপনি যদি নিজের পার্সোনাল আইডি থেকে পেজে মেসেজ দেন, তবে বট রিপ্লাই দিবে না। আপনাকে আপনার <strong>ফেসবুক পেজ (Page Profile)</strong> থেকে কাস্টমারকে মেসেজ দিতে হবে।
            </p>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-green-400 font-bold text-sm">২. লগের তথ্য দেখা</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vercel লগে <strong>POST /api/webhook 200</strong> লেখাটির ওপর ক্লিক করুন। সেখানে <code>DEBUG: Text: "loan"</code> লেখাটি আছে কি না দেখুন। না থাকলে বুঝবেন ফেসবুক আপনার কিওয়ার্ড পাঠাচ্ছে না।
            </p>
          </div>
        </div>
      </div>
      
      {/* Existing content... */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
           <Terminal className="text-blue-500" /> গুরুত্বপূর্ণ ভেরিয়েবলসমূহ
        </h3>
        <div className="space-y-3">
           {['PAGE_ACCESS_TOKEN', 'VERIFY_TOKEN', 'TRIGGER_KEYWORD', 'TARGET_LINK'].map(v => (
              <div key={v} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <code className="text-blue-400 font-bold text-xs">{v}</code>
                <button onClick={() => copyToClipboard(v)} className="p-2 hover:bg-slate-800 rounded-lg">
                  <Copy size={14} className="text-slate-500" />
                </button>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
