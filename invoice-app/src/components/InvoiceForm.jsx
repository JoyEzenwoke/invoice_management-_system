import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveInvoices, getInvoices } from "../utils/storage";

const InvoiceForm = ({ closeModal, existingInvoice }) => {
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(existingInvoice?.clientName || "");
  const [email, setEmail] = useState(existingInvoice?.email || "");
  const [description, setDescription] = useState(existingInvoice?.description || "");

  const [date, setDate] = useState(
    existingInvoice?.date || new Date().toISOString().split("T")[0]
  );

  const [paymentTerms, setPaymentTerms] = useState(
    existingInvoice?.paymentTerms || "Net 30 Days"
  );

  const [street, setStreet] = useState(existingInvoice?.street || "");
  const [city, setCity] = useState(existingInvoice?.city || "");
  const [postCode, setPostCode] = useState(existingInvoice?.postCode || "");
  const [country, setCountry] = useState(existingInvoice?.country || "");

  const [items, setItems] = useState(
    existingInvoice?.items || [{ name: "", qty: 1, price: 0 }]
  );

  const [errors, setErrors] = useState({});

  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  const validate = () => {
    let newErrors = {};

    if (!clientName.trim()) newErrors.clientName = "Required";
    if (!email.includes("@")) newErrors.email = "Valid email required";
    if (!street.trim()) newErrors.street = "Required";
    if (!city.trim()) newErrors.city = "Required";
    if (!postCode.trim()) newErrors.postCode = "Required";
    if (!country.trim()) newErrors.country = "Required";
    if (!description.trim()) newErrors.description = "Required";

    items.forEach((item, i) => {
      if (!item.name.trim()) newErrors[`name${i}`] = "Required";
      if (item.qty <= 0) newErrors[`qty${i}`] = "Invalid";
      if (item.price <= 0) newErrors[`price${i}`] = "Invalid";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = field === "name" ? value : Number(value);
    setItems(updated);
  };

  const handleSubmit = (status) => {
    if (!validate()) return;

    const existing = getInvoices();

    const newInvoice = {
      id: existingInvoice?.id || "INV-" + Math.floor(Math.random() * 10000),
      clientName,
      email,
      description,
      date,
      paymentTerms,
      street,
      city,
      postCode,
      country,
      items,
      total,
      status,
    };

    const updated = existingInvoice
      ? existing.map((inv) => (inv.id === existingInvoice.id ? newInvoice : inv))
      : [newInvoice, ...existing];

    saveInvoices(updated);
    closeModal();
    navigate("/");
  };

  return (
  <div className="bg-white dark:bg-[#1E2139] 
                  text-black dark:text-white 
                  p-6 rounded-lg 
                  w-full max-w-2xl mx-auto 
                  space-y-6">
      {/* TITLE */}
      <h2 className="text-xl font-bold">
        {existingInvoice ? "Edit Invoice" : "New Invoice"}
      </h2>

      {/* BILL FROM */}
      <div className="space-y-2">
        <h3 className="text-purple-500 font-semibold">Bill From</h3>

        <input placeholder="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} />
        {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}

        <div className="grid grid-cols-3 gap-2">
          <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input placeholder="Post Code" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
          <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
      </div>

      {/* BILL TO */}
<div className="space-y-4">
  <h3 className="text-purple-500 font-semibold">Bill To</h3>

  <div>
    <input
      placeholder="Client Name"
      value={clientName}
      onChange={(e) => setClientName(e.target.value)}
      className="w-full p-2 border rounded dark:bg-[#252945] dark:border-gray-600"
    />
    {errors.clientName && (
      <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
    )}
  </div>

  <div>
    <input
      placeholder="Client Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded dark:bg-[#252945] dark:border-gray-600"
    />
    {errors.email && (
      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
    )}
  </div>
</div>

      {/* DATE + TERMS */}
      <div className="grid grid-cols-2 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}>
          <option>Net 1 Day</option>
          <option>Net 7 Days</option>
          <option>Net 14 Days</option>
          <option>Net 30 Days</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <input placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      {/* ITEMS */}
      <div>
        <h3 className="font-semibold">Item List</h3>

        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mt-2">
            <input placeholder="Item Name" value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} />
            <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(i, "qty", e.target.value)} />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(i, "price", e.target.value)} />
          </div>
        ))}

        <button onClick={addItem} className="mt-3 w-full bg-gray-200 dark:bg-gray-700 py-2 rounded">
          + Add New Item
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-right font-bold">
        Total: ${total}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => handleSubmit("draft")} className="bg-gray-500 text-white py-2 rounded w-full">
          Save as Draft
        </button>

        <button onClick={() => handleSubmit("pending")} className="bg-purple-600 text-white py-2 rounded w-full">
          Save & Send
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;