import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import Sell from "./pages/Sell";
import Notes from "./pages/Notes";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import ListingDetail from "./pages/ListingDetail";
import AIAssistant from "./components/AIAssistant";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>

      <AIAssistant />
    </BrowserRouter>
  );
}

export default App;