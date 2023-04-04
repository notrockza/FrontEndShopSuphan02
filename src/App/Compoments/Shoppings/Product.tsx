import usePagination from "../hooks/usePagination";
import useProduct from "../hooks/useProduct";
import FooterUser from "../PageUser/FooterUser";
import HeaderUser from "../PageUser/HeaderUser";
import SilderProduct from "../Silder/SilderProduct";
import ProductSkeleton from "./ProductCardSkeleton/ProductSkeleton";
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';
import { Card, Pagination } from 'antd'; 
import Meta from "antd/es/card/Meta";

function Product() {
  const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 8 });
  const {products , productsLoaded} = useProduct();
  console.log("products",products)
  const test = products?.map((product)=>
  {
    return(
      <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={product.image}
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
      // avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title={product.name}
      description={product.detail}
    />
    </Card>
    )
  })


  const tests = products?.map((data) => {
    return (
      
      <div className="col-lg-4 col-md-6 col-sm-8 ">
        <div className="shop-item text-center mb-40">
          <div className="shop-thumb mb-20">
            <a href={`/detail/${data.id}`}>
              <img src={data.image} />
              
              <span>หยิบใส่ตะกร้า</span>
            </a>
          </div>
          <div className="shop-item-content">
            <h4>
              <a href="#">{data.name}</a>
            </h4>
            <span className="old-price">
              {/* <del>${data.price}</del> */}
            </span>
            <span className="new-price">฿{data.price}</span>
          </div>
        </div>
      </div>
    );
  })

  return (
    <>
      <HeaderUser />
      <SilderProduct />
      {/* <!-- breadcrumb-area-end --> */}

      {/* <!-- shop-area --> */}
      <section
        className="shop-area shop-bg pb-75 project-details-wrap"
        data-background="./src/assets/img/bg/shop_bg.jpg"
      >
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <div className="shop-action-wrap text-center text-sm-left d-block d-sm-flex align-items-center justify-content-between">
                <div className="shop-action-result">
                  <span>จำนวนสินค้าที่เเสดง ({products?.length})</span>
                </div>
                <div className="shop-action-form">
                  <form action="#">
                    <select className="custom-select">
                      <option>อาหาร</option>
                      <option>เสื้อผ้า</option>
                      <option>เครื้องดื้ม</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {!productsLoaded ? (
              <ProductSkeleton />   
            ) : (
              <div className="row justify-content-center">
             {tests}
            </div>
            )}

{/* {products.length > 0 && <Pagination
    pageSize={pageSize}
    current={current}
    total={products.length}
    onChange={handleChange}
    className="center"
    style={{ marginTop: "30px" }}
/>} */}
         
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default Product;
