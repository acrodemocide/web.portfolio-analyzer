import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { ButtonPrimary } from '../buttons/ButtonPrimary';

export interface FormProps {
    handleSubmit: (arg: any) => void;
    children?: JSX.Element[];
}

const StyledFormComponent = styled('div', {
    shouldForwardProp: () => true,
    name: 'Form',
    slot: 'Root'
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    width: '500px',

    '& .MuiInput-root': {
        margin: theme.spacing(2)
    },

    '& .MuiButtonBase-root': {
        margin: theme.spacing(3)
    }
}));

export const Form: (props: FormProps) => JSX.Element = ({ handleSubmit, children }: FormProps) => {
    return (
        <StyledFormComponent>
            {children}
            <Grid container>
                <Grid item xs={5}>
                    <ButtonPrimary onClick={handleSubmit}>Save</ButtonPrimary>
                </Grid>
            </Grid>
        </StyledFormComponent>
    );
};
