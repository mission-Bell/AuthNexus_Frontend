
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TextField from '@mui/material/TextField';

describe('TextField', () => {
  it('renders with label ""', () => {
    render(<TextField label="" />);
    expect(screen.getByLabelText('')).toBeInTheDocument();
  });

  it('shows error for invalid password', async () => {
    render(<TextField label="" validate="password" />);
    const input = screen.getByLabelText('');
    await userEvent.type(input, 'invalid-value');
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  it('accepts valid password', async () => {
    render(<TextField label="" validate="password" />);
    const input = screen.getByLabelText('');
    await userEvent.type(input, 'valid-value');
    expect(screen.queryByText('Invalid input')).not.toBeInTheDocument();
  });
});
  