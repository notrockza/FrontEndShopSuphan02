import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: "./src/assets/img/new/test03.png" },
    { url: "./src/assets/img/new/test03.png" },
    { url: "./src/assets/img/new/test03.png" },
  ];

function SliderUser() {
  return (
    <>
    {/* <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      /> */}
    <section className="slider-area">
                    <div className="slider-active">
                        <div className="single-slider slider-bg fix"
                         style={{ 
                            backgroundImage: `url("https://drive.google.com/uc?id=1hIORzJLzYwc_1KgONvtfup0ferYB9sz2")` 
                          }}
                         >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="slider-content text-center">
                                            <h2 data-animation="fadeInUp" data-delay=".3s">สินค้าชุมชน</h2>
                                            <h6 data-animation="fadeInUp" data-delay=".6s">ศูนย์จำหน่ายสินค้าชุมชน เมืองสุณรรบุรี</h6>
                                            <div className="slider-btn">
                                                <a href="#" className="btn gradient-btn" data-animation="fadeInLeft" data-delay=".9s"><span>+</span> ดูเพิ่มเติม</a>
                                                <a href="product" className="btn transparent-btn" data-animation="fadeInRight" data-delay=".9s">ชื้อสินค้า</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-shape"><img src="https://drive.google.com/uc?id=12PJIitNSKzbrStJl0ItewKwbnfhWOoND" data-animation="fadeInLeft" data-delay="1.1s" alt="" /></div>
                            <div className="slider-shape shape-2"><img src="https://drive.google.com/uc?id=1vPW1uuVUnDLgCOMIJ5avFehDEwFPXmNu" data-animation="fadeInRight" data-delay="1.1s" alt="" /></div>
                        </div>

                        
                        
                    </div>
                    <div className="slider-bottom-bg" data-background="https://drive.google.com/uc?id=1Qkcx04NlPzTQoxfdC8w_dyWXXBbmXsW-"></div>
                </section>
                </>
  )
}

export default SliderUser