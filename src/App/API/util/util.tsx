import { RcFile } from "antd/es/upload";
import { Address } from "../../Model/Address";
import { NumericFormat } from "react-number-format";
import { message } from "antd";

export const Ts = ({ children , className } : any) => <div className={`text-st ${className}`}>{children}</div>

export const convertRole = (roleName: any) => {
  switch (roleName) {
      case "user":
          return "ลูกค้า";
      case "admin":
          return "ผู้ดูแลระบบ";
      default:
          break;
  };
};

export const convertToAddress = (value: Address) => {
    let Result = {};console.log(value,"value อยู่ไหนนิ")
    if (value) {
        Result = {
            id: value.id,
            idInformation: value.addressInformation.id,
            status: value.status,
            subDistrict: value.addressInformation.subDistrict,
            district: value.addressInformation.district,
            province: value.addressInformation.province,
            zipCode: value.addressInformation.zipCode,
            accountName: value.addressInformation.accountName,
            accountPhoneNumber: value.addressInformation.accountPhoneNumber,
            detail: value.addressInformation.detail,            
            accountID: value.account.id
        };
    };
    return Result;
};

export const currencyFormat = (price?: number) => {
    return <NumericFormat
        value={price}
        displayType={"text"}
        thousandSeparator=","
        prefix={"฿"}
    />
};

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const beforeUploadAntd = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
        message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
    }
    return isJpgOrPng && isLt2M;
};

//export const URLSever = "https://localhost:7048/images/";
export const URLSever = "http://10.103.0.16/cs63/s03/project-end/images/"
