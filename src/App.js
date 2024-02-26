import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OurStore from "./pages/OurStore";
import RequireAuth from "./utils/RequireAuth";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/Singleblog";
import Contacts from "./pages/Contacts";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="ourstore" element={<OurStore />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:prodId" element={<SingleProduct />} />
            <Route path="checkout" element={<CheckOut />} />
            {/*  
            <Route path="blog/:id" element={<SingleBlog />} />
            
            <Route path="blog" element={<Blog />} />
            */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
