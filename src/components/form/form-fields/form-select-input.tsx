import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';

export interface FormSelectInputProps {
    id: string;
    label: string;
    menuItems: string[];
    value: string;
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

export const FormSelectInput = ({ id, label, value, menuItems, onChange }: FormSelectInputProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select labelId={id} id={id} value={value} label={label} onChange={onChange}>
                {menuItems.map((item: string) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                })}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
    );
};
