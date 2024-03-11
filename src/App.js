import React from 'react';
import styled from 'styled-components';

import LoanPaymentForm from "./components/forms/LoanPaymentForm";

const AppContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    
    h1 {
        font-size: 32px;
        font-weight: bold;
        margin: 48px 0 0 0;
    }
    
    p {
        font-size: 16px;
    }
`;

const App = () => (
  <AppContainer>
    <h1>One-time Loan Payment</h1>
    <p>Fill out the form below to complete your payment.</p>
    <LoanPaymentForm />
  </AppContainer>
);

export default App;
