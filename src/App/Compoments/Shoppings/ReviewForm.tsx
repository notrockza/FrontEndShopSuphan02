import { Avatar, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useLocation, useParams } from "react-router-dom";
import agent from "../../API/Agent";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { Review, ReviewRequest } from "../../Model/Review";
import { ReviewValidate } from "./ReviewValidate";
import { GetReviewProduct } from "../../Stone/ReviewSlice";

interface Prop {
    Reviews: Review;
  }

function ReviewForm({ Reviews }: Prop) {
  const { id } = useParams<{ id: any }>();
  const accountid = JSON.parse(localStorage.getItem("account")!);
  const dispatch = useAppDispatch();

  const values : ReviewRequest = {
    productID :id ,
    text : "",
    accountID : accountid.id,
    formFiles: "",
  };

  const handleSubmitForm = async (value: any) => {
    let result;
    result = await agent.Review.Create(value)
    if(result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(()=>dispatch(GetReviewProduct(id)));
      else{
        Swal.fire({
          position: "center",
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถบันทึกข้อมูลได้',
          icon: 'error',
        })
      }
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={ReviewValidate}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log("valuessss",values);
        handleSubmitForm(values)
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
        
        // const props: UploadProps = {
        //   name: "formFiles",
        //   multiple: false,
        //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        //   onChange: (info) => {
        //     if (info.file.status === "uploading") {
        //       setLoading(true);
        //       return;
        //     }
        //     getBase64(info.file.originFileObj as RcFile, (url) => {
        //       setLoading(false);
        //       setImageUrl(url);
        //     });
        //     setFieldValue("formFiles", info.file.originFileObj);
        //   },
        // };

        return (
          <Form onSubmit={handleSubmit}>
            <div className="col-md-16">
              <div className="d-flex flex-column comment-section">
                <div className="d-flex flex-row align-items-start">
                  <Avatar
                    className="rounded-circle "
                    src={accountid.image}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <TextArea
                    className="form-control ml-1 shadow-none textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    status={touched.text && errors.text ? "error" : ""}
                    name="text"
                    value={values.text}
                    placeholder="เเสดงความคิดเห็น"
                  ></TextArea>
                </div>
                <div className="mt-2 text-right">
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="text-danger "
                  />
                </div>

                <div className="text-right" style={{ height : "100px" }}>
                  <button className="btn gradient-btn">ตกลง</button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ReviewForm;
