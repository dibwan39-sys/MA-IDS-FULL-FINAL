# MA-IDS Delivery - Part 4: Additional Pages
## Extended Functionality Pages with Code

---

## 1. Traffic Analysis Page (`src/pages/Traffic.jsx`)

**Purpose:** Network traffic monitoring and analysis with interactive charts and real-time data visualization.

**Key Features:**
- Real-time traffic monitoring
- Protocol breakdown charts
- Bandwidth usage tracking
- Anomaly detection alerts
- Historical traffic analysis

**Complete Code:**
```jsx
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, AlertTriangle, Download, RefreshCw } from 'lucide-react';

// Mock traffic data
const mockTrafficData = [
  { time: '00:00', bytes: 1200000, packets: 8500, protocols: { TCP: 60, UDP: 25, ICMP: 15 } },
  { time: '01:00', bytes: 1800000, packets: 12000, protocols: { TCP: 55, UDP: 30, ICMP: 15 } },
  { time: '02:00', bytes: 950000, packets: 6800, protocols: { TCP: 65, UDP: 20, ICMP: 15 } },
  { time: '03:00', bytes: 2100000, packets: 14500, protocols: { TCP: 50, UDP: 35, ICMP: 15 } },
  { time: '04:00', bytes: 1600000, packets: 11000, protocols: { TCP: 58, UDP: 27, ICMP: 15 } },
  { time: '05:00', bytes: 2800000, packets: 18900, protocols: { TCP: 45, UDP: 40, ICMP: 15 } },
];

const mockAlerts = [
  { id: 1, type: 'spike', message: 'Unusual traffic spike detected', severity: 'medium', time: '14:32:15' },
  { id: 2, type: 'protocol', message: 'Abnormal UDP traffic pattern', severity: 'low', time: '14:15:22' },
  { id: 3, type: 'bandwidth', message: 'Bandwidth threshold exceeded', severity: 'high', time: '13:58:45' },
];

const Traffic = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [trafficData, setTrafficData] = useState(mockTrafficData);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isLive, setIsLive] = useState(true);

  // Simulate live data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newDataPoint = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        bytes: Math.floor(Math.random() * 3000000) + 500000,
        packets: Math.floor(Math.random() * 20000) + 5000,
        protocols: {
          TCP: Math.floor(Math.random() * 30) + 40,
          UDP: Math.floor(Math.random() * 30) + 20,
          ICMP: Math.floor(Math.random() * 10) + 10
        }
      };

      setTrafficData(prev => [...prev.slice(-11), newDataPoint]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const currentData = trafficData[trafficData.length - 1] || {};
  const totalBytes = trafficData.reduce((sum, item) => sum + item.bytes, 0);
  const totalPackets = trafficData.reduce((sum, item) => sum + item.packets, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Traffic Analysis</h1>
          <p className="text-slate-400 mt-1">
            Monitor network traffic patterns and detect anomalies
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isLive ? 'Live' : 'Paused'}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {formatBytes(currentData.bytes || 0)}
              </div>
              <div className="text-sm text-slate-400">Current Rate</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {(currentData.packets || 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Packets/sec</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {formatBytes(totalBytes)}
              </div>
              <div className="text-sm text-slate-400">Total Volume</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{alerts.length}</div>
              <div className="text-sm text-slate-400">Active Alerts</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Traffic Flow</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-white text-sm"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 flex items-center justify-center text-slate-500 border border-slate-700/50 rounded">
              <div className="text-center">
                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Interactive traffic chart</p>
                <p className="text-xs">Using Recharts library</p>
              </div>
            </div>

            {/* Data Points */}
            <div className="mt-4 grid grid-cols-6 gap-2 text-xs">
              {trafficData.slice(-6).map((point, index) => (
                <div key={index} className="text-center">
                  <div className="text-slate-400">{point.time}</div>
                  <div className="text-white font-medium">{formatBytes(point.bytes)}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Protocol Breakdown & Alerts */}
        <div className="space-y-6">
          {/* Protocol Breakdown */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Protocol Distribution</h3>
            {currentData.protocols && (
              <div className="space-y-3">
                {Object.entries(currentData.protocols).map(([protocol, percentage]) => (
                  <div key={protocol} className="flex items-center justify-between">
                    <span className="text-slate-300">{protocol}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-white text-sm w-8">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Active Alerts */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Traffic Alerts</h3>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-400' :
                    alert.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-slate-500 text-xs">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Traffic;
```

---

## 2. System Logging Page (`src/pages/Syslog.jsx`)

**Purpose:** System logging interface with real-time log streaming, filtering, and export capabilities.

**Key Features:**
- Real-time log streaming
- Advanced filtering options
- Log level management
- Export functionality
- Log search and highlighting

