import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SubmitButton from '../../components/atoms/SubmitButtonAtom';
import { ButtonProps } from '@chakra-ui/react';

describe('SubmitButton Component', () => {
  test('renders correctly with buttonText', () => {
    render(
      <SubmitButton
        isLoading={false}
        onClick={() => {}}
        buttonText="Submit"
      />
    );

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  test('shows "Loading..." text when isLoading is true', () => {
    render(
      <SubmitButton
        isLoading={true}
        onClick={() => {}}
        buttonText="Submit"
      />
    );

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Loading...');
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <SubmitButton
        isLoading={false}
        onClick={handleClick}
        buttonText="Submit"
      />
    );

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when isLoading is true', () => {
    render(
      <SubmitButton
        isLoading={true}
        onClick={() => {}}
        buttonText="Submit"
      />
    );

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();
  });

});
