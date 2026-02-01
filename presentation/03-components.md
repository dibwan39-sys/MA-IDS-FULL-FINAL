# MA-IDS - الجزء 3: المكونات الأساسية
## Core Components Architecture

---

## 🏗️ هيكل المكونات

### 1. **مكون GlassCard - البطاقة الزجاجية**

```jsx
// src/components/ids/GlassCard.jsx
export default function GlassCard({ children, className, animate = true }) {
  return (
    <div className={cn(
      "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4",
      "shadow-xl shadow-black/20",
      animate && "animate-fade-in",
      className
    )}>
      {children}
    </div>
  );
}
```

**الميزات:**
- خلفية شفافة مع تأثير blur
- حدود ناعمة مع تدرجات لونية
- ظلال ثلاثية الأبعاد
- حركات دخول سلسة

### 2. **مكون Sidebar - الشريط الجانبي**

```jsx
// src/components/ids/Sidebar.jsx
export default function Sidebar() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'firewall', label: 'Firewall', icon: Shield },
    { id: 'scanner', label: 'Scanner', icon: Search },
    // ... المزيد من العناصر
  ];

  return (
    <div className="w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50">
      {/* محتوى الشريط الجانبي */}
    </div>
  );
}
```

**الميزات:**
- تنقل سريع بين الصفحات
- أيقونات واضحة لكل قسم
- حالة نشطة للصفحة الحالية
- تصميم قابل للطي

### 3. **مكون KPIMetrics - مؤشرات الأداء**

```jsx
// src/components/ids/KPIMetrics.jsx
export default function KPIMetrics() {
  const kpis = [
    {
      title: 'Total Threats Detected',
      value: '1,247',
      change: '+12%',
      icon: Shield
    },
    // ... مؤشرات أخرى
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <GlassCard key={index} className="p-4">
          {/* عرض المؤشر */}
        </GlassCard>
      ))}
    </div>
  );
}
```

**الميزات:**
- عرض مؤشرات الأداء الرئيسية
- تغييرات نسبية مع أسهم الاتجاه
- ألوان تعبيرية للحالات المختلفة
- تحديث تلقائي للبيانات

---

## 🎨 نظام التصميم

### الألوان الرئيسية
```css
/* src/index.css */
:root {
  --background: 0 0% 3.9%;      /* خلفية داكنة */
  --foreground: 0 0% 98%;       /* نص فاتح */
  --card: 0 0% 3.9%;           /* بطاقات داكنة */
  --primary: 0 0% 98%;         /* لون أساسي فاتح */
  --secondary: 0 0% 14.9%;     /* لون ثانوي */
  --accent: 0 0% 14.9%;        /* لون مميز */
}
```

### تأثيرات الزجاج
```css
.glass-effect {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

### الحركات والانتقالات
```css
/* حركات سلسة للتفاعل */
.transition-colors {
  transition: background-color 0.2s ease-in-out;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 🔧 المرافق والأدوات

### 1. **مساعدات الألوان (cn utility)**
```javascript
// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### 2. **عميل Base44 API**
```javascript
// src/api/base44Client.js
import { createClient } from '@base44/sdk';

export const base44Client = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID,
  apiKey: import.meta.env.VITE_BASE44_API_KEY
});
```

### 3. **إعداد React Query**
```javascript
// src/lib/query-client.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
```

---

## 📱 التصميم المتجاوب

### نظام الشبكة
```jsx
{/* شبكة متجاوبة للمكونات */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* المكونات تتكيف مع حجم الشاشة */}
</div>
```

### استعلامات الوسائط
```css
/* استجابة للأجهزة المختلفة */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-content { margin-left: 0; }
}

@media (min-width: 1024px) {
  .dashboard-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 🎯 أفضل الممارسات

### 1. **إعادة استخدام المكونات**
- فصل المنطق عن العرض
- استخدام props للتخصيص
- تجنب التكرار في الكود

### 2. **إدارة الحالة**
- استخدام React hooks للحالة المحلية
- React Query للبيانات الخارجية
- Context API للحالة العامة

### 3. **الأداء**
- Lazy loading للمكونات الكبيرة
- Memoization للعمليات المكلفة
- تحسين الصور والأصول

---

**المتابعة للجزء 4: الصفحات الرئيسية**