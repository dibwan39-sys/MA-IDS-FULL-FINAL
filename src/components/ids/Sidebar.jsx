import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Activity, 
  Flame, 
  Brain, 
  Network, 
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers,
  ClipboardList,
  Target
} from 'lucide-react';

const navItems = [
  { id: 'Dashboard', label: 'Dashboard', icon: Activity },
  { id: 'Scanner', label: 'Security Scanner', icon: Target },
  { id: 'Firewall', label: 'Firewall', icon: Flame },
  { id: 'Traffic', label: 'Traffic Intel', icon: Network },
  { id: 'Syslog', label: 'Syslog', icon: FileText },
  { id: 'MLRegistry', label: 'ML Core', icon: Brain },
  { id: 'Architecture', label: 'Architecture', icon: Layers },
  { id: 'Reports', label: 'Forensic Reports', icon: ClipboardList },
  { id: 'Admin', label: 'Admin', icon: Settings },
];

export default function Sidebar({ currentPage, collapsed, onToggle }) {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full z-50 transition-all duration-300",
        "bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-700/50">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold text-slate-100">Mubarak Alnassi</h1>
            <p className="text-xs text-slate-500">MA-IDS Core v2.5</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <Link
              key={item.id}
              to={createPageUrl(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-slate-800/50",
                isActive && "bg-emerald-500/10 border border-emerald-500/30"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-emerald-400" : "text-slate-400"
              )} />
              {!collapsed && (
                <span className={cn(
                  "text-sm font-medium animate-fade-in",
                  isActive ? "text-emerald-400" : "text-slate-300"
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="absolute bottom-20 left-4 right-4 animate-fade-in">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-slate-300">System Status</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </aside>
  );
}