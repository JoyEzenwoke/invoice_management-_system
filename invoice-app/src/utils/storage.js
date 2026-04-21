const STORAGE_KEY = "invoices";

// GET ALL
export const getInvoices = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// SAVE ALL
export const saveInvoices = (invoices) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

// ADD
export const addInvoice = (invoice) => {
  const invoices = getInvoices();
  invoices.unshift(invoice);
  saveInvoices(invoices);
};

// UPDATE
export const updateInvoice = (id, updatedData) => {
  const invoices = getInvoices().map((inv) =>
    inv.id === id ? { ...inv, ...updatedData } : inv
  );
  saveInvoices(invoices);
};

// DELETE
export const deleteInvoice = (id) => {
  const invoices = getInvoices().filter((inv) => inv.id !== id);
  saveInvoices(invoices);
};