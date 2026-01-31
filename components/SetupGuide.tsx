import React from 'react';
import { Copy, AlertCircle, Terminal, BookOpen, ExternalLink, Globe } from 'lucide-react';

const SetupGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const envVars = [
    { key: 'PAGE_ACCESS_TOKEN', desc: 'ফেসবুক পেজ এক্সেস টোকেন (Meta Portal থেকে পাবেন)' },
    { key: 'VERIFY_TOKEN', desc: 'যেকোনো একটি গোপন কোড (যেমন: my_secure_token_123)' },
    { key: 'TRIGGER_KEYWORD', desc: 'যে শব্দ লিখলে অটো-রিপ্লাই যাবে (যেমন: loan)' },
    { key: 'TARGET_LINK', desc: 'আপনার লোন ফর্ম বা ওয়েবসাইটের লিঙ্ক' },
    { key: 'PREVIEW_TITLE', desc: 'মেসেঞ্জারে কার্ডের টাইটেল যা দেখাবে' },
    { key: 'PREVIEW_SUBTITLE', desc: 'কার্ডের নিচে ছোট লেখা (Sub-title)' },
    { key: 'PREVIEW_IMAGE_URL', desc: 'কার্ডের ছবির ডিরেক্ট লিঙ্ক (URL)' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Mobile Fix Guide - High Priority */}
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-3xl p-8 shadow-2xl ring-1 ring-blue-500/50">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <AlertCircle className="text-blue-400" />
          মোবাইলে আপলোড এরর সমাধান (অবশ্যই পড়ুন)
        </h2>
        
        <div className="space-y-6">
          <p className="text-blue-100 text-sm leading-relaxed">
            আপনার ফোন <code>.ts</code> ফাইলগুলোকে ভিডিও মনে করায় সরাসরি আপলোড করতে সমস্যা হতে পারে। এর সমাধান হলো গিটহাবে ফাইলগুলো <strong>ম্যানুয়ালি তৈরি (Copy-Paste)</strong> করা।
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-bold text-white">১</div>
               <div>
                 <p className="text-white font-bold text-sm">Create New File</p>
                 <p className="text-xs text-slate-400 mt-1">গিটহাবে গিয়ে <strong>Add file &gt; Create new file</strong> বাটনে ক্লিক করুন।</p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-bold text-white">২</div>
               <div>
                 <p className="text-white font-bold text-sm">নাম দিন (যেমন: api/webhook.ts)</p>
                 <p className="text-xs text-slate-400 mt-1">ফাইলের নামের বক্সে পুরো নাম লিখুন। <code>api/</code> লিখলে অটোমেটিক ফোল্ডার তৈরি হবে।</p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-bold text-white">৩</div>
               <div>
                 <p className="text-white font-bold text-sm">পেস্ট ও সেভ</p>
                 <p className="text-xs text-slate-400 mt-1">কোডটি কপি করে গিটহাবের বক্সে পেস্ট করুন এবং নিচে <strong>Commit changes</strong> বাটনে ক্লিক করুন।</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Terminal className="text-blue-400" />
          Vercel ডেপ্লয়মেন্ট গাইড
        </h2>

        <div className="space-y-12">
          {/* Step 1: Vercel */}
          <section className="relative pl-10 border-l-2 border-slate-800">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-slate-950"></div>
            <h3 className="text-lg font-bold text-white mb-2">১. এনভায়রনমেন্ট ভেরিয়েবল</h3>
            <p className="text-slate-400 text-sm mb-4">
              Vercel-এ প্রজেক্ট ইমপোর্ট করার সময় <strong>"Environment Variables"</strong> সেকশনে নিচের ডাটাগুলো দিন।
            </p>
          </section>

          {/* Step 2: Env Vars Table */}
          <section className="relative pl-10 border-l-2 border-slate-800">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-yellow-500 border-4 border-slate-950"></div>
            <h3 className="text-lg font-bold text-white mb-4">২. ভেরিয়েবল লিস্ট</h3>
            
            <div className="space-y-3">
              {envVars.map(item => (
                <div key={item.key} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{item.key}</code>
                      <button onClick={() => copyToClipboard(item.key)} className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy size={14} />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 3: FB Portal */}
          <section className="relative pl-10 border-l-2 border-slate-800">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-slate-950"></div>
            <h3 className="text-lg font-bold text-white mb-2">৩. ফেসবুক ওয়েব হুক</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">মেটা পোর্টালে ওয়েব হুক সেটআপ করুন:</p>
              <div className="bg-slate-800/40 p-5 rounded-2xl space-y-3 border border-slate-700 font-mono">
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Callback URL</p>
                  <p className="text-xs text-blue-400 break-all">https://your-project.vercel.app/api/webhook</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Verify Token</p>
                  <p className="text-xs text-slate-300">আপনার সেট করা <code>VERIFY_TOKEN</code> ব্যবহার করুন।</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                 <p className="text-xs text-yellow-200 leading-relaxed">
                   <strong>নোট:</strong> ওয়েব হুক সেটিংসে <code>messages</code> এবং <code>messaging_echoes</code> সাবস্ক্রিপশনটি অবশ্যই অন করবেন।
                 </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
