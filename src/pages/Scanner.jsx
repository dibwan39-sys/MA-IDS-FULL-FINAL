import React, { useState } from 'react';
import { Search, Globe, Server, Shield, AlertTriangle, CheckCircle, XCircle, Loader2, MapPin, Clock, Wifi, Lock, Unlock, Eye, FileText, ExternalLink, Copy, RefreshCw, Zap, Radio, Target } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockScanResults = [
  {
    id: 1,
    target: '192.168.1.100',
    type: 'port_scan',
    status: 'completed',
    severity: 'high',
    findings: 'Open ports: 22, 80, 443',
    timestamp: '2024-01-15 14:30:00'
  },
  {
    id: 2,
    target: '10.0.0.50',
    type: 'vulnerability_scan',
    status: 'in_progress',
    severity: 'medium',
    findings: 'Scanning for known vulnerabilities...',
    timestamp: '2024-01-15 14:25:00'
  },
  {
    id: 3,
    target: '192.168.1.200',
    type: 'network_discovery',
    status: 'completed',
    severity: 'low',
    findings: 'Host discovered, services identified',
    timestamp: '2024-01-15 14:20:00'
  }
];

export default function Scanner() {
  const [scanType, setScanType] = useState('quick');
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(mockScanResults);

  const startScan = () => {
    if (!target.trim()) return;

    setIsScanning(true);
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false);
      const newResult = {
        id: Date.now(),
        target,
        type: scanType,
        status: 'completed',
        severity: 'low',
        findings: 'Scan completed successfully',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      setScanResults([newResult, ...scanResults]);
      setTarget('');
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'in_progress': return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Security Scanner</h1>
          <p className="text-slate-400 mt-1">Automated vulnerability scanning and network discovery</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-300">Scanner Active</span>
        </div>
      </div>

      {/* Scan Configuration */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">New Scan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Scan Type</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="quick">Quick Scan</option>
              <option value="full">Full Scan</option>
              <option value="vulnerability">Vulnerability Scan</option>
              <option value="port_scan">Port Scan</option>
              <option value="network_discovery">Network Discovery</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target</label>
            <input
              type="text"
              placeholder="IP address, hostname, or range"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={startScan}
              disabled={isScanning || !target.trim()}
              className={cn(
                "w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                isScanning || !target.trim()
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              )}
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Start Scan
                </>
              )}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-slate-300">Network Scan</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="text-sm text-slate-300">Vulnerability Check</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Radio className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-slate-300">Port Scanner</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <span className="text-sm text-slate-300">Quick Audit</span>
          </div>
        </GlassCard>
      </div>

      {/* Scan Results */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-100">Scan Results</h3>
        </div>
        <div className="divide-y divide-slate-700/50">
          {scanResults.map((result) => (
            <div key={result.id} className="px-6 py-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <span className="font-medium text-slate-100">{result.target}</span>
                  <span className={cn("px-2 py-1 text-xs rounded-full", getSeverityColor(result.severity))}>
                    {result.severity}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{result.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{result.findings}</span>
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-blue-400 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Scans</p>
              <p className="text-2xl font-bold text-slate-100">{scanResults.length}</p>
            </div>
            <Search className="w-6 h-6 text-slate-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Scans</p>
              <p className="text-2xl font-bold text-blue-400">
                {scanResults.filter(r => r.status === 'in_progress').length}
              </p>
            </div>
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">High Risk</p>
              <p className="text-2xl font-bold text-red-400">
                {scanResults.filter(r => r.severity === 'high' || r.severity === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-emerald-400">
                {scanResults.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}