import { Button } from '@mui/material';

export interface ButtonPrimaryProps {
    children: string;
    onClick?: any;
}

export const ButtonPrimary = ({ children, onClick }: ButtonPrimaryProps) => {
    return (
        <Button onClick={onClick} variant="contained">
            {children}
        </Button>
    );
};
