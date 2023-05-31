import React from 'react'
import {RocketOutlined} from '@ant-design/icons';

function FooterUser() {
    return (
        <footer>
            <div className="footer-top footer-bg fix" style={{ 
      backgroundImage: `url("https://drive.google.com/uc?id=1xQ2eaKfrqomM_KHLNHr1efKqnPpScV93")` 
    }}>
                <div className="container"> 
                    <div className="row justify-content-between">
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="footer-widget mb-50">
                                <div className="footer-logo mb-35">
                                    {/* <a href="index.html"><img src="./src/assets/img/new/logo.png" style={{
        width: '40%', height: '25%'
      }}/></a> */}
                                </div>
                                <div className="footer-text">
                                    {/* <p>Agrifram Farming of relse etras sheets connig passag.</p> */}
                                    <div className="footer-contact">
                                        <ul>
                                            <li> <span>ที่อยู่ : </span>1710/9 หมุ่ 12 อ.อู่ทอง ต.อู่ทอง จ.สุพรรณบุรี</li>
                                            <li> <span>เบอร์โทร : </span>1669</li>
                                            <li><span>อีเมล์ : </span>63123250103@kru.ac.th</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="footer-widget mb-50">
                                <div className="fw-title mb-35">
                                    <h5>สินค้า</h5>
                                </div>
                                <div className="fw-link">
                                    <ul>
                                        <li><a href="#">อาหาร (0)</a></li>
                                        <li><a href="#">ผ้า (0)</a></li>
                                        <li><a href="#">ขนม (0)</a></li>
                                        <li><a href="#">น้ำพริก (0)</a></li>
                                        <li><a href="#">กาเเฟ (0)</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="footer-widget mb-50">
                                <div className="fw-title mb-35">
                                    <h5>ต้องการความช่วยเหลือ?</h5>
                                </div>
                                <div className="footer-blog-post">
                                    <ul>
                                        <li>
                                            <div className="f-blog-post-thumb">
                                                <a href="#"><img width="120xp" src="data:image/jpeg;base64,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" alt="" /></a>
                                            </div>
                                            <div className="f-blog-post-content">
                                                <h5><a href="#">ร้านที่นับได้ว่าเป็นร้านที่มีขนมอร่อย มากที่สุดของจังหวัดสุพรรณบุรี</a></h5>
                                                <span>ร้านสาลี่เอกชัย</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="f-blog-post-thumb">
                                                <a href="#"><img width="120xp" src="http://www.suphan.biz/samchuk18.jpg" alt="" /></a>
                                            </div>
                                            <div className="f-blog-post-content">
                                                <h5><a href="#">   มาสุพรรณจะซื้ออะไรกลับบ้านเป็นของฝากดีล่ะ </a></h5>
                                                <span>ของฝากน่าซื้อ ของจังหวัดสุพรรณบุรี</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="footer-widget mb-50">
                                <div className="fw-title mb-35">
                                    <h5>ติดตาม</h5>
                                </div>
                                {/* <div className="footer-social">
                                    <ul>
                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="footer-widget mb-50">
                                <div className="fw-title mb-30">
                                    <h5>สมัครรับข่าวlki</h5>
                                </div>
                                <div className="footer-newsletter">
                                    <form action="#">
                                        <input type="text" placeholder="กรอกอีเมล์ของคุณ" />
                                        <button><RocketOutlined /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="footer-bottom-shape fb-shape1 running"><img src="./src/assets/img/images/footer_vector01.png" alt="" /></div>
                <div className="footer-bottom-shape fb-shape2"><img src="./src/assets/img/images/footer_vector02.png" alt="" /></div>
                <div className="footer-bottom-shape fb-shape3"><img src="./src/assets/img/images/footer_vector03.png" className="rotateme" alt="" /></div> */}
            </div>
            <div className="copyright-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="copyright-text">
                                {/* <p>Copyright © 2020 <a href="#">Agrifram</a> All Rights Reserved.</p> */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-none d-md-block">
                            <div className="payment-method-list">
                                <ul>
                                    {/* <li><a href="#"><img src="./src/assets/img/icon/visa_2.png" alt="" /></a></li>
                                    <li><a href="#"><img src="./src/assets/img/icon/ae_02.png" alt="" /></a></li>
                                    <li><a href="#"><img src="./src/assets/img/icon/discover.png" alt="" /></a></li>
                                    <li><a href="#"><img src="./src/assets/img/icon/stripe.png" alt="" /></a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default FooterUser