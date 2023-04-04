import React, { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../Stone/configureStore";
import AccountPersonal from "./AccountPersonal";
import AccountAddress from "./AccountAddress";
import SetPassword from "./SetPassword";
import AccountPurchase from "./AccountOrder";
import type { MenuProps } from "antd/es/menu";
import { Avatar, Card, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import FooterUser from "../PageUser/FooterUser";
import HeaderUser from "../PageUser/HeaderUser";
import TopSection from "../../layout/TopSection";
import MainContainer from "../../layout/MainContainer";
import { VscLocation, VscAccount, VscLock, VscOutput } from "react-icons/vsc";
import Swal from "sweetalert2";
import AccountOrder from "./AccountOrder";
import AccountOrdersucceed from "./AccountOrdersucceed";
import { FileDoneOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem("ประวัติ", "1", <VscAccount style={{ fontSize: "18px" }} />),
  getItem("ที่อยู่", "2", <VscLocation style={{ fontSize: "18px" }} />),
  getItem("การซื้อของฉัน", "3", <VscOutput style={{ fontSize: "18px" }} />),
  getItem(
    "การสั่งซื้อสำเร็จ",
    "4",
    <FileDoneOutlined style={{ fontSize: "18px" }} />
  ),
];

function ProfileUser() {
  const { Meta } = Card;
  const { state } = useLocation();
  const { account } = useAppSelector((state) => state.account);
  const [menuKey, setMenuKey] = useState<string>("1");

  const handleMenu = (data: any) => setMenuKey(data.key);

  useEffect(() => {
    if (state) setMenuKey(state);
  }, [state]);

  const ShowItem = () => {
    switch (menuKey) {
      case "1":
        return <AccountPersonal />;
      case "2":
        return <AccountAddress />;
      case "3":
        return <AccountOrder />;
      case "4":
        return <AccountOrdersucceed />;
      default:
        return <AccountPersonal />;
    }
  };

  return (
    <>
      {" "}
      <HeaderUser />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <TopSection
        title="บัญชีของฉัน"
        backToPageTitle="หน้าแรก"
        backToPageUrl="/"
        text={""}
      />
      <MainContainer className="col2-layout">
        <div className="row">
          <ColAccount className="col-right sidebar col-sm-3">
            <div className="block block-account">
              <Card>
                <Meta
                  avatar={
                    <Avatar
                      src={account?.image}
                      style={{ width: "50px", height: "50px" }}
                    />
                  }
                  title={account?.name + " " + account?.email}
                  description={
                    <Link to="" onClick={() => setMenuKey("1")}>
                      <EditFilled />
                      แก้ไขข้อมูลส่วนตัว
                    </Link>
                  }
                />
              </Card>
              <Menu
                className="text-st"
                style={{ width: "100%" }}
                defaultSelectedKeys={[state ? state : menuKey]}
                defaultOpenKeys={[state ? state : menuKey]}
                onClick={handleMenu}
                mode={"inline"}
                theme={"light"}
                items={items}
              />
            </div>
          </ColAccount>
          <ShowItem />
        </div>
      </MainContainer>
    </>
  );
}
export const ColAccount = ({ children, className }: any) => (
  <div className={`${className} col-xs-12 wow bounceInUp animated animated`}>
    {children}
  </div>
);

export default ProfileUser;
