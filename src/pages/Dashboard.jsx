import React, { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, Wifi, Zap, ArrowUpRight, ArrowDownRight, Globe, Server, Eye } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import KPIMetrics from '../components/ids/KPIMetrics';
import { cn } from "@/lib/utils";

export default function cd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitcd "c:\Users\alan\Downloads\MA-IDS-FULL-FINAL"
git remote set-url origin https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.gitDashboard() {
  const [systemStatus, setSystemStatus] = useState('operational');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time IDS monitoring and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full animate-pulse",
            systemStatus === 'operational' ? "bg-emerald-400" : "bg-red-400"
          )} />
          <span className="text-sm text-slate-300">
            System {systemStatus === 'operational' ? 'Operational' : 'Alert'}
          </span>
        </div>
      </div>

      {/* KPI Metrics */}
      <KPIMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-100">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">Threat blocked</span>
              </div>
              <span className="text-xs text-slate-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Traffic spike detected</span>
              </div>
              <span className="text-xs text-slate-500">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-slate-300">Suspicious login attempt</span>
              </div>
              <span className="text-xs text-slate-500">12 min ago</span>
            </div>
          </div>
        </GlassCard>

        {/* System Health */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-slate-100">System Health</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">CPU Usage</span>
              <span className="text-sm text-emerald-400">23%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Memory Usage</span>
              <span className="text-sm text-blue-400">67%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Network I/O</span>
              <span className="text-sm text-purple-400">45%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="text-sm text-slate-300">Run Scan</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
            <Eye className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-slate-300">View Logs</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
            <Globe className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-slate-300">Network Map</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
            <Zap className="w-6 h-6 text-amber-400" />
            <span className="text-sm text-slate-300">System Report</span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
}