import React from 'react';
import { cn } from "@/lib/utils";

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