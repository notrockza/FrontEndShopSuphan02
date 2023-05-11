import {
  Button,
  Input,
  Select,
  Form,
  UploadProps,
  Upload,
  Badge,
  message,
  Row,
  Col,
} from "antd";
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import {
  CloseOutlined,
  CloudUploadOutlined,
  LoadingOutlined,
  RollbackOutlined,
  SaveOutlined,
  DeleteOutlined,
  UploadOutlined 
} from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useAppDispatch, useAppSelector } from "../../../Stone/configureStore";
import { GetCommunityGroup } from "../../../Stone/CommunityGroupSilce";
import { GetCategoryProduct } from "../../../Stone/CategorySilce";
import { GetLevelRaritys } from "../../../Stone/LevelRaritySilce";
import {
  createProductAsync,
  editProductAsync,
  GetProduct,
} from "../../../Stone/productSlice";
import Swal from "sweetalert2";
import { ProductPrivateValidate } from "./ProductPrivateValidate";
import agent from "../../../API/Agent";
import { MailOutlined, InboxOutlined,TagsOutlined ,DollarOutlined,TagOutlined} from "@ant-design/icons";
import useProduct from "../../hooks/useProduct";

const { Option } = Select;

const { TextArea } = Input;
function ProductAdminform() {
  const dispatch = useAppDispatch();
  const { CommunityGroups , CategoryProducts , LevelRaritys }=useProduct();
  const { state } = useLocation();
  console.log("state",state)
  const RemoveImage = () => setImageUrl("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!");
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error("รูปภาพต้องมีขนาดเล็กกว่า 100MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const [imageUrl, setImageUrl] = useState<string>();

  const values = {
    id: state  ? state.key : '',
    name: state ? state.name : "",
    price: state ? state.price : "",
    stock: state ? state.stock : "",
    detail: state ? state.detail : "",
    categoryProductID: state ? state.categoryProductID :  null ,
    communityGroupID: state ? state.communityGroupID : null,
    levelRarityID: state ? state.levelRarityID : null,
    formFiles: "",
  };


  const handleSubmitForm = async (value: any) => {
    let result;
    if(!state) result = await agent.Product.create(value)
    else result = await agent.Product.update(value)
    // if (!state) 
    // result = await dispatch(createProductAsync(value)).unwrap();
    // else result = await dispatch(editProductAsync(value)).unwrap();
    // if (result!.isSuccess)
    if(result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/admin/product")).then(()=>dispatch(GetProduct()));
      if(result.msg === "รหัสซ้ำ")
      Swal.fire({
        position: "center",
        title: 'รหัสสินค้าซ้ำ!',
        icon: 'warning',
      })
  };

const beforeUploadAntd = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <SidebarAdmin>
      <Formik
        initialValues={values}
        validationSchema={ProductPrivateValidate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmitForm(values);
            console.log('values',values)
            setSubmitting(false);
          }, 400);
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
          const props: UploadProps = {
            name: 'formFiles',
            multiple: false,
            onChange: (info) => {
              if (info.file.status === 'uploading') {
                setLoading(true);
                return;
              }
              getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
              });
              setFieldValue("formFiles", info.file.originFileObj);
            }
          };

          return (
            <Form onFinish={handleSubmit}>
              <section className=" project-details-wrap ">
                <div className="contact-wrap pt-10 pb-10">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-xl-10 col-lg-24">
                        <div className="contact-form">
                          <div className="row">
                          
                            <div
                              className="col-md-8"
                              style={{ padding: "7px" }}
                            >
                              <Input
                                size="large"
                                name="name"
                                type="text"
                                placeholder="ชื่อสินค้า"
                                status={
                                  touched.name && errors.name ? "error" : ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                prefix={
                                  <TagOutlined
                                    style={{
                                      color: "#8c8c8c",
                                    }}
                                  />
                                  
                                }
                                
                                // <InboxOutlined /> <TagsOutlined />
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger text-st"
                              />
                            </div>
                            <div
                              className="col-md-2"
                              style={{ padding: "7px" }}
                            >
                              <Input
                                size="large"
                                name="stock"
                                type="number"
                                placeholder="จำนวน"
                                status={
                                  touched.stock && errors.stock ? "error" : ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stock}
                                 prefix={
                                <InboxOutlined
                                  style={{
                                    color: "#8c8c8c",
                                  }}
                                />
                                
                              }
                              />
                              <ErrorMessage
                                name="stock"
                                component="div"
                                className="text-danger text-st"
                              />
                            </div>
                            <div
                              className="col-md-2"
                              style={{ padding: "7px" }}
                            >
                              <Input
                                size="large"
                                name="price"
                                type="number"
                                placeholder="ราคา"
                                status={
                                  touched.price && errors.price ? "error" : ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                prefix={
                                  <DollarOutlined
                                    style={{
                                      color: "#8c8c8c",
                                    }}
                                  />
                                  
                                }
                              />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="text-danger text-st"
                              />
                            </div>
                            <div
                              className="col-md-12"
                              style={{ padding: "7px" }}
                            >
                              <TextArea
                                showCount
                                name="detail"
                                maxLength={100}
                                style={{ height: 120, resize: "none" }}
                                placeholder="รายละเอียด"
                                status={
                                  touched.detail && errors.detail ? "error" : ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.detail}
                                
                                
                              />
                              <ErrorMessage
                                name="detail"
                                component="div"
                                className="text-danger text-st"
                              />
                            </div>

                            <Select
                              // addonAfter={selectAfter}
                              // defaultValue="ประเภท" 
                              className="col-md-4"
                              style={{ padding: "7px" }}
                              size="large"
                              placeholder="ประเภท"
                              status={
                                touched.categoryProductID &&
                                errors.categoryProductID
                                  ? "error"
                                  : ""
                              }
                              value={values.categoryProductID}
                              
                              onChange={(data) => {
                                setFieldValue("categoryProductID", data);
                              }}
                              onBlur={handleBlur}
                              options={CategoryProducts?.map((data) => {
                                return {
                                  value: data.id,
                                  label: data.name,
                                };
                              })}
                            />
                            <ErrorMessage
                              name="categoryProductID"
                              component="div"
                              className="text-danger text-st"
                            />

                            <Select
                              className="col-md-4"
                              style={{ padding: "7px" }}
                              size="large"
                              placeholder="ชื่อกลุ่มชุมชน"
                              value={values.communityGroupID}
                              onBlur={handleBlur}
                              status={
                                touched.communityGroupID &&
                                errors.communityGroupID
                                  ? "error"
                                  : ""
                              }
                              onChange={(data) => {
                                setFieldValue("communityGroupID", data);
                              }}
                              options={CommunityGroups?.map((data) => {
                                return {
                                  value: data.id,
                                  label: data.communityGroupName,
                                };
                              })}
                            />
                            <ErrorMessage
                              name="communityGroupID"
                              component="div"
                              className="text-danger text-st"
                            />

                            <Select
                              className="col-md-4"
                              style={{ padding: "7px" }}
                              size="large"
                              placeholder="ระดับความหายาก"
                              value={values.levelRarityID}
                              onBlur={handleBlur}
                              status={
                                touched.levelRarityID && errors.levelRarityID
                                  ? "error"
                                  : ""
                              }
                              onChange={(data) => {
                                setFieldValue("levelRarityID", data);
                              }}
                              options={LevelRaritys?.map((data) => {
                                return {
                                  value: data.id,
                                  label: data.levelRarityName,
                                };
                              })}
                            />
                            <ErrorMessage
                              name="levelRarityID"
                              component="div"
                              className="text-danger text-st"
                            />

<Upload.Dragger height={250} {...props} beforeUpload={beforeUploadAntd} showUploadList={false} className="col-md-4 mt-3">
                    {!imageUrl ?
                      !state ? (<> <p className="ant-upload-drag-icon">
                        {!loading ? <UploadOutlined style={{ fontSize: "60px" }} /> : <LoadingOutlined style={{ fontSize: "60px" }} />}
                      </p>
                        <p className="ant-upload-text text-st">
                          เพิ่มรูปภาพสินค้า
                        </p> </>)
                        : (<Badge count={<Button
                          type="primary"
                          shape="circle"
                          htmlType='button'
                          danger icon={<CloseOutlined />}
                          onClick={RemoveImage}
                          size="small"
                          style={{ marginLeft: "5px" }} />}>
                          <img
                            src={state.image}
                            className='img-thumbnail'
                            alt='...'
                            style={{ width: '100%', height: "200px" }}
                          />
                        </Badge>) : (<Badge count={<Button
                          type="primary"
                          shape="circle"
                          htmlType='button'
                          danger icon={<CloseOutlined />}
                          onClick={RemoveImage}
                          size="small"
                          style={{ marginLeft: "5px" }} />}>
                          <img
                            src={imageUrl}
                            className='img-thumbnail'
                            alt='...'
                            style={{ width: '100%', height: "200px" }}
                          />
                        </Badge>)}
                  </Upload.Dragger>
                           

                           
                          </div>

                          <div className="mt-5">

                          <Row>
                            <Button type="primary" ghost htmlType="submit" loading={isSubmitting}>ตกลง</Button >
                            <Col span={8}  offset={12}/>
                              
                    
                            <Button htmlType="submit" danger onClick={()=>{navigate("/admin/product")}}>ยกเลิก</Button>
                            </Row>
                            

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>
    </SidebarAdmin>
  );
}

export default ProductAdminform;
