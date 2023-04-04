import React, { useEffect, useState } from "react";
import SliderUser from "../Silder/SliderUser";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Input, Space } from "antd";
import { LoginValidate } from "./ValidationUser";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { fetchAccount, loginAccount } from "../../Stone/accountSlice";
import FooterUser from "../PageUser/FooterUser";
import HeaderUser from "../PageUser/HeaderUser";

import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { GetProduct } from "../../Stone/productSlice";
import { fetchCartAsync } from "../../Stone/cartSlice";
const value = { email: "", password: "" };

function LoginUser() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitForm = async (data: any) => {
    const result = await dispatch(loginAccount(data)).unwrap();
    if (result.msg === "OK") {
      swal({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        buttons: [false, "ตกลง"],
      })
      .then(() => navigate("/product"))
      .then(()=> dispatch(fetchAccount()))
      //.then(()=> window.location.reload());
    } else {
      swal({
        title: result.msg,
        icon: "warning",
        buttons: [false, "ตกลง"],
      });
    }
  };
  return (
    <>
      <HeaderUser />
      {/* <SliderUser /> */}
      <br />
      <br /><br /><br />
      <br /><br /><br />

      <section className="contact-area project-details-wrap ">
        <div className="contact-wrap pt-10 pb-10">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="section-title text-center mb-70">
                  <h6 className="sub-title">ล็อกอิน</h6>
                  <h2 className="title">
                    <span>เข้าสู่ระบบ</span>สมาชิก{" "}
                  </h2>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-12">
                <div className="contact-form">
                  <Formik
                    validationSchema={LoginValidate}
                    initialValues={value}
                    onSubmit={async (values) => {
                      await new Promise((r) => setTimeout(r, 500));
                      submitForm(values);
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
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12" style={{ margin: "10px" }}>
                            <Input
                              type="text"
                              size="large"
                              status={
                                touched.email && errors.email ? "error" : ""
                              }
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              prefix={
                                <MailOutlined
                                  style={{
                                    color: "#8c8c8c",
                                  }}
                                />
                              }
                              placeholder="อีเมล์ *"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-12" style={{ margin: "10px" }}>
                            <Input.Password
                              size="large"
                              status={
                                touched.password && errors.password
                                  ? "error"
                                  : ""
                              }
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              prefix={
                                <LockOutlined
                                  style={{
                                    color: "#8c8c8c",
                                  }}
                                />
                              }
                              placeholder="รหัสผ่าน "
                              visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                              }}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-check mb-3 mb-md-0"></div>
                        </div>
                        <div className="d-flex flex-row-reverse bd-highlight">
                          {/* <!-- Checkbox --> */}

                          <div className="form-check mb-0">
                            <a href="#!" className="text-body p-2 bd-highlight">
                              ลืมรหัสผ่าน?
                            </a>
                          </div>
                        </div>
                        <button type="submit" className="btn gradient-btn">
                          ตกลง
                        </button>

                        <p className="form-check mb-0 fw-bold mt-2 pt-1 mb-0">
                          ไม่มีบัญชียังงั้นหรอ มัวรออะไรอยู่ล่ะ?{" "}
                          <a href="/register" className="link-danger">
                            สมัครสมาชิก
                          </a>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterUser/>
    </>
  );
}

export default LoginUser;
