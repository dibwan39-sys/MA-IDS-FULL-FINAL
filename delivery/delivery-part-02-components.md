# MA-IDS Delivery - Part 2: Core Components
## Essential UI Components with Code & Explanations

---

## 1. GlassCard Component (`src/components/ids/GlassCard.jsx`)

**Purpose:** Reusable glass morphism card component providing consistent visual design across the application.

**Key Features:**
- Backdrop blur effect for glass morphism
- Customizable styling with Tailwind classes
- Optional animation support
- Responsive design

**Complete Code:**
```jsx
import React from 'react';
import { cn } from "@/lib/utils";  // Utility for merging CSS classes

export default function GlassCard({
  children,      // Content to display inside the card
  className,     // Additional CSS classes
  animate = true // Enable fade-in animation by default
}) {
  return (
    <div
      className={cn(
        // Base glass morphism styles
        "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4",
        "shadow-xl shadow-black/20",

        // Animation classes
        animate && "animate-fade-in",

        // Additional user classes
        className
      )}

      // Inline styles for glass effect
      style={{
        background: 'rgba(15, 23, 42, 0.8)',  // Semi-transparent background
        backdropFilter: 'blur(12px)',          // Blur effect
      }}
    >
      {children}
    </div>
  );
}
```

**Usage Example:**
```jsx
<GlassCard className="max-w-md">
  <h3 className="text-lg font-semibold text-white">Security Alert</h3>
  <p className="text-slate-300">Threat detected on network segment 192.168.1.0/24</p>
</GlassCard>
```

---

## 2. Sidebar Component (`src/components/ids/Sidebar.jsx`)

**Purpose:** Navigation sidebar with menu items and active state management for page navigation.

**Key Features:**
- Dynamic menu items from configuration
- Active page highlighting
- Responsive design for mobile
- Clean navigation structure

**Complete Code:**
```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Menu configuration - defines navigation items
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { id: 'firewall', label: 'Firewall', path: '/firewall', icon: 'Shield' },
  { id: 'scanner', label: 'Scanner', path: '/scanner', icon: 'Search' },
  { id: 'traffic', label: 'Traffic', path: '/traffic', icon: 'Activity' },
  { id: 'syslog', label: 'Syslog', path: '/syslog', icon: 'FileText' },
  { id: 'mlregistry', label: 'ML Registry', path: '/mlregistry', icon: 'Brain' },
  { id: 'reports', label: 'Reports', path: '/reports', icon: 'BarChart3' },
  { id: 'admin', label: 'Admin', path: '/admin', icon: 'Settings' },
  { id: 'architecture', label: 'Architecture', path: '/architecture', icon: 'Network' },
];

const Sidebar = ({ currentPage }) => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <h1 className="text-xl font-bold text-white">MA-IDS</h1>
        <p className="text-xs text-slate-400 mt-1">Intrusion Detection System</p>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const isActive = currentPage === item.id ||
                           (currentPage === 'dashboard' && location.pathname === '/');

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={cn(
                    // Base styles
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-slate-800/50 hover:shadow-lg",

                    // Active state
                    isActive
                      ? "bg-blue-600/20 border border-blue-500/30 text-blue-300 shadow-lg shadow-blue-500/10"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  {/* Icon placeholder - would use actual icon component */}
                  <div className="w-5 h-5 mr-3 opacity-70">
                    {/* Icon would be rendered here */}
                  </div>

                  <span className="font-medium">{item.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
        <div className="text-xs text-slate-500 text-center">
          MA-IDS v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
```

**Navigation Logic:**
```jsx
// Active page detection
const isActive = currentPage === item.id ||
               (currentPage === 'dashboard' && location.pathname === '/');
```

---

## 3. KPIMetrics Component (`src/components/ids/KPIMetrics.jsx`)

**Purpose:** Key Performance Indicator display component showing security metrics in card format.

**Key Features:**
- Dynamic metrics display
- Icon integration
- Real-time data updates
- Responsive grid layout

**Complete Code:**
```jsx
import React from 'react';
import GlassCard from './GlassCard';
import { Shield, AlertTriangle, Activity, Zap } from 'lucide-react';

// Icon mapping for different metric types
const iconMap = {
  threats: Shield,
  alerts: AlertTriangle,
  uptime: Activity,
  performance: Zap,
};

const KPIMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(metric => {
        const IconComponent = iconMap[metric.id] || Activity;

        return (
          <GlassCard key={metric.id} className="p-6">
            <div className="flex items-center justify-between">
              {/* Metric Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {metric.value}
                    </p>
                    <p className="text-sm text-slate-400">
                      {metric.label}
                    </p>
                  </div>
                </div>

                {/* Trend Indicator */}
                {metric.trend && (
                  <div className="flex items-center space-x-1">
                    <span className={cn(
                      "text-xs font-medium",
                      metric.trend > 0 ? "text-red-400" : "text-green-400"
                    )}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </span>
                    <span className="text-xs text-slate-500">vs last week</span>
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="ml-4">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  metric.status === 'critical' ? "bg-red-500 animate-pulse" :
                  metric.status === 'warning' ? "bg-yellow-500" :
                  "bg-green-500"
                )} />
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default KPIMetrics;
```

**Sample Usage:**
```jsx
const metrics = [
  {
    id: 'threats',
    label: 'Active Threats',
    value: '12',
    trend: 5.2,
    status: 'warning'
  },
  {
    id: 'alerts',
    label: 'Total Alerts',
    value: '1,247',
    trend: -2.1,
    status: 'normal'
  },
  {
    id: 'uptime',
    label: 'System Uptime',
    value: '99.9%',
    trend: 0.1,
    status: 'normal'
  },
  {
    id: 'performance',
    label: 'Performance Score',
    value: '94.2',
    trend: 1.8,
    status: 'good'
  }
];

<KPIMetrics metrics={metrics} />
```

---

## 4. Button Component (`src/components/ui/button.jsx`)

**Purpose:** Reusable button component with multiple variants and states.

**Key Features:**
- Multiple style variants (default, destructive, outline, etc.)
- Size options (default, sm, lg, icon)
- Loading states
- Accessibility support

**Complete Code:**
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Button variants using class-variance-authority
const buttonVariants = cva(
  // Base button styles
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {props.children}
    </Comp>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
```

**Usage Examples:**
```jsx
// Default button
<Button>Click me</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Loading state
<Button loading>Processing...</Button>

// Icon button
<Button variant="outline" size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

---

## 5. Utility Functions (`src/lib/utils.js`)

**Purpose:** Common utility functions used throughout the application.

**Key Functions:**
- Class name merging
- Date formatting
- Data transformation helpers

**Complete Code:**
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge and conditionally apply CSS classes
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Format number with commas
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num)
}

// Calculate percentage
export function calculatePercentage(value, total) {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

// Debounce function for search inputs
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}
```

---

## Summary of Part 2

This delivery part covers the core UI components that form the foundation of the MA-IDS interface:

- **GlassCard**: Glass morphism design system
- **Sidebar**: Navigation with active state management
- **KPIMetrics**: Security metrics display
- **Button**: Reusable button component with variants
- **Utils**: Common utility functions

These components provide:
- Consistent visual design with glass morphism effects
- Interactive navigation and state management
- Professional UI components with accessibility
- Utility functions for common operations

**Next Part:** Main Application Pages (Dashboard, Firewall, Scanner)