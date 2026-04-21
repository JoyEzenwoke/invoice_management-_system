# Invoice Management App

##  Live Demo

👉 https://invoice-management-system-qope.vercel.app/

## 📂 GitHub Repository

👉 https://github.com/JoyEzenwoke/invoice_management-_system

---

## 📌 Overview

This is a fully functional Invoice Management Application built with React and Tailwind CSS.

The application allows users to manage invoices with full CRUD functionality, apply filters, toggle themes, and interact with a responsive interface based on a Figma design.

---

## 🎯 Core Features

### ✅ CRUD Functionality

* Create new invoices
* View all invoices
* View detailed invoice information
* Edit existing invoices
* Delete invoices (with confirmation modal)

### ✅ Invoice Status Flow

* Draft
* Pending
* Paid

Rules implemented:

* Draft invoices can be edited
* Pending invoices can be marked as paid
* Paid invoices cannot be edited

---

### ✅ Filtering

Users can filter invoices by:

* All
* Draft
* Pending
* Paid

The list updates instantly based on selected filters.

---

### ✅ Theme Toggle

* Light and Dark mode supported
* Theme preference saved using LocalStorage
* Applies globally across the app

---

### ✅ Data Persistence

* All invoice data is stored in LocalStorage
* Data remains after page refresh

---

### ✅ Responsive Design

* Mobile-first layout
* Tablet and desktop support
* Flexible components with Tailwind CSS

---

### ✅ Interactive UI

* Hover states on buttons and cards
* Clickable invoice cards
* Modal for form interaction

---

## 🏗 Architecture

The application follows a component-based architecture:

* **Pages**

  * Home (Invoice List)
  * InvoiceDetail

* **Components**

  * InvoiceCard
  * InvoiceForm
  * Modal

* **Context**

  * ThemeContext (handles dark/light mode)

* **Utils**

  * storage.js (handles LocalStorage operations)

---

## 🛠 Tech Stack

* React (Vite)
* Tailwind CSS
* React Router
* LocalStorage

---

## ⚖️ Trade-offs

* Used LocalStorage instead of a backend for simplicity and speed
* No authentication system implemented
* Minimal animations to focus on core functionality

---

## ♿ Accessibility

* Semantic HTML used throughout
* Buttons use proper `<button>` elements
* Form inputs include labels
* Good color contrast for readability
* Basic keyboard navigation supported

---

## 🔧 Setup Instructions

Clone the repository:

```bash
git clone https://github.com/JoyEzenwoke/invoice_management-_system.git
cd invoice_management-_system/invoice-app
npm install
npm run dev
```

---

## 🚀 Future Improvements

* Add backend (Node.js / Express / Database)
* User authentication system
* Export invoices as PDF
* Improved animations and UI polish
* Advanced filtering and search

---

