import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import Sell from "./pages/Sell";
import Notes from "./pages/Notes";
import ListingDetail from "./pages/ListingDetail";
import AIAssistant from "./components/AIAssistant";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>

      <AIAssistant />
    </BrowserRouter>
  );
}

export default App;