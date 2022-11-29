import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/form/form';
import { FormTextInput } from '../../components/form/form-fields/form-text-input';

const handleSubmit = () => {
    alert('Submitted!');
};

const PortfolioBuilder = () => {
    const [formPrincipalAmount, setFormPrincipalAmount] = useState('');

    return (
        <React.Fragment>
            <h1>Test</h1>
            <div>
                <span>Stuff</span>
            </div>
            <Form handleSubmit={handleSubmit}>
                <FormTextInput
                    id={'principalAmount'}
                    label={'Principal Amount'}
                    value={formPrincipalAmount}
                    onChange={(e) => setFormPrincipalAmount(e.target.value)}
                />
            </Form>
        </React.Fragment>
    );
};

export default PortfolioBuilder;
