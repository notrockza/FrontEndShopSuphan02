import React from "react";
import useInformation from "../../hooks/useInformation";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import { Button, Col, Dropdown, MenuProps, Radio, Table, Tag ,Image} from "antd";
import {
  DeleteFilled,
  EditFilled,
  InfoCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Ts } from "../../../API/util/util";
import { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { DeletInformation, GetInformationAll } from "../../../Stone/InformationSlice";
import { useAppDispatch } from "../../../Stone/configureStore";

function InformationAdmin() {
  const { information } = useInformation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อหัวข้อ",
      key: "name",
      render: (_, more) => <Ts>{more.detaiinformation}</Ts>,
    },
    {
      title: "รูป",
      key: "image",
      render: (_, more) => <Image src={more.image} width={100} />,
    },
    {
      title: "วันที่ประชาสัมพันธ์",
      key: "stock",
      render: (_, more) => <Ts>{more.created}</Ts>,
    },

    {
      
      title: "การจัดการ",
      key: "action",
      render: (_, data) => {
        const items: MenuProps["items"] = [
          {
            label: "แก้ไข",
            key: "1",
            icon: <EditFilled />,
            className: "text-st",
            style: { color: "#ffbe0b" },
            onClick: () =>
              navigate("/admin/Information/form", { state: data }),
          },
         
          {
            label: "ลบ",
            key: "3",
            icon: <DeleteFilled />,
            className: "text-st",
            style: { color: "#e63946" },
            onClick: () => onDelete(data.key),
            
            
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

  const onDelete = (id: any) => {
    console.log("id",id)
    Swal.fire({
      title: 'ลบหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "ยกเลิก",
      confirmButtonText: 'ตกลง'
    }).then((result: any) => result.isConfirmed && dispatch(DeletInformation(id)).then(()=>dispatch(GetInformationAll())))
  };
  
      
  const data: DataType[] = information?.map(data => ({
    key: data.id,
    nameinformation : data.nameinformation,
    detaiinformation : data.detaiinformation,
    created : data.created,
    image : data.image

  })) as unknown as DataType[];

  interface DataType {
    key: number;
    id:               number;
    nameinformation:  string;
    detaiinformation: string;
    created:          Date;
    image:            string;
    }
    

  return (
    <SidebarAdmin>
      <h4>ข้อมูลข่าวสาร</h4>
      <Col
        span={15}
        offset={8}
        style={{ display: "flex", justifyContent: "end" }}
      >
        <h1>
          <Button
            className="text-st"
            type="primary"
            icon={<PlusOutlined />}
            style={{ height: "35px" }}
            onClick={() => navigate("/admin/Information/form")}
          >
            เพิ่มข้อหัวประชาสัมพันธ์
          </Button>
        </h1>
      </Col>
      <div>
        <div>
          <Radio.Group style={{ marginBottom: 10 }} value={top} />
        </div>
        <Radio.Group
          style={{ marginBottom: 10 }}
          // options={bottomOptions}
          // value={bottom}
          // onChange={(e) => {
          //   setBottom(e.target.value);
          // }}
        />
        <Table columns={columns} dataSource={data} />
      </div>
    </SidebarAdmin>
  );
}

export default InformationAdmin;
