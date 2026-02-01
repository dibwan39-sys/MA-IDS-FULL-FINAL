import React from 'react';
import { Activity, Shield, AlertTriangle, Wifi, TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from "@/lib/utils";

export default function KPIMetrics() {
  const kpis = [
    {
      title: 'Total Threats Detected',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Shield,
      color: 'text-red-400'
    },
    {
      title: 'Active Connections',
      value: '892',
      change: '+5%',
      changeType: 'increase',
      icon: Wifi,
      color: 'text-blue-400'
    },
    {
      title: 'Blocked Attacks',
      value: '89',
      change: '-8%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-amber-400'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      changeType: 'neutral',
      icon: Activity,
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <GlassCard key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{kpi.title}</p>
                <p className="text-2xl font-bold text-slate-100">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.changeType === 'increase' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {kpi.changeType === 'decrease' && <TrendingDown className="w-3 h-3 text-red-400" />}
                  <span className={cn(
                    "text-xs font-medium",
                    kpi.changeType === 'increase' ? "text-emerald-400" :
                    kpi.changeType === 'decrease' ? "text-red-400" : "text-slate-400"
                  )}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <IconComponent className={cn("w-6 h-6", kpi.color)} />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}