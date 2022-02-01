import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start button', () => {
  render(<App />);
  const startButton = screen.getByText(/start/i);
  expect(startButton).toBeInTheDocument();
});
