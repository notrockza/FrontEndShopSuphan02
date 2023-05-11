

import { Card, Col, Row, Avatar, Space, Dropdown, MenuProps, Button } from 'antd';
import React, { useState ,useEffect } from "react";
// import { currencyFormat, Ts } from '../../app/util/util';
// import LayoutPrivate from './LayoutPrivate';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { useAppDispatch, useAppSelector } from '../../../Stone/configureStore';
import { Ts } from '../../../API/util/util';
import Doughnut3D from '../Charts/Doughnut3D';
import Column3D from '../Charts/Column3D';
import { BsBoxSeam } from 'react-icons/bs';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import useReport from '../../hooks/useReport';
import useProduct from '../../hooks/useProduct';
import useUser from '../../hooks/useUser';
import * as XLSX from 'xlsx';
import { FileExcelOutlined ,PrinterOutlined} from '@ant-design/icons';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import useProducts from '../../app/hooks/useProducts';

ReactFC.fcRoot(FusionCharts, Charts ,FusionTheme);

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const {productStatistics ,salesStatistics}= useReport();
    const {products} = useProduct()
    const {user}=useUser()
    console.log("productStatistics",productStatistics)
    const [typeChart, setTypeChart] = useState<string>("doughnut3d");

    const dataChartProductStatistics: TypeDataChart[] = productStatistics?.map(info => ({
        label: info.product.name,
        value: info.numPercen,
    })) as TypeDataChart[];

    interface TypeDataChart {
        label: any;
        value: any;
        color: any;
    }

    //value: info.product.communityGroupID,

    const dataMonth = [
        {
            key: 1,
            label: "ม.ค.",
            value: 0
        },
        {
            key: 2,
            label: "ก.พ.",
            value: 0
        },
        {
            key: 3,
            label: "มี.ค.",
            value: 0
        },
        {
            key: 4,
            label: "เม.ย.",
            value: 0
        },
        {
            key: 5,
            label: "พ.ค.",
            value: 0
        },
        {
            key: 6,
            label: "มิ.ย.",
            value: 0
        },
        {
            key: 7,
            label: "ก.ค.",
            value: 0
        },
        {
            key: 8,
            label: "ส.ค.",
            value: 0
        },
        {
            key: 9,
            label: "ก.ย.",
            value: 0
        },
        {
            key: 10,
            label: "ต.ค.",
            value: 0
        },
        {
            key: 11,
            label: "พ.ย.",
            value: 0
        },
        {
            key: 12,
            label: "ธ.ค.",
            value: 0
        }
    ];

    const data = dataMonth.map(data => {
        const percent = salesStatistics?.sales.filter(e => e.month === data.key).reduce((curNumber, item) => {
            return curNumber + item.percent;
        }, 0);;
        return {
            label: data.label,
            value: percent
        }
    });

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

const handleOnExport = () => {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataChartProductStatistics); 
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp0data",
  });


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
                        <Button onClick={handlePrint} className="mr-2"><PrinterOutlined style={{}}/>Print</Button>
                        <Button onClick={handleOnExport}><FileExcelOutlined />Excel</Button>
                    </div>
              
                <div ref={componentRef}>
                    <Row gutter={16} >
                        <Col className="gutter-row center" span={12} >
                            <Card title="สถิติสินค้า" extra={DropdownChart01} className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Doughnut3D data={dataChartProductStatistics} ReactFC={ReactFC} typeChart={typeChart} />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติการขาย" className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Column3D data={data} ReactFC={ReactFC} />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        {/* <Col className="gutter-row center" span={12}>
                            <Card title="สถิติสินค้า" extra={DropdownChart01} className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Doughnut3D data={dataChartProductStatistics} ReactFC={ReactFC} typeChart={typeChart} />
                            </Card>
                        </Col> */}
                        {/* <Col className="gutter-row center" span={12}>
                            <Card title="สถิติชุมชน" className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Column3D data={data} ReactFC={ReactFC} />
                            </Card>
                        </Col> */}
                    </Row>
                    
                </div>
            </Space>

        </SidebarAdmin>
    )
}

export default DashboardPage;