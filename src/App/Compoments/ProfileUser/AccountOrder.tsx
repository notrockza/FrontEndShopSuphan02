import { Card, List, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { ColAccount } from "./ProfileUser";
import useOrder from "../hooks/useOrder";
import CardOrder from "./Order/CardOrder";

const AccountOrder = () => {
  const dispatch = useAppDispatch();

  const { orders ,ordersSucceed} = useOrder();
  console.log("ordersv1",ordersSucceed)
  const [orderPage, setOrderPage] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");


  return (
    <>
    <ColAccount className="col-main col-sm-9">
      <Card >

{orders?.length !== 0 ? (

  <><CardOrder/></>
):(

  <>  <List /></>
)}
    
       
      </Card>
    </ColAccount>
    </>
  );
};

export default AccountOrder;

