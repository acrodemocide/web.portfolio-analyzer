import { TextField } from '@mui/material';

interface FormTextInputProps {
    id: string;
    label: string | JSX.Element;
    required?: boolean;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const FormTextInput = ({ id, label, required, value, onChange }: FormTextInputProps) => {
    return <TextField sx={{ marginBottom: 1 }} id={id} label={label} required={required} value={value} onChange={onChange} />;
};
