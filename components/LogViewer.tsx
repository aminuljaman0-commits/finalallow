
import React from 'react';
import { MessageLog } from '../types';
import { Clock, User, Shield, Info } from 'lucide-react';

interface LogViewerProps {
  logs: MessageLog[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Live Activity Logs</h3>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold flex items-center gap-1 border border-green-500/20">
            Real-time Monitoring Active
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Sender</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Event Detail</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                  No logs recorded yet. Start the bot or simulate a trigger.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono flex items-center gap-2">
                    <Clock size={14} className="text-slate-600" />
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {log.sender === 'PageAdmin' ? (
                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400"><Shield size={14} /></div>
                      ) : (
                        <div className="p-1.5 rounded-md bg-slate-700 text-slate-400"><User size={14} /></div>
                      )}
                      <span className="text-sm font-medium text-slate-200">{log.sender}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-300 line-clamp-1">{log.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      log.status === 'triggered' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      log.status === 'sent' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      'bg-slate-700/50 text-slate-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl mt-6">
        <Info className="text-blue-400 mt-0.5" size={18} />
        <p className="text-xs text-slate-400 leading-relaxed">
          The bot listens for messages sent by the <span className="text-blue-300">Page Administrator</span>. When the keyword is detected, it automatically sends the "Generic Template" to the customer in that thread. This dashboard logs these interactions via webhook events.
        </p>
      </div>
    </div>
  );
};

export default LogViewer;
