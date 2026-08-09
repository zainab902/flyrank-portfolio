import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SmartButton } from '../components/SmartButton';

describe('SmartButton Micro-interaction', () => {
  it('6. Renders idle state with accessible aria label', () => {
    render(<SmartButton />);
    const button = screen.getByRole('button', { name: /Send Message AI Assistant/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
  });

  it('7. Enters loading state when clicked', async () => {
    const mockAction = vi.fn(async (_forceResult?: 'success' | 'error') => {
      return new Promise<void>((resolve) => setTimeout(resolve, 500));
    });

    render(<SmartButton onAction={mockAction} />);

    const button = screen.getByRole('button', { name: /Send Message AI Assistant/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
    });
  });
});