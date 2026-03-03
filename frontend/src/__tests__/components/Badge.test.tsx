import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '@/components/ui/Badge';

describe('Badge component', () => {
  it('renders children text', () => {
    render(<Badge>Full-Time</Badge>);
    expect(screen.getByText('Full-Time')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText('Test').tagName).toBe('SPAN');
  });

  it('applies blue variant by default', () => {
    render(<Badge>Default</Badge>);
    const el = screen.getByText('Default');
    expect(el).toHaveClass('bg-primary-25', 'text-primary');
  });

  it('applies green variant classes', () => {
    render(<Badge variant="green">Active</Badge>);
    const el = screen.getByText('Active');
    expect(el).toHaveClass('bg-success/10', 'text-success');
  });

  it('applies yellow variant classes', () => {
    render(<Badge variant="yellow">Pending</Badge>);
    const el = screen.getByText('Pending');
    expect(el).toHaveClass('bg-warning/10', 'text-warning');
  });

  it('applies red variant classes', () => {
    render(<Badge variant="red">Closed</Badge>);
    const el = screen.getByText('Closed');
    expect(el).toHaveClass('bg-error/10', 'text-error');
  });

  it('applies outline variant classes', () => {
    render(<Badge variant="outline">Design</Badge>);
    const el = screen.getByText('Design');
    expect(el).toHaveClass('border', 'border-neutrals-20');
  });

  it('applies purple variant classes', () => {
    render(<Badge variant="purple">New</Badge>);
    const el = screen.getByText('New');
    expect(el).toHaveClass('text-label-purple');
  });

  it('applies additional className', () => {
    render(<Badge className="custom-class">Tag</Badge>);
    const el = screen.getByText('Tag');
    expect(el).toHaveClass('custom-class');
  });

  it('always applies base classes', () => {
    render(<Badge>Base</Badge>);
    const el = screen.getByText('Base');
    expect(el).toHaveClass('inline-flex', 'items-center', 'text-xs', 'font-semibold', 'rounded-full');
  });
});
