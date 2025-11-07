import { render, screen } from '@testing-library/react';
import BugList from '../components/BugList';

test('renders empty state', () => {
  render(<BugList bugs={[]} onUpdate={() => {}} />);
  expect(screen.getByText('No bugs reported yet.')).toBeInTheDocument();
});