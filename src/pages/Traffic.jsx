import React, { useState, useEffect } from 'react';
import { Network, ArrowUpRight, ArrowDownRight, Layers, FileSearch, Clock, Server, Globe, Wifi } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockTrafficData = [
  { time: '14:00', inbound: 120, outbound: 80 },
  { time: '14:05', inbound: 150, outbound: 95 },
  { time: '14:10', inbound: 180, outbound: 110 },
  { time: '14:15', inbound: 140, outbound: 85 },
  { time: '14:20', inbound: 200, outbound: 130 },
  { time: '14:25', inbound: 170, outbound: 100 },
];

const mockConnections = [
  {
    id: 1,
    source_ip: '192.168.1.100',
    dest_ip: '10.0.0.50',
    protocol: 'TCP',
    port: 443,
    bytes: 15420,
    status: 'active',
    duration: '2m 34s'
  },
  {
    id: 2,
    source_ip: '10.0.0.50',
    dest_ip: '192.168.1.100',
    protocol: 'TCP',
    port: 80,
    bytes: 8750,
    status: 'active',
    duration: '1m 12s'
  },
  {
    id: 3,
    source_ip: '192.168.1.150',
    dest_ip: '8.8.8.8',
    protocol: 'UDP',
    port: 53,
    bytes: 120,
    status: 'closed',
    duration: '0m 5s'
  }
];

export default function Traffic() {
  const [selectedView, setSelectedView] = useState('overview');
  const [connections, setConnections] = useState(mockConnections);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Traffic Analysis</h1>
          <p className="text-slate-400 mt-1">Monitor network traffic patterns and connections</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-slate-300">Monitoring Active</span>
        </div>
      </div>

      {/* View Selector */}
      <GlassCard className="p-4">
        <div className="flex gap-2">
          {['overview', 'connections', 'protocols', 'geography'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                selectedView === view
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
              )}
            >
              {view}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Traffic Overview */}
      {selectedView === 'overview' && (
        <>
          {/* Traffic Graph */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Network className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-slate-100">Traffic Flow</h3>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {mockTrafficData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-emerald-500/60 rounded-t"
                      style={{ height: `${(data.inbound / 200) * 100}%` }}
                    ></div>
                    <div
                      className="w-full bg-blue-500/60 rounded-t"
                      style={{ height: `${(data.outbound / 200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">{data.time}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500/60 rounded"></div>
                <span className="text-sm text-slate-300">Inbound</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500/60 rounded"></div>
                <span className="text-sm text-slate-300">Outbound</span>
              </div>
            </div>
          </GlassCard>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Traffic</p>
                  <p className="text-2xl font-bold text-slate-100">2.4 GB</p>
                  <p className="text-xs text-emerald-400">+12% from yesterday</p>
                </div>
                <Network className="w-8 h-8 text-slate-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active Connections</p>
                  <p className="text-2xl font-bold text-blue-400">47</p>
                  <p className="text-xs text-emerald-400">+5 new</p>
                </div>
                <Wifi className="w-8 h-8 text-blue-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Packets/sec</p>
                  <p className="text-2xl font-bold text-purple-400">1,247</p>
                  <p className="text-xs text-red-400">-8% from peak</p>
                </div>
                <Layers className="w-8 h-8 text-purple-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Bandwidth Usage</p>
                  <p className="text-2xl font-bold text-amber-400">67%</p>
                  <p className="text-xs text-slate-400">of 1 Gbps</p>
                </div>
                <Globe className="w-8 h-8 text-amber-400" />
              </div>
            </GlassCard>
          </div>
        </>
      )}

      {/* Active Connections */}
      {selectedView === 'connections' && (
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-100">Active Connections</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Protocol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Port</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Bytes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {connections.map((conn) => (
                  <tr key={conn.id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">{conn.source_ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">{conn.dest_ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{conn.protocol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{conn.port}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{conn.bytes.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                        conn.status === 'active' ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                      )}>
                        {conn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{conn.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Protocol Breakdown */}
      {selectedView === 'protocols' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Protocol Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">TCP</span>
                </div>
                <span className="text-sm text-slate-100">68%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">UDP</span>
                </div>
                <span className="text-sm text-slate-100">24%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">ICMP</span>
                </div>
                <span className="text-sm text-slate-100">8%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Top Ports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Port 443 (HTTPS)</span>
                <span className="text-sm text-slate-100">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Port 80 (HTTP)</span>
                <span className="text-sm text-slate-100">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Port 53 (DNS)</span>
                <span className="text-sm text-slate-100">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Port 22 (SSH)</span>
                <span className="text-sm text-slate-100">8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Other</span>
                <span className="text-sm text-slate-100">12%</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Geography View */}
      {selectedView === 'geography' && (
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-slate-100">Geographic Distribution</h3>
          </div>
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Geographic traffic visualization would be displayed here</p>
            <p className="text-sm text-slate-500 mt-2">Integration with mapping services required</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}