# MA-IDS (Mubarak Alnassi Intrusion Detection System)

A comprehensive Intrusion Detection System built with React, featuring machine learning capabilities, firewall management, traffic analysis, and real-time monitoring.

## Project Structure

```
MA-IDS-FULL-FINAL/
├── src/
│   ├── api/
│   │   └── base44Client.js          # Base44 SDK client configuration
│   ├── components/
│   │   ├── ids/                     # IDS-specific UI components
│   │   │   ├── GlassCard.jsx        # Glass morphism card component
│   │   │   ├── Sidebar.jsx          # Main navigation sidebar
│   │   │   ├── DataTable.jsx        # Data table component
│   │   │   ├── KPIMetrics.jsx       # KPI metrics display
│   │   │   ├── LiveViolations.jsx   # Real-time violation notifications
│   │   │   ├── MetricCard.jsx       # Metric display card
│   │   │   ├── PanicButton.jsx      # Emergency lockdown button
│   │   │   ├── PythonAgentCode.jsx  # Python agent code display
│   │   │   ├── StatusBadge.jsx      # Status indicator badges
│   │   │   ├── TerminalWindow.jsx   # Terminal output display
│   │   │   ├── WorkflowDiagram.jsx  # System workflow visualization
│   │   │   └── DatasetVisualizer.jsx # Dataset visualization
│   │   ├── ui/                      # Reusable UI components (shadcn/ui)
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── input.jsx
│   │   │   ├── table.jsx
│   │   │   ├── tabs.jsx
│   │   │   ├── toast.jsx
│   │   │   ├── progress.jsx
│   │   │   ├── badge.jsx
│   │   │   └── ... (other shadcn components)
│   │   └── UserNotRegisteredError.jsx # User registration error page
│   ├── hooks/
│   │   └── use-mobile.jsx           # Mobile device detection hook
│   ├── lib/
│   │   ├── utils.js                 # Utility functions
│   │   ├── query-client.js          # React Query client
│   │   ├── app-params.js            # Application parameters
│   │   ├── AuthContext.jsx          # Authentication context
│   │   ├── NavigationTracker.jsx    # Navigation tracking
│   │   └── PageNotFound.jsx         # 404 page component
│   ├── pages/                       # Main application pages
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Firewall.jsx             # Firewall management
│   │   ├── Scanner.jsx              # Security scanner
│   │   ├── Traffic.jsx              # Traffic analysis
│   │   ├── Syslog.jsx               # System logs
│   │   ├── MLRegistry.jsx           # Machine learning models
│   │   ├── Reports.jsx              # Forensic reports
│   │   ├── Admin.jsx                # Administration panel
│   │   └── Architecture.jsx         # System architecture
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   ├── index.css                    # Global styles
│   ├── Layout.jsx                   # Main layout wrapper
│   └── pages.config.js              # Page routing configuration
├── entities/                        # Data entity schemas
│   ├── FirewallRule.json
│   ├── SecurityEvent.json
│   └── SystemConfig.json
├── agent/                           # Python agent code
│   └── ma_ids_agent.py
├── backend/                         # Backend server
│   ├── package.json
│   └── server.js
├── package.json                     # Frontend dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── jsconfig.json                    # JavaScript configuration
├── eslint.config.js                 # ESLint configuration
├── components.json                  # shadcn/ui configuration
├── index.html                       # HTML entry point
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## Features

### Core IDS Functionality
- **Real-time Threat Detection**: Machine learning-powered anomaly detection
- **Firewall Management**: Dynamic rule creation and management
- **Traffic Analysis**: Network traffic monitoring and visualization
- **Security Scanner**: Automated vulnerability scanning
- **Syslog Integration**: Centralized logging and monitoring

### Machine Learning Components
- **ML Model Registry**: Manage and deploy ML models
- **Dataset Visualization**: Interactive data exploration
- **Confidence Scoring**: ML-based threat confidence metrics

### User Interface
- **Glass Morphism Design**: Modern, translucent UI components
- **Real-time Notifications**: Live violation alerts
- **Interactive Dashboards**: Comprehensive system monitoring
- **Responsive Design**: Mobile-friendly interface

### Administration
- **System Configuration**: Centralized settings management
- **User Management**: Authentication and authorization
- **Panic Mode**: Emergency lockdown functionality
- **Forensic Reports**: Detailed incident analysis

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Recharts**: Data visualization
- **React Query**: Data fetching and caching

### Backend Integration
- **Base44 SDK**: Backend-as-a-Service platform
- **WebSocket**: Real-time communication
- **REST APIs**: Standard HTTP communication

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Type checking (configured)
- **shadcn/ui**: Component library

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file:
   ```
   VITE_BASE44_APP_ID=your_app_id
   VITE_BASE44_APP_BASE_URL=your_backend_url
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Key Components

### IDS Components (`src/components/ids/`)
- **GlassCard**: Reusable glass morphism container
- **Sidebar**: Main navigation with collapsible design
- **KPIMetrics**: Key performance indicators display
- **LiveViolations**: Real-time security alerts
- **TerminalWindow**: Command-line interface simulation

### Pages (`src/pages/`)
- **Dashboard**: System overview and metrics
- **Firewall**: Rule management interface
- **Scanner**: Security scanning tools
- **Traffic**: Network traffic analysis
- **MLRegistry**: Machine learning model management

### Entities (`entities/`)
JSON schemas defining data structures for:
- Firewall rules
- Security events
- System configurations

## Architecture

The system follows a modular architecture with:
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Component Reusability**: Shared components across different pages
- **State Management**: React Query for server state, Context API for global state
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Security Features

- **Authentication**: Base44-powered user authentication
- **Authorization**: Role-based access control
- **Real-time Monitoring**: Live threat detection and alerting
- **Audit Logging**: Comprehensive activity tracking
- **Emergency Controls**: Panic mode for critical situations

## Contributing

1. Follow the established project structure
2. Use TypeScript for type safety (when applicable)
3. Follow ESLint rules and Prettier formatting
4. Test components thoroughly
5. Document new features and APIs

## License

This project is part of the MA-IDS system developed by Mubarak Alnassi.