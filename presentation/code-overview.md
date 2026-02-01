# MA-IDS Code Overview

## Project Structure & Code Explanation

### Core Application (`src/`)

#### `src/App.jsx`
**Purpose:** Main application component that handles routing, authentication, and overall app structure.

**Key Functionality:**
- Sets up React Router for navigation
- Provides authentication context
- Renders authenticated app with proper error handling
- Manages user registration errors

**Main Code:**
```jsx
const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoadingAuth || isLoadingPublicSettings) {
    return <LoadingSpinner />;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
  }

  // Render main app with routes
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* Other routes */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
```

#### `src/Layout.jsx`
**Purpose:** Application layout wrapper providing consistent navigation and glass morphism styling.

**Key Functionality:**
- Renders sidebar navigation
- Applies glass card styling to content
- Handles responsive design
- Provides consistent UI structure

**Main Code:**
```jsx
const Layout = ({ children, currentPageName }) => (
  <div className="min-h-screen bg-slate-950">
    <Sidebar currentPage={currentPageName} />
    <main className="ml-64 p-6">
      <GlassCard className="min-h-[calc(100vh-3rem)]">
        {children}
      </GlassCard>
    </main>
  </div>
);
```

#### `src/pages.config.js`
**Purpose:** Configuration file defining all application pages and their routing.

**Key Functionality:**
- Exports page components and layout
- Defines main page for dashboard
- Centralizes page management

**Main Code:**
```javascript
export const pagesConfig = {
  Pages: {
    dashboard: Dashboard,
    firewall: Firewall,
    scanner: Scanner,
    // ... other pages
  },
  Layout: Layout,
  mainPage: 'dashboard'
};
```

### Components (`src/components/`)

#### `src/components/ids/GlassCard.jsx`
**Purpose:** Reusable glass morphism card component for consistent UI design.

**Key Functionality:**
- Provides backdrop blur effect
- Customizable styling with Tailwind classes
- Supports animation and responsive design

**Main Code:**
```jsx
export default function GlassCard({ children, className, animate = true }) {
  return (
    <div
      className={cn(
        "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4",
        "shadow-xl shadow-black/20",
        animate && "animate-fade-in",
        className
      )}
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  );
}
```

#### `src/components/ids/Sidebar.jsx`
**Purpose:** Navigation sidebar with menu items and active state management.

**Key Functionality:**
- Displays navigation menu
- Highlights current page
- Handles navigation between pages
- Responsive design for mobile

**Main Code:**
```jsx
const Sidebar = ({ currentPage }) => (
  <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl">
    <div className="p-6">
      <h1 className="text-xl font-bold text-white">MA-IDS</h1>
    </div>
    <nav className="px-4">
      {menuItems.map(item => (
        <Link
          key={item.id}
          to={item.path}
          className={cn(
            "block px-4 py-2 rounded-lg mb-2",
            currentPage === item.id ? "bg-blue-600" : "hover:bg-slate-800"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
);
```

#### `src/components/ids/KPIMetrics.jsx`
**Purpose:** Key Performance Indicator metrics display component.

**Key Functionality:**
- Shows security metrics (threats, alerts, uptime)
- Displays data in cards with icons
- Updates in real-time

**Main Code:**
```jsx
const KPIMetrics = ({ metrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {metrics.map(metric => (
      <GlassCard key={metric.id}>
        <div className="flex items-center space-x-4">
          <metric.icon className="w-8 h-8 text-blue-400" />
          <div>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
            <p className="text-slate-400">{metric.label}</p>
          </div>
        </div>
      </GlassCard>
    ))}
  </div>
);
```

### Pages (`src/pages/`)

#### `src/pages/Dashboard.jsx`
**Purpose:** Main dashboard displaying real-time security metrics and system status.

**Key Functionality:**
- Shows KPI metrics and system health
- Displays activity feed and recent alerts
- Interactive charts for security data
- Real-time updates

**Main Code:**
```jsx
const Dashboard = () => {
  const metrics = [
    { id: 'threats', label: 'Active Threats', value: '12', icon: Shield },
    { id: 'alerts', label: 'Total Alerts', value: '1,247', icon: AlertTriangle },
    { id: 'uptime', label: 'System Uptime', value: '99.9%', icon: Activity }
  ];

  return (
    <div className="space-y-6">
      <KPIMetrics metrics={metrics} />
      <ActivityFeed />
      <SecurityCharts />
    </div>
  );
};
```

