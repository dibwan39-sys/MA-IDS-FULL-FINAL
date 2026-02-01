import React from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">404</h1>
            <h2 className="text-xl font-semibold text-slate-300">Page Not Found</h2>
            <p className="text-slate-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default PageNotFound;