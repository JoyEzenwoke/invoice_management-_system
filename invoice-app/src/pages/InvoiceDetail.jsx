import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getInvoices, saveInvoices } from "../utils/storage";
import { formatCurrency } from "../utils/format";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);

  const invoices = getInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <p className="p-6">Invoice not found</p>;
  }

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this invoice?");
    if (!confirmDelete) return;

    const updated = invoices.filter((inv) => inv.id !== id);
    saveInvoices(updated);
    navigate("/");
  };

  const markAsPaid = () => {
    const updated = invoices.map((inv) => {
      if (inv.id === id) {
        if (inv.status === "paid") return inv;
        return { ...inv, status: "paid" };
      }
      return inv;
    });

    saveInvoices(updated);
    window.location.reload();
  };

  return (
    <div className="p-6 space-y-4">

      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline"
      >
        ← Go Back
      </button>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">

        <h2 className="text-xl font-bold text-black dark:text-white">
          #{invoice.id}
        </h2>

        <p className="dark:text-gray-200">
          <strong>Client:</strong> {invoice.clientName}
        </p>

        <p className="dark:text-gray-200">
          <strong>Email:</strong> {invoice.email}
        </p>

        <p className="dark:text-gray-200">
          <strong>Total:</strong> {formatCurrency(invoice.total)}
        </p>

        <p className="dark:text-gray-200">
          <strong>Status:</strong>{" "}
          <span className="font-semibold capitalize">
            {invoice.status}
          </span>
        </p>

        <div className="flex gap-2 flex-wrap mt-4">

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
              Edit Locked
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          {invoice.status !== "paid" && (
            <button
              onClick={markAsPaid}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

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