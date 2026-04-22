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

  const [street, setStreet] = useState(existingInvoice?.street || "");
  const [city, setCity] = useState(existingInvoice?.city || "");
  const [country, setCountry] = useState(existingInvoice?.country || "");

  const [items, setItems] = useState(
    existingInvoice?.items || [{ name: "", qty: 1, price: 0 }]
  );

  const [errors, setErrors] = useState({});

  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!clientName.trim()) newErrors.clientName = "Client name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!street.trim()) newErrors.street = "Street is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!country.trim()) newErrors.country = "Country is required";

    if (!description.trim()) newErrors.description = "Description is required";

    if (!date) newErrors.date = "Date is required";

    // ITEMS VALIDATION
    items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`itemName${index}`] = "Item name required";
      }
      if (item.qty <= 0) {
        newErrors[`itemQty${index}`] = "Qty must be > 0";
      }
      if (item.price <= 0) {
        newErrors[`itemPrice${index}`] = "Price must be > 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ADD ITEM
  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  // UPDATE ITEM
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "name" ? value : Number(value);
    setItems(newItems);
  };

  // SUBMIT
  const handleSubmit = (status) => {
    if (!validate()) return;

    const existing = getInvoices();
    let updated;

    const newInvoice = {
      id: existingInvoice?.id || "INV-" + Math.floor(Math.random() * 10000),
      clientName,
      email,
      description,
      date,
      status,
      street,
      city,
      country,
      items,
      total,
    };

    if (existingInvoice) {
      updated = existing.map((inv) =>
        inv.id === existingInvoice.id ? newInvoice : inv
      );
    } else {
      updated = [newInvoice, ...existing];
    }

    saveInvoices(updated);
    closeModal();
    navigate("/");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg space-y-5 overflow-y-auto max-h-[90vh]">

      <h2 className="text-xl font-bold text-black dark:text-white">
        {existingInvoice ? "Edit Invoice" : "New Invoice"}
      </h2>

      {/* CLIENT */}
      <div>
        <input
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className={`w-full p-2 mb-1 border rounded ${
            errors.clientName ? "border-red-500" : ""
          }`}
        />
        {errors.clientName && <p className="text-red-500 text-xs">{errors.clientName}</p>}

        <input
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 mt-2 mb-1 border rounded ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* ADDRESS */}
      <div>
        <input
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className={`w-full p-2 mb-1 border rounded ${
            errors.street ? "border-red-500" : ""
          }`}
        />
        {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}

        <div className="flex gap-2 mt-2">
          <div className="w-full">
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full p-2 mb-1 border rounded ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
          </div>

          <div className="w-full">
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`w-full p-2 mb-1 border rounded ${
                errors.country ? "border-red-500" : ""
              }`}
            />
            {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
          </div>
        </div>
      </div>

      {/* DATE */}
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.date ? "border-red-500" : ""
          }`}
        />
        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <input
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
      </div>

      {/* ITEMS */}
      <div>
        <h3 className="font-semibold">Item List</h3>

        {items.map((item, index) => (
          <div key={index} className="mt-2 space-y-1">
            <input
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              className={`w-full p-2 border rounded ${
                errors[`itemName${index}`] ? "border-red-500" : ""
              }`}
            />
            {errors[`itemName${index}`] && (
              <p className="text-red-500 text-xs">{errors[`itemName${index}`]}</p>
            )}

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors[`itemQty${index}`] ? "border-red-500" : ""
                }`}
              />

              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors[`itemPrice${index}`] ? "border-red-500" : ""
                }`}
              />
            </div>

            {(errors[`itemQty${index}`] || errors[`itemPrice${index}`]) && (
              <p className="text-red-500 text-xs">
                {errors[`itemQty${index}`] || errors[`itemPrice${index}`]}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={addItem}
          className="mt-3 w-full bg-gray-200 py-2 rounded"
        >
          + Add New Item
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-right font-bold">
        Total: ${total}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-2">

        <button
          onClick={() => handleSubmit("draft")}
          className="bg-gray-500 text-white py-2 rounded w-full"
        >
          Save Draft
        </button>

        <button
          onClick={() => handleSubmit("pending")}
          className="bg-purple-600 text-white py-2 rounded w-full"
        >
          Save & Send
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;