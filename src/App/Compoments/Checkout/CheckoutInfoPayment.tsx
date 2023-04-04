import { Col, Row, Space } from 'antd';
import { Fragment } from 'react';
import { Ts } from '../../API/util/util';


//const { carts, priceTotal } = useCart();



const CheckoutInfoPayment = () => {
    return (
        <Fragment>
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <Row>
                    <Col span={8}>
                        <div id="billing-progress-opcheckout">
                            <Ts>ยอดรวมสินค้า</Ts>
                        </div>
                    </Col>
                    <Col span={8} offset={8}>
                        <div id="shipping-progress-opcheckout">
                            {/* <Ts> {currencyFormat(priceTotal)}</Ts> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div id="billing-progress-opcheckout">
                            <Ts>รวมการจัดส่ง</Ts>
                        </div>
                    </Col>
                    <Col span={8} offset={8}>
                        <div id="shipping-progress-opcheckout">
                            {/* <Ts> {currencyFormat(deliveryFree)}</Ts> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div id="billing-progress-opcheckout">
                            <Ts>การชำระเงินทั้งหมด</Ts>
                        </div>
                    </Col>
                    <Col span={8} offset={8}>
                        <div id="shipping-progress-opcheckout">
                            {/* <Ts>{currencyFormat(priceTotal + deliveryFree)}</Ts> */}
                        </div>
                    </Col>
                </Row>
            </Space>
        </Fragment>
    )
}

export default CheckoutInfoPayment