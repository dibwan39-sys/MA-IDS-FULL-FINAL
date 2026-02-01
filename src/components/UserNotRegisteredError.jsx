import React from 'react';
import GlassCard from '@/components/ids/GlassCard';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const UserNotRegisteredError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">User Not Registered</h1>
            <p className="text-slate-400">
              Your user account is not registered in the system. Please contact your administrator.
            </p>
          </div>

          <Button
            onClick={handleRetry}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default UserNotRegisteredError;