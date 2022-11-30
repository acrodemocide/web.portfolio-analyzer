import { render, screen } from '@testing-library/react';
import { FormTextInput } from './form-text-input';

test('renders learn react link', () => {
    const label = 'Principal Amount';
    const value = '$10,000';
    render(
        <FormTextInput
            id={'principalAmount'}
            label={label}
            value={value}
            onChange={() => {
                return;
            }}
        />
    );
    const textInputElement = screen.getByText(label);
    expect(textInputElement).toBeInTheDocument();
});
