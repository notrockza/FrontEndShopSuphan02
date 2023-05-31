import { Route, Routes } from "react-router-dom";
import { PrivateLogin, PrivateRoute } from "../layout/PrivateRoute";

import { RoleInfo } from "../Model/Role";
import AboutUser from "../Compoments/PageUser/AboutUser";
import RegisterUser from "../Compoments/FormUser/RegisterUSer";
import LoginUser from "../Compoments/FormUser/LoginUser";
import Carts from "../Compoments/Shoppings/Carts";
import ProfileUser from "../Compoments/ProfileUser/ProfileUser";
import DashboardPage from "../Compoments/Private/Dashboard/DashboardPage";
import ProductAdmin from "../Compoments/Private/Product/ProductAdmin";
import Product from "../Compoments/Shoppings/Product";

import Details from "../Compoments/Shoppings/Details";
import ProductAdminform from "../Compoments/Private/Product/ProductAdminform";
import ProductAdminDetails from "../Compoments/Private/Product/ProductAdminDetails";
import UserAdmin from "../Compoments/Private/User/UserAdmin";
import { TestReport } from "../Compoments/Test/TestReport";
import CheckoutPage from "../Compoments/Checkout/CheckoutPage";
import Test from "../Compoments/Test/Test";
import Error404 from "../Compoments/error404/Error404";
import OrderAdmin from "../Compoments/Private/Order/OrderAdmin";
import InformationAdmin from "../Compoments/Private/Information/InformationAdmin";
import InformationAdminform from "../Compoments/Private/Information/InformationAdminform";
import DetailAbout from "../Compoments/PageUser/DetailAbout";


export const mainRoutes = (
  <Routes>
    <Route path="/http://10.103.0.16/cs63/s03/project-end/" element={<AboutUser />} />
    {/* <Route path="/" element={<AboutUser />} /> */}
    <Route path="/detail/:id" element={<DetailAbout />} />
    <Route path='*' element={<AboutUser />} />
    <Route
      path="/login"
      element={
        <PrivateLogin>
          <LoginUser />
        </PrivateLogin>
      }
    />
    <Route
      path="/register"
      element={
        <PrivateLogin>
          <RegisterUser />
        </PrivateLogin>
      }
    />
    <Route element={<PrivateRoute />}>
      <Route path="/checkout" element={<Carts />} />
      <Route path="/profile" element={<ProfileUser />} />
      <Route path='/cart' element={<CheckoutPage />} />
    </Route>
    <Route element={<PrivateRoute roles={[RoleInfo.Admin]} />}>
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/product" element={<ProductAdmin />} />
      <Route path="/admin/product/form" element={<ProductAdminform />} />
      <Route path="/admin/product/detail/:id" element={<ProductAdminDetails />} />
      <Route path="/admin/user" element={<UserAdmin />} />
      <Route path="/admin/order" element={<OrderAdmin />} />
      <Route path="/admin/Information" element={<InformationAdmin />} />
      <Route path="/admin/Information/form" element={<InformationAdminform />} />
      
      
    </Route>
    <Route path="/product" element={<Product />} />
    <Route path="/details/:id" element={<Details />} />
    <Route path="/test" element={<TestReport />} />
    <Route path="/testna" element={<Test />} />

  </Routes>
);
