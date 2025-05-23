import { FormControl, Input, InputLabel, InputAdornment } from '@mui/material';

interface FormTextInputProps {
    id: string;
    label: string | JSX.Element;
    required?: boolean;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    startAdornment?: React.ReactNode;
}

export const FormTextInput = ({ id, label, required, value, onChange, startAdornment }: FormTextInputProps) => {
    return (
        <FormControl>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input 
                required={required} 
                id={id} 
                area-describedby={id} 
                value={value} 
                onChange={onChange}
                startAdornment={startAdornment && (
                    <InputAdornment position="start">
                        {startAdornment}
                    </InputAdornment>
                )}
            />
        </FormControl>
    );
};
