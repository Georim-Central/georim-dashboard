import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrdersSection } from '../components/event-management/OrdersSection';

describe('OrdersSection action menu', () => {
  it('opens attendee details modal from More details action', async () => {
    const user = userEvent.setup();
    render(<OrdersSection />);

    await user.click(screen.getByRole('button', { name: /actions for order 5847239/i }));
    await user.click(screen.getByRole('button', { name: /more details/i }));

    expect(await screen.findByRole('heading', { name: /attendee & order details/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ATT-3901')).toBeInTheDocument();
  });
});
