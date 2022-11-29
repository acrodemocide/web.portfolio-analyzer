import React from 'react';
import { Grid } from '@mui/material';
import { ButtonPrimary } from '../buttons/ButtonPrimary';

export interface FormProps {
    handleSubmit: (arg: any) => void;
    children?: JSX.Element;
}

export const Form: (props: FormProps) => JSX.Element = ({ handleSubmit, children }: FormProps) => {
    return (
        <React.Fragment>
            {children}
            <Grid container>
                <Grid item>
                    <ButtonPrimary onClick={handleSubmit}>Save</ButtonPrimary>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