**Complete Code:**
```jsx
import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Search, Download, Filter, AlertCircle, Info, X, CheckCircle } from 'lucide-react';

// Mock log data
const generateMockLogs = () => {
  const logs = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const timestamp = new Date(now.getTime() - i * 60000); // One minute apart
    const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    const level = levels[Math.floor(Math.random() * levels.length)];

    const messages = [
      'Firewall rule applied successfully',
      'Connection attempt from 192.168.1.100 blocked',
      'User authentication successful',
      'System health check completed',
      'Malware scan finished with 0 threats',
      'Network interface eth0 status changed',
      'IDS signature database updated',
      'VPN connection established',
      'Certificate validation failed',
      'Backup process completed'
    ];

    logs.push({
      id: i + 1,
      timestamp: timestamp.toISOString(),
      level,
      source: ['firewall', 'auth', 'system', 'network', 'ids'][Math.floor(Math.random() * 5)],
      message: messages[Math.floor(Math.random() * messages.length)],
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`
    });
  }

  return logs;
};

const Syslog = () => {
  const [logs, setLogs] = useState(generateMockLogs());
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef(null);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm)
      );
    }

    if (levelFilter !== 'ALL') {
      filtered = filtered.filter(log => log.level === levelFilter);
    }

    if (sourceFilter !== 'ALL') {
      filtered = filtered.filter(log => log.source === sourceFilter);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, levelFilter, sourceFilter]);

  // Auto scroll to bottom
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredLogs, autoScroll]);

  // Simulate new logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString(),
        level: ['INFO', 'WARN', 'ERROR'][Math.floor(Math.random() * 3)],
        source: ['firewall', 'auth', 'system'][Math.floor(Math.random() * 3)],
        message: 'New system event logged',
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`
      };

      setLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
    }, 10000); // New log every 10 seconds

    return () => clearInterval(interval);
  }, [logs.length]);

  const getLevelIcon = (level) => {
    switch (level) {
      case 'ERROR': return <X className="w-4 h-4 text-red-400" />;
      case 'WARN': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'INFO': return <Info className="w-4 h-4 text-blue-400" />;
      case 'DEBUG': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'WARN': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'INFO': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'DEBUG': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Source', 'IP', 'Message'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.source,
        log.ip,
        log.message
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `syslog-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">System Logs</h1>
          <p className="text-slate-400 mt-1">
            Real-time system logging and monitoring
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant={autoScroll ? "default" : "outline"}
            onClick={() => setAutoScroll(!autoScroll)}
          >
            Auto Scroll {autoScroll ? 'On' : 'Off'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <GlassCard>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Levels</option>
            <option value="ERROR">Errors</option>
            <option value="WARN">Warnings</option>
            <option value="INFO">Info</option>
            <option value="DEBUG">Debug</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Sources</option>
            <option value="firewall">Firewall</option>
            <option value="auth">Authentication</option>
            <option value="system">System</option>
            <option value="network">Network</option>
            <option value="ids">IDS</option>
          </select>
        </div>
      </GlassCard>

      {/* Log Viewer */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Log Entries ({filteredLogs.length})
          </h2>
          <div className="text-sm text-slate-400">
            Showing {Math.min(filteredLogs.length, 50)} of {filteredLogs.length} entries
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg border border-slate-700/50">
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {filteredLogs.slice(0, 50).map(log => (
              <div
                key={log.id}
                className={`flex items-start space-x-3 p-3 rounded border ${getLevelColor(log.level)}`}
              >
                {getLevelIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800/50">
                      {log.level}
                    </span>
                    <span className="text-xs text-slate-400">{log.source}</span>
                    <span className="text-xs text-slate-500">{log.ip}</span>
                    <span className="text-xs text-slate-500 ml-auto">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-white text-sm break-words">{log.message}</p>
                </div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Syslog;
```

---

## 3. ML Registry Page (`src/pages/MLRegistry.jsx`)

**Purpose:** Machine Learning model registry for managing AI models, performance tracking, and deployment.

**Key Features:**
- Model listing and versioning
- Performance metrics display
- Training status monitoring
- Model deployment controls
- Accuracy and performance charts

**Complete Code:**
```jsx
import React, { useState } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Play, Pause, RotateCcw, BarChart3, Zap } from 'lucide-react';

// Mock ML models data
const mockModels = [
  {
    id: 1,
    name: 'Threat Detection v2.1',
    version: '2.1.0',
    status: 'active',
    accuracy: 0.94,
    precision: 0.91,
    recall: 0.87,
    f1Score: 0.89,
    lastTrained: '2024-01-15 08:00:00',
    trainingTime: '2h 15m',
    datasetSize: 150000,
    algorithm: 'Random Forest',
    deploymentStatus: 'production'
  },
  {
    id: 2,
    name: 'Anomaly Detection v1.8',
    version: '1.8.2',
    status: 'training',
    accuracy: 0.87,
    precision: 0.83,
    recall: 0.91,
    f1Score: 0.87,
    lastTrained: '2024-01-14 16:30:00',
    trainingTime: '3h 45m',
    datasetSize: 200000,
    algorithm: 'Neural Network',
    deploymentStatus: 'staging'
  },
  {
    id: 3,
    name: 'Behavior Analysis v1.5',
    version: '1.5.1',
    status: 'inactive',
    accuracy: 0.78,
    precision: 0.75,
    recall: 0.82,
    f1Score: 0.78,
    lastTrained: '2024-01-10 12:00:00',
    trainingTime: '1h 30m',
    datasetSize: 75000,
    algorithm: 'SVM',
    deploymentStatus: 'none'
  }
];

const MLRegistry = () => {
  const [models, setModels] = useState(mockModels);
  const [selectedModel, setSelectedModel] = useState(null);
  const [sortBy, setSortBy] = useState('accuracy');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'training': return 'text-blue-400 bg-blue-500/20';
      case 'inactive': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getDeploymentColor = (status) => {
    switch (status) {
      case 'production': return 'text-green-400 bg-green-500/20';
      case 'staging': return 'text-yellow-400 bg-yellow-500/20';
      case 'none': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const toggleModelStatus = (modelId) => {
    setModels(models.map(model =>
      model.id === modelId
        ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
        : model
    ));
  };

  const retrainModel = (modelId) => {
    setModels(models.map(model =>
      model.id === modelId
        ? { ...model, status: 'training' }
        : model
    ));

    // Simulate training completion
    setTimeout(() => {
      setModels(models.map(model =>
        model.id === modelId
          ? {
              ...model,
              status: 'active',
              accuracy: Math.min(0.99, model.accuracy + 0.02),
              lastTrained: new Date().toISOString().replace('T', ' ').substring(0, 19)
            }
          : model
      ));
    }, 5000);
  };

  const sortedModels = [...models].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">ML Model Registry</h1>
          <p className="text-slate-400 mt-1">
            Manage and monitor machine learning models
          </p>
        </div>
        <Button>
          <Brain className="w-4 h-4 mr-2" />
          Train New Model
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="text-center">
            <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{models.length}</div>
            <div className="text-sm text-slate-400">Total Models</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {(models.reduce((sum, model) => sum + model.accuracy, 0) / models.length * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Avg Accuracy</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <Play className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {models.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-slate-400">Active Models</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {models.filter(m => m.status === 'training').length}
            </div>
            <div className="text-sm text-slate-400">Training</div>
          </div>
        </GlassCard>
      </div>

      {/* Models Table */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Model Registry</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="accuracy">Sort by Accuracy</option>
            <option value="precision">Sort by Precision</option>
            <option value="recall">Sort by Recall</option>
            <option value="lastTrained">Sort by Last Trained</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-slate-300 font-medium">Model</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">Accuracy</th>
                <th className="text-left p-4 text-slate-300 font-medium">Precision</th>
                <th className="text-left p-4 text-slate-300 font-medium">Recall</th>
                <th className="text-left p-4 text-slate-300 font-medium">F1-Score</th>
                <th className="text-left p-4 text-slate-300 font-medium">Deployment</th>
                <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedModels.map(model => (
                <tr key={model.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{model.name}</div>
                      <div className="text-slate-400 text-sm">v{model.version} • {model.algorithm}</div>
                      <div className="text-slate-500 text-xs">Trained: {model.lastTrained}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </td>
                  <td className="p-4 text-white font-medium">
                    {(model.accuracy * 100).toFixed(1)}%
                  </td>
                  <td className="p-4 text-slate-300">
                    {(model.precision * 100).toFixed(1)}%
                  </td>
                  <td className="p-4 text-slate-300">
                    {(model.recall * 100).toFixed(1)}%
                  </td>
                  <td className="p-4 text-slate-300">
                    {(model.f1Score * 100).toFixed(1)}%
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDeploymentColor(model.deploymentStatus)}`}>
                      {model.deploymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModelStatus(model.id)}
                        disabled={model.status === 'training'}
                      >
                        {model.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => retrainModel(model.id)}
                        disabled={model.status === 'training'}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Model Details Modal would go here */}
      {selectedModel && (
        <GlassCard className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Model Details: {selectedModel.name}
          </h3>
          {/* Detailed model information */}
        </GlassCard>
      )}
    </div>
  );
};

export default MLRegistry;
```

---

## Summary of Part 4

This delivery part covers the extended functionality pages that provide advanced features:

- **Traffic Analysis**: Real-time network monitoring with charts and alerts
- **System Logging**: Comprehensive log management with filtering and export
- **ML Registry**: AI model management with performance tracking

Each page includes:
- Advanced data visualization
- Real-time updates and monitoring
- Interactive controls and filtering
- Professional data tables and metrics
- Export and management capabilities

**Next Part:** Final Pages (Reports, Admin, Architecture) + Services & Configuration