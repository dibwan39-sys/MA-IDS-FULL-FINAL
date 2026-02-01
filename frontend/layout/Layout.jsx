
import React, { useState } from 'react';
import Sidebar from '../components/ids/Sidebar';
import { cn } from "@/lib/utils";

export default function Layout({ children, currentPageName }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar currentPage={currentPageName} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={cn("transition-all p-6", collapsed ? "ml-16" : "ml-64")}>
        {children}
      </main>
    </div>
  );
}
