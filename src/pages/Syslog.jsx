import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Filter, Search, AlertCircle, AlertTriangle, Info, RefreshCw, Pause, Play, Trash2, Clock } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockLogs = [
  {
    id: 1,
    timestamp: '2024-01-15 14:32:15',
    level: 'error',
    source: 'firewall',
    message: 'Blocked suspicious connection attempt from 192.168.1.100:54321 to 10.0.0.50:22',
    details: 'TCP SYN flood detected'
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:31:42',
    level: 'warning',
    source: 'ids',
    message: 'Anomaly detected in network traffic pattern',
    details: 'Unusual spike in UDP packets from 192.168.1.150'
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:30:28',
    level: 'info',
    source: 'scanner',
    message: 'Vulnerability scan completed for 192.168.1.100',
    details: 'Found 2 medium-risk vulnerabilities'
  },
  {
    id: 4,
    timestamp: '2024-01-15 14:29:55',
    level: 'error',
    source: 'auth',
    message: 'Failed login attempt detected',
    details: 'Multiple failed attempts from IP 203.0.113.1'
  },
  {
    id: 5,
    timestamp: '2024-01-15 14:28:12',
    level: 'info',
    source: 'system',
    message: 'System health check completed',
    details: 'All services operational, CPU: 45%, Memory: 67%'
  }
];

export default function Syslog() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAutoScroll && !isPaused) {
      scrollToBottom();
    }
  }, [logs, isAutoScroll, isPaused]);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(log => log.level === levelFilter);
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(log => log.source === sourceFilter);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, levelFilter, sourceFilter]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'warning': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'info': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setFilteredLogs([]);
  };

  const exportLogs = () => {
    const logText = filteredLogs.map(log =>
      `[${log.timestamp}] ${log.level.toUpperCase()} ${log.source}: ${log.message} - ${log.details}`
    ).join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `syslog-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">System Logs</h1>
          <p className="text-slate-400 mt-1">Real-time system logging and monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isPaused
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            )}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
            )} />
            <span className="text-sm text-slate-300">
              {isPaused ? 'Paused' : 'Live'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Levels</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="info">Info</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Sources</option>
            <option value="firewall">Firewall</option>
            <option value="ids">IDS</option>
            <option value="scanner">Scanner</option>
            <option value="auth">Auth</option>
            <option value="system">System</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={isAutoScroll}
                onChange={(e) => setIsAutoScroll(e.target.checked)}
                className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
              />
              Auto-scroll
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportLogs}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800/70 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={clearLogs}
              className="flex items-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Logs Display */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">Log Entries</h3>
          <span className="text-sm text-slate-400">{filteredLogs.length} entries</span>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No log entries match your filters</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors",
                  getLevelColor(log.level)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getLevelIcon(log.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 font-mono">{log.timestamp}</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded uppercase font-medium">
                        {log.source}
                      </span>
                    </div>
                    <p className="text-sm text-slate-100 mb-1">{log.message}</p>
                    <p className="text-xs text-slate-400">{log.details}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
      </GlassCard>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Logs</p>
              <p className="text-2xl font-bold text-slate-100">{logs.length}</p>
            </div>
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Errors</p>
              <p className="text-2xl font-bold text-red-400">
                {logs.filter(l => l.level === 'error').length}
              </p>
            </div>
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Warnings</p>
              <p className="text-2xl font-bold text-amber-400">
                {logs.filter(l => l.level === 'warning').length}
              </p>
            </div>
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Info</p>
              <p className="text-2xl font-bold text-blue-400">
                {logs.filter(l => l.level === 'info').length}
              </p>
            </div>
            <Info className="w-6 h-6 text-blue-400" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}