import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SettingsForm } from './SettingsForm';

describe('SettingsForm', () => {
  it('submits valid data successfully', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<SettingsForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Secure123!');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'Secure123!',
      },
      expect.anything(),
    );
  });

  it('shows validation errors for invalid email and weak password', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<SettingsForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'Ada');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/password/i), 'weak');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be at least 8 characters and contain a number and a special character/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('allows an empty password when it is omitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<SettingsForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'Grace Hopper');
    await user.type(screen.getByLabelText(/email/i), 'grace@example.com');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        password: '',
      },
      expect.anything(),
    );
  });
});
