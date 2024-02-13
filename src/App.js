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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="ourstore" element={<OurStore />} />
          <Route path="product/:prodId" element={<SingleProduct />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
