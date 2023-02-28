import { Button } from '@mui/material';

export interface ButtonPrimaryProps {
    children: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonPrimary = ({ children, onClick }: ButtonPrimaryProps) => {
    return (
        <Button onClick={onClick} variant="contained">
            {children}
        </Button>
    );
};
