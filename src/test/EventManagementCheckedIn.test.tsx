import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventManagement } from '../components/EventManagement';

describe('EventManagement checked-in flow', () => {
  it('logs attendee check-ins in real time from scanned QR code', async () => {
    const user = userEvent.setup();
    render(<EventManagement eventId="evt-1" />);

    await user.click(await screen.findByRole('button', { name: /checked-in/i }));

    const scanInput = await screen.findByPlaceholderText(/scan or paste qr code/i);
    await user.type(scanInput, 'ATT-4420');
    await user.click(screen.getByRole('button', { name: /log check-in/i }));

    expect(await screen.findByText(/michael chen checked in successfully/i)).toBeInTheDocument();
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();
    expect(screen.getByText('#5847238')).toBeInTheDocument();

    await user.type(scanInput, 'ATT-4420');
    await user.click(screen.getByRole('button', { name: /log check-in/i }));
    expect(await screen.findByText(/michael chen is already checked in/i)).toBeInTheDocument();
  });
});
