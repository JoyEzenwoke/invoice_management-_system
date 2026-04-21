import { useState, useEffect } from "react";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceForm from "../components/InvoiceForm";
import Modal from "../components/Modal";
import { getInvoices } from "../utils/storage";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const { theme, toggleTheme } = useTheme();

  const loadInvoices = () => {
    const data = getInvoices();
    setInvoices(data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // FILTER LOGIC
  const filteredInvoices =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="p-4 md:p-6 space-y-4 bg-white dark:bg-gray-900 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

        <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
          Invoices
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">

          {/* DARK MODE */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 border rounded text-sm"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* NEW INVOICE */}
          <button
            onClick={() => setOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            + New Invoice
          </button>

        </div>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2">

        {["all", "draft", "pending", "paid"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-2 text-sm rounded border transition
              ${
                filter === type
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white dark:bg-gray-800 dark:text-white border-gray-300"
              }
            `}
          >
            {type.toUpperCase()}
          </button>
        ))}

      </div>

      {/* LIST */}
      <div className="grid gap-3">

        {filteredInvoices.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No invoices found
          </p>
        ) : (
          filteredInvoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))
        )}

      </div>

      {/* MODAL */}
      {open && (
        <Modal close={() => setOpen(false)}>
          <InvoiceForm
            closeModal={() => {
              setOpen(false);
              loadInvoices();
            }}
          />
        </Modal>
      )}

    </div>
  );
};

export default Home;