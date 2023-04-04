import React from "react";
import useOrder from "../hooks/useOrder";
import { ColAccount } from "./ProfileUser";
import { Card, List } from "antd";
import CardOrderSucceed from "./Order/CardOrderSucceed";

function AccountOrdersucceed() {
  const { ordersSucceed } = useOrder();
  return (
    <>
      <ColAccount className="col-main col-sm-9">
        <Card>
          {ordersSucceed?.length !== 0 ? (
            <><CardOrderSucceed/></>
          ) : (
            <>
              {" "}
              <List />
            </>
          )}
        </Card>
      </ColAccount>
    </>
  );
}

export default AccountOrdersucceed;
