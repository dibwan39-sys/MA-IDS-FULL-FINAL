# MA-IDS - الجزء 4: الصفحات الرئيسية
## Main Application Pages

---

## 🏠 1. الصفحة الرئيسية - Dashboard

### الوظائف الأساسية
- **مؤشرات الأداء الرئيسية (KPIs)**: عرض التهديدات المكتشفة، الاتصالات النشطة، الهجمات المحظورة
- **النشاط الأخير**: قائمة بالأحداث الأمنية الأخيرة مع التوقيتات
- **حالة النظام**: مراقبة استخدام CPU، الذاكرة، وشبكة I/O
- **الإجراءات السريعة**: أزرار للفحص، عرض السجلات، خريطة الشبكة

### الكود الرئيسي
```jsx
export default function Dashboard() {
  const [systemStatus, setSystemStatus] = useState('operational');

  return (
    <div className="space-y-6">
      {/* رأس الصفحة مع حالة النظام */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time IDS monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full animate-pulse",
            systemStatus === 'operational' ? "bg-emerald-400" : "bg-red-400"
          )} />
          <span>System {systemStatus}</span>
        </div>
      </div>

      {/* مؤشرات الأداء */}
      <KPIMetrics />

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* النشاط الأخير */}
        <GlassCard className="p-6">
          <ActivityFeed />
        </GlassCard>

        {/* حالة النظام */}
        <GlassCard className="p-6">
          <SystemHealth />
        </GlassCard>
      </div>

      {/* الإجراءات السريعة */}
      <QuickActions />
    </div>
  );
}
```

---

## 🛡️ 2. صفحة الجدار الناري - Firewall

### الميزات الرئيسية
- **عرض قواعد الجدار الناري**: جدول تفاعلي مع البحث والتصفية
- **إدارة الحالة**: تفعيل/إلغاء تفعيل القواعد
- **إضافة قواعد جديدة**: نموذج لإنشاء قواعد أمنية
- **إحصائيات الأداء**: عدد الطلبات المحظورة والمسموحة

### واجهة المستخدم
```jsx
export default function Firewall() {
  const [rules, setRules] = useState(mockRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100">Firewall Rules</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg">
          Add New Rule
        </button>
      </div>

      {/* أدوات التحكم */}
      <GlassCard className="p-4">
        <div className="flex gap-4">
          <input
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-800/50 rounded-lg"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Rules</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </GlassCard>

      {/* جدول القواعد */}
      <GlassCard className="p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left">Rule Name</th>
              <th className="px-6 py-3 text-left">Source</th>
              <th className="px-6 py-3 text-left">Destination</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule) => (
              <tr key={rule.id} className="border-t border-slate-700/50">
                <td className="px-6 py-4">{rule.name}</td>
                <td className="px-6 py-4">{rule.source}</td>
                <td className="px-6 py-4">{rule.destination}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs",
                    rule.action === 'allow' ? "bg-emerald-600/20 text-emerald-400" :
                    "bg-red-600/20 text-red-400"
                  )}>
                    {rule.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRuleStatus(rule.id)}
                    className={cn(
                      "px-3 py-1 rounded text-sm",
                      rule.status === 'active' ?
                      "bg-emerald-600/20 text-emerald-400" :
                      "bg-slate-600/20 text-slate-400"
                    )}
                  >
                    {rule.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
```

---

## 🔍 3. صفحة الماسح الضوئي - Scanner

### أنواع الفحص المتاحة
- **فحص المنافذ**: كشف المنافذ المفتوحة والخدمات
- **فحص الثغرات**: البحث عن الثغرات الأمنية المعروفة
- **فحص الشبكة**: تحليل حركة الشبكة والبروتوكولات
- **فحص الملفات**: فحص الملفات بحثًا عن البرمجيات الضارة

### واجهة التحكم
```jsx
export default function Scanner() {
  const [scanType, setScanType] = useState('port');
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState([]);

  const startScan = async () => {
    setIsScanning(true);
    // منطق الفحص
    setTimeout(() => {
      setResults(mockResults);
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* إعدادات الفحص */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scan Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Scan Type</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 rounded-lg"
            >
              <option value="port">Port Scan</option>
              <option value="vulnerability">Vulnerability Scan</option>
              <option value="network">Network Scan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Target</label>
            <input
              type="text"
              placeholder="192.168.1.1 or example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={startScan}
          disabled={isScanning || !target}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </GlassCard>

      {/* نتائج الفحص */}
      {results.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Scan Results</h3>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-slate-400">{result.description}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded text-xs",
                  result.severity === 'high' ? "bg-red-600/20 text-red-400" :
                  result.severity === 'medium' ? "bg-amber-600/20 text-amber-400" :
                  "bg-green-600/20 text-green-400"
                )}>
                  {result.severity}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
```

---

## 📊 4. صفحة تحليل الشبكة - Traffic Analysis

### ميزات التحليل
- **رسوم بيانية تفاعلية**: عرض حركة البيانات مع مرور الوقت
- **جدول الاتصالات**: قائمة بالاتصالات النشطة مع التفاصيل
- **فلترة النتائج**: البحث والتصفية حسب المعايير المختلفة
- **إحصائيات الشبكة**: عرض النطاق الترددي والحزم المرسلة

### عرض البيانات
```jsx
export default function Traffic() {
  const [viewMode, setViewMode] = useState('graph');
  const [connections, setConnections] = useState(mockConnections);

  return (
    <div className="space-y-6">
      {/* أدوات التحكم */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100">Network Traffic</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('graph')}
            className={cn("px-4 py-2 rounded-lg", viewMode === 'graph' ? "bg-emerald-600" : "bg-slate-800/50")}
          >
            Graph View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn("px-4 py-2 rounded-lg", viewMode === 'table' ? "bg-emerald-600" : "bg-slate-800/50")}
          >
            Table View
          </button>
        </div>
      </div>

      {/* عرض الرسم البياني */}
      {viewMode === 'graph' && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bytes" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      )}

      {/* عرض الجدول */}
      {viewMode === 'table' && (
        <GlassCard className="p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left">Source IP</th>
                <th className="px-6 py-3 text-left">Destination IP</th>
                <th className="px-6 py-3 text-left">Protocol</th>
                <th className="px-6 py-3 text-left">Bytes</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn) => (
                <tr key={conn.id} className="border-t border-slate-700/50">
                  <td className="px-6 py-4">{conn.source}</td>
                  <td className="px-6 py-4">{conn.destination}</td>
                  <td className="px-6 py-4">{conn.protocol}</td>
                  <td className="px-6 py-4">{conn.bytes}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs",
                      conn.status === 'active' ? "bg-emerald-600/20 text-emerald-400" :
                      "bg-slate-600/20 text-slate-400"
                    )}>
                      {conn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}
    </div>
  );
}
```

---

**المتابعة للجزء 5: الميزات المتقدمة**