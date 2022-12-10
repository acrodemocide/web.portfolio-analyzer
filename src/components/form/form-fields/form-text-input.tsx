import { FormControl, Input, InputLabel, TextField } from '@mui/material';

interface FormTextInputProps {
    id: string;
    label: string | JSX.Element;
    required?: boolean;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const FormTextInput = ({ id, label, required, value, onChange }: FormTextInputProps) => {
    return (
        // <FormControl>
        //     <InputLabel htmlFor={id}>{label}</InputLabel>
        //     <Input required={required} id={id} area-describedby={id} value={value} onChange={onChange} />
        // </FormControl>
        // sx={{ width: '100%' }}
        // standard
        // variant="outlined"
        <TextField sx={{ m: 1 }} id={id} label={label} required={required} value={value} onChange={onChange} />
    );
};