#### `src/pages/Firewall.jsx`
**Purpose:** Firewall management interface for rule configuration and monitoring.

**Key Functionality:**
- Lists firewall rules
- Allows adding/editing rules
- Shows rule status and statistics
- Real-time monitoring

**Main Code:**
```jsx
const Firewall = () => {
  const [rules, setRules] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Firewall Rules</h1>
        <Button>Add Rule</Button>
      </div>
      <div className="grid gap-4">
        {rules.map(rule => (
          <GlassCard key={rule.id}>
            <FirewallRuleItem rule={rule} />
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
```

#### `src/pages/Scanner.jsx`
**Purpose:** Security scanner interface for running different types of security scans.

**Key Functionality:**
- Multiple scan types (network, vulnerability, malware)
- Scan configuration and scheduling
- Results display with severity levels
- Progress tracking

**Main Code:**
```jsx
const Scanner = () => {
  const [scans, setScans] = useState([]);

  const runScan = (type) => {
    // Start scan logic
    const newScan = { id: Date.now(), type, status: 'running' };
    setScans([...scans, newScan]);
  };

  return (
    <div className="space-y-6">
      <ScanControls onScan={runScan} />
      <ScanResults scans={scans} />
    </div>
  );
};
```

#### `src/pages/Traffic.jsx`
**Purpose:** Network traffic analysis with interactive charts and monitoring.

**Key Functionality:**
- Real-time traffic visualization
- Protocol breakdown charts
- Bandwidth monitoring
- Anomaly detection

**Main Code:**
```jsx
const Traffic = () => {
  const trafficData = [
    { time: '00:00', bytes: 1200 },
    { time: '01:00', bytes: 1800 },
    // ... more data
  ];

  return (
    <div className="space-y-6">
      <TrafficChart data={trafficData} />
      <ProtocolBreakdown />
      <AnomalyAlerts />
    </div>
  );
};
```

#### `src/pages/Syslog.jsx`
**Purpose:** System logging interface with filtering and export capabilities.

**Key Functionality:**
- Real-time log streaming
- Advanced filtering options
- Log export functionality
- Log level management

**Main Code:**
```jsx
const Syslog = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(log =>
    log.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <LogFilters filter={filter} onFilterChange={setFilter} />
      <LogViewer logs={filteredLogs} />
      <ExportControls />
    </div>
  );
};
```

#### `src/pages/MLRegistry.jsx`
**Purpose:** Machine Learning model registry for managing AI models and performance tracking.

**Key Functionality:**
- Model listing and versioning
- Performance metrics display
- Model training status
- Model deployment controls

**Main Code:**
```jsx
const MLRegistry = () => {
  const models = [
    { name: 'Threat Detector v1.2', accuracy: 0.94, status: 'active' },
    { name: 'Anomaly Detector v2.0', accuracy: 0.87, status: 'training' }
  ];

  return (
    <div className="space-y-6">
      <ModelList models={models} />
      <PerformanceCharts />
      <TrainingControls />
    </div>
  );
};
```

#### `src/pages/Reports.jsx`
**Purpose:** Automated security reporting system with customizable reports.

**Key Functionality:**
- Report generation and scheduling
- Multiple report types
- Data export options
- Report history

**Main Code:**
```jsx
const Reports = () => {
  const [reports, setReports] = useState([]);

  const generateReport = (type) => {
    const newReport = {
      id: Date.now(),
      type,
      status: 'generating',
      createdAt: new Date()
    };
    setReports([...reports, newReport]);
  };

  return (
    <div className="space-y-6">
      <ReportGenerator onGenerate={generateReport} />
      <ReportHistory reports={reports} />
    </div>
  );
};
```

#### `src/pages/Admin.jsx`
**Purpose:** User administration interface with role-based access control.

**Key Functionality:**
- User management (add, edit, delete)
- Role assignment
- Permission management
- Audit logging

**Main Code:**
```jsx
const Admin = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="space-y-6">
      <UserManagement users={users} onUpdate={setUsers} />
      <RoleManagement />
      <AuditLogs />
    </div>
  );
};
```

#### `src/pages/Architecture.jsx`
**Purpose:** System architecture visualization showing component relationships and data flow.

**Key Functionality:**
- Visual component diagram
- Data flow representation
- System topology
- Component status

**Main Code:**
```jsx
const Architecture = () => {
  const components = [
    { name: 'Frontend', type: 'ui', status: 'active' },
    { name: 'Backend API', type: 'service', status: 'active' },
    { name: 'ML Engine', type: 'ai', status: 'active' }
  ];

  return (
    <div className="space-y-6">
      <SystemDiagram components={components} />
      <DataFlowVisualization />
      <ComponentStatus />
    </div>
  );
};
```

