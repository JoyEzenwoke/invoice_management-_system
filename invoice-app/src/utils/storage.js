const STORAGE_KEY = "invoices";

// ✅ DEFAULT DATA (8 invoices)
const defaultInvoices = [
  {
    id: "INV-1001",
    clientName: "John Carter",
    email: "john@example.com",
    description: "Website Development",
    date: "2026-04-20",
    paymentTerms: "Net 30 Days",
    street: "12 Main Street",
    city: "New York",
    postCode: "10001",
    country: "USA",
    status: "pending",
    items: [
      { name: "Frontend Dev", qty: 1, price: 1200 },
      { name: "Backend Dev", qty: 1, price: 1500 },
    ],
    total: 2700,
  },
  {
    id: "INV-1002",
    clientName: "Sarah Wilson",
    email: "sarah@example.com",
    description: "UI Design",
    date: "2026-04-18",
    paymentTerms: "Net 14 Days",
    street: "45 King Road",
    city: "London",
    postCode: "E1 3EZ",
    country: "UK",
    status: "paid",
    items: [{ name: "Figma Design", qty: 1, price: 900 }],
    total: 900,
  },
  {
    id: "INV-1003",
    clientName: "Michael Brown",
    email: "michael@example.com",
    description: "Mobile App",
    date: "2026-04-15",
    paymentTerms: "Net 7 Days",
    street: "22 Sunset Blvd",
    city: "Los Angeles",
    postCode: "90001",
    country: "USA",
    status: "draft",
    items: [{ name: "React Native App", qty: 1, price: 2000 }],
    total: 2000,
  },
  {
    id: "INV-1004",
    clientName: "Emily Stone",
    email: "emily@example.com",
    description: "Branding",
    date: "2026-04-12",
    paymentTerms: "Net 30 Days",
    street: "78 Queen Street",
    city: "Toronto",
    postCode: "M5H",
    country: "Canada",
    status: "pending",
    items: [{ name: "Logo Design", qty: 1, price: 700 }],
    total: 700,
  },
  {
    id: "INV-1005",
    clientName: "David Lee",
    email: "david@example.com",
    description: "SEO Optimization",
    date: "2026-04-10",
    paymentTerms: "Net 14 Days",
    street: "10 Orchard Road",
    city: "Singapore",
    postCode: "238801",
    country: "Singapore",
    status: "paid",
    items: [{ name: "SEO Service", qty: 1, price: 600 }],
    total: 600,
  },
  {
    id: "INV-1006",
    clientName: "Anna White",
    email: "anna@example.com",
    description: "Content Writing",
    date: "2026-04-09",
    paymentTerms: "Net 7 Days",
    street: "5 Oxford Street",
    city: "Manchester",
    postCode: "M1",
    country: "UK",
    status: "draft",
    items: [{ name: "Blog Articles", qty: 5, price: 50 }],
    total: 250,
  },
  {
    id: "INV-1007",
    clientName: "Chris Evans",
    email: "chris@example.com",
    description: "E-commerce Setup",
    date: "2026-04-05",
    paymentTerms: "Net 30 Days",
    street: "88 Market Street",
    city: "San Francisco",
    postCode: "94103",
    country: "USA",
    status: "pending",
    items: [{ name: "Shopify Setup", qty: 1, price: 1800 }],
    total: 1800,
  },
  {
    id: "INV-1008",
    clientName: "Sophia Kim",
    email: "sophia@example.com",
    description: "Marketing Campaign",
    date: "2026-04-01",
    paymentTerms: "Net 14 Days",
    street: "12 Gangnam Street",
    city: "Seoul",
    postCode: "06000",
    country: "South Korea",
    status: "paid",
    items: [{ name: "Ads Campaign", qty: 1, price: 1300 }],
    total: 1300,
  },
];

// ✅ GET ALL (WITH AUTO-SEED)
export const getInvoices = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInvoices));
    return defaultInvoices;
  }

  return JSON.parse(data);
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