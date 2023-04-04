import * as Yup from 'yup';

export const ReviewValidate = Yup.object().shape({
    text: Yup.string().required('กรุณากรอกข้อความ'),
 
});

