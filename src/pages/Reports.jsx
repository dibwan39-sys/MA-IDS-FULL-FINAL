import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, TrendingUp, Shield, AlertTriangle, BarChart3, PieChart, LineChart, Filter, Search, Eye, Printer, Settings } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockReports = [
  {
    id: 1,
    title: 'Monthly Security Summary',
    type: 'security',
    period: 'January 2024',
    generated: '2024-01-15 09:00:00',
    status: 'completed',
    size: '2.4 MB',
    downloads: 12,
    summary: {
      totalIncidents: 247,
      blockedAttacks: 189,
      falsePositives: 23,
      responseTime: '4.2s'
    }
  },
  {
    id: 2,
    title: 'Network Traffic Analysis',
    type: 'traffic',
    period: 'Last 7 days',
    generated: '2024-01-14 16:30:00',
    status: 'completed',
    size: '1.8 MB',
    downloads: 8,
    summary: {
      totalPackets: 1542000,
      suspiciousPackets: 2340,
      bandwidthUsage: '45.2 GB',
      peakHour: '14:00-15:00'
    }
  },
  {
    id: 3,
    title: 'Vulnerability Assessment Report',
    type: 'vulnerability',
    period: 'Q4 2023',
    generated: '2024-01-10 11:15:00',
    status: 'completed',
    size: '3.1 MB',
    downloads: 15,
    summary: {
      criticalVulns: 3,
      highVulns: 12,
      mediumVulns: 28,
      patchedVulns: 35
    }
  },
  {
    id: 4,
    title: 'Compliance Audit Report',
    type: 'compliance',
    period: 'December 2023',
    generated: '2024-01-05 14:20:00',
    status: 'processing',
    size: 'N/A',
    downloads: 0,
    summary: {
      complianceScore: 94,
      failedChecks: 5,
      totalChecks: 156,
      nextAudit: '2024-03-01'
    }
  }
];

const reportTemplates = [
  {
    id: 'security-summary',
    name: 'Security Summary Report',
    description: 'Comprehensive overview of security incidents and system health',
    icon: Shield,
    frequency: 'Monthly'
  },
  {
    id: 'traffic-analysis',
    name: 'Traffic Analysis Report',
    description: 'Detailed network traffic patterns and anomalies',
    icon: BarChart3,
    frequency: 'Weekly'
  },
  {
    id: 'vulnerability-scan',
    name: 'Vulnerability Assessment',
    description: 'System vulnerabilities and remediation recommendations',
    icon: AlertTriangle,
    frequency: 'Quarterly'
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit',
    description: 'Regulatory compliance status and requirements',
    icon: FileText,
    frequency: 'Monthly'
  }
];

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('reports');

  const getTypeColor = (type) => {
    switch (type) {
      case 'security': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'traffic': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'vulnerability': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'compliance': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/20';
      case 'processing': return 'text-amber-400 bg-amber-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.type === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const generateReport = (templateId) => {
    const template = reportTemplates.find(t => t.id === templateId);
    const type = templateId.split('-')[0];
    let summary = {};

    // Provide default summary based on type
    switch (type) {
      case 'security':
        summary = {
          totalIncidents: 0,
          blockedAttacks: 0,
          falsePositives: 0,
          responseTime: 'N/A'
        };
        break;
      case 'traffic':
        summary = {
          totalPackets: 0,
          suspiciousPackets: 0,
          bandwidthUsage: 'N/A',
          peakHour: 'N/A'
        };
        break;
      case 'vulnerability':
        summary = {
          criticalVulns: 0,
          highVulns: 0,
          mediumVulns: 0,
          patchedVulns: 0
        };
        break;
      case 'compliance':
        summary = {
          complianceScore: 0,
          failedChecks: 0,
          totalChecks: 0,
          nextAudit: 'N/A'
        };
        break;
      default:
        summary = {};
    }

    const newReport = {
      id: reports.length + 1,
      title: template.name,
      type: type,
      period: 'Current Period',
      generated: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'processing',
      size: 'N/A',
      downloads: 0,
      summary: summary
    };
    setReports([newReport, ...reports]);
  };

  const downloadReport = (report) => {
    // Simulate download
    console.log(`Downloading ${report.title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Reports</h1>
          <p className="text-slate-400 mt-1">Generate and manage security reports</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('templates')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              activeTab === 'templates'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              activeTab === 'reports'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            Generated Reports
          </button>
        </div>
      </div>

      {activeTab === 'reports' && (
        <>
          {/* Controls */}
          <GlassCard className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="security">Security</option>
                <option value="traffic">Traffic</option>
                <option value="vulnerability">Vulnerability</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>
          </GlassCard>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <GlassCard key={report.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg border",
                      getTypeColor(report.type)
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{report.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-slate-400">{report.period}</span>
                        <span className="text-sm text-slate-400">Generated: {report.generated}</span>
                        <span className="text-sm text-slate-400">Size: {report.size}</span>
                        <span className="text-sm text-slate-400">Downloads: {report.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getStatusColor(report.status)
                    )}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadReport(report)}
                        disabled={report.status !== 'completed'}
                        className="p-2 text-slate-400 hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(report.summary).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-xs text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm font-medium text-slate-100">{value}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {activeTab === 'templates' && (
        <>
          {/* Report Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <GlassCard key={template.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-600/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2">{template.name}</h3>
                      <p className="text-sm text-slate-400 mb-4">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Frequency: {template.frequency}</span>
                        <button
                          onClick={() => generateReport(template.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Scheduled Reports */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Scheduled Reports</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-slate-100 font-medium">Monthly Security Summary</p>
                    <p className="text-sm text-slate-400">Next run: January 31, 2024 at 09:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded">Active</span>
                  <button className="text-slate-400 hover:text-slate-100">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-slate-100 font-medium">Weekly Traffic Analysis</p>
                    <p className="text-sm text-slate-400">Next run: January 21, 2024 at 16:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded">Active</span>
                  <button className="text-slate-400 hover:text-slate-100">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">{selectedReport.title}</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Report Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-slate-100 capitalize">{selectedReport.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Period:</span>
                      <span className="text-slate-100">{selectedReport.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Generated:</span>
                      <span className="text-slate-100">{selectedReport.generated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-slate-100 capitalize">{selectedReport.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Size:</span>
                      <span className="text-slate-100">{selectedReport.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Downloads:</span>
                      <span className="text-slate-100">{selectedReport.downloads}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Summary Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedReport.summary).map(([key, value]) => (
                      <div key={key} className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-lg font-semibold text-slate-100">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-700/50">
                <button
                  onClick={() => downloadReport(selectedReport)}
                  disabled={selectedReport.status !== 'completed'}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download Report
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors">
                  <Printer className="w-4 h-4 inline mr-2" />
                  Print
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors">
                  Share
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}