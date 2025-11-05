import { render, screen } from '@testing-library/react';
import ViewCounter from './view-counter';

const mockViews = [
  { slug: 'first-post', count: 100 },
  { slug: 'second-post', count: 1234567 },
];

describe('ViewCounter', () => {
  it('should display the correct view count for a matching slug', () => {
    render(<ViewCounter slug="first-post" allViews={mockViews} />);
    
    const viewElement = screen.getByText('100 views');
    expect(viewElement).toBeInTheDocument();
  });

  it('should display "0 views" when no matching slug is found', () => {
    render(<ViewCounter slug="non-existent-post" allViews={mockViews} />);
    
    const viewElement = screen.getByText('0 views');
    expect(viewElement).toBeInTheDocument();
  });

  it('should format large numbers with commas', () => {
    render(<ViewCounter slug="second-post" allViews={mockViews} />);
    
    const viewElement = screen.getByText('1,234,567 views');
    expect(viewElement).toBeInTheDocument();
  });

  it('should display "0 views" when the allViews array is empty', () => {
    render(<ViewCounter slug="any-post" allViews={[]} />);
    
    const viewElement = screen.getByText('0 views');
    expect(viewElement).toBeInTheDocument();
  });
});
