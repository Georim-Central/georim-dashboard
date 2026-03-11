import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { EventManagement } from '../components/EventManagement';

describe('App core flows', () => {
  it('navigates from dashboard to event creation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /create event/i }));

    expect(await screen.findByRole('heading', { name: /create new event/i })).toBeInTheDocument();
  });

  it('creates private link and activates waitlist in event settings', async () => {
    const user = userEvent.setup();
    const { container } = render(<EventManagement eventId="evt-1" />);

    await user.click(await screen.findByRole('tab', { name: /^settings$/i }));

    const visibilitySelect = await screen.findByRole('combobox');
    await user.selectOptions(visibilitySelect, 'Private');

    const privateLinkInput = await screen.findByDisplayValue(/https:\/\/georim\.app\/private\//i);
    expect(privateLinkInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();

    const allCheckboxes = container.querySelectorAll('input[type="checkbox"]');
    const waitlistCheckbox = allCheckboxes[allCheckboxes.length - 1] as HTMLInputElement;
    await user.click(waitlistCheckbox);

    const waitlistStatus = await screen.findByText(/waitlist is active/i);
    expect(waitlistStatus).toBeInTheDocument();
    expect(waitlistStatus.className).toContain('text-[#7626c6]');

    await user.click(screen.getByRole('button', { name: /configure/i }));

    expect(await screen.findByRole('heading', { name: /configure cancellation policy/i })).toBeInTheDocument();
    const policyInput = screen.getByPlaceholderText(/type your full cancellation and refund policy here/i);
    await user.type(policyInput, 'Full refund available up to 14 days before event start.');
    await user.click(screen.getByRole('button', { name: /save policy/i }));

    expect(await screen.findByText(/cancellation policy updated/i)).toBeInTheDocument();
    expect(screen.getByText(/full refund available up to 14 days before event start/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^edit$/i })).toBeInTheDocument();
  });

  it('shows the signed-in user in the top bar without exposing a profile page route', () => {
    render(<App />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^profile$/i })).not.toBeInTheDocument();
  });

  it('opens help center from sidebar help', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^help$/i }));

    expect(await screen.findByRole('heading', { name: /help center/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /faqs/i })).toBeInTheDocument();
  });
});
