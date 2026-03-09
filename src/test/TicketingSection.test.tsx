import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TicketingSection } from '../components/event-management/TicketingSection';

describe('TicketingSection modal flows', () => {
  it('opens Add Ticket Type as a modal and removes inline form section', async () => {
    const user = userEvent.setup();
    const { container } = render(<TicketingSection />);

    expect(screen.queryByText('Add New Ticket Type')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add ticket type/i }));

    expect(screen.getByRole('heading', { name: /add ticket type/i })).toBeInTheDocument();
    expect(container.querySelector('.ticketing-modal-backdrop')).toBeInTheDocument();
  });

  it('opens Create Code form as a modal', async () => {
    const user = userEvent.setup();
    const { container } = render(<TicketingSection />);

    await user.click(screen.getByRole('button', { name: /create code/i }));

    expect(screen.getByRole('heading', { name: /create promo code/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/summer2026/i)).toBeInTheDocument();
    expect(container.querySelector('.ticketing-modal-backdrop')).toBeInTheDocument();
  });
});
