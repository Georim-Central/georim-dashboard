import { ComponentType } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Home,
  Mail,
  MessageCircle,
  QrCode,
  Repeat,
  Settings,
  Shield,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react';

import {
  isEventTabAllowed,
  isSettingsSectionAllowed,
  isViewAllowed,
} from '@/lib/subscription-access';
import { AppView, EventManagementTab, SettingsSection, SubscriptionTier } from '@/types/navigation';

type SidebarIcon = ComponentType<{ className?: string }>;

export type SidebarNavAction =
  | {
      kind: 'view';
      view: AppView;
    }
  | {
      kind: 'settings-section';
      section: SettingsSection;
    }
  | {
      kind: 'event-tab';
      tab: EventManagementTab;
    }
  | {
      kind: 'callback';
      onSelect: () => void;
    };

export type SidebarNavLeafItem = {
  id: string;
  label: string;
  icon: SidebarIcon;
  action: SidebarNavAction;
  description?: string;
  accent?: 'default' | 'danger';
};

export type SidebarNavParentItem = {
  id: string;
  label: string;
  icon: SidebarIcon;
  description?: string;
  children: SidebarNavGroup[];
};

export type SidebarNavItem = SidebarNavLeafItem | SidebarNavParentItem;

export type SidebarNavGroup = {
  id: string;
  label?: string;
  items: SidebarNavItem[];
};

interface SharedNavigationHandlers {
  activeTier: SubscriptionTier;
  onViewChange: (view: AppView) => void;
  onBackToOrganization: () => void;
}

interface OrganizationNavigationConfig extends SharedNavigationHandlers {
  onSettingsSectionSelect: (section: SettingsSection) => void;
}

interface EventNavigationConfig extends SharedNavigationHandlers {
  selectedEventName?: string | null;
}

export const isSidebarParentItem = (item: SidebarNavItem): item is SidebarNavParentItem => 'children' in item;

export function createOrganizationSidebarGroups({
  activeTier,
  onBackToOrganization,
  onSettingsSectionSelect,
}: OrganizationNavigationConfig): SidebarNavGroup[] {
  const organizationItems: SidebarNavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      action: { kind: 'view', view: 'dashboard' },
    },
    {
      id: 'create-event',
      label: 'Create Event',
      icon: Calendar,
      action: { kind: 'view', view: 'create-event' },
    },
  ];

  if (isViewAllowed(activeTier, 'analytics')) {
    organizationItems.push({
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      action: { kind: 'view', view: 'analytics' },
    });
  }

  if (isViewAllowed(activeTier, 'team')) {
    organizationItems.push({
      id: 'team',
      label: 'Team',
      icon: Users,
      action: { kind: 'view', view: 'team' },
    });
  }

  if (isViewAllowed(activeTier, 'finance')) {
    organizationItems.push({
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      action: { kind: 'view', view: 'finance' },
    });
  }

  const settingsItems: SidebarNavLeafItem[] = [];

  if (isSettingsSectionAllowed(activeTier, 'profile')) {
    settingsItems.push({
      id: 'settings-profile',
      label: 'Profile',
      icon: Users,
      action: { kind: 'settings-section', section: 'profile' },
    });
  }

  if (isSettingsSectionAllowed(activeTier, 'security')) {
    settingsItems.push({
      id: 'settings-security',
      label: 'Security',
      icon: Shield,
      action: { kind: 'settings-section', section: 'security' },
    });
  }

  if (isSettingsSectionAllowed(activeTier, 'payments')) {
    settingsItems.push({
      id: 'settings-payments',
      label: 'Payments',
      icon: Wallet,
      action: { kind: 'settings-section', section: 'payments' },
    });
  }

  if (isSettingsSectionAllowed(activeTier, 'notifications')) {
    settingsItems.push({
      id: 'settings-notifications',
      label: 'Notifications',
      icon: Bell,
      action: { kind: 'settings-section', section: 'notifications' },
    });
  }

  if (isSettingsSectionAllowed(activeTier, 'subscriptions')) {
    settingsItems.push({
      id: 'settings-subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      action: { kind: 'settings-section', section: 'subscriptions' },
    });
  }

  return [
    {
      id: 'organization',
      label: 'Organization',
      items: organizationItems,
    },
    {
      id: 'workspace',
      label: 'Workspace',
      items: [
        {
          id: 'notification-center',
          label: 'Notification Center',
          icon: Bell,
          action: { kind: 'view', view: 'notification-center' },
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings,
          description: 'Contextual menu',
          children: settingsItems.length > 0
            ? [
                {
                  id: 'settings-account',
                  label: 'Account Settings',
                  items: settingsItems,
                },
              ]
            : [],
        },
        {
          id: 'help',
          label: 'Help',
          icon: MessageCircle,
          action: { kind: 'view', view: 'help' },
        },
        {
          id: 'logout',
          label: 'Logout',
          icon: Repeat,
          accent: 'danger',
          action: {
            kind: 'callback',
            onSelect: () => {
              onSettingsSectionSelect('profile');
              onBackToOrganization();
            },
          },
        },
      ],
    },
  ];
}

