import React, { useContext, useState, lazy, Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { storeContext } from './Context/StoreContext';
import 'react-toastify/dist/ReactToastify.css';
import 'dotenv/config'

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const BankDetails = lazy(() => import('./pages/BankDetails/BankDetails'));
const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const DashBoard = lazy(() => import('./pages/DashBoard/DashBoard'));
const Products = lazy(() => import('./pages/Products/Products'));
const AddToCart = lazy(() => import('./pages/AddToCart/AddToCart'));
const VendorSale = lazy(() => import('./pages/VendorSale/VendorSale'));
const ShareAndEarn = lazy(() => import('./pages/ShareAndEarn/ShareAndEarn'));
const ReferUser = lazy(() => import('./pages/ReferUser/ReferUser'));
const AllReferredPatient = lazy(() => import('./pages/AllReferredPatient/AllReferredPatient'));
const ReferPatient = lazy(() => import('./pages/ReferPatient/ReferPatient'));
const Vendor = lazy(() => import('./pages/Vendor/Vendor'));
const VendorEdit = lazy(() => import('./pages/Vendor/VendorEdit/VendorEdit'));
const VendorDelete = lazy(() => import('./pages/Vendor/VendorDelete/VendorDelete'));
const KycPage = lazy(() => import('./pages/KycPage/KycPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));

const App = () => {
  const { token } = useContext(storeContext);
  const [signUp, setSignUp] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div>
      <ToastContainer />
      <div className="flex w-full">
        {token && (
          <div className={`${showSideBar?"sm:w-[30%] md:w-[30%] lg:w-[20%] xl:w-[20%]":"sm:w-[15%] md:w-[12%] lg:w-[12%] xl:w-[8rem]"} h-screen`}>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
            </Suspense>
          </div>
        )}
        <div className={`w-[100%] ${token ?(showSideBar?"sm:w-[70%] md:w-[70%] lg:w-[80%]":"sm:w-[85%] md:w-[88%] lg:w-[88%] xl:w-[90%] "):"w-full"}`}>
          {token && (
            <>
              <Suspense fallback={<div>Loading Navbar...</div>}>
                <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
              </Suspense>
              <hr className="bg-[#343a40] h-[2px]" />
            </>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {token && (
                <>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/addtocart" element={<AddToCart />} />
                  <Route path="/vendorsale" element={<VendorSale />} />
                  <Route path="/bankdetails" element={<BankDetails />} />
                  <Route path="/shareandearn" element={<ShareAndEarn />} />
                  <Route path="/referUser" element={<ReferUser />} />
                  <Route path="/allreferredpatient" element={<AllReferredPatient />} />
                  <Route path="/vendor" element={<Vendor />} />
                  <Route path="/vendor/edit" element={<VendorEdit />} />
                  <Route path="/vendor/delete" element={<VendorDelete />} />
                  <Route path="/kyc" element={<KycPage />} />
                </>
              )}
              
              <Route path={`${token ? "/referpatient" : "/referpatient/:usertoken"}`} element={<ReferPatient />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          {token && (
            <>
              <hr className="bg-[#343a40] h-[2px]" />
              <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(App);


 