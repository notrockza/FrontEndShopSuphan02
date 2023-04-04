import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../API/Agent";
import { ImageProduct, Product } from "../../Model/Product";
import HeaderUser from "../PageUser/HeaderUser";
import { Avatar, Button, Carousel, Image, InputNumber, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { GetProductDetail, resetDetailProduct } from "../../Stone/productSlice";
import Swal from "sweetalert2";
import { addCartItemAsync } from "../../Stone/cartSlice";
import FooterUser from "../PageUser/FooterUser";
import { GetReviewProduct } from "../../Stone/ReviewSlice";
import moment from "moment-timezone";
import TextArea from "antd/es/input/TextArea";
import ReviewForm from "./ReviewForm";
import { Review } from "../../Model/Review";
import {
  fetchImageProductsAsync,
  resetImageProduct,
} from "../../Stone/detailProductSlice";
import usedetailProduct from "../hooks/usedetailProduct";
import useProduct from "../hooks/useProduct";
import useReviews from "../hooks/useReviews";
import useCart from "../hooks/useCart";
import DetailCardskeleton from "./DetailCardskeleton/DetailCardskeleton";

interface IImageGallery {
  original: any;
  thumbnail: any;
  renderItem: any;
}

const contentStyle: React.CSSProperties = {
  // margin: 0,
  height: "500x",
  width: "500px",
  // color: '#FFC0CB',
  // lineHeight: '160px',
  // textAlign: 'center',
  // background: '#364d79',
};

function Details() {
  const dispatch = useAppDispatch();

  //const { carts } = useAppSelector(state => state.crat);
  const { carts , fetchCartAsync } = useCart();
  const { account } = useAppSelector((state) => state.account);

  const [amount, setAmount] = useState<Number | any>(1); // จำนวนสินค้าที่เราจะเพิ่มใส่ตะกร้า

  const item = carts?.find((i) => i.product.id);

  const { imageProducts } = usedetailProduct();
  const { detailProduct , productsdetailLoaded ,productsLoaded} = useProduct();
  const { Reviews } = useReviews();

  const onChange = (currentSlide: number) => {};

  useEffect(() => {
    if (item) setAmount(1);
  }, [item, amount]);

  const AddCart = async (accountId: any, productId: any, amount: any) => {
    if (account) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
       dispatch(
          addCartItemAsync({
            accountId: accountId,
            productId: productId,
            amount: amount,
          })
        ).then(() =>dispatch(fetchCartAsync(account.id)));
      });
    } else
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "กรุณาเข้าสู่ระบบ",
        showConfirmButton: false,
        timer: 1000,
      });
  };

  const imagesdetail = imageProducts?.map((image: any) => {
    return (
      <div >
        <img style={contentStyle} src={image.image} />
      </div>
    );
  });

  const textdetail = imageProducts?.map((text: any) => {
    return (
      <p className="desc-content">
       {text.textDescriptions}
      </p>
    );
  });


  const review = Reviews?.map((revies: any) => {
    return (
      <div className="d-flex flex-row comment-row" key={revies.id}>
        <div className="p-2">
          <span className="round ">
            <Avatar
              src={"https://localhost:7048/images/" + revies.account.image}
              alt="user"
              style={{ width: "50px", height: "50px" }}
            />
          </span>
        </div>

        <div className="comment-text active w-100">
          <h5>{revies.account.name}</h5>

          <div className="comment-footer">
            <span className="date">
              {moment
                .utc(revies.created)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss")}
              {/* {new Date(revies.created.dateTimeEnd).toLocaleString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            })} */}
            </span>
          </div>
          <p className="m-b-5 m-t-10">{revies.text}</p>
        </div>
        <div className="row d-flex ">
          <div className="ml-auto">
            <p className="text">
              {" "}
              {moment.utc(revies.created).local().startOf("seconds").fromNow()}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Fragment >
      {/* <!-- breadcrumb-area --> */}
      <HeaderUser />
      <section
        className="breadcrumb-area breadcrumb-bg breadcrumb-style2"
        style={{
          backgroundImage: `url("/src/assets/img/new/test06.png")`,
        }}
      >
        <div className="container" >
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2>รายละเอียดสินค้า</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">หน้าเเรก</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      รายละเอียด
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- breadcrumb-area-end --> */}

      {/* <!-- shop-details-area --> */}
      
      <section
        className="shop-details-area shop-bg pb-120"
        style={{
          // backgroundImage: `url("./src/assets/img/bg/shop_details_bg.jpg")`,
        }}
      >
        <div className="container" >
          <div className="row">
            <div className="col-12">
              <div className="shop-details-wrap">
                <div className="row align-items-xl-center">
                  <div className="col-lg-6">
                    


                    {!productsLoaded ? (
              <DetailCardskeleton />   
            ) : (
              <Carousel afterChange={onChange} autoplay>
                     {imagesdetail}
                      <div>
                        <img
                          style={contentStyle}
                          src={detailProduct?.image}
                        />
                      </div>
                      
                    </Carousel>

            )}
                    
                  </div>
                  <div className="col-lg-6">
                    <div className="shop-details-content">
                      <h4>{detailProduct?.name}</h4>
                      <div className="shop-details-price">
                        
                        <h4>฿{detailProduct?.price} บาท</h4>


                        <span> </span>
                      </div>
                      <p>จำนวน :{detailProduct?.stock}</p>
                      <p>{detailProduct?.detail}</p>
                      <div className="shop-details-info">
                        <h5>ประเถทสินเค้า</h5>
                        <ul>
                          <li>
                          <Tag color="orange">
                            <i className="fas fa-caret-right"></i>{detailProduct?.categoryName}
                            </Tag>
                          </li>
                      
                          <li>
                          <Tag color="geekblue">
                          <i className="fas fa-caret-right mr-2"></i>
                            {detailProduct?.levelRarityName}
                          </Tag>
                          </li>
                          <li>
                          <Tag color="green">
                       <i className="fas fa-caret-right"></i>ชุมชน {detailProduct?.communityGroupName} 
                          </Tag>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="product-weight">
                                                <h4><i className="fas fa-weight-hanging"></i><span>Size Guide :</span></h4>
                                                <ul>
                                                    <li>1kg</li>
                                                    <li className="active">3kg</li>
                                                    <li>5kg</li>
                                                </ul>
                                            </div> */}
                      <div className="perched-info">
                        <div className="cart-plus">
                          <form action="#">
                            <div className="cart-plus-minus">
                              {/* <input type="text" value="1"/> */}
                              <InputNumber
                                value={amount || 1}
                                min={1}
                                max={detailProduct?.stock}
                                style={{ width: "20xp", height: "38px" }}
                              />
                            </div>
                          </form>
                        </div>
                        <Button
                          className="btn green-btn add-card-btn"
                          onClick={() =>
                            AddCart(account?.id, detailProduct?.id, amount)
                          }
                        >
                          เพื่มลงในกระกร้า
                        </Button>
                      </div>
                      {/* <div className="shop-details-bottom">
                                                <h5><a href="#"><i className="far fa-heart"></i> Add To Wishlist</a></h5>
                                                <ul>
                                                    <li>
                                                        <span>Tag: </span>
                                                        <a href="#">clothing</a>
                                                    </li>
                                                    <li>
                                                        <span>CATEGORIES :</span>
                                                        <a href="#">Avocado,</a>
                                                        <a href="#">Trange,</a>
                                                        <a href="#">apple,</a>
                                                        <a href="#">snack fruit</a>
                                                    </li>
                                                </ul>
                                            </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="product-desc-wrap">
                <ul className="nav nav-tabs mb-50" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="desc-tab"
                      data-toggle="tab"
                      href="#desc"
                      role="tab"
                      aria-controls="desc"
                      aria-selected="true"
                    >
                      รายละเอียดเพื่มเติม
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="review-tab"
                      data-toggle="tab"
                      href="#review"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                    >
                      เเสดงความคิดเห็น ({Reviews?.length}) <span>
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade  show active"
                    id="desc"
                    role="tabpanel"
                    aria-labelledby="desc-tab"
                  >
                    <h5 className="desc-title">{detailProduct?.communityGroupName} </h5>
                    <p className="desc-content">
                    {detailProduct?.textHistory}
                    </p>

                  
                  </div>
                  <div
                    className="tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                  >
                    {review}

                    {account !== null ? (
                      <ReviewForm Reviews={Reviews as unknown as Review} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- shop-details-area-end --> */}
      <FooterUser />
    </Fragment>
  );
}

const RenderItem = (image: string) => (
  <div className="product-full">
    <div>
      <img style={contentStyle} src={image} />
    </div>
  </div>
);

export default Details;
