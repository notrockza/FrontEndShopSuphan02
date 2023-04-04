import * as Yup from 'yup';
const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const LoginValidate = Yup.object().shape({
  email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(4, "รหัสผ่านต้องมากกว่า 4 ตัว"),
});

export const RegisterValidate = Yup.object().shape({
  name: Yup.string().required('กรุณากรอกชื่อ'),
  email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(4, "รหัสผ่านต้องมากกว่า 4 ตัว"),
  tell: Yup.string().required("กรุณากรอกเบอร์โทร").min(10, "เบอร์โทรต้องมากกว่า 10 ตัว").matches(phoneRegExp,"รูปเเบบเบอร์โทรไม่ถูกต้อง"),
});