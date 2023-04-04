import { Button, Col, Row, UploadProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Stone/configureStore";
import {
  GetProductDetail,
  resetDetailProduct,
} from "../../../Stone/productSlice";
import useProduct from "../../hooks/useProduct";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import { ErrorMessage, Form, Formik } from "formik";
import Swal from "sweetalert2";
import agent from "../../../API/Agent";
import usedetailProduct from "../../hooks/usedetailProduct";
import { Image, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  createDetailProductAsync,
  fetchImageProductsAsync,
  removeImageProductAsync,
  resetImageProduct,
} from "../../../Stone/detailProductSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface StyledDropzoneProps {
  accept?: Accept;
}

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#a0c9ec",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};

function ProductAdminDetails(props: StyledDropzoneProps): JSX.Element {
  const { accept } = props;
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  interface PreviewFile extends File {
    preview: string;
  }

  const thumbsContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb: React.CSSProperties = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const { detailProduct } = useProduct();
  const { imageProducts } = usedetailProduct();

  const { id } = useParams<{ id: any }>();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const images = imageProducts?.map((img) => {
    return (
      <img
        key={img.id}
        src={img?.image}
        style={{ width: "150px" }}
        onClick={() => {
          onDelete(img.id);
        }}
      />
    );
  });
  // window.location.reload();
  const onDelete = (id: any) => {
    dispatch(removeImageProductAsync(id)).then(() => {
      dispatch(fetchImageProductsAsync(detailProduct?.id));
    });
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const values = {
    formFiles: [],
    productID: id,
  };

 


 
  // let filelength : any;
  //  filelength = imageProducts?.length;
  // const test = files.length + filelength;



  const handleSubmitForm = async (value: any) => {
    let result;
    let filelength : any;
    filelength = imageProducts ? imageProducts?.length :0;
    const sumimage = files.length + filelength;



   // result = await agent.ImageProduct.create(value);
  //if (sumimage <= 8 )
   //if (result.msg === "OK")
   if (sumimage <= 8 ){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    })
    .then(async(result) =>  {  result = await agent.ImageProduct.create(value)})
    // .then(() =>  { dispatch(createDetailProductAsync(value))})
    .then(() => { dispatch(fetchImageProductsAsync(id))})
  }
  
    else {
      Swal.fire({
        position: "center",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        icon: "error",
      }).then(() => { dispatch(fetchImageProductsAsync(id))});
    }
  };
  return (
    <Formik
      initialValues={values}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log("values pls", values);
        handleSubmitForm(values);
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
        const { getRootProps, getInputProps } = useDropzone({
          accept: {
            "image/*": [],
          },
          onDrop: (acceptedFiles) => {
            setFieldValue("formFiles", acceptedFiles);
            setFiles(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
            // if(acceptedFiles.length >= 8){
            //   Swal.fire({
            //     position: "center",
            //     title: "เกิดข้อผิดพลาด!",
            //     text: "ไม่สามารถบันทึกข้อมูลได้",
            //     icon: "error",
            //   });
            // }
          },
        });

        return (
          <Form onSubmit={handleSubmit}>
            <SidebarAdmin>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="project-details-wrap">
                      <div className="project-details-content">
                        <img src={detailProduct?.image} width="200px" />
                        <div className="project-details-list mt-40 mb-40">
                          <h4>รายละเอียดสินค้า</h4>
                          <ul>
                            <li>
                              <span>รหัสสินค้า :</span> {detailProduct?.id}
                            </li>
                            <li>
                              <span>ชื่อสินค้า :</span> {detailProduct?.name}
                            </li>

                            <li>
                              <span>จำนวน :</span> {detailProduct?.stock}
                            </li>
                            <li>
                              <span>ราคา :</span> {detailProduct?.price}
                            </li>
                            <li>
                              <span>รายละเอียดสินค้า :</span>{" "}
                              {detailProduct?.detail}
                            </li>
                            <li>
                              <span>ประเถท :</span>{" "}
                              {detailProduct?.categoryName}
                            </li>
                            <li>
                              <span>ชื่อชุมชน :</span>{" "}
                              {detailProduct?.communityGroupName}
                            </li>
                            <li>
                              <span>ระดับความหายาก :</span>{" "}
                              {detailProduct?.levelRarityName}
                            </li>

                            <span>รูปเพิ่มเติม </span>
                          </ul>
                        </div>
                        {images}
                        <div className="d-flex flex-row comment-row">
                          <div className="p-2">
                            <span className="round"></span>
                          </div>

                          <div className="comment-text active w-100 pt-3 ">
                            <section className="container ">
                              <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p>
                                  ลาก 'และ' วางไฟล์รูปถาพที่นี่
                                  หรือคลิกเพื่อเลือกไฟล์
                                </p>
                              </div>
                              <aside style={thumbsContainer}>{thumbs}</aside>
                            </section>
                          </div>
                        </div>
                      </div>

                      {files.length === 0 ? (
                        <div></div>
                      ) : (
                        <>
                          {imageProducts && imageProducts?.length >= 8 ? (
                            <Row>
                              <Tag color="red">ไม่สามารถอัพโหลดเกิน 8 รูป</Tag>
                              <Col span={8} offset={13} />
                              <Button
                                htmlType="submit"
                                danger
                                onClick={() => {
                                  navigate("/admin/product");
                                }}
                              >
                                ยกเลิก
                              </Button>
                            </Row>
                          ) : (
                            <Row>
                              <Button type="primary" ghost htmlType="submit">
                                ตกลง
                              </Button>
                              <Col span={8} offset={12} />

                              <Button
                                htmlType="submit"
                                danger
                                onClick={() => {
                                  navigate("/admin/product");
                                }}
                              >
                                ย้อนกลับ
                              </Button>
                            </Row>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SidebarAdmin>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProductAdminDetails;
