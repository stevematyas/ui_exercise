import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";

import check from '../../../design-files/check.png';
import cvv from '../../../design-files/cvv.png';
import validationSchema from "./validationSchema";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;

    label {
        font-size: 12px;
        font-weight: bold;

        display: flex;
        flex-direction: column;

        border-bottom: 1px solid lightgray;

        padding: 8px 8px 4px 8px;
    }

    .error {
        color: red;
    }

    input {
        border: none;
        padding: 0;
        margin-top: 8px;
        font-size: 16px;
    }
    
    @media screen and (min-width: 600px) {
        max-width: 80%
    }

    @media screen and (min-width: 900px) {
        max-width: 60%
    }
`;

const DivLabel = styled.div`
    font-size: 12px;
    font-weight: bold;
    padding: 8px 0 8px 8px;
`;

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px;
    background-color: #E6F1FD;
    
    span {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 12px;
    }
    
    @media screen and (min-width: 600px) {
        padding: 0;
        justify-content: center;
        align-content: center;
    }
`;

const ImgFormWrapper = styled.div`
    @media screen and (min-width: 600px) {
        width: 100%;
        display: flex;
        flex-direction: row;
        
        .col1 {
            width: 50%;
            @media screen and (min-width: 600px) {
                label:last-of-type {
                    border-bottom: none;
                }
            }
        }
        
        .col2 {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            width: 50%;
            background-color: #E6F1FD;
            
            @media screen and (min-width: 600px) {
                border-left: 1px solid lightgray;
            }
        }
    }
`;

const RadioContainer = styled.div`
    padding-bottom: 8px;
    border-bottom: 1px solid lightgray;

    .radio {
        display: inline;
        font-size: 14px;
        font-weight: normal;
        border: none;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    text-transform: uppercase;
    margin-top: 24px;
    padding: 12px;
    border: none;
    color: white;
    background-color: teal;
    font-size: 14px;
    font-weight: bold;
    
    @media screen and (min-width: 600px) {
        width: auto;
        padding: 16px 32px;
    }
`;

const StyledErrorMessage = styled(ErrorMessage)`
    font-size: 12px;
    color: red;
    border-bottom: 1px solid lightgray;
    background-color: rgba(255 0 0 / 0.2);
    padding: 2px 8px;
`;

const LoanPaymentForm = () => (
  <Formik
    initialValues={{
      loanAccountNumber: '',
      accountType: 'checking',
      routingNumber: '',
      bankAccountNumber: '',
      confirmBankAccountNumber: '',
      cardNumber: '',
      cardholder: '',
      expirationDate: '',
      cvv: '',
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log(values)}
  >
    {({errors, touched, values}) => (
      <Form>
        <FormContainer>
          <label className={errors.loanAccountNumber && touched.loanAccountNumber && "error"}>
            Loan Account Number
            <Field name="loanAccountNumber"/>
          </label>
          <StyledErrorMessage component="div" name="loanAccountNumber" />

          <ImgFormWrapper>
            <div className="col1">
              <DivLabel
                className={errors.accountType && touched.accountType && "error"}
                id="accountType">
                Type of Account:
              </DivLabel>
              <RadioContainer role="group" aria-labelledby="accountType">
                <label className="radio">
                  <Field type="radio" name="accountType" value="checking"/>
                  Checking
                </label>
                <label className="radio">
                  <Field type="radio" name="accountType" value="debitCard"/>
                  Debit Card
                </label>
              </RadioContainer>
              <StyledErrorMessage name="accountType" />

              {values.accountType === 'checking' &&
                <>
                  <label className={errors.routingNumber && touched.routingNumber && "error"}>
                    Routing Number
                    <Field name="routingNumber"/>
                  </label>
                  <StyledErrorMessage component="div" name="routingNumber"/>

                  <label className={errors.bankAccountNumber && touched.bankAccountNumber && "error"}>
                    Bank Account Number
                    <Field name="bankAccountNumber"/>
                  </label>
                  <StyledErrorMessage component="div" name="bankAccountNumber"/>

                  <label className={errors.confirmBankAccountNumber && touched.confirmBankAccountNumber && "error"}>
                    Confirm Bank Account Number
                    <Field name="confirmBankAccountNumber"/>
                  </label>
                  <StyledErrorMessage component="div" name="confirmBankAccountNumber"/>
                </>
              }
              {values.accountType === 'debitCard' &&
                <>
                  <label className={errors.cardNumber && touched.cardNumber && "error"}>
                    Card Number
                    <Field name="cardNumber"/>
                  </label>
                  <StyledErrorMessage component="div" name="cardNumber"/>

                  <label className={errors.cardholder && touched.cardholder && "error"}>
                    Name On Card
                    <Field name="cardholder"/>
                  </label>
                  <StyledErrorMessage component="div" name="cardholder"/>

                  <label className={errors.expirationDate && touched.expirationDate && "error"}>
                    Expiration Date
                    <Field name="expirationDate"/>
                  </label>
                  <StyledErrorMessage component="div" name="expirationDate"/>

                  <label className={errors.cvv && touched.cvv && "error"}>
                    CVV
                    <Field name="cvv"/>
                  </label>
                  <StyledErrorMessage component="div" name="cvv"/>
                </>
              }
            </div>

            <div className="col2">
              {values.accountType === 'checking' &&
                <ImgContainer>
                  <span>Where can I find the routing and account number?</span>
                  <img src={check} alt="check"/>
                </ImgContainer>
              }
              {values.accountType === 'debitCard' &&
                <ImgContainer>
                  <span>Where can I find the CVV number?</span>
                  <img src={cvv} alt="cvv"/>
                </ImgContainer>
              }
            </div>

          </ImgFormWrapper>
        </FormContainer>

        <SubmitButton type="submit">Make Payment</SubmitButton>
      </Form>
    )}
  </Formik>
);

export default LoanPaymentForm;
