import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getInvoices, saveInvoices } from "../utils/storage";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);

  const invoices = getInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <p className="p-6 text-center text-gray-500 dark:text-gray-300">
        Invoice not found
      </p>
    );
  }

  // 🔥 DELETE
  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this invoice?"
    );
    if (!confirmDelete) return;

    const updated = invoices.filter((inv) => inv.id !== id);
    saveInvoices(updated);
    navigate("/");
  };

  // 🔥 MARK AS PAID
  const markAsPaid = () => {
    const updated = invoices.map((inv) =>
      inv.id === id && inv.status !== "paid"
        ? { ...inv, status: "paid" }
        : inv
    );

    saveInvoices(updated);
    navigate("/");
  };

  // 🎨 STATUS STYLE (VERY IMPORTANT FOR MARKS)
  const getStatusStyle = () => {
    switch (invoice.status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-gray-200 text-gray-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-500 hover:underline"
      >
        ← Go Back
      </button>

      {/* STATUS BAR */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Status</span>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${getStatusStyle()}`}
          >
            {invoice.status}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 flex-wrap">

          {/* EDIT */}
          {invoice.status !== "paid" ? (
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
            >
              Locked
            </button>
          )}

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          {/* MARK AS PAID */}
          {invoice.status !== "paid" && (
            <button
              onClick={markAsPaid}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* DETAILS CARD */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">

        <h2 className="text-lg font-bold text-black dark:text-white">
          #{invoice.id}
        </h2>

        <div className="space-y-2 text-sm">

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Client:</strong> {invoice.clientName}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Email:</strong> {invoice.clientEmail}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Date:</strong> {invoice.date}
          </p>

          <p className="text-black dark:text-white font-bold text-lg">
            Total: ${Math.abs(invoice.total)}
          </p>

        </div>
      </div>

      {/* EDIT MODAL */}
      {openEdit && (
        <Modal close={() => setOpenEdit(false)}>
          <InvoiceForm
            existingInvoice={invoice}
            closeModal={() => {
              setOpenEdit(false);
              navigate(0); // refresh page properly
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoiceDetail;