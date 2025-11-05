import { render, screen } from '@testing-library/react';
import { Navbar } from './nav';

describe('Navbar', () => {
  it('renders all navigation links correctly', () => {
    render(<Navbar />);

    // Check for the "about" link
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/');

    // Check for the "work" link
    const workLink = screen.getByRole('link', { name: /work/i });
    expect(workLink).toBeInTheDocument();
    expect(workLink).toHaveAttribute('href', '/work');

    // Check for the "blog" link
    const blogLink = screen.getByRole('link', { name: /blog/i });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });
});
