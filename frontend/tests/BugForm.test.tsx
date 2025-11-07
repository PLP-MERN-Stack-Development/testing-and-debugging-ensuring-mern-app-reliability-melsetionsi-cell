import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('submits form successfully', async () => {
  const handleAdd = jest.fn();
  mockedAxios.post.mockResolvedValue({ data: {} });

  render(<BugForm onBugAdded={handleAdd} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Crash' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'App crashes on start' } });
  fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Alice' } });
  fireEvent.click(screen.getByText('Report Bug'));

  expect(await screen.findByText('Report Bug')).toBeInTheDocument();
  expect(handleAdd).toHaveBeenCalled();
});