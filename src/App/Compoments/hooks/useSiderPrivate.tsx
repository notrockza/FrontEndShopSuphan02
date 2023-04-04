import React, { useState } from 'react';
import { Image, Layout, Menu, MenuProps } from 'antd';
import { useAppDispatch } from '../../Stone/configureStore';
import { useNavigate } from 'react-router-dom';
import { VscChevronLeft, VscDashboard, VscPackage } from 'react-icons/vsc';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

const useSiderPrivate = () => {

    const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem('แดชบอร์ด', '1', <VscDashboard style={{ fontSize: "20px" }} />,),
    getItem('สินค้า', '2', <VscPackage style={{ fontSize: "20px" }} />),
    getItem('กลับ', '9', <VscChevronLeft style={{ fontSize: "20px" }} />),
  ];
  interface Page {
    key?: string;
  }
  const onPage = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/private/dashboard");
        break;
      case "2":
        navigate("/private/product");
        break;
      case "9":
        navigate("/");
        // dispatch(resetProductParams());
        break;
      default:
        break;
    }
  };
  }
  
  export default useSiderPrivate