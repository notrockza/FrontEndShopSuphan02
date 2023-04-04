import { useCallback, useEffect, useState } from 'react'
import LoginUser from './App/Compoments/FormUser/LoginUser'
import { Routes ,Route } from 'react-router-dom'
import AboutUser from './App/Compoments/PageUser/AboutUser'
import RegisterUser from './App/Compoments/FormUser/RegisterUSer'
import Product from './App/Compoments/Shoppings/Product'
import Details from './App/Compoments/Shoppings/Details'
import Test from './App/Compoments/Test/Test'
import Carts from './App/Compoments/Shoppings/Carts'

import { useAppDispatch, useAppSelector } from './App/Stone/configureStore'
import { fetchAccount } from './App/Stone/accountSlice'
import { UserMenu } from './App/Compoments/PageUser/UserMenu'

import { fetchCartAsync } from './App/Stone/cartSlice'
import ProfileUser from './App/Compoments/ProfileUser/ProfileUser'
import { mainRoutes } from './App/Routes/Routes'
import { Layout } from 'antd';
import { setShowLayout } from './App/Stone/homeSlice'

import SidebarAdmin from './App/Compoments/Private/Sidebar/SidebarAdmin'
import FooterUser from './App/Compoments/PageUser/FooterUser'
import { ToastContainer } from 'react-toastify';
import HeaderUser from './App/Compoments/PageUser/HeaderUser'
function App() {
  const [count, setCount] = useState(0)
  const pathname = window.location.pathname;
  // const { Sider } = useSiderPrivate();
  const dispatch = useAppDispatch();
  const { showLayout } = useAppSelector(state => state.home);
  const initApp = useCallback(async () => {
    try {
      // user ปัจจุบันคือไคร
      // ตอนรีเฟรดจะเชตค่าใหม่
      await dispatch(fetchAccount())
        .unwrap()
        .then(async (data) => {
          if (data) await dispatch(fetchCartAsync(data.id));
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    var obj = JSON.parse(JSON.stringify(location));
    var path = obj.pathname as string;
    if (!path.includes("/admin")) dispatch(setShowLayout(true));
    else dispatch(setShowLayout(false));
  }, [location, showLayout]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="site-layout">
      {/* {showLayout ? <HeaderUser /> : <></>} */}
      {/* {!pathname.includes("/admin") && <HeaderUser />} */}
       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {mainRoutes}
      {/* {!pathname.includes("/admin") && <FooterUser />} */}
      {/* {showLayout ? <FooterUser /> : ""} */}
    </Layout>
  );
}

export default App

{/* {mainRoutes} */}