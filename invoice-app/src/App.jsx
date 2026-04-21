import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;