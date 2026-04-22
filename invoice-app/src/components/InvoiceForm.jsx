import { useState } from "react";
import { saveInvoices, getInvoices } from "../utils/storage";

const InvoiceForm = ({ closeModal, existingInvoice }) => {
  const [clientName, setClientName] = useState(
    existingInvoice?.clientName || ""
  );
  const [email, setEmail] = useState(
    existingInvoice?.email || ""
  );
  const [total, setTotal] = useState(
    existingInvoice?.total || ""
  );

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!total) {
      newErrors.total = "Total is required";
    } else if (Number(total) <= 0) {
      newErrors.total = "Total must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (status) => {
    if (!validate()) return;

    const existing = getInvoices();
    let updated;

    if (existingInvoice) {
      updated = existing.map((inv) =>
        inv.id === existingInvoice.id
          ? {
              ...inv,
              clientName,
              email,
              total: Number(total),
            }
          : inv
      );
    } else {
      const newInvoice = {
        id: "INV-" + Math.floor(Math.random() * 10000),
        clientName,
        email,
        total: Number(total),
        status,
        date: new Date().toISOString().split("T")[0],
      };

      updated = [newInvoice, ...existing];
    }

    saveInvoices(updated);
    closeModal();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-4 w-full max-w-md mx-auto shadow">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-black dark:text-white">
        {existingInvoice ? "Edit Invoice" : "New Invoice"}
      </h2>

      {/* CLIENT NAME */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
          Client Name
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className={`w-full border p-2 rounded outline-none dark:bg-gray-700 dark:text-white ${
            errors.clientName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.clientName}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
          Client Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border p-2 rounded outline-none dark:bg-gray-700 dark:text-white ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* TOTAL */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
          Total
        </label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className={`w-full border p-2 rounded outline-none dark:bg-gray-700 dark:text-white ${
            errors.total ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.total && (
          <p className="text-red-500 text-xs mt-1">
            {errors.total}
          </p>
        )}
      </div>

      {/* BUTTONS (FIXED MOBILE LAYOUT) */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">

        {!existingInvoice && (
          <>
            <button
              onClick={() => handleSubmit("draft")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded transition w-full"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSubmit("pending")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded transition w-full"
            >
              Save & Send
            </button>
          </>
        )}

        {existingInvoice && (
          <button
            onClick={() => handleSubmit(existingInvoice.status)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition w-full"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;