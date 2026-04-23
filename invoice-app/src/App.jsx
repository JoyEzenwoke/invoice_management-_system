import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetail from "./pages/InvoiceDetail";
import AppHeader from "./AppHeader";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#141625]">

      {/* HEADER */}
      <AppHeader />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>

    </div>
  );
}

export default App;