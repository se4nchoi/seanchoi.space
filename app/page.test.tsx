import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Page from './page'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', {
      name: /hi, I'm Sean/i,
    })
 
    expect(heading).toBeInTheDocument()
  })

  it('renders all work experience entries', () => {
    render(<Page />);
    
    const workSection = screen.getByRole('heading', { name: /Work Experience/i }).parentElement;
    expect(workSection).not.toBeNull();

    const hoekAgency = within(workSection!).getByText(/Hoek Agency/);
    const emgGlobal = within(workSection!).getByText(/EMG Global/);
    const kdic = within(workSection!).getByText(/Korea Defense Intelligence Command/);

    expect(hoekAgency).toBeInTheDocument();
    expect(emgGlobal).toBeInTheDocument();
    expect(kdic).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Page />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
})
