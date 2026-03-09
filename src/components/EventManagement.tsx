import { useEffect, useState } from 'react';
import { Calendar, Ticket, Mail, BarChart3, CreditCard, Settings as SettingsIcon } from 'lucide-react';
import { TicketingSection } from './event-management/TicketingSection';
import { OrdersSection } from './event-management/OrdersSection';
import { MarketingSection } from './event-management/MarketingSection';

interface EventManagementProps {
  eventId: string;
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

type Tab = 'details' | 'ticketing' | 'orders' | 'marketing' | 'reports' | 'settings';

export function EventManagement({ eventId, activeTab: requestedTab, onTabChange }: EventManagementProps) {
  const [activeTab, setActiveTab] = useState<Tab>('details');

  useEffect(() => {
    if (requestedTab) {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  const tabs = [
    { id: 'details', label: 'Event Details', icon: Calendar },
    { id: 'ticketing', label: 'Ticketing', icon: Ticket },
    { id: 'orders', label: 'Orders', icon: CreditCard },
    { id: 'marketing', label: 'Marketing', icon: Mail },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-full bg-gray-50">
      {/* Event Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Summer Music Festival 2026</h1>
              <p className="text-gray-600 mt-1">June 15, 2026 • Central Park, New York</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg hover:bg-[#5f1fa3] transition-colors">
                Publish
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    const nextTab = tab.id as Tab;
                    setActiveTab(nextTab);
                    onTabChange?.(nextTab);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#7626c6] text-[#7626c6]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'details' && <EventDetailsTab />}
        {activeTab === 'ticketing' && <TicketingSection />}
        {activeTab === 'orders' && <OrdersSection />}
        {activeTab === 'marketing' && <MarketingSection />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

function EventDetailsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              type="text"
              defaultValue="Summer Music Festival 2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Festival</option>
              <option>Concert</option>
              <option>Conference</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="text-2xl mb-2">🎫</div>
            <div className="font-medium text-gray-900">Manage Tickets</div>
            <div className="text-sm text-gray-500">Configure ticket types</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="text-2xl mb-2">✉️</div>
            <div className="font-medium text-gray-900">Send Email</div>
            <div className="text-sm text-gray-500">Email attendees</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">View Reports</div>
            <div className="text-sm text-gray-500">Check analytics</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Event Reports</h2>
            <p className="text-gray-600 mt-1">Event attendee reports and analytics</p>
          </div>
          <button className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg text-sm font-medium hover:bg-[#5f1fa3] transition-colors">
            Export Report
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 mb-1">Total Tickets Sold</div>
            <div className="text-2xl font-bold text-purple-900">847</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Checked In</div>
            <div className="text-2xl font-bold text-blue-900">796</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 mb-1">Check-in Rate</div>
            <div className="text-2xl font-bold text-green-900">94%</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-orange-600 mb-1">No Shows</div>
            <div className="text-2xl font-bold text-orange-900">51</div>
          </div>
        </div>
      </div>

      {/* Attendee Report Issues */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Report Issues</h3>
        <p className="text-sm text-gray-600 mb-6">Issues and concerns reported by attendees for this event</p>

        <div className="space-y-3">
          {/* Issue 1 */}
          <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="bg-red-100 p-2 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-red-900">Ticket Scanning Issues</h4>
                <span className="text-xs px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-medium">High Priority</span>
              </div>
              <p className="text-sm text-red-700 mb-2">
                12 attendees reported QR code scanning failures at entrance gates 2 & 3
              </p>
              <div className="flex items-center gap-4 text-xs text-red-600">
                <span>Reported: 2 hours ago</span>
                <span>•</span>
                <span>Affected: 12 attendees</span>
                <span>•</span>
                <span>Gate 2, Gate 3</span>
              </div>
            </div>
          </div>

          {/* Issue 2 */}
          <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="bg-yellow-100 p-2 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-yellow-900">Missing Confirmation Emails</h4>
                <span className="text-xs px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Medium Priority</span>
              </div>
              <p className="text-sm text-yellow-700 mb-2">
                8 attendees did not receive ticket confirmation emails after purchase
              </p>
              <div className="flex items-center gap-4 text-xs text-yellow-600">
                <span>Reported: 5 hours ago</span>
                <span>•</span>
                <span>Affected: 8 attendees</span>
                <span>•</span>
                <span>Email delivery issue</span>
              </div>
            </div>
          </div>

          {/* Issue 3 */}
          <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="bg-orange-100 p-2 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-orange-900">Late Entry Requests</h4>
                <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">Medium Priority</span>
              </div>
              <p className="text-sm text-orange-700 mb-2">
                5 attendees arrived after official check-in closing time, requesting special entry
              </p>
              <div className="flex items-center gap-4 text-xs text-orange-600">
                <span>Reported: 3 hours ago</span>
                <span>•</span>
                <span>Affected: 5 attendees</span>
                <span>•</span>
                <span>Policy exception request</span>
              </div>
            </div>
          </div>

          {/* Issue 4 */}
          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="bg-blue-100 p-2 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-blue-900">Name Mismatch on Tickets</h4>
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Low Priority</span>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                6 attendees reported name spelling errors on their digital tickets
              </p>
              <div className="flex items-center gap-4 text-xs text-blue-600">
                <span>Reported: 1 day ago</span>
                <span>•</span>
                <span>Affected: 6 attendees</span>
                <span>•</span>
                <span>Ticket reissue needed</span>
              </div>
            </div>
          </div>

          {/* Issue 5 */}
          <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="bg-purple-100 p-2 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-purple-900">Refund Processing Delays</h4>
                <span className="text-xs px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Low Priority</span>
              </div>
              <p className="text-sm text-purple-700 mb-2">
                4 attendees inquiring about refund status beyond standard 5-7 day processing time
              </p>
              <div className="flex items-center gap-4 text-xs text-purple-600">
                <span>Reported: 2 days ago</span>
                <span>•</span>
                <span>Affected: 4 attendees</span>
                <span>•</span>
                <span>Payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">35</div>
            <div className="text-sm text-gray-600 mt-1">Total Issues</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600 mt-1">High Priority</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600 mt-1">Medium Priority</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-gray-600 mt-1">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [eventVisibility, setEventVisibility] = useState<'Public' | 'Private' | 'Draft'>('Public');
  const [waitlistEnabled, setWaitlistEnabled] = useState(false);
  const [privateLink, setPrivateLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [cancellationDraft, setCancellationDraft] = useState('');
  const [policySavedNotice, setPolicySavedNotice] = useState('');

  const generatePrivateLink = () => {
    const token = Math.random().toString(36).slice(2, 10);
    return `https://georim.app/private/${token}`;
  };

  const handleVisibilityChange = (visibility: 'Public' | 'Private' | 'Draft') => {
    setEventVisibility(visibility);
    if (visibility === 'Private') {
      setPrivateLink((prev) => prev || generatePrivateLink());
      return;
    }

    setPrivateLink('');
    setLinkCopied(false);
  };

  const handleCopyPrivateLink = async () => {
    if (!privateLink || !navigator?.clipboard) return;
    await navigator.clipboard.writeText(privateLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const openCancellationPolicyModal = () => {
    setCancellationDraft(cancellationPolicy);
    setPolicySavedNotice('');
    setShowCancellationModal(true);
  };

  const saveCancellationPolicy = () => {
    setCancellationPolicy(cancellationDraft.trim());
    setShowCancellationModal(false);
    setPolicySavedNotice('Cancellation policy updated.');
    console.log('[Settings] Cancellation policy updated', { length: cancellationDraft.trim().length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Event Visibility</h3>
              <p className="text-sm text-gray-500">Control who can see your event</p>
            </div>
            <select
              value={eventVisibility}
              onChange={(e) => handleVisibilityChange(e.target.value as 'Public' | 'Private' | 'Draft')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {eventVisibility === 'Private' && (
            <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-medium text-purple-900">Private Access Link</h4>
                  <p className="text-sm text-purple-700">
                    Share this link with invited attendees so they can access this private event.
                  </p>
                </div>
                <button
                  onClick={() => setPrivateLink(generatePrivateLink())}
                  className="px-3 py-1.5 text-sm border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  Regenerate
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  readOnly
                  value={privateLink}
                  className="flex-1 px-3 py-2 border border-purple-200 rounded-lg bg-white text-sm text-gray-700"
                />
                <button
                  onClick={handleCopyPrivateLink}
                  className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg text-sm hover:bg-[#5f1fa3] transition-colors"
                >
                  {linkCopied ? 'Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Waitlist</h3>
              <p className="text-sm text-gray-500">
                Enable waitlist when sold out
              </p>
              <p className={`text-xs mt-1 ${waitlistEnabled ? 'text-[#7626c6]' : 'text-gray-500'}`}>
                {waitlistEnabled ? 'Waitlist is active' : 'Waitlist is disabled'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={waitlistEnabled}
                onChange={(e) => setWaitlistEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7626c6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7626c6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Cancellation Policy</h3>
              <p className="text-sm text-gray-500">Refund and cancellation rules</p>
              {!cancellationPolicy && <p className="text-xs mt-1 text-gray-500">No cancellation policy set yet.</p>}
            </div>
            {!cancellationPolicy && (
              <button
                onClick={openCancellationPolicyModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Configure
              </button>
            )}
          </div>

          {cancellationPolicy && (
            <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-sm font-semibold text-gray-900">Policy Write-up</h4>
                <button
                  onClick={openCancellationPolicyModal}
                  className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{cancellationPolicy}</p>
            </div>
          )}

          {policySavedNotice && <p className="text-xs mt-1 text-[#7626c6]">{policySavedNotice}</p>}
        </div>
      </div>

      {showCancellationModal && (
        <div className="ticketing-modal-overlay">
          <div
            className="ticketing-modal-backdrop"
            onClick={() => setShowCancellationModal(false)}
          />
          <div className="ticketing-modal-card bg-white rounded-2xl border border-gray-200 shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Configure Cancellation Policy</h3>
            <p className="text-sm text-gray-600 mb-5">Set your full refund and cancellation terms.</p>

            <div className="ticketing-modal-body space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Details</label>
                <textarea
                  value={cancellationDraft}
                  onChange={(event) => setCancellationDraft(event.target.value)}
                  rows={12}
                  placeholder="Type your full cancellation and refund policy here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent resize-y"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This text will be shown to attendees before checkout.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCancellationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCancellationPolicy}
                className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg hover:bg-[#5f1fa3] transition-colors"
              >
                Save Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
