import { FormControl, Input, InputLabel } from '@mui/material';

interface FormTextInputProps {
    id: string;
    label: string | JSX.Element;
    required?: boolean;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const FormTextInput = ({ id, label, required, value, onChange }: FormTextInputProps) => {
    return (
        <FormControl>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input required={required} id={id} area-describedby={id} value={value} onChange={onChange} />
        </FormControl>
    );
};
