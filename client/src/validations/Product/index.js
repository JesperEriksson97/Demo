import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
  name: yup
    .string()
    .required('Lägg till ett namn för produkten')
    .trim()
    .min(2, 'Produktnamnet måste vara minst två karaktärer långt')
    .max(30, 'Produktnamnet får vara max 30 karaktärer långt'),
  description: yup
    .string()
    .required('Lägg till en beskrivning för produkten')
    .trim()
    .min(2, 'Beskrivningen måste vara minst två karaktärer långt')
    .max(255, 'Beskrivningen får vara max 255 karaktärer långt'),
  categories: yup.array().required('Välj minst en kategori'),
  currency: yup.object().required('Välj en valuta'),
  format: yup.object().required('Välj en enhet för produkten'),
  price: yup
    .number()
    .typeError('Ange ett pris för produkten')
    .positive('Priset måste vara ett postivt nummer')
    .required('Ange ett pris för produkten'),
  stock: yup
    .number()
    .typeError('Ange ett antal produkter i lager')
    .positive('Antal produkter måste vara ett postivt nummer')
    .required('Ange antal produkter i lager'),
  image: yup
    .mixed()
    .test(
      'name',
      'Lägg till en bildfil',
      ([file]) => file && file.name?.length > 0
    )
    .test(
      'size',
      'Filen är för stor',
      ([file]) => file && file.size <= 20000000
    )
    .test(
      'type',
      'Vald fil är inte ett godkänt format',
      ([file]) => file && file.type === 'image/jpeg'
    ),
});

export const updateProductSchema = yup.object().shape({
  name: yup
    .string()
    .required('Lägg till ett namn för produkten')
    .trim()
    .min(2, 'Produktnamnet måste vara minst två karaktärer långt')
    .max(30, 'Produktnamnet får vara max 30 karaktärer långt'),
  description: yup
    .string()
    .required('Lägg till en beskrivning för produkten')
    .trim()
    .min(2, 'Beskrivningen måste vara minst två karaktärer långt')
    .max(255, 'Beskrivningen får vara max 255 karaktärer långt'),
  categories: yup.array().required('Välj minst en kategori'),
  currency: yup.object().required('Välj en valuta'),
  format: yup.object().required('Välj en enhet för produkten'),
  price: yup
    .number()
    .typeError('Ange ett pris för produkten')
    .positive('Priset måste vara ett postivt nummer')
    .required('Ange ett pris för produkten'),
  stock: yup
    .number()
    .typeError('Ange ett antal produkter i lager')
    .positive('Antal produkter måste vara ett postivt nummer')
    .required('Ange antal produkter i lager'),
  image: yup
    .mixed()
    .test(
      'size',
      'Filen är för stor',
      ([file]) => !file || (file && file.size <= 20000000)
    )
    .test(
      'type',
      'Vald fil är inte ett godkänt format',
      ([file]) => !file || (file && file.type === 'image/jpeg')
    ),
});
