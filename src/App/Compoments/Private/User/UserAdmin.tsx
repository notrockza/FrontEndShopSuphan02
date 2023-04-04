import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React , {useEffect, useState}from 'react'
import { User } from '../../../Model/Account';
import { DeleteUser, GetAccountAll } from '../../../Stone/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../Stone/configureStore';
import SidebarAdmin from '../Sidebar/SidebarAdmin'
import { Radio, Space, Table, Tag,Image ,MenuProps ,Dropdown, Button ,Col} from 'antd';
import { DeleteFilled,PrinterOutlined,FileExcelOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { TestReport } from '../../Test/TestReport';
import { useReactToPrint } from "react-to-print";
import { forwardRef, MutableRefObject, useRef } from "react";
import * as XLSX from 'xlsx';
import { Ts } from '../../../API/util/util';
import agent from '../../../API/Agent';

function UserAdmin() {

  interface DataType {
    key: string;
    name: number;
    email: string;
    password: number;
    tell: number;
    image: string;
    roleName?: string;
    }
  
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User[] | null>(null);

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser = async () => {
    const { data } = await agent.Account.GetAccountAll();
    setUser(data);
  }
 

  const data: DataType[] = user?.map((test: { id: any; name: any; email: any; password: any; tell: any; image: any; roleName: any; }) => ({
    key: test.id,
    name: test.name,
    email: test.email,
    password: test.password,
    tell: test.tell,
    image: test.image,
    roleName: test.roleName,
  })) as unknown as DataType[];


  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อ",
      key: "name",
      render: (_, more) => <Ts>{more.name}</Ts>,
    },
    {
      title: "อีเมล์",
      key: "email",
      render: (_, more) => <Ts>{more.email}</Ts>,
    },
    {
      title: "รูป",
      key: "image",
      render: (_, more) => <Image src={more.image} width={100} />,
    },
    {
      title: "บทบาท",
      key: "roleName",
      render: (_, more) => <Ts>{more.roleName}</Ts>,
    },

    {
      
      title: "การจัดการ",
      key: "action",
      render: (_, data) => {
        const items: MenuProps["items"] = [
          {
            label: "ลบ",
            key: "3",
            icon: <DeleteFilled />,
            className: "text-st",
            style: { color: "#e63946" },
            onClick: () => onDelete(data.key ,data.roleName),
            
            
          },
        ];
        return (
          <Dropdown.Button menu={{ items }} className="text-st">
            <Ts>เลือก</Ts>
          </Dropdown.Button>
        );
      },
    },
  ];

  const handleOnExport = () => {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const onDelete = (id: any ,roleName:any ) => {
    console.log("roleName",roleName)
    if(roleName === 'Admin')
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถลบผู้ดูเเลระบบได้!',
      })
    else
      Swal.fire({
        title: 'ลบผู้ใช้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "ยกเลิก",
        confirmButtonText: 'ตกลง'
      }).then((result: any) => result.isConfirmed && dispatch(DeleteUser(id))).then(()=>{loadUser();})
      
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp0data",
  });

  


  return (
    <SidebarAdmin>
       <h4>ผู้ใช้</h4>
    <Button onClick={handlePrint} className="mr-2"><PrinterOutlined style={{}}/>Print</Button>
    <Button onClick={handleOnExport}><FileExcelOutlined />Excel</Button>
    <div style={{ height: '100vh' }}>
    {/* <TestReport/> */}
    <div>
      <div>
        <Radio.Group
          style={{ marginBottom: 10 }}
          value={top}
        />
      </div>
      <Radio.Group
        style={{ marginBottom: 10 }}
        // options={bottomOptions}
        // value={bottom}
        // onChange={(e) => {
        //   setBottom(e.target.value);
        // }}
      />
      <Table  columns={columns} dataSource={data} ref={componentRef}/>
    </div>

  </div>
    </SidebarAdmin>
  )
}

export default UserAdmin