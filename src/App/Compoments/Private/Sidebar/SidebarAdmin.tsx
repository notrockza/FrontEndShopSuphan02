import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  RollbackOutlined,
  DashboardOutlined,
  UserOutlined,
  FileDoneOutlined,
  ExceptionOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme, MenuProps } from "antd";
import ProductAdmin from "../Product/ProductAdmin";
import DashboardPage from "../Dashboard/DashboardPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Stone/configureStore";
import { resetProductParams } from "../../../Stone/productSlice";

const { Header, Sider, Content } = Layout;

function SidebarAdmin({ children }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  interface Page {
    key?: string;
  }

  const items: MenuItem[] = [
    getItem(
      "แดชบอร์ด",
      "1",
      <DashboardOutlined style={{ fontSize: "20px" }} />
    ),
    getItem("รายการสินค้า", "2", <InboxOutlined style={{ fontSize: "20px" }} />),
    getItem('รายชื่อผู้ใช้', '3', <UserOutlined style={{ fontSize: "20px" }} />),
    getItem('ยืนยันรายการสินค้า', '4', <ExceptionOutlined style={{ fontSize: "20px" }} />),
    getItem("กลับ", "9", <RollbackOutlined style={{ fontSize: "20px" }} />),
  ];
<SidebarAdmin></SidebarAdmin>
  const onPage = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/admin/dashboard");
        break;
      case "2":
        navigate("/admin/product");
        break;
      case "3":
        navigate("/admin/user");
        break;
        case "4":
          navigate("/admin/order");
          break;
      case "9":
        navigate("/");
        dispatch(resetProductParams());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "#242424" }}
        >
          <div className="logo" />
          {/* <a><img src="https://drive.google.com/uc?id=1DHaW3RxnuK9ftbDwb1dMQMXhF15RAxEm" alt="logo" className="" /></a> */}
          <Menu
            style={{ backgroundColor: "#242424" }}
            onClick={(e) => onPage({ key: e.key })}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default SidebarAdmin;
