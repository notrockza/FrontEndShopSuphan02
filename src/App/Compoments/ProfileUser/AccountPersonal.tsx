import { Button, Card, Col, Row } from "antd";
import Input from "antd/es/input/Input";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import agent from "../../API/Agent";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import FooterUser from "../PageUser/FooterUser";
import { ColAccount } from "./ProfileUser";
import "./ProfileUserCss.css";
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchAccount, setAccount } from "../../Stone/accountSlice";
import useUser from "../hooks/useUser";
import { UserOutlined } from '@ant-design/icons';
import { Style } from "@mui/icons-material";

function AccountPersonal() {
  const { account } = useUser();
  //const accountid = JSON.parse(localStorage.getItem("account")!)
  const dispatch = useAppDispatch();
  const [statusInput, setStatusInput] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const values = {
    id: account?.id || account?.id ,
    name: account?.name || account?.name,
    password: account?.password || account?.password,
    email: account?.email || account?.email,
    tell: account?.tell || account?.tell,
    // formFiles: {} || undefined
  };
  

  const handleSubmitForm = async (value: any) => {
    let result;
    result = await agent.Account.update(value);
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
        
      }).then(()=> dispatch(fetchAccount()));
    else {
      Swal.fire({
        position: "center",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        icon: "error",
      });
    }
  };

  return (
    <Formik
      initialValues={values}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        handleSubmitForm(values);
        setStatusInput(!statusInput);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {


        return (
          <Form onSubmit={handleSubmit}>
            <ColAccount className="col-main" >
            <Card bordered={false} >

              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  
                  <h4 className="text-right">ข้อมูลของฉัน</h4>
                </div>


                 {!statusInput ? (
                    <>
                    <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">ชื่อ</label>
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.name && errors.name ? "error" : ""}
                      value={values.name}
                      readOnly
                      style={{backgroundColor:"#ffffff"}}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">อีเมล์</label>
                    <Input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      status={touched.email && errors.email ? "error" : ""}
                      readOnly
                      style={{backgroundColor:"#ffffff"}}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">รหัสผ่าน</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      value="*******"
                      readOnly
                      style={{backgroundColor:"#ffffff"}}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">เบอร์โทร</label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      name="tell"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.tell && errors.tell ? "error" : ""}
                      value={values.tell}
                      readOnly
                      style={{backgroundColor:"#ffffff"}}
                    />
                  </div>
                </div>
                    </>
                  ) : (
                  <>
                  <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">ชื่อ</label>
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.name && errors.name ? "error" : ""}
                      value={values.name}
                      
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">อีเมล์</label>
                    <Input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      status={touched.email && errors.email ? "error" : ""}
                      
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">รหัสผ่าน</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      value="*******"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">เบอร์โทร</label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      name="tell"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.tell && errors.tell ? "error" : ""}
                      value={values.tell}
                      
                    />
                  </div>
                </div>
                  </>
                  )}  


                {/* <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">ชื่อ</label>
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.name && errors.name ? "error" : ""}
                      value={values.name}
                     
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">อีเมล์</label>
                    <Input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      status={touched.email && errors.email ? "error" : ""}

                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">รหัสผ่าน</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      value="*******"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">เบอร์โทร</label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      name="tell"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={touched.tell && errors.tell ? "error" : ""}
                      value={values.tell}
                      
                    />
                  </div>
                </div> */}

                <div className="mt-5 text-center">


                  {!statusInput ? (
                    <Button
                      className="text-st"
                      onClick={() => {setStatusInput(!statusInput)}}
                      type="primary"
                      htmlType="button"
                      icon={<EditOutlined />}
                      size={"middle"}
                    >
                      แก้ไข
                    </Button>
                  ) : (
                    <Button
                      className="text-st"
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                      type="primary"
                      danger
                      icon={<SaveOutlined />}
                      size={"middle"}
                    >
                      บันทึก
                    </Button>
                  )}
                </div>
              </div>
   
              </Card >
              </ColAccount>
              
          </Form>
          
          
        );
      }}
    </Formik>
  );
}

export default AccountPersonal;