export function createEventSidebarGroups({
  activeTier,
  onBackToOrganization,
  selectedEventName,
}: EventNavigationConfig): SidebarNavGroup[] {
  const eventManagementItems: SidebarNavLeafItem[] = [];

  if (isEventTabAllowed(activeTier, 'details')) {
    eventManagementItems.push({
      id: 'details',
      label: 'Event Details',
      icon: Calendar,
      action: { kind: 'event-tab', tab: 'details' },
    });
  }

  if (isEventTabAllowed(activeTier, 'ticketing')) {
    eventManagementItems.push({
      id: 'ticketing',
      label: 'Ticketing',
      icon: Ticket,
      action: { kind: 'event-tab', tab: 'ticketing' },
    });
  }

  if (isEventTabAllowed(activeTier, 'orders')) {
    eventManagementItems.push({
      id: 'orders',
      label: 'Orders',
      icon: CreditCard,
      action: { kind: 'event-tab', tab: 'orders' },
    });
  }

  if (isEventTabAllowed(activeTier, 'checked-in')) {
    eventManagementItems.push({
      id: 'checked-in',
      label: 'Checked-In',
      icon: QrCode,
      action: { kind: 'event-tab', tab: 'checked-in' },
    });
  }

  if (isEventTabAllowed(activeTier, 'marketing')) {
    eventManagementItems.push({
      id: 'marketing',
      label: 'Marketing',
      icon: Mail,
      action: { kind: 'event-tab', tab: 'marketing' },
    });
  }

  if (isEventTabAllowed(activeTier, 'reports')) {
    eventManagementItems.push({
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      action: { kind: 'event-tab', tab: 'reports' },
    });
  }

  if (isEventTabAllowed(activeTier, 'settings')) {
    eventManagementItems.push({
      id: 'event-settings',
      label: 'Settings',
      icon: Settings,
      action: { kind: 'event-tab', tab: 'settings' },
    });
  }

  const selectedEventItems: SidebarNavItem[] = [];

  if (eventManagementItems.length > 0) {
    selectedEventItems.push({
      id: 'event-menu',
      label: 'Event Menu',
      icon: Calendar,
      description: selectedEventName || 'Selected Event',
      children: [
        {
          id: 'event-management-items',
          label: selectedEventName || 'Selected Event',
          items: eventManagementItems,
        },
      ],
    });
  }

  if (isViewAllowed(activeTier, 'team')) {
    selectedEventItems.push({
      id: 'team',
      label: 'Team',
      icon: Users,
      action: { kind: 'view', view: 'team' },
    });
  }

  if (isViewAllowed(activeTier, 'finance')) {
    selectedEventItems.push({
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      action: { kind: 'view', view: 'finance' },
    });
  }

  return [
    {
      id: 'event-context',
      items: [
        {
          id: 'back-to-organization',
          label: 'Back to Organization',
          icon: ArrowLeft,
          action: {
            kind: 'callback',
            onSelect: onBackToOrganization,
          },
        },
      ],
    },
    {
      id: 'event-navigation',
      label: 'Selected Event',
      items: selectedEventItems,
    },
    {
      id: 'event-workspace',
      label: 'Workspace',
      items: [
        {
          id: 'help',
          label: 'Help',
          icon: MessageCircle,
          action: { kind: 'view', view: 'help' },
        },
        {
          id: 'logout',
          label: 'Logout',
          icon: Repeat,
          accent: 'danger',
          action: {
            kind: 'callback',
            onSelect: onBackToOrganization,
          },
        },
      ],
    },
  ];
}
