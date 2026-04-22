import { useParams, useNavigate } from "react-router-dom";
import { getInvoices, saveInvoices } from "../utils/storage";
import { useState } from "react";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";
import { formatCurrency } from "../utils/format";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);

  const invoices = getInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p className="p-6">Invoice not found</p>;

  const handleDelete = () => {
    if (!confirm("Delete invoice?")) return;

    const updated = invoices.filter((inv) => inv.id !== id);
    saveInvoices(updated);
    navigate("/");
  };

  const markAsPaid = () => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "paid" } : inv
    );

    saveInvoices(updated);
    window.location.reload();
  };

  return (
    <div className="p-6 space-y-6">

      {/* BACK */}
      <button onClick={() => navigate(-1)} className="text-blue-500">
        ← Go Back
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">

        <div className="flex justify-between items-center">
          <h2 className="font-bold text-black dark:text-white">
            #{invoice.id}
          </h2>

          <span className="px-3 py-1 rounded bg-gray-200 capitalize">
            {invoice.status}
          </span>
        </div>

        <p className="text-gray-500">{invoice.description}</p>

        {/* ADDRESS */}
        <div className="text-sm text-gray-500">
          <p>{invoice.street}</p>
          <p>{invoice.city}</p>
          <p>{invoice.country}</p>
        </div>

        {/* CLIENT */}
        <div className="pt-4 space-y-1">
          <p className="dark:text-gray-200">
            <strong>Client:</strong> {invoice.clientName}
          </p>
          <p className="dark:text-gray-200">
            <strong>Email:</strong> {invoice.email}
          </p>
          <p className="dark:text-gray-200">
            <strong>Date:</strong> {invoice.date}
          </p>
        </div>

        {/* ITEMS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Items</h3>

          {invoice.items?.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-2 text-sm"
            >
              <p>{item.name}</p>
              <p>
                {item.qty} x {formatCurrency(item.price)}
              </p>
              <p>{formatCurrency(item.qty * item.price)}</p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between font-bold text-lg mt-4">
          <p>Total</p>
          <p>{formatCurrency(invoice.total)}</p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 flex-wrap mt-4">
          {invoice.status !== "paid" && (
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          {invoice.status !== "paid" && (
            <button
              onClick={markAsPaid}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* EDIT */}
      {openEdit && (
        <Modal close={() => setOpenEdit(false)}>
          <InvoiceForm
            existingInvoice={invoice}
            closeModal={() => {
              setOpenEdit(false);
              window.location.reload();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoiceDetail;