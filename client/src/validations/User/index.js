import * as yup from 'yup';

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ogiltig e-postadress')
    .required('Ange en e-postadress'),
  password: yup
    .string()
    .required('Ange ett lösenord')
    .min(7, 'Lösenord måste ha minst sju tecken'),
});

export const signupUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ogiltig e-postadress')
    .required('Ange en e-postadress'),
  password: yup
    .string()
    .required('Ange ett lösenord')
    .min(7, 'Lösenord måste ha minst sju tecken')
    .max(255, 'Lösenord får ha max 255 tecken'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Lösenorden matchar inte')
    .required('Bekräfta ditt lösenord'),
  username: yup
    .string()
    .required('Ange ett användarnamn')
    .min(3, 'Användarnamn måste ha minst tre tecken')
    .max(25, 'Användarnamn får ha högst 25 tecken'),
});

export const updateUserSchema = yup.object().shape({
  firstname: yup.string().required('Ange ditt förnamn'),
  lastname: yup.string().required('Ange ditt efternamen'),
  email: yup
    .string()
    .email('Ogiltig e-postadress')
    .required('Ange en e-postadress'),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(''),
  newPassword: yup
    .string()
    .required('Ange ett nytt lösenord')
    .min(7, 'Lösenord måste ha minst sju tecken'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Lösenorden matchar inte')
    .required('Ange ditt nya lösenord igen')
    .min(7, 'Lösenord måste ha minst sju tecken'),
});

export const becomeProducentSchema = yup.object().shape({
  org_nr: yup
    .string()
    .required('Ange organisationsnummer')
    .trim()
    .matches(/^[0-9]+$/, 'Organisatinsnummer får endast innehålla siffror')
    .min(10, 'Ogiltigt organisationsnummer, för få siffror angivna')
    .max(13, 'Ogiltigt organisationsnummer, för många siffror angivna'),
  name: yup
    .string()
    .required('Ange organisationens namn')
    .min(1, 'Organisationsnamn måste innehålla minst en bokstav'),
  email: yup
    .string()
    .required('Ange en e-postadress')
    .trim()
    .email('Ogiltig e-postadress'),
  phone: yup
    .string()
    .required('Ange ett telefonenummer')
    .trim()
    .matches(/^[0-9]+$/, 'Organisatinsnummer får endast innehålla siffror')
    .min(8, 'Ogitligt telefonnummer, för få siffror angivna')
    .max(10, 'Ogiltigt telefonnummer, för många siffror angivna'),
  street: yup
    .string()
    .required('Ange organisationens adress')
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
  delivPointStreet: yup
    .string()
    .required('Ange organisationens adress')
    .trim()
    .min(1, 'Adressen är för kort')
    .max(255, 'Adressen är för lång'),
  delivPointZip: yup
    .string()
    .required('Ange ditt postnummer')
    .trim()
    .matches(/^[1-9]\d{2} ?\d{2}$/, 'Ogiltigt postnummer'),
  delivPointCity: yup
    .string()
    .required('Ange stad')
    .trim()
    .min(1, 'Ogiltig stad, för kort namn')
    .max(255, 'Ogiltig stad, för långt namn'),
});
