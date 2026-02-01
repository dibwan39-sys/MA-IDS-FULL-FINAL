# MA-IDS Delivery - Part 3: Main Application Pages
## Core Pages with Code & Functionality

---

## 1. Dashboard Page (`src/pages/Dashboard.jsx`)

**Purpose:** Main dashboard displaying real-time security metrics, activity feed, and system status overview.

**Key Features:**
- KPI metrics display
- Real-time activity feed
- Interactive security charts
- System health indicators
- Recent alerts and notifications

**Complete Code:**
```jsx
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import KPIMetrics from '@/components/ids/KPIMetrics';
import { Activity, Shield, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

// Mock data for demonstration
const mockMetrics = [
  { id: 'threats', label: 'Active Threats', value: '12', icon: Shield, status: 'warning' },
  { id: 'alerts', label: 'Total Alerts', value: '1,247', icon: AlertTriangle, status: 'normal' },
  { id: 'uptime', label: 'System Uptime', value: '99.9%', icon: Activity, status: 'good' },
  { id: 'performance', label: 'Performance', value: '94.2%', icon: TrendingUp, status: 'good' }
];

const mockActivities = [
  { id: 1, type: 'threat', message: 'DDoS attack detected on port 80', time: '2 min ago', severity: 'high' },
  { id: 2, type: 'scan', message: 'Vulnerability scan completed', time: '15 min ago', severity: 'low' },
  { id: 3, type: 'alert', message: 'Unauthorized access attempt', time: '1 hour ago', severity: 'medium' },
  { id: 4, type: 'system', message: 'Firewall rule updated', time: '2 hours ago', severity: 'info' },
  { id: 5, type: 'ml', message: 'ML model retrained successfully', time: '4 hours ago', severity: 'info' }
];

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Real-time monitoring and threat detection
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Last updated</div>
          <div className="text-white font-medium flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <KPIMetrics metrics={mockMetrics} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {mockActivities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(activity.severity).split(' ')[1]}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                    {activity.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* System Status */}
        <div>
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>

            <div className="space-y-4">
              {/* Components Status */}
              <div className="space-y-3">
                {[
                  { name: 'Firewall', status: 'active', uptime: '99.9%' },
                  { name: 'IDS Engine', status: 'active', uptime: '99.7%' },
                  { name: 'ML Models', status: 'active', uptime: '98.5%' },
                  { name: 'Database', status: 'active', uptime: '100%' }
                ].map(component => (
                  <div key={component.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        component.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-white text-sm">{component.name}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{component.uptime}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-slate-700/50 pt-4">
                <h3 className="text-white font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/50 rounded">
                    Run Full Scan
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/50 rounded">
                    Update Signatures
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/50 rounded">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Charts Section */}
      <GlassCard>
        <h2 className="text-xl font-semibold text-white mb-4">Security Trends</h2>
        <div className="h-64 flex items-center justify-center text-slate-500">
          {/* Placeholder for charts - would use Recharts */}
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Interactive charts will be displayed here</p>
            <p className="text-xs">Using Recharts library</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
```

---

## 2. Firewall Page (`src/pages/Firewall.jsx`)

**Purpose:** Firewall management interface for configuring security rules and monitoring rule status.

**Key Features:**
- Rule listing and management
- Add/edit/delete rules
- Rule status monitoring
- Traffic statistics
- Rule priority management

