import * as Yup from 'yup';

export const InformationPrivateValidate = Yup.object().shape({
    // id: Yup.string().required('กรุณากรอกรหัสสินค้า'),
    nameinformation: Yup.string().required('กรุณากรอกชื่อ'),
    detaiinformation: Yup.string().required("กรุณากรอกคำอธิบาย"),
});

