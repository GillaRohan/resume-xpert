import React from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  Briefcase,
  Info,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationAsRead,
  } = useApp();

  if (!isNotificationOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-black" />;
      case 'job':     return <Briefcase    className="w-3.5 h-3.5 text-black" />;
      case 'alert':   return <AlertTriangle className="w-3.5 h-3.5 text-black" />;
      default:        return <Info          className="w-3.5 h-3.5 text-black" />;
    }
  };

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setIsNotificationOpen(false); }}
    >
      <div className="w-full max-w-sm bg-white h-full shadow-2xl shadow-black/20 border-l border-black/[0.07] flex flex-col">

        {/* Header */}
        <div className="px-5 py-4 border-b border-black/[0.07] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/[0.08] border border-black/[0.12] flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black">Notifications</h3>
              <p className="text-[9px] text-black/30 font-mono">{unread} unread · Real-time alerts</p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1.5 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] text-black/40 hover:text-black transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                notif.read
                  ? 'bg-black/[0.02] border-black/[0.04] opacity-50'
                  : 'bg-black/[0.05] border-black/[0.10] hover:bg-black/[0.08]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-black/[0.08] border border-black/[0.10] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-black truncate pr-2">{notif.title}</h4>
                    <span className="text-[9px] text-black/25 font-mono flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-black/45 leading-relaxed">{notif.message}</p>
                </div>
              </div>
              {!notif.read && (
                <div className="mt-2.5 h-px bg-black/[0.06]" />
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="w-8 h-8 text-black/15 mb-3" />
              <p className="text-xs text-black/25 font-mono">No notifications yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-black/[0.06] flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-black/40 hover:text-black transition-colors font-mono"
          >
            <Check className="w-3 h-3" />
            Mark all read
          </button>
          <span className="text-[9px] text-black/20 font-mono">Resume Xpert v2.4</span>
        </div>
      </div>
    </div>
  );
};
