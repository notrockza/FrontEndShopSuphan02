

import { Card, Col, Row, Avatar, Space, Dropdown, MenuProps } from 'antd';
import React, { useState ,useEffect } from "react";
// import { currencyFormat, Ts } from '../../app/util/util';
// import LayoutPrivate from './LayoutPrivate';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { useAppDispatch, useAppSelector } from '../../../Stone/configureStore';
import { GetProduct } from '../../../Stone/productSlice';
import { Ts } from '../../../API/util/util';
import Doughnut3D from '../Charts/Doughnut3D';
import Column3D from '../Charts/Column3D';
import { BsBoxSeam } from 'react-icons/bs';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import useReport from '../../hooks/useReport';
import useProduct from '../../hooks/useProduct';
import useUser from '../../hooks/useUser';

// import useProducts from '../../app/hooks/useProducts';

ReactFC.fcRoot(FusionCharts, Charts ,FusionTheme);

const chartData = [
    {
        label: "Venezuela",
        value: "290",
        color: "#CB4335"
    },
    {
        label: "Saudi",
        value: "260",
        color: "#633974"
    },
    {
        label: "Canada",
        value: "180",
        color: "#2471A3"
    },
    {
        label: "Iran",
        value: "140",
        color: "#229954"
    },
    {
        label: "Russia",
        value: "115",
        color: "#F1C40F"
    },
    {
        label: "UAE",
        value: "100",
        color: "#E67E22"
    },
    {
        label: "US",
        value: "30",
        color: "#424949"
    },
    {
        label: "China",
        value: "30",
        color: "#1B2631"
    }
];

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const {productStatistics ,salesStatistics}= useReport();
    const {products} = useProduct()
    const {user}=useUser()
    console.log("user",user)
    const [typeChart, setTypeChart] = useState<string>("doughnut3d");

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Ts>โดนัท</Ts>,
            onClick: () => setTypeChart("doughnut3d")

        },
        {
            key: '2',
            label: <Ts>คอลัมน์</Ts>,
            onClick: () => setTypeChart("column3d")
        },
        {
            key: '3',
            label: <Ts>พาย</Ts>,
            onClick: () => setTypeChart("pie3d")
        },
        {
            key: '4',
            label: <Ts>บาร์</Ts>,
            onClick: () => setTypeChart("bar3d")
        },
    ];

    const DropdownChart01 = <Dropdown.Button menu={{ items }} >
        <Ts>เลือก</Ts>
    </Dropdown.Button>;

    return (
         <SidebarAdmin>
            <Space direction='vertical' size={"large"} style={{ display: "flex" }} >
               

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="facts1-item">
                                    <h2><span className="odometer" data-count="15">00</span>+</h2>
                                    <span>จำนวนรายได้</span>
                                 <Avatar className="factss-icon" size={70} src="https://drive.google.com/uc?id=1PUfh3eQH6G7RU5hXL0R_B3p7iQllcHiL" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="facts2-item">
                                    <h2><span className="odometer" data-count="99">{products?.length}</span>+</h2>
                                    <span>จำนวนสินค้า</span>
                                    <Avatar className="factss-icon" size={70} src="https://drive.google.com/uc?id=1PhzdUP9Tlg0AL3sKubkYOdW17N-U1YD-" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="facts3-item">
                                    <h2><span className="odometer" data-count="365">{user?.length}</span>+</h2>
                                    <span>จำนวนสมาชิก</span>
                                    <Avatar className="factss-icon" size={70} src="https://drive.google.com/uc?id=1RvoVUYmOFqcrsfkcc6rjMWZ3W8QhWo43" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="facts4-item">
                                    <h2><span className="odometer" data-count="26">00</span>+</h2>
                                    <span>จำนวนการจัดส่ง</span>
                                    <Avatar className="factss-icon" size={70} src="https://drive.google.com/uc?id=1wBhcG7hDMTDNIbhk-6lybXgrVK_aKK9y" />
                                </div>
                            </div>
                        </div>
                    </div>
              
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติสินค้า" extra={DropdownChart01} className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Doughnut3D data={chartData} ReactFC={ReactFC} typeChart={typeChart} />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติการขาย" className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Column3D data={chartData} ReactFC={ReactFC} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Space>

        </SidebarAdmin>
    )
}

export default DashboardPage;