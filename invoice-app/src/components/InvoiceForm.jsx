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

  const handleSubmit = (status) => {
    // VALIDATION
    if (!clientName || !email || !total) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (Number(total) <= 0) {
      alert("Total must be greater than 0");
      return;
    }

    const existing = getInvoices();
    let updated;

    // UPDATE
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
      // CREATE
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

    // CLOSE MODAL (NO PAGE RELOAD)
    closeModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-4 w-[300px]">
      <h2 className="text-xl font-bold">
        {existingInvoice ? "Edit Invoice" : "New Invoice"}
      </h2>

      <input
        type="text"
        placeholder="Client Name"
        className="w-full border p-2"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Client Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total"
        className="w-full border p-2"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">
        {!existingInvoice && (
          <>
            <button
              onClick={() => handleSubmit("draft")}
              className="bg-gray-400 px-3 py-2 rounded text-white"
            >
              Draft
            </button>

            <button
              onClick={() => handleSubmit("pending")}
              className="bg-purple-600 px-3 py-2 rounded text-white"
            >
              Send
            </button>
          </>
        )}

        {existingInvoice && (
          <button
            onClick={() => handleSubmit(existingInvoice.status)}
            className="bg-green-600 px-3 py-2 rounded text-white"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;