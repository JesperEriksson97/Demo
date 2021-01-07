import * as yup from 'yup';

export const schema = yup.object().shape({
  street: yup
    .string()
    .required('Ange din adress')
    .trim()
    .min(1, 'Adressen är för kort')
    .max(255, 'Adressen är för lång'),
  zip: yup
    .string()
    .required('Ange ditt postnummer')
    .trim()
    .matches(/^[1-9]\d{2} ?\d{2}$/, 'Ogiltigt postnummer'),
  city: yup
    .string()
    .required('Ange stad')
    .trim()
    .min(1, 'Ogiltig stad, för kort namn')
    .max(255, 'Ogiltig stad, för långt namn'),
});
