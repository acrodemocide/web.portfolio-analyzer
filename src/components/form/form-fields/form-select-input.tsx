import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';
import { styled } from '@mui/system';

export interface FormSelectInputProps {
    label: string;
    menuItems: string[];
    value: string;
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

const StyledFormControl = styled(FormControl, {
    shouldForwardProp: () => true,
    name: 'asdf',
    slot: 'Root'
})(() => ({
    marginBottom: '10px'
}));

export const FormSelectInput = ({ label, value, menuItems, onChange }: FormSelectInputProps) => {
    return (
        <StyledFormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={onChange}>
                {menuItems.map((item: string) => {
                    // Value attribute is what actually gets and sets the value for the selection
                    // The child of MenuItem is what actually gets displayed in the list of items
                    return <MenuItem value={item}>{item}</MenuItem>;
                })}
            </Select>
        </StyledFormControl>
    );
};
