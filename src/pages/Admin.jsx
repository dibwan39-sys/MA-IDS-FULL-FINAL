import React, { useState, useEffect } from 'react';
import { Users, Settings, Shield, Key, Database, Server, AlertTriangle, CheckCircle, UserPlus, UserMinus, Edit, Trash2, Eye, Lock, Unlock } from 'lucide-react';
import GlassCard from '../components/ids/GlassCard';
import { cn } from "@/lib/utils";

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15 14:30:00',
    permissions: ['read', 'write', 'delete', 'admin']
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2024-01-15 13:45:00',
    permissions: ['read', 'write']
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-01-10 09:15:00',
    permissions: ['read']
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2024-01-15 11:20:00',
    permissions: ['read', 'write']
  }
];

const systemSettings = [
  {
    id: 'security',
    name: 'Security Settings',
    description: 'Configure authentication, encryption, and access controls',
    icon: Shield,
    status: 'configured'
  },
  {
    id: 'database',
    name: 'Database Configuration',
    description: 'Manage database connections and performance settings',
    icon: Database,
    status: 'configured'
  },
  {
    id: 'network',
    name: 'Network Settings',
    description: 'Configure network monitoring and firewall rules',
    icon: Server,
    status: 'warning'
  },
  {
    id: 'logging',
    name: 'Logging Configuration',
    description: 'Set up log levels, retention policies, and storage',
    icon: Settings,
    status: 'configured'
  }
];

export default function Admin() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'analyst': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'viewer': return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/20';
      case 'inactive': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getSettingStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'error': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const addUser = (newUser) => {
    const user = {
      id: users.length + 1,
      ...newUser,
      lastLogin: 'Never',
      permissions: newUser.role === 'admin' ? ['read', 'write', 'delete', 'admin'] :
                   newUser.role === 'analyst' ? ['read', 'write'] : ['read']
    };
    setUsers([...users, user]);
    setShowAddUser(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Administration</h1>
          <p className="text-slate-400 mt-1">Manage users, settings, and system configuration</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              activeTab === 'users'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              activeTab === 'settings'
                ? "bg-emerald-600 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            )}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <>
          {/* User Management */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">User Management</h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>

          {/* Users List */}
          <div className="space-y-4">
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
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium border",
                          getRoleColor(user.role)
                        )}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          getStatusColor(user.status)
                        )}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={cn(
                          "p-2 transition-colors",
                          user.status === 'active'
                            ? "text-emerald-400 hover:text-emerald-300"
                            : "text-slate-400 hover:text-slate-300"
                        )}
                        title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-2">Permissions:</p>
                  <div className="flex gap-2">
                    {user.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-slate-800/50 text-slate-300 text-xs rounded"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <>
          {/* System Settings */}
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-6">System Configuration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systemSettings.map((setting) => {
                const IconComponent = setting.icon;
                return (
                  <GlassCard key={setting.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-lg",
                        setting.status === 'configured' ? "bg-emerald-600/20" :
                        setting.status === 'warning' ? "bg-amber-600/20" : "bg-slate-600/20"
                      )}>
                        <IconComponent className={cn(
                          "w-6 h-6",
                          getSettingStatusColor(setting.status)
                        )} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-100 mb-2">{setting.name}</h3>
                        <p className="text-sm text-slate-400 mb-4">{setting.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "text-sm font-medium",
                            getSettingStatusColor(setting.status)
                          )}>
                            {setting.status === 'configured' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                            {setting.status === 'warning' && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                            {setting.status.charAt(0).toUpperCase() + setting.status.slice(1)}
                          </span>
                          <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm rounded transition-colors">
                            Configure
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {/* System Health */}
            <GlassCard className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">System Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-400">Database</p>
                  <p className="text-lg font-semibold text-emerald-400">Healthy</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-400">API Services</p>
                  <p className="text-lg font-semibold text-emerald-400">Online</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <AlertTriangle className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="text-sm text-slate-400">Network</p>
                  <p className="text-lg font-semibold text-amber-400">Warning</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-400">Storage</p>
                  <p className="text-lg font-semibold text-emerald-400">85% Free</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Add New User</h2>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addUser({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  role: formData.get('role'),
                  status: 'active'
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                    <select
                      name="role"
                      required
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-700/50 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </GlassCard>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-slate-100">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{selectedUser.name}</h3>
                    <p className="text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-100 mb-4">Account Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Role:</span>
                        <span className="text-slate-100 capitalize">{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className="text-slate-100 capitalize">{selectedUser.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Login:</span>
                        <span className="text-slate-100">{selectedUser.lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-100 mb-4">Permissions</h4>
                    <div className="space-y-2">
                      {selectedUser.permissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-100 capitalize">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    Edit User
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}