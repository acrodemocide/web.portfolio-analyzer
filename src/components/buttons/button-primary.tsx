import { Button } from '@mui/material';

export interface ButtonPrimaryProps {
    children: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const ButtonPrimary = ({ children, onClick, disabled = false }: ButtonPrimaryProps) => {
    return (
        <Button onClick={onClick} variant="contained" disabled={disabled}>
            {children}
        </Button>
    );
};
