
import React from 'react';
import { BotConfig, MessageLog } from '../types';
import { MessageSquare, Zap, Layout, BookOpen, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  config: BotConfig;
  isBotRunning: boolean;
  logs: MessageLog[];
  systemStatus: any;
  onSimulateTrigger: () => void;
  onGoToGuide: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ config, isBotRunning, logs, systemStatus, onSimulateTrigger, onGoToGuide }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-500/20">
         <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white">স্বাগতম! আপনার অটোমেশন রেডি</h3>
            <p className="text-blue-100 text-sm md:text-base opacity-90">নিচের গাইড অনুসরণ করে আপনার ফেসবুক পেজের সাথে কানেক্ট করুন।</p>
         </div>
         <button onClick={onGoToGuide} className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg">
           সেটআপ গাইড দেখুন
           <ChevronRight size={18} />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className={`p-6 rounded-3xl border transition-all ${systemStatus?.isReady ? 'bg-slate-900 border-slate-800' : 'bg-red-500/5 border-red-500/20'}`}>
           <div className="flex items-center justify-between mb-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${systemStatus?.isReady ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
               {systemStatus?.isReady ? <CheckCircle className="text-green-400" size={24} /> : <AlertTriangle className="text-red-400" size={24} />}
             </div>
             <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${systemStatus?.isReady ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
               {systemStatus?.isReady ? 'Linked' : 'Incomplete'}
             </span>
           </div>
           <h3 className="text-xl font-bold text-white">Vercel Variables</h3>
           <p className="text-slate-400 text-xs mt-1">
             {systemStatus?.isReady ? 'Tokens are successfully loaded from Vercel.' : 'Please add PAGE_ACCESS_TOKEN in Vercel Settings.'}
           </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl md:col-span-2 flex flex-col justify-between">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Target Link URL</p>
                <p className="text-blue-400 font-mono text-sm truncate bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {config.targetLink}
                </p>
              </div>
              <button onClick={onSimulateTrigger} className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                সিমুলেট করুন
              </button>
           </div>
           <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Trigger: {config.triggerKeyword}</span>
              <span className="flex items-center gap-1"><Layout size={12} className="text-blue-500" /> Mode: Generic Template</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mock Messenger UI */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <Layout size={20} className="text-blue-400" />
            লাইভ প্রিভিউ (Messenger)
          </h3>
          
          <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-6 md:p-12 flex justify-center items-start min-h-[600px] overflow-hidden relative">
            <div className="w-full max-w-[340px] space-y-4">
              <div className="flex justify-end animate-in slide-in-from-right duration-300">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-[13px] font-medium shadow-md">
                  {config.triggerKeyword}
                </div>
              </div>

              <div className="flex justify-start animate-in slide-in-from-left duration-500 delay-300 fill-mode-both">
                <div className="w-full bg-[#0084ff] text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-transform hover:scale-[1.02] cursor-pointer ring-1 ring-white/10">
                   <div className="px-4 py-4 space-y-3">
                     <p className="text-[14px] leading-tight font-medium">
                       লোন নিতে নিচের দেয়া লিংক এ ক্লিক করে লোন এপ্লাই করুন:-👇
                     </p>
                     <p className="text-[14px] leading-tight font-medium">
                       💸১ থেকে ৩ ঘন্টায় লোন কার্যকর হয়।
                     </p>
                     <p className="text-[14px] leading-tight font-normal underline break-all opacity-90">
                       {config.targetLink}
                     </p>
                   </div>
                   <div className="w-full h-44 overflow-hidden bg-white">
                     <img src={config.previewImageUrl} alt="Preview" className="w-full h-full object-cover" />
                   </div>
                   <div className="p-4 bg-[#f0f2f5] border-t border-slate-200">
                     <h4 className="font-bold text-[#1c1e21] text-[15px] leading-tight">
                       {config.previewTitle}
                     </h4>
                     <p className="text-[12px] text-slate-500 mt-1 uppercase font-bold tracking-tight">Form Submission</p>
                   </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pl-2">Just now • Seen</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">কিভাবে এটি কাজ করে?</h3>
            <div className="space-y-8 text-sm text-slate-400">
               <p className="leading-relaxed">
                 এটি একটি **অ্যাডভান্সড টেমপ্লেটিং সিস্টেম**। ফেসবুকের সাধারণ মেসেজে অনেক সময় লিঙ্ক প্রিভিউ দেখা যায় না, তাই আমরা **Generic Template API** ব্যবহার করে আপনার মেসেজটি এমনভাবে ডিজাইন করেছি যাতে এটি সবসময় কাস্টমারের কাছে আকর্ষণীয় দেখায়।
               </p>

               <div className="space-y-4">
                 <p className="text-white font-bold flex items-center gap-2">
                   <CheckCircle2 size={18} className="text-blue-500" />
                   কাজের ধাপসমূহ:
                 </p>
                 <ul className="space-y-4 list-none pl-2">
                   <li className="flex gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                     বট আপনার পেজ থেকে পাঠানো মেসেজ (Echo) পর্যবেক্ষণ করে।
                   </li>
                   <li className="flex gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                     যখনই নির্দিষ্ট কিওয়ার্ড (যেমন: {config.triggerKeyword}) পায়, সাথে সাথে এটি অ্যাকশন নেয়।
                   </li>
                   <li className="flex gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                     কাস্টমারকে আপনার কনফিগার করা সেই সুন্দর **ব্লু বাবল** মেসেজটি পাঠিয়ে দেয়।
                   </li>
                 </ul>
               </div>

               <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-xs leading-relaxed flex gap-3">
                 <BookOpen size={24} className="text-blue-400 shrink-0" />
                 <div>
                    <strong>টিপস:</strong> আপনার যদি এখনও পেজ কানেক্ট করা না হয়ে থাকে, তবে উপরের <strong>"সেটআপ গাইড দেখুন"</strong> বাটনে ক্লিক করে নিয়মগুলো পড়ে নিন।
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default Dashboard;
