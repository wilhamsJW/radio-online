import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '../../components/atoms/InputFieldAtom';

describe('InputField Component', () => {
  test('renders correctly with placeholder', () => {
    render(
      <InputField
        placeholder="Search..."
      />
    );

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  test('renders with a value', () => {
    render(
      <InputField
        value="Test value"
        onChange={() => {}}
      />
    );

    const input = screen.getByDisplayValue('Test value');
    expect(input).toBeInTheDocument();
  });
});
