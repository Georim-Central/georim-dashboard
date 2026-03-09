import { Home, Calendar, BarChart3, Users, ArrowLeft, Ticket, CreditCard, Mail, Settings, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  contextMode: 'organization' | 'event';
  onBackToOrganization: () => void;
  selectedEventId: string | null;
  activeEventTab: 'details' | 'ticketing' | 'orders' | 'marketing' | 'reports' | 'settings';
  onEventTabSelect: (tab: 'details' | 'ticketing' | 'orders' | 'marketing' | 'reports' | 'settings') => void;
}

export function Sidebar({
  currentView,
  onViewChange,
  contextMode,
  onBackToOrganization,
  selectedEventId,
  activeEventTab,
  onEventTabSelect,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '5rem' : '16rem');
  }, [isCollapsed]);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#05031B] text-white flex flex-col transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        {!isCollapsed && <h1 className="text-2xl font-bold text-[#7626c6]">Georim</h1>}
        {isCollapsed && <h1 className="text-2xl font-bold text-[#7626c6] text-center">G</h1>}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-[#7626c6] text-white btn-glass p-1.5 rounded-full hover:bg-[#5f1fa3] transition-colors z-10 shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {contextMode === 'organization' ? (
          <div className="space-y-2">
            {!isCollapsed && <div className="text-xs uppercase tracking-wide text-gray-400 px-4 py-2">Organization</div>}
            
            <button
              onClick={() => onViewChange('dashboard')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Dashboard' : ''}
            >
              <Home className="w-5 h-5" />
              {!isCollapsed && <span>Dashboard</span>}
            </button>

            <button
              onClick={() => onViewChange('create-event')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'create-event'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Create Event' : ''}
            >
              <Calendar className="w-5 h-5" />
              {!isCollapsed && <span>Create Event</span>}
            </button>

            <button
              onClick={() => onViewChange('analytics')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'analytics'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Analytics' : ''}
            >
              <BarChart3 className="w-5 h-5" />
              {!isCollapsed && <span>Analytics</span>}
            </button>

            <button
              onClick={() => onViewChange('team')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'team'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Team' : ''}
            >
              <Users className="w-5 h-5" />
              {!isCollapsed && <span>Team</span>}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={onBackToOrganization}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {!isCollapsed && <span className="text-sm">Back to Organization</span>}
            </button>

            {!isCollapsed && (
              <>
                <div className="text-xs uppercase tracking-wide text-gray-400 px-4 py-2">Event Management</div>
                <div className="text-sm text-gray-400 px-4 py-1 mb-4">Summer Music Festival 2026</div>
              </>
            )}

            <button
              onClick={() => onEventTabSelect('details')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'details'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Event Details' : ''}
            >
              <Calendar className="w-5 h-5" />
              {!isCollapsed && <span>Event Details</span>}
            </button>

            <button
              onClick={() => onEventTabSelect('ticketing')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'ticketing'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Ticketing' : ''}
            >
              <Ticket className="w-5 h-5" />
              {!isCollapsed && <span>Ticketing</span>}
            </button>

            <button
              onClick={() => onEventTabSelect('orders')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'orders'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Orders' : ''}
            >
              <CreditCard className="w-5 h-5" />
              {!isCollapsed && <span>Orders</span>}
            </button>

            <button
              onClick={() => onEventTabSelect('marketing')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'marketing'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Marketing' : ''}
            >
              <Mail className="w-5 h-5" />
              {!isCollapsed && <span>Marketing</span>}
            </button>

            <button
              onClick={() => onEventTabSelect('reports')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'reports'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Reports' : ''}
            >
              <BarChart3 className="w-5 h-5" />
              {!isCollapsed && <span>Reports</span>}
            </button>

            <button
              onClick={() => onEventTabSelect('settings')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'event-management' && activeEventTab === 'settings'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Settings' : ''}
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span>Settings</span>}
            </button>

            <button
              onClick={() => onViewChange('team')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'team'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Team' : ''}
            >
              <Users className="w-5 h-5" />
              {!isCollapsed && <span>Team</span>}
            </button>

            <button
              onClick={() => onViewChange('finance')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                currentView === 'finance'
                  ? 'bg-[#7626c6] text-white btn-glass'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              title={isCollapsed ? 'Finance' : ''}
            >
              <DollarSign className="w-5 h-5" />
              {!isCollapsed && <span>Finance</span>}
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-gray-400">
          <div>© 2026 Georim</div>
        </div>
      )}
    </div>
  );
}
