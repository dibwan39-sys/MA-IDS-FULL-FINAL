import React, { useState } from 'react';
import { Flame, Plus, Search, Filter, MoreVertical, Edit2, Trash2, RotateCcw, Check, X, Power, PowerOff, Clock, Shield, Ban } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockRules = [
  {
    id: 1,
    name: 'Block SSH from external',
    source_ip: '0.0.0.0/0',
    dest_ip: '192.168.1.100',
    protocol: 'TCP',
    port: '22',
    action: 'DENY',
    status: 'active',
    priority: 1,
    hit_count: 45
  },
  {
    id: 2,
    name: 'Allow HTTP/HTTPS',
    source_ip: '0.0.0.0/0',
    dest_ip: '192.168.1.100',
    protocol: 'TCP',
    port: '80,443',
    action: 'ALLOW',
    status: 'active',
    priority: 2,
    hit_count: 1250
  },
  {
    id: 3,
    name: 'Block suspicious IPs',
    source_ip: '10.0.0.0/8',
    dest_ip: '192.168.1.0/24',
    protocol: 'ANY',
    port: 'ANY',
    action: 'DROP',
    status: 'disabled',
    priority: 3,
    hit_count: 0
  }
];

export default function Firewall() {
  const [rules, setRules] = useState(mockRules);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.source_ip.includes(searchTerm) ||
    rule.dest_ip.includes(searchTerm)
  );

  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'disabled' : 'active' }
        : rule
    ));
  };

  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Firewall</h1>
          <p className="text-slate-400 mt-1">Manage network security rules and policies</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      {/* Search and Filters */}
      <GlassCard className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800/70 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </GlassCard>

      {/* Rules Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Hits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-sm font-medium text-slate-100">{rule.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule.source_ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule.dest_ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule.protocol}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                      rule.action === 'ALLOW' ? "bg-emerald-500/20 text-emerald-400" :
                      rule.action === 'DENY' ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    )}>
                      {rule.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className={cn(
                        "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full",
                        rule.status === 'active' ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                      )}
                    >
                      {rule.status === 'active' ? <Power className="w-3 h-3 mr-1" /> : <PowerOff className="w-3 h-3 mr-1" />}
                      {rule.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule.hit_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Rules</p>
              <p className="text-2xl font-bold text-emerald-400">
                {rules.filter(r => r.status === 'active').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Hits</p>
              <p className="text-2xl font-bold text-blue-400">
                {rules.reduce((sum, rule) => sum + rule.hit_count, 0)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Blocked Threats</p>
              <p className="text-2xl font-bold text-red-400">
                {rules.filter(r => r.action === 'DENY' || r.action === 'DROP').reduce((sum, rule) => sum + rule.hit_count, 0)}
              </p>
            </div>
            <Ban className="w-8 h-8 text-red-400" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}