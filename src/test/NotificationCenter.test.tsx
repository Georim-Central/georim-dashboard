import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotificationCenter } from '@/components/NotificationCenter';
import { filterNotificationsByTier } from '@/lib/subscription-access';
import { OrganizerNotification } from '@/types/notifications';

const notifications: OrganizerNotification[] = [
  {
    id: 'notif-milestone',
    title: 'Digest updated',
    message: 'Review your organizer digest.',
    timeLabel: '42m ago',
    category: 'milestone',
    priority: 'low',
    read: false,
    target: {
      kind: 'settings',
      section: 'notifications',
    },
  },
  {
    id: 'notif-finance',
    title: 'Finance ready',
    message: 'Payout review is ready.',
    timeLabel: '12m ago',
    category: 'finance',
    priority: 'high',
    read: false,
    target: {
      kind: 'view',
      view: 'finance',
    },
  },
  {
    id: 'notif-team',
    title: 'Team follow-up',
    message: 'Approve the pending invite.',
    timeLabel: '5m ago',
    category: 'team',
    priority: 'medium',
    read: false,
    target: {
      kind: 'view',
      view: 'team',
    },
  },
];

const noop = () => {};

describe('NotificationCenter', () => {
  it('shows only free filters and summary cards in the free tier', () => {
    render(
      <NotificationCenter
        activeTier="free"
        notifications={filterNotificationsByTier('free', notifications)}
        onMarkAllRead={noop}
        onToggleRead={noop}
        onArchive={noop}
        onOpenNotification={noop}
        onOpenPreferences={noop}
      />
    );

    expect(screen.getByRole('button', { name: /all activity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^unread$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^orders$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^finance$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^team$/i })).not.toBeInTheDocument();

    expect(screen.getByText(/awaiting review/i)).toBeInTheDocument();
    expect(screen.getByText(/high-priority alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/activity last few hours/i)).toBeInTheDocument();
    expect(screen.queryByText(/payout & billing notices/i)).not.toBeInTheDocument();
  });

  it('self-heals the selected filter and notification when the tier is reduced', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <NotificationCenter
        activeTier="business"
        notifications={filterNotificationsByTier('business', notifications)}
        onMarkAllRead={noop}
        onToggleRead={noop}
        onArchive={noop}
        onOpenNotification={noop}
        onOpenPreferences={noop}
      />
    );

    await user.click(screen.getByRole('button', { name: /^team$/i }));
    expect(screen.getAllByText(/team follow-up/i)).toHaveLength(2);

    rerender(
      <NotificationCenter
        activeTier="premium"
        notifications={filterNotificationsByTier('premium', notifications)}
        onMarkAllRead={noop}
        onToggleRead={noop}
        onArchive={noop}
        onOpenNotification={noop}
        onOpenPreferences={noop}
      />
    );

    expect(screen.queryByRole('button', { name: /^team$/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/team follow-up/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^finance$/i })).toBeInTheDocument();
    expect(screen.getByText(/payout & billing notices/i)).toBeInTheDocument();
  });
});