### Libraries (`src/lib/`)

#### `src/lib/AuthContext.jsx`
**Purpose:** Authentication context provider for managing user authentication state.

**Key Functionality:**
- User authentication state management
- Login/logout handling
- Error state management
- Authentication persistence

**Main Code:**
```jsx
export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState(null);

  const value = {
    isLoadingAuth,
    authError,
    navigateToLogin: () => {/* login logic */},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### `src/lib/query-client.js`
**Purpose:** React Query client configuration for data fetching and caching.

**Key Functionality:**
- API data caching
- Background refetching
- Error handling
- Query invalidation

**Main Code:**
```javascript
export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

#### `src/lib/utils.js`
**Purpose:** Utility functions for common operations.

**Key Functionality:**
- Class name merging (cn function)
- Date formatting
- Data transformation helpers

**Main Code:**
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### API (`src/api/`)

#### `src/api/base44Client.js`
**Purpose:** Base44 SDK client configuration for backend communication.

**Key Functionality:**
- API endpoint configuration
- Authentication headers
- Request/response interceptors
- Error handling

**Main Code:**
```javascript
import { Base44 } from '@base44/sdk';

export const base44Client = new Base44({
  baseURL: import.meta.env.VITE_BASE44_APP_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

### Hooks (`src/hooks/`)

#### `src/hooks/use-mobile.jsx`
**Purpose:** Custom hook for detecting mobile device screen size.

**Key Functionality:**
- Responsive breakpoint detection
- Mobile-specific behavior
- Screen size monitoring

**Main Code:**
```jsx
import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
```

### Agent (`agent/`)

#### `agent/ma_ids_agent.py`
**Purpose:** Python ML agent for threat detection and analysis.

**Key Functionality:**
- Machine learning model training
- Real-time threat prediction
- Anomaly detection algorithms
- Model performance monitoring

**Main Code:**
```python
class MAIDS_Agent:
    def __init__(self):
        self.model = self.load_model()

    def predict_threat(self, data):
        """Predict if data contains security threat"""
        prediction = self.model.predict(data)
        return prediction > 0.5

    def train_model(self, training_data):
        """Train ML model on security data"""
        self.model.fit(training_data)
        return self.model.score(training_data)
```

### Backend (`backend/`)

#### `backend/server.js`
**Purpose:** Node.js backend server for API endpoints and data processing.

**Key Functionality:**
- REST API endpoints
- Data processing and validation
- Integration with ML agent
- Security middleware

**Main Code:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Security endpoints
app.get('/api/threats', (req, res) => {
  // Fetch threats from database
  res.json({ threats: [] });
});

app.post('/api/scan', (req, res) => {
  // Run security scan
  res.json({ status: 'scan_started' });
});

app.listen(3000, () => {
  console.log('MA-IDS Backend running on port 3000');
});
```

### Entities (`entities/`)

#### `entities/SecurityEvent.json`
**Purpose:** Data schema for security events and incidents.

**Key Functionality:**
- Defines event structure
- Validation rules
- Database mapping

**Main Code:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "type": { "type": "string", "enum": ["threat", "alert", "scan"] },
    "severity": { "type": "string", "enum": ["low", "medium", "high", "critical"] },
    "description": { "type": "string" },
    "source": { "type": "string" }
  },
  "required": ["id", "timestamp", "type", "severity"]
}
```

## Configuration Files

### `package.json`
**Purpose:** Node.js project configuration and dependencies.

**Key Functionality:**
- Project metadata
- Dependency management
- Build scripts
- Project scripts

### `vite.config.js`
**Purpose:** Vite build tool configuration.

**Key Functionality:**
- Build optimization
- Development server setup
- Plugin configuration
- Path aliases

### `tailwind.config.js`
**Purpose:** Tailwind CSS configuration for styling.

**Key Functionality:**
- Custom color palette
- Component styling
- Responsive breakpoints
- Plugin integration

### `components.json`
**Purpose:** shadcn/ui component configuration.

**Key Functionality:**
- Component library setup
- Styling configuration
- Component paths

## Summary

The MA-IDS project is a comprehensive Intrusion Detection System built with modern web technologies. Each component serves a specific purpose in creating a robust, user-friendly security monitoring platform with real-time capabilities, machine learning integration, and advanced visualization features.