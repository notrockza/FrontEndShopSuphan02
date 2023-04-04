import React from "react";
import FooterUser from "./FooterUser";
import HeaderUser from "./HeaderUser";
import SliderUser from "../Silder/SliderUser";
import { Card, Carousel, Divider, Row } from "antd";
import { Ts } from "../../API/util/util";
import useProduct from "../hooks/useProduct";
import { Collapse } from 'antd';
const { Panel } = Collapse;

function AboutUser() {
  const onChange = (currentSlide: number) => {};
  const contentStyle: React.CSSProperties = {
    height: "380px",
    width: "580px",
  };
  const onChangecollapse = (key: any | any[]) => {
    console.log(key);
  };
  const { Panel } = Collapse;

  const { CommunityGroups } = useProduct();

  const Community = CommunityGroups?.map((text)=>{
    return(
     <>
            <Collapse defaultActiveKey={[1]}  onChange={onChangecollapse} style={{background:"while", color:"whitesmoke"  }}>
        <Panel header={text.communityGroupName} key={text.id}  >
          <p >{text.textHistory}</p>
        </Panel>
      </Collapse>
      {/* <Divider orientation="left"></Divider> */}
      
      </>
    )
  })

  return (
    <>
      <>
        <HeaderUser />
        <SliderUser />
        {/* <!-- slider-area-end --> */}

        {/* <!-- features-area --> */}

        {/* <!-- features-area-end --> */}

        {/* <!-- faq-area --> */}
        <Card>
        <section
          className="faq-area faq-bg pt-120 pb-120"
          data-background="./src/assets/img/bg/faq_bg.jpg"
        >
          
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="faq-image">
                  <Carousel afterChange={onChange} autoplay>
                    <div>
                      <img
                        style={contentStyle}
                        src="https://adaymagazine.com/wp-content/uploads/2019/07/Salee-Wonderland-1.jpg"
                      />
                    </div>
                    <div>
                      <img
                        style={contentStyle}
                        src="https://tharahat.go.th/images_file/71/images/ot2.jpeg"
                      />
                    </div>
                    <div>
                      <img
                        style={contentStyle}
                        src="http://www.suphan.biz/samchuk18.jpg"
                      />
                    </div>
                    <div>
                      <img
                        style={contentStyle}
                        src="https://img.wongnai.com/p/1920x0/2017/08/23/f5128260dbcd4c74aa37d22058488ef7.jpg"
                      />
                    </div>
                    <div>
                      <img
                        style={contentStyle}
                        src="http://www.suphan.biz/souvenir04.jpg"
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="faq-wrap">
                  <div className="section-title mb-50">
                    <h6 className="sub-title">คำถามที่พบบ่อย</h6>
                    <h2 className="title">
                      <span>สินค้าหน้าที่สนใจ</span> ของเเต่ละชุมชน
                    </h2>
                  {/* </div>
                  <div id="accordion">
                    <h3>ร้านสาลี่เอกชัย</h3>
                    <div className="accordion-content">
                      <p>
                        ร้านที่นับได้ว่าเป็นร้านที่มีขนมอร่อย
                        มากที่สุดของจังหวัดสุพรรณบุรี ขนมสาลี่สุพรรณ เปี๊ยะนมข้น
                        ลูกเต๋าไส้งาดำ ครองแครงกรอบ 3 รสนอกจากขนม ยังมีสินค้า
                        ของฝากอีกหลายชนิด ถ้ามาเที่ยวจังหวัดสุพรรณ
                        ก่อนกลับก็คงต้องแวะหาของติดไม้ติดมือไปฝากคนที่บ้าน
                      </p>
                    </div>
                    <h3>ชุมชนสาลี่แม่บ๊วย</h3>
                    <div className="accordion-content">
                      <p>
                        ต้นตำหรับขนม สาลี่สุพรรณ สูตรดั่งเดิม และขนมไทยโบราณ
                        รสชาดอร่อย อีกหนึ่งในตำนานขนมอร่อยของจังหวัดสุพรรณบุรี
                        คงเป็นอีก 1 ร้านที่ต้องแวะซื้อแวะชิม
                        เมื่อได้มาเที่ยวจังหวัดสุพรรณ
                      </p>
                    </div>
                    <h3>ชุมชนตั้งกุ้ยกี่</h3>
                    <div className="accordion-content">
                      <p>
                        ต้นตำหรับ ขนมเปี๊ยะสูตรโบราณ ขนมจันอับ
                        ถ้าได้มาเที่ยวชมตลาดเก้าห้อง 100 ปี ลองแวะไปชิม
                        รับรองว่าคุณต้องติดใจ กับรดชาดดั่งเดิมแถมราคาถูก
                        เหมาะกับเป็นของฝาก
                      </p>
                    </div> */}
                    <div className="pt-3">
                    {Community}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </section>

        </Card>
        {/* <!-- video-area --> */}
        <section
          className="video-area video-bg pt-130"
          style={{
            backgroundImage: `url("https://adaymagazine.com/wp-content/uploads/2019/07/Type-B_Featured-salee-wonderland-scaled.jpg")`,
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="video-wrap">
                  <div className="video-play">
                    <a
                      href="https://www.youtube.com/watch?v=ugNlpcxRGDU"
                      className="popup-video"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                  </div>
                  <div className="section-title white-title text-center mb-70">
                    <h2 className="title">
                      <span>รีวิว</span> ของฝากสุพรรณบุรี
                    </h2>
                  </div>
                </div>
                <div className="newsletter-wrap">
                  <div className="section-title newsletter-title">
                    <h2 className="title">
                      สมัครรับ <span>ข่าวสาร</span>
                    </h2>
                  </div>
                  <div className="newsletter-form">
                    <form action="#">
                      <input
                        type="email"
                        placeholder="ป้อนที่อยู่อีเมลของคุณที่นี่"
                      />
                      <button className="btn gradient-btn">
                        สมัคร <i className="fas fa-rocket"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="video-bottom-shape"
            data-background="./src/assets/img/bg/video_bottom_shape.png"
          ></div>
        </section>
        <section
          className="fact-area fact-bg"
          style={{
            backgroundImage: `url("./src/assets/img/bg/fact_bg.jpg")`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="fact-item">
                  <h2>
                    <span className="odometer" data-count="15">
                      00
                    </span>
                    +
                  </h2>
                  <span>จำนวนรายได้</span>
                  <div className="fact-icon">
                    <i className="flaticon-pistachio"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="fact-item">
                  <h2>
                    <span className="odometer" data-count="99">
                      00
                    </span>
                    +
                  </h2>
                  <span>จำนวนสินค้า</span>
                  <div className="fact-icon">
                    <i className="flaticon-null-1"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="fact-item">
                  <h2>
                    <span className="odometer" data-count="365">
                      00
                    </span>
                    +
                  </h2>
                  <span>จำนวนสมาชิก</span>
                  <div className="fact-icon">
                    <i className="flaticon-grain"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="fact-item">
                  <h2>
                    <span className="odometer" data-count="26">
                      00
                    </span>
                    +
                  </h2>
                  <span>จำนวนการจัดส่ง</span>
                  <div className="fact-icon">
                    <i className="flaticon-placeholder"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterUser />
      </>
    </>
  );
}

export default AboutUser;
