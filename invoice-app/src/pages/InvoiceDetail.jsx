import { useParams, useNavigate } from "react-router-dom";
import { getInvoices, saveInvoices } from "../utils/storage";
import { useState } from "react";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ FIXED HERE

  const invoices = getInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <p className="p-6">Invoice not found</p>;
  }

  // DELETE (ONLY USED INSIDE MODAL NOW)
  const handleDelete = () => {
    const updated = invoices.filter((inv) => inv.id !== id);
    saveInvoices(updated);
    setShowDeleteModal(false);
    navigate("/");
  };

  // MARK AS PAID
  const markAsPaid = () => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "paid" } : inv
    );

    saveInvoices(updated);
    window.location.reload();
  };

  const total = invoice.total || 0;

  return (
    <div className="bg-gray-100 dark:bg-[#141625] min-h-screen p-4 sm:p-8">

      <div className="max-w-4xl mx-auto space-y-4">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-purple-500"
        >
          ← Go Back
        </button>

        {/* STATUS BAR */}
        <div className="flex justify-between items-center bg-white dark:bg-[#1E2139] p-4 rounded-lg">

          <p className="text-gray-500 dark:text-gray-300">
            Status:{" "}
            <span className="font-bold">{invoice.status}</span>
          </p>

          <div className="flex gap-2 flex-wrap">

            {/* EDIT */}
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            {/* DELETE (OPEN MODAL) */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            {/* MARK AS PAID */}
            {invoice.status !== "paid" && (
              <button
                onClick={markAsPaid}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Mark as Paid
              </button>
            )}

          </div>
        </div>

        {/* INVOICE CARD */}
        <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg space-y-6">

          <div>
            <h2 className="text-xl font-bold">#{invoice.id}</h2>
            <p className="text-gray-500">{invoice.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-400">Bill From</p>
              <p>{invoice.street}</p>
              <p>{invoice.city}</p>
              <p>{invoice.country}</p>
            </div>

            <div>
              <p className="text-gray-400">Bill To</p>
              <p>{invoice.clientName}</p>
              <p>{invoice.email}</p>
            </div>

          </div>

          <div>
            <p className="text-gray-400">Invoice Date</p>
            <p>{invoice.date}</p>
          </div>

          <div className="bg-gray-100 dark:bg-[#252945] p-4 rounded">

            <p className="text-gray-400 mb-2">Items</p>

            {invoice.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span>{item.name}</span>
                <span>{item.qty} × ${item.price}</span>
              </div>
            ))}

          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Amount Due</span>
            <span>${total}</span>
          </div>

        </div>

        {/* EDIT MODAL */}
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

        {/* DELETE CONFIRMATION MODAL */}
        {showDeleteModal && (
          <Modal close={() => setShowDeleteModal(false)}>

            <div className="space-y-4">

              <h2 className="text-xl font-bold">
                Confirm Deletion
              </h2>

              <p className="text-gray-400">
                Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          </Modal>
        )}

      </div>
    </div>
  );
};

export default InvoiceDetail;