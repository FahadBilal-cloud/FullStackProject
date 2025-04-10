import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignIn";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUp";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import Toaster from "./component/Toaster";
import ProtectedLayout from "./component/ProtectedLayout";
import { AppDispatch } from "./store/store";
import { setUser } from "./store/authSlice";
import { useEffect } from "react";
import GoogleAuthHandler from "./component/GoogleHandler";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout/Layout";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import AccountPage from "./pages/AccountPage";
import ErrorPage from "./pages/ErrorPage";
import WishlistPage from "./pages/WishlistPage";
import ProductdetailPage from "./pages/ProductdetailPage";
import SuccessPage from "./pages/SuccessPage";

const AppWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Parent Route with Layout for all children */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/google/callback" element={<GoogleAuthHandler />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/cart"element={
            <ProtectedLayout>
              <CartPage />
            </ProtectedLayout>
          } />
        <Route path="/checkOut" element={
            <ProtectedLayout>
              <CheckOutPage />
            </ProtectedLayout>
          } />
        <Route path="/MyAccount" element={
            <ProtectedLayout>
              <AccountPage />
            </ProtectedLayout>
          } />
        <Route path="/wishlist" element={
            <ProtectedLayout>
              <WishlistPage />
            </ProtectedLayout>
          } />
        <Route path="/productDetail" element={
            <ProtectedLayout>
              <ProductdetailPage />
            </ProtectedLayout>
          } />
        <Route path="/error" element={<ErrorPage/>} />

        {/* Nested Protected Routes inside Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        ></Route>
        <Route
          path="/success"
          element={
            <ProtectedLayout>
              <SuccessPage />
            </ProtectedLayout>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <AppWrapper />
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
