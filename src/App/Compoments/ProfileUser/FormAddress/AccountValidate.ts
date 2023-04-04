import * as Yup from 'yup';
const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const AddressValidate = Yup.object().shape({
    subDistrict: Yup.string().required('กรุณาเลือกตำบล'),
    district: Yup.string().required("กรุณาเลือกอำเภอ"),
    province: Yup.string().required("กรุณาเลือกจังหวัด"),
    zipCode:Yup.string().required("กรุณากรอกรหัสไปรษณีย์"),
    accountName:Yup.string().required("กรุณากรอกชื่อผู้รับ") ,
    accountPhoneNumber : Yup.string().required("กรุณากรอกเบอร์โทรศัพท์").matches(phoneRegExp, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
    detail : Yup.string().required('กรุณากรอกรายละเอียด'),
  });