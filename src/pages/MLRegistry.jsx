import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, Target, BarChart3, RefreshCw, Settings, Eye, Edit, Trash2 } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockModels = [
  {
    id: 1,
    name: 'Anomaly Detection Model',
    type: 'Supervised',
    status: 'active',
    accuracy: 0.94,
    lastTrained: '2024-01-15 10:30:00',
    version: 'v2.1.3',
    dataset: 'Network Traffic Dataset',
    performance: {
      precision: 0.92,
      recall: 0.89,
      f1Score: 0.905
    },
    alerts: 2
  },
  {
    id: 2,
    name: 'DDoS Detection Model',
    type: 'Unsupervised',
    status: 'training',
    accuracy: 0.87,
    lastTrained: '2024-01-15 08:15:00',
    version: 'v1.8.2',
    dataset: 'DDoS Attack Dataset',
    performance: {
      precision: 0.85,
      recall: 0.91,
      f1Score: 0.88
    },
    alerts: 0
  },
  {
    id: 3,
    name: 'Malware Classification Model',
    type: 'Deep Learning',
    status: 'inactive',
    accuracy: 0.96,
    lastTrained: '2024-01-14 16:45:00',
    version: 'v3.0.1',
    dataset: 'Malware Signatures',
    performance: {
      precision: 0.95,
      recall: 0.94,
      f1Score: 0.945
    },
    alerts: 1
  },
  {
    id: 4,
    name: 'Behavioral Analysis Model',
    type: 'Reinforcement',
    status: 'active',
    accuracy: 0.89,
    lastTrained: '2024-01-15 12:00:00',
    version: 'v1.5.0',
    dataset: 'User Behavior Dataset',
    performance: {
      precision: 0.87,
      recall: 0.92,
      f1Score: 0.895
    },
    alerts: 0
  }
];

export default function MLRegistry() {
  const [models, setModels] = useState(mockModels);
  const [selectedModel, setSelectedModel] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('accuracy');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'training': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'inactive': return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'training': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'inactive': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Supervised': return <Target className="w-4 h-4" />;
      case 'Unsupervised': return <BarChart3 className="w-4 h-4" />;
      case 'Deep Learning': return <Brain className="w-4 h-4" />;
      case 'Reinforcement': return <Zap className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const filteredModels = models.filter(model => {
    if (filter === 'all') return true;
    return model.status === filter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'accuracy': return b.accuracy - a.accuracy;
      case 'name': return a.name.localeCompare(b.name);
      case 'lastTrained': return new Date(b.lastTrained).getTime() - new Date(a.lastTrained).getTime();
      default: return 0;
    }
  });

  const overallStats = {
    total: models.length,
    active: models.filter(m => m.status === 'active').length,
    training: models.filter(m => m.status === 'training').length,
    avgAccuracy: (models.reduce((sum, m) => sum + m.accuracy, 0) / models.length * 100).toFixed(1),
    totalAlerts: models.reduce((sum, m) => sum + m.alerts, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">ML Model Registry</h1>
          <p className="text-slate-400 mt-1">Manage and monitor machine learning models</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Brain className="w-4 h-4" />
          Add New Model
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Models</p>
              <p className="text-2xl font-bold text-slate-100">{overallStats.total}</p>
            </div>
            <Brain className="w-6 h-6 text-slate-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Models</p>
              <p className="text-2xl font-bold text-emerald-400">{overallStats.active}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Training</p>
              <p className="text-2xl font-bold text-amber-400">{overallStats.training}</p>
            </div>
            <RefreshCw className="w-6 h-6 text-amber-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avg Accuracy</p>
              <p className="text-2xl font-bold text-blue-400">{overallStats.avgAccuracy}%</p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Alerts</p>
              <p className="text-2xl font-bold text-red-400">{overallStats.totalAlerts}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </GlassCard>
      </div>

      {/* Controls */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Models</option>
            <option value="active">Active</option>
            <option value="training">Training</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="accuracy">Sort by Accuracy</option>
            <option value="name">Sort by Name</option>
            <option value="lastTrained">Sort by Last Trained</option>
          </select>
        </div>
      </GlassCard>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModels.map((model) => (
          <GlassCard key={model.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  {getTypeIcon(model.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{model.name}</h3>
                  <p className="text-sm text-slate-400">{model.type} • {model.version}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border",
                getStatusColor(model.status)
              )}>
                {getStatusIcon(model.status)}
                {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Accuracy</p>
                  <p className="text-lg font-semibold text-slate-100">
                    {(model.accuracy * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Dataset</p>
                  <p className="text-sm text-slate-100">{model.dataset}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Precision</p>
                  <p className="text-sm font-medium text-slate-100">
                    {(model.performance.precision * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Recall</p>
                  <p className="text-sm font-medium text-slate-100">
                    {(model.performance.recall * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">F1-Score</p>
                  <p className="text-sm font-medium text-slate-100">
                    {(model.performance.f1Score * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                <div className="text-xs text-slate-400">
                  Last trained: {model.lastTrained}
                </div>
                <div className="flex items-center gap-2">
                  {model.alerts > 0 && (
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <AlertTriangle className="w-3 h-3" />
                      {model.alerts} alert{model.alerts > 1 ? 's' : ''}
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button className="p-1 text-slate-400 hover:text-slate-100 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-100 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Model Details Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Model Details</h2>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Accuracy</span>
                        <span className="text-slate-100 font-medium">
                          {(selectedModel.accuracy * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Precision</span>
                        <span className="text-slate-100 font-medium">
                          {(selectedModel.performance.precision * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Recall</span>
                        <span className="text-slate-100 font-medium">
                          {(selectedModel.performance.recall * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">F1-Score</span>
                        <span className="text-slate-100 font-medium">
                          {(selectedModel.performance.f1Score * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Model Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400">Name:</span>
                        <span className="text-slate-100 ml-2">{selectedModel.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Type:</span>
                        <span className="text-slate-100 ml-2">{selectedModel.type}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Version:</span>
                        <span className="text-slate-100 ml-2">{selectedModel.version}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status:</span>
                        <span className="text-slate-100 ml-2 capitalize">{selectedModel.status}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Dataset:</span>
                        <span className="text-slate-100 ml-2">{selectedModel.dataset}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Last Trained:</span>
                        <span className="text-slate-100 ml-2">{selectedModel.lastTrained}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    Retrain Model
                  </button>
                  <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors">
                    View Logs
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Delete Model
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}