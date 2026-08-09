import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as aiSdk from '@ai-sdk/react';
import Home from '../app/page';

// Default mock with messages present
vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    messages: [
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello AI' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Hello! How can I help?' }] },
    ],
    sendMessage: vi.fn(),
    error: undefined,
    status: 'ready',
  })),
  DefaultChatTransport: vi.fn(),
}));

describe('Chat UI & Message Renderer', () => {
  it('1. Renders the main portfolio header title', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('2. Renders conversation messages accurately', () => {
    render(<Home />);
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
    expect(screen.getByText('Hello! How can I help?')).toBeInTheDocument();
  });

  it('3. Renders the chat input placeholder', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Type your query or ask to evaluate a project/i);
    expect(input).toBeInTheDocument();
  });

  it('4. Handles typing into the query input field', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Type your query or ask to evaluate a project/i);
    fireEvent.change(input, { target: { value: 'What tools are used?' } });
    expect(input).toHaveValue('What tools are used?');
  });

  it('5. Renders quick-action suggestion buttons when conversation is empty', () => {
    // Override useChat to return empty messages array for empty state test
    vi.spyOn(aiSdk, 'useChat').mockImplementationOnce(() => ({
      messages: [],
      sendMessage: vi.fn(),
      error: undefined,
      status: 'ready',
      input: '',
      setInput: vi.fn(),
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      reload: vi.fn(),
      append: vi.fn(),
      data: undefined,
      setData: vi.fn(),
    } as any));

    render(<Home />);
    const button = screen.getByRole('button', { name: /What stack & tools are used in this portfolio\?/i });
    expect(button).toBeInTheDocument();
  });
});