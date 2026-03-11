import { ComponentType } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  CreditCard,
  DollarSign,
  Home,
  Mail,
  MessageCircle,
  QrCode,
  Repeat,
  Settings,
  Ticket,
  Users,
} from 'lucide-react';

import { AppView, EventManagementTab } from '@/types/navigation';

type SidebarIcon = ComponentType<{ className?: string }>;

export type SidebarNavAction =
  | {
      kind: 'view';
      view: AppView;
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
  onViewChange: (view: AppView) => void;
  onBackToOrganization: () => void;
}

type OrganizationNavigationConfig = SharedNavigationHandlers;

interface EventNavigationConfig extends SharedNavigationHandlers {
  selectedEventName?: string | null;
}

export const isSidebarParentItem = (item: SidebarNavItem): item is SidebarNavParentItem => 'children' in item;

export function createOrganizationSidebarGroups({
  onBackToOrganization,
}: OrganizationNavigationConfig): SidebarNavGroup[] {
  return [
    {
      id: 'organization',
      label: 'Organization',
      items: [
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
        {
          id: 'analytics',
          label: 'Analytics',
          icon: BarChart3,
          action: { kind: 'view', view: 'analytics' },
        },
        {
          id: 'team',
          label: 'Team',
          icon: Users,
          action: { kind: 'view', view: 'team' },
        },
      ],
    },
    {
      id: 'workspace',
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

export function createEventSidebarGroups({
  onBackToOrganization,
  selectedEventName,
}: EventNavigationConfig): SidebarNavGroup[] {
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
      items: [
        {
          id: 'event-menu',
          label: 'Event Menu',
          icon: Calendar,
          description: selectedEventName || 'Selected Event',
          children: [
            {
              id: 'event-management-items',
              label: selectedEventName || 'Selected Event',
              items: [
                {
                  id: 'details',
                  label: 'Event Details',
                  icon: Calendar,
                  action: { kind: 'event-tab', tab: 'details' },
                },
                {
                  id: 'ticketing',
                  label: 'Ticketing',
                  icon: Ticket,
                  action: { kind: 'event-tab', tab: 'ticketing' },
                },
                {
                  id: 'orders',
                  label: 'Orders',
                  icon: CreditCard,
                  action: { kind: 'event-tab', tab: 'orders' },
                },
                {
                  id: 'checked-in',
                  label: 'Checked-In',
                  icon: QrCode,
                  action: { kind: 'event-tab', tab: 'checked-in' },
                },
                {
                  id: 'marketing',
                  label: 'Marketing',
                  icon: Mail,
                  action: { kind: 'event-tab', tab: 'marketing' },
                },
                {
                  id: 'reports',
                  label: 'Reports',
                  icon: BarChart3,
                  action: { kind: 'event-tab', tab: 'reports' },
                },
                {
                  id: 'event-settings',
                  label: 'Settings',
                  icon: Settings,
                  action: { kind: 'event-tab', tab: 'settings' },
                },
              ],
            },
          ],
        },
        {
          id: 'team',
          label: 'Team',
          icon: Users,
          action: { kind: 'view', view: 'team' },
        },
        {
          id: 'finance',
          label: 'Finance',
          icon: DollarSign,
          action: { kind: 'view', view: 'finance' },
        },
      ],
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