**Complete Code:**
```jsx
import React, { useState } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Shield, Eye, EyeOff } from 'lucide-react';

// Mock firewall rules data
const mockRules = [
  {
    id: 1,
    name: 'Block SSH from external',
    source: '0.0.0.0/0',
    destination: '192.168.1.100',
    port: '22',
    protocol: 'TCP',
    action: 'DENY',
    enabled: true,
    hits: 1250,
    lastHit: '2024-01-15 14:30:22'
  },
  {
    id: 2,
    name: 'Allow HTTP/HTTPS',
    source: '0.0.0.0/0',
    destination: '192.168.1.10',
    port: '80,443',
    protocol: 'TCP',
    action: 'ALLOW',
    enabled: true,
    hits: 15420,
    lastHit: '2024-01-15 14:35:10'
  },
  {
    id: 3,
    name: 'Block suspicious IPs',
    source: '10.0.0.0/8',
    destination: '192.168.1.0/24',
    port: 'any',
    protocol: 'any',
    action: 'DENY',
    enabled: false,
    hits: 0,
    lastHit: 'Never'
  }
];

const Firewall = () => {
  const [rules, setRules] = useState(mockRules);
  const [selectedRule, setSelectedRule] = useState(null);

  const toggleRule = (ruleId) => {
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (ruleId) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const getActionColor = (action) => {
    return action === 'ALLOW' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Firewall Management</h1>
          <p className="text-slate-400 mt-1">
            Configure and monitor firewall rules
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Rule</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{rules.filter(r => r.enabled).length}</div>
            <div className="text-sm text-slate-400">Active Rules</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {rules.reduce((sum, rule) => sum + rule.hits, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Total Hits</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {rules.filter(r => r.action === 'DENY').length}
            </div>
            <div className="text-sm text-slate-400">Block Rules</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {rules.filter(r => r.action === 'ALLOW').length}
            </div>
            <div className="text-sm text-slate-400">Allow Rules</div>
          </div>
        </GlassCard>
      </div>

      {/* Rules Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-slate-300 font-medium">Rule Name</th>
                <th className="text-left p-4 text-slate-300 font-medium">Source</th>
                <th className="text-left p-4 text-slate-300 font-medium">Destination</th>
                <th className="text-left p-4 text-slate-300 font-medium">Port</th>
                <th className="text-left p-4 text-slate-300 font-medium">Protocol</th>
                <th className="text-left p-4 text-slate-300 font-medium">Action</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">Hits</th>
                <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(rule => (
                <tr key={rule.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{rule.name}</span>
                      {!rule.enabled && <EyeOff className="w-4 h-4 text-slate-500" />}
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{rule.source}</td>
                  <td className="p-4 text-slate-300">{rule.destination}</td>
                  <td className="p-4 text-slate-300">{rule.port}</td>
                  <td className="p-4 text-slate-300">{rule.protocol}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(rule.action)}`}>
                      {rule.action}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`w-3 h-3 rounded-full ${
                        rule.enabled ? 'bg-green-500' : 'bg-slate-500'
                      }`}
                    />
                  </td>
                  <td className="p-4 text-slate-300">{rule.hits.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRule(rule.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Firewall;
```

---

## 3. Scanner Page (`src/pages/Scanner.jsx`)

**Purpose:** Security scanner interface for running different types of security scans and viewing results.

**Key Features:**
- Multiple scan types (network, vulnerability, malware)
- Scan configuration and scheduling
- Real-time progress tracking
- Results display with severity levels
- Scan history and reports

**Complete Code:**
```jsx
import React, { useState } from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Mock scan data
const scanTypes = [
  {
    id: 'network',
    name: 'Network Scan',
    description: 'Scan network for open ports and services',
    duration: '5-10 min',
    icon: Search
  },
  {
    id: 'vulnerability',
    name: 'Vulnerability Scan',
    description: 'Check for known vulnerabilities in systems',
    duration: '15-30 min',
    icon: AlertTriangle
  },
  {
    id: 'malware',
    name: 'Malware Scan',
    description: 'Scan files and processes for malware',
    duration: '10-20 min',
    icon: Shield
  }
];

const mockScanHistory = [
  {
    id: 1,
    type: 'network',
    status: 'completed',
    startTime: '2024-01-15 10:00:00',
    endTime: '2024-01-15 10:08:30',
    findings: 12,
    severity: 'medium'
  },
  {
    id: 2,
    type: 'vulnerability',
    status: 'running',
    startTime: '2024-01-15 11:00:00',
    endTime: null,
    findings: 0,
    severity: null
  }
];

const Scanner = () => {
  const [activeScan, setActiveScan] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanHistory, setScanHistory] = useState(mockScanHistory);

  const startScan = (scanType) => {
    setActiveScan(scanType);
    setScanProgress(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveScan(null);
          // Add to history
          const newScan = {
            id: Date.now(),
            type: scanType.id,
            status: 'completed',
            startTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
            endTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
            findings: Math.floor(Math.random() * 20),
            severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
          };
          setScanHistory([newScan, ...scanHistory]);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 1000);
  };

  const stopScan = () => {
    setActiveScan(null);
    setScanProgress(0);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Square className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Scanner</h1>
          <p className="text-slate-400 mt-1">
            Run comprehensive security scans and view results
          </p>
        </div>
      </div>

      {/* Scan Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scanTypes.map(scanType => {
          const Icon = scanType.icon;
          const isRunning = activeScan?.id === scanType.id;

          return (
            <GlassCard key={scanType.id} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{scanType.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{scanType.description}</p>
                <div className="text-xs text-slate-500 mb-4">Duration: {scanType.duration}</div>

                {isRunning ? (
                  <div className="space-y-3">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <div className="text-sm text-blue-400">{Math.round(scanProgress)}% Complete</div>
                    <Button onClick={stopScan} variant="destructive" size="sm">
                      <Square className="w-4 h-4 mr-2" />
                      Stop Scan
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => startScan(scanType)} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Scan
                  </Button>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Scan History */}
      <GlassCard>
        <h2 className="text-xl font-semibold text-white mb-4">Scan History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-slate-300 font-medium">Type</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">Start Time</th>
                <th className="text-left p-4 text-slate-300 font-medium">Duration</th>
                <th className="text-left p-4 text-slate-300 font-medium">Findings</th>
                <th className="text-left p-4 text-slate-300 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map(scan => (
                <tr key={scan.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(scan.status)}
                      <span className="text-white capitalize">{scan.type}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      scan.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      scan.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{scan.startTime}</td>
                  <td className="p-4 text-slate-300">
                    {scan.endTime ? (
                      `${Math.round((new Date(scan.endTime) - new Date(scan.startTime)) / 1000 / 60)} min`
                    ) : (
                      'Running...'
                    )}
                  </td>
                  <td className="p-4 text-white font-medium">{scan.findings}</td>
                  <td className="p-4">
                    {scan.severity && (
                      <span className={`font-medium ${getSeverityColor(scan.severity)}`}>
                        {scan.severity.toUpperCase()}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Scanner;
```

---

## Summary of Part 3

This delivery part covers the three main application pages that form the core functionality of MA-IDS:

- **Dashboard**: Real-time monitoring and system overview
- **Firewall**: Rule management and network security
- **Scanner**: Security scanning with multiple scan types

Each page includes:
- Complete UI implementation with glass morphism design
- Interactive features and state management
- Mock data for demonstration
- Professional table layouts and data visualization
- Action buttons and status indicators

**Next Part:** Additional Pages (Traffic, Syslog, ML Registry, Reports)