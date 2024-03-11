import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  loanAccountNumber: Yup.string()
    .matches(/[0-9]+/, 'Loan Account Number must be a number.')
    .required('Loan Account Number is required.'),
  accountType: Yup.string()
    .required('Type of Account is required.'),
  routingNumber: Yup.string().when('accountType', {
    is: 'checking',
    then: (schema) => schema
      .matches(/[0-9]+/, 'Routing Number must be a number.')
      .required('Routing Number is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  bankAccountNumber: Yup.string().when('accountType', {
    is: 'checking',
    then: (schema) => schema
      .matches(/[0-9]+/, 'Bank Account Number must be a number.')
      .required('Bank Account Number is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  confirmBankAccountNumber: Yup.string().when('accountType', {
    is: 'checking',
    then: (schema) => schema
      .required('Bank Account Number is required.')
      .oneOf([Yup.ref('bankAccountNumber')], 'Must match account numbers'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  cardNumber: Yup.string().when('accountType', {
    is: 'debitCard',
    then: (schema) => schema
      .matches(/[0-9]+/, 'Card Number must be a number.')
      .required('Card Number is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  cardholder: Yup.string().when('accountType', {
    is: 'debitCard',
    then: (schema) => schema
      .matches(/[a-zA-Z\s]/, 'Name on Card cannot have numbers')
      .required('Name on Card is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  expirationDate: Yup.string().when('accountType', {
    is: 'debitCard',
    then: (schema) => schema
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})$/, 'Expiration Date must be valid.')
      .required('Expiration Date is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
  cvv: Yup.string().when('accountType', {
    is: 'debitCard',
    then: (schema) => schema
      .matches(/^\d{3}$/, 'CVV must be a three digit number.')
      .required('CVV is required.'),
    else: (schema) => schema.nullable().notRequired(),
  }),
});

export default validationSchema;