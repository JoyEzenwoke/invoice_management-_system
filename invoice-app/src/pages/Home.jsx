import { useState, useEffect } from "react";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceForm from "../components/InvoiceForm";
import Modal from "../components/Modal";
import { getInvoices } from "../utils/storage";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const loadInvoices = () => {
    setInvoices(getInvoices());
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const filteredInvoices =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="bg-gray-100 dark:bg-[#141625] min-h-screen p-4 sm:p-8">

      {/* CENTER CONTAINER (IMPORTANT FIX) */}
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Invoices
            </h1>
            <p className="text-gray-500 text-sm">
              {invoices.length} total invoices
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full"
          >
            + New Invoice
          </button>

        </div>

        {/* FILTER */}
        <div className="flex gap-2 flex-wrap">

          {["all", "draft", "pending", "paid"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded text-sm ${
                filter === type
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {filteredInvoices.length === 0 ? (
            <p className="text-gray-500">No invoices found</p>
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
    </div>
  );
};

export default Home;