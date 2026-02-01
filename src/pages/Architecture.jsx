import React, { useState } from 'react';
import { Network, Server, Database, Shield, Zap, ArrowRight, Layers, Cpu, HardDrive, Globe, Lock, Eye, Settings, Activity, CheckCircle } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const architectureComponents = [
  {
    id: 'frontend',
    name: 'Frontend Layer',
    type: 'ui',
    description: 'React-based dashboard with real-time monitoring',
    technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Radix UI'],
    status: 'operational',
    icon: Globe
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    type: 'gateway',
    description: 'Centralized API management and routing',
    technologies: ['Node.js', 'Express', 'JWT', 'Rate Limiting'],
    status: 'operational',
    icon: Network
  },
  {
    id: 'ids-engine',
    name: 'IDS Engine',
    type: 'core',
    description: 'Core intrusion detection and analysis engine',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Snort'],
    status: 'operational',
    icon: Shield
  },
  {
    id: 'ml-models',
    name: 'ML Models',
    type: 'ai',
    description: 'Machine learning models for anomaly detection',
    technologies: ['TensorFlow', 'PyTorch', 'Keras', 'Jupyter'],
    status: 'training',
    icon: Cpu
  },
  {
    id: 'database',
    name: 'Database Layer',
    type: 'storage',
    description: 'Data storage and retrieval systems',
    technologies: ['PostgreSQL', 'Redis', 'Elasticsearch', 'MongoDB'],
    status: 'operational',
    icon: Database
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Logging',
    type: 'observability',
    description: 'System monitoring and centralized logging',
    technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'AlertManager'],
    status: 'operational',
    icon: Activity
  }
];

const dataFlow = [
  {
    from: 'frontend',
    to: 'api-gateway',
    description: 'User requests and dashboard data'
  },
  {
    from: 'api-gateway',
    to: 'ids-engine',
    description: 'Security analysis requests'
  },
  {
    from: 'ids-engine',
    to: 'ml-models',
    description: 'Anomaly detection and classification'
  },
  {
    from: 'ids-engine',
    to: 'database',
    description: 'Log storage and query results'
  },
  {
    from: 'monitoring',
    to: 'database',
    description: 'Metrics and logs collection'
  }
];

export default function Architecture() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  const getComponentColor = (type) => {
    switch (type) {
      case 'ui': return 'border-blue-500/30 bg-blue-500/10';
      case 'gateway': return 'border-purple-500/30 bg-purple-500/10';
      case 'core': return 'border-red-500/30 bg-red-500/10';
      case 'ai': return 'border-emerald-500/30 bg-emerald-500/10';
      case 'storage': return 'border-amber-500/30 bg-amber-500/10';
      case 'observability': return 'border-slate-500/30 bg-slate-500/10';
      default: return 'border-slate-500/30 bg-slate-500/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-emerald-400 bg-emerald-500/20';
      case 'training': return 'text-amber-400 bg-amber-500/20';
      case 'maintenance': return 'text-blue-400 bg-blue-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getConnectionPath = (from, to) => {
    const fromComponent = architectureComponents.find(c => c.id === from);
    const toComponent = architectureComponents.find(c => c.id === to);
    if (!fromComponent || !toComponent) return '';

    const fromIndex = architectureComponents.indexOf(fromComponent);
    const toIndex = architectureComponents.indexOf(toComponent);

    if (fromIndex < toIndex) {
      return `M ${fromIndex * 200 + 100} 100 Q ${(fromIndex + toIndex) * 100} 50 ${(toIndex) * 200 + 100} 100`;
    } else {
      return `M ${fromIndex * 200 + 100} 100 Q ${(fromIndex + toIndex) * 100} 150 ${(toIndex) * 200 + 100} 100`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">System Architecture</h1>
          <p className="text-slate-400 mt-1">MA-IDS system components and data flow</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode('overview')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              viewMode === 'overview'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setViewMode('flow')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              viewMode === 'flow'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            <ArrowRight className="w-4 h-4 inline mr-2" />
            Data Flow
          </button>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* System Overview */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">System Overview</h2>
            <p className="text-slate-400 mb-6">
              The MA-IDS (Mubarak Alnassi Intrusion Detection System) is a comprehensive security platform
              designed to detect, analyze, and respond to network intrusions using advanced machine learning
              techniques and real-time monitoring capabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Detection</h3>
                <p className="text-sm text-slate-400">Real-time threat detection using ML algorithms</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Analysis</h3>
                <p className="text-sm text-slate-400">Deep packet inspection and behavioral analysis</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Response</h3>
                <p className="text-sm text-slate-400">Automated incident response and alerting</p>
              </div>
            </div>
          </GlassCard>

          {/* Architecture Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureComponents.map((component) => {
              const IconComponent = component.icon;
              return (
                <div
                  key={component.id}
                  onClick={() => setSelectedComponent(component)}
                >
                  <GlassCard
                    className={cn(
                      "p-6 cursor-pointer transition-all hover:scale-105 border-2",
                      getComponentColor(component.type)
                    )}
                  >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <IconComponent className="w-6 h-6 text-slate-100" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2">{component.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">{component.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          getStatusColor(component.status)
                        )}>
                          {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                        </span>
                        <span className="text-xs text-slate-500">{component.technologies.length} tech</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                </div>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'flow' && (
        <>
          {/* Data Flow Diagram */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">Data Flow Architecture</h2>

            <div className="relative">
              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '400px' }}>
                {dataFlow.map((flow, index) => (
                  <g key={index}>
                    <path
                      d={getConnectionPath(flow.from, flow.to)}
                      stroke="rgb(34 197 94)"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      className="animate-pulse"
                    />
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="rgb(34 197 94)"
                        />
                      </marker>
                    </defs>
                  </g>
                ))}
              </svg>

              {/* Components */}
              <div className="grid grid-cols-3 gap-8 relative z-10" style={{ height: '400px' }}>
                {architectureComponents.map((component, index) => {
                  const IconComponent = component.icon;
                  return (
                    <div
                      key={component.id}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all cursor-pointer",
                        getComponentColor(component.type)
                      )}
                      style={{
                        gridColumn: (index % 3) + 1,
                        gridRow: Math.floor(index / 3) + 1,
                        alignSelf: 'center'
                      }}
                      onClick={() => setSelectedComponent(component)}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <IconComponent className="w-6 h-6 text-slate-100" />
                        </div>
                        <h4 className="text-sm font-semibold text-slate-100 mb-1">{component.name}</h4>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          getStatusColor(component.status)
                        )}>
                          {component.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Data Flow Legend */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Data Flow Legend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataFlow.map((flow, index) => {
                  const fromComponent = architectureComponents.find(c => c.id === flow.from);
                  const toComponent = architectureComponents.find(c => c.id === flow.to);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="text-sm text-slate-100">
                          {fromComponent?.name} → {toComponent?.name}
                        </p>
                        <p className="text-xs text-slate-400">{flow.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </>
      )}

      {/* Component Details Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-lg border-2",
                    getComponentColor(selectedComponent.type)
                  )}>
                    <selectedComponent.icon className="w-8 h-8 text-slate-100" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">{selectedComponent.name}</h2>
                    <span className={cn(
                      "px-3 py-1 rounded text-sm font-medium mt-2 inline-block",
                      getStatusColor(selectedComponent.status)
                    )}>
                      {selectedComponent.status.charAt(0).toUpperCase() + selectedComponent.status.slice(1)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Description</h3>
                  <p className="text-slate-400">{selectedComponent.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Technologies</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedComponent.technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-100">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Key Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-100">High availability and fault tolerance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-100">Scalable architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-100">Real-time processing capabilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-100">Comprehensive monitoring and logging</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    View Configuration
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors">
                    View Logs
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors">
                    Restart Service
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Components</p>
              <p className="text-2xl font-bold text-emerald-400">
                {architectureComponents.filter(c => c.status === 'operational').length}
              </p>
            </div>
            <Server className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Data Flows</p>
              <p className="text-2xl font-bold text-blue-400">{dataFlow.length}</p>
            </div>
            <Network className="w-6 h-6 text-blue-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">ML Models</p>
              <p className="text-2xl font-bold text-purple-400">
                {architectureComponents.filter(c => c.type === 'ai').length}
              </p>
            </div>
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Uptime</p>
              <p className="text-2xl font-bold text-emerald-400">99.9%</p>
            </div>
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}