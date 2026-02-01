# MA-IDS - الجزء 5: الميزات المتقدمة
## Advanced Features & AI Integration

---

## 🧠 1. نظام التعلم الآلي - ML Registry

### إدارة نماذج الذكاء الاصطناعي
- **سجل النماذج**: تتبع جميع نماذج التعلم الآلي المستخدمة
- **مراقبة الأداء**: مؤشرات الدقة، الاستدعاء، وF1-Score
- **إدارة الإصدارات**: تتبع إصدارات النماذج وتاريخ التدريب
- **التنبيهات التلقائية**: إشعارات عند انخفاض الأداء

### واجهة إدارة النماذج
```jsx
export default function MLRegistry() {
  const [models, setModels] = useState(mockModels);
  const [selectedModel, setSelectedModel] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/20';
      case 'training': return 'text-amber-400 bg-amber-500/20';
      case 'inactive': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">ML Model Registry</h1>
          <p className="text-slate-400 mt-1">Manage and monitor AI models</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg">
          Add New Model
        </button>
      </div>

      {/* إحصائيات النماذج */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Models</p>
              <p className="text-2xl font-bold text-slate-100">{models.length}</p>
            </div>
            <Brain className="w-6 h-6 text-slate-400" />
          </div>
        </GlassCard>
        {/* المزيد من الإحصائيات */}
      </div>

      {/* شبكة النماذج */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model) => (
          <GlassCard key={model.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <Target className="w-4 h-4" />
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

            {/* مقاييس الأداء */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Accuracy</p>
                  <p className="text-lg font-semibold text-slate-100">
                    {(model.accuracy * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Last Trained</p>
                  <p className="text-sm text-slate-100">{model.lastTrained}</p>
                </div>
              </div>

              {/* مقاييس مفصلة */}
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
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
```

---

## 📋 2. نظام التقارير - Reports System

### أنواع التقارير المتاحة
- **تقرير الأمان الشهري**: نظرة شاملة على التهديدات والحوادث
- **تحليل حركة الشبكة**: أنماط البيانات والشذوذ
- **تقييم الثغرات**: الثغرات الأمنية والتوصيات
- **تقرير الامتثال**: الامتثال للمعايير الأمنية

### إنشاء التقارير التلقائي
```jsx
export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [activeTab, setActiveTab] = useState('reports');

  const generateReport = (templateId) => {
    const template = reportTemplates.find(t => t.id === templateId);
    const newReport = {
      id: reports.length + 1,
      title: template.name,
      type: templateId.split('-')[0],
      period: 'Current Period',
      generated: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'processing',
      size: 'N/A',
      downloads: 0,
      summary: getDefaultSummary(templateId.split('-')[0])
    };
    setReports([newReport, ...reports]);
  };

  return (
    <div className="space-y-6">
      {/* تبويبات التقارير */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Reports</h1>
          <p className="text-slate-400 mt-1">Generate and manage security reports</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('templates')}
            className={cn("px-4 py-2 rounded-lg", activeTab === 'templates' ? "bg-emerald-600" : "bg-slate-800/50")}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={cn("px-4 py-2 rounded-lg", activeTab === 'reports' ? "bg-emerald-600" : "bg-slate-800/50")}
          >
            Generated Reports
          </button>
        </div>
      </div>

      {activeTab === 'templates' && (
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
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg"
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
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.map((report) => (
            <GlassCard key={report.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg border", getTypeColor(report.type))}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{report.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-slate-400">{report.period}</span>
                      <span className="text-sm text-slate-400">Generated: {report.generated}</span>
                      <span className="text-sm text-slate-400">Size: {report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(report.status))}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-400">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 📊 3. نظام السجلات - Logging System

### ميزات السجلات المتقدمة
- **تسجيل فوري**: جميع الأحداث الأمنية في الوقت الفعلي
- **تصفية متقدمة**: البحث حسب المستوى، المصدر، والمحتوى
- **تصدير السجلات**: حفظ السجلات بتنسيقات مختلفة
- **إحصائيات السجلات**: تحليل أنماط الأحداث

### واجهة إدارة السجلات
```jsx
export default function Syslog() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="space-y-6">
      {/* رأس الصفحة مع التحكم في التسجيل */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">System Logs</h1>
          <p className="text-slate-400 mt-1">Real-time system logging and monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={cn("flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
              isPaused ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700"
            )}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse")} />
            <span className="text-sm text-slate-300">{isPaused ? 'Paused' : 'Live'}</span>
          </div>
        </div>
      </div>

      {/* أدوات التحكم في التصفية */}
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
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>
          </div>

          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100">
            <option value="all">All Levels</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="info">Info</option>
          </select>

          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100">
            <option value="all">All Sources</option>
            <option value="firewall">Firewall</option>
            <option value="ids">IDS</option>
            <option value="scanner">Scanner</option>
          </select>

          <div className="flex gap-2">
            <button onClick={exportLogs} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-slate-300 hover:bg-slate-800/70">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={clearLogs} className="flex items-center gap-2 px-3 py-2 bg-red-600/20 rounded-lg text-red-400 hover:bg-red-600/30">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
        </div>
      </GlassCard>

      {/* عرض السجلات */}
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
              <div key={log.id} className={cn("p-4 rounded-lg border", getLevelColor(log.level))}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getLevelIcon(log.level)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 font-mono">{log.timestamp}</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded uppercase font-medium">{log.source}</span>
                    </div>
                    <p className="text-sm text-slate-100 mb-1">{log.message}</p>
                    <p className="text-xs text-slate-400">{log.details}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
```

---

## 👥 4. نظام الإدارة - Admin Panel

### إدارة المستخدمين والصلاحيات
- **إضافة/حذف المستخدمين**: إدارة حسابات المستخدمين
- **إدارة الأدوار**: تخصيص الصلاحيات حسب الدور
- **مراقبة النشاط**: تتبع نشاط المستخدمين
- **إعدادات النظام**: تكوين إعدادات الأمان

### واجهة الإدارة
```jsx
export default function Admin() {
  const [users, setUsers] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState('users');

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* تبويبات الإدارة */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Administration</h1>
          <p className="text-slate-400 mt-1">Manage users, settings, and system configuration</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('users')}
            className={cn("px-4 py-2 rounded-lg", activeTab === 'users' ? "bg-emerald-600" : "bg-slate-800/50")}>
            <Users className="w-4 h-4 inline mr-2" /> Users
          </button>
          <button onClick={() => setActiveTab('settings')}
            className={cn("px-4 py-2 rounded-lg", activeTab === 'settings' ? "bg-emerald-600" : "bg-slate-800/50")}>
            <Settings className="w-4 h-4 inline mr-2" /> Settings
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* قائمة المستخدمين */}
          {users.map((user) => (
            <GlassCard key={user.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-slate-100">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{user.name}</h3>
                    <p className="text-slate-400">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium border", getRoleColor(user.role))}>
                        {user.role}
                      </span>
                      <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(user.status))}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-sm text-slate-400">
                    <p>Last Login</p>
                    <p>{user.lastLogin}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-100">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => toggleUserStatus(user.id)}
                      className={cn("p-2 transition-colors",
                        user.status === 'active' ? "text-emerald-400 hover:text-emerald-300" : "text-slate-400 hover:text-slate-300"
                      )}>
                      {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* إعدادات النظام */}
          {systemSettings.map((setting) => {
            const IconComponent = setting.icon;
            return (
              <GlassCard key={setting.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-lg", setting.status === 'configured' ? "bg-emerald-600/20" : "bg-amber-600/20")}>
                    <IconComponent className={cn("w-6 h-6", getSettingStatusColor(setting.status))} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{setting.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{setting.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm font-medium", getSettingStatusColor(setting.status))}>
                        {setting.status.charAt(0).toUpperCase() + setting.status.slice(1)}
                      </span>
                      <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm rounded">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

---

**المتابعة للجزء 6: الخاتمة والتطبيقات**