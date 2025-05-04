import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { ButtonPrimary } from '../buttons/button-primary';
import { Tooltip } from '@mui/material';

export interface FormProps {
    handleSubmit: (arg: any) => void;
    children?: JSX.Element[];
    disabled?: boolean;
    disabledTooltip?: string;
    buttonText?: string;
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

export const Form: (props: FormProps) => JSX.Element = ({ handleSubmit, children, disabled = false, disabledTooltip = '', buttonText = 'Save' }: FormProps) => {
    const saveButton = (
        <ButtonPrimary onClick={handleSubmit} disabled={disabled}>{buttonText}</ButtonPrimary>
    );

    return (
        <StyledFormComponent>
            {children}
            <Grid container>
                <Grid item xs={5}>
                    {disabled && disabledTooltip ? (
                        <Tooltip title={disabledTooltip} arrow>
                            <span>{saveButton}</span>
                        </Tooltip>
                    ) : saveButton}
                </Grid>
            </Grid>
        </StyledFormComponent>
    );
};

