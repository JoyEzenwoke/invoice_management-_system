
# Invoice Management App

##  Live Demo
https://invoice-management-system-qope.vercel.app/

##  GitHub Repository
https://github.com/JoyEzenwoke/invoice_management-_system

---

##  Overview

This is a fully functional **Invoice Management Application** built with **React (Vite) and Tailwind CSS**, based on a Figma design.

The app allows users to create, manage, and track invoices with a clean UI, theme support, and persistent local storage.

All monetary values are displayed in **USD ($)**.

---

##  Core Features

### Invoice Management (CRUD)
- Create new invoices
- View invoice list
- View detailed invoice receipt page
- Edit invoices 
- Delete invoices with confirmation modal

---

###  Invoice Status Flow
Invoices follow this lifecycle:

- Draft
- Pending
- Paid

### Rules:
- Draft → can be edited or sent
- Pending → can be marked as Paid
- Paid → cannot be edited

---

###  Currency Handling
- All totals are displayed in **USD ($)**
- Item-based calculation system included
- Automatic total updates

---

###  Filtering System
Users can filter invoices by:
- All
- Draft
- Pending
- Paid

---

###  Theme Support
- Light / Dark mode toggle
- Theme stored in LocalStorage
- Applies globally across all pages

---

###  Data Persistence
- Uses LocalStorage for saving invoices
- Data persists after refresh
- No backend required

---

###  Responsive Design
- Fully mobile responsive
- Tablet and desktop optimized
- Modal-based form layout for better UX

---

###  Invoice Receipt View
Each invoice includes:
- Client details
- Sender details
- Invoice date
- Payment terms
- Item breakdown
- Total amount due

---

###  Delete Confirmation System
- Custom modal confirmation
- Cancel or Delete option
- Prevents accidental deletion

---

### ✔️ Mark as Paid
- Pending invoices can be marked as paid instantly
- Updates UI without page reload

---

##  Architecture

The project is structured using a component-based architecture:

### Pages
- Home (Invoice List)
- InvoiceDetail

### Components
- InvoiceCard
- InvoiceForm
- Modal
- Theme Toggle Component

### Context
- ThemeContext (Dark / Light mode handling)

### Utilities
- storage.js (LocalStorage operations)
- format.js (Currency formatting - USD)

---

## Tech Stack

- React (Vite)
- Tailwind CSS
- React Router DOM
- LocalStorage API
- JavaScript (ES6+)

---

## ⚖️ Trade-offs

- Used LocalStorage instead of backend for simplicity
- No authentication system implemented
- Minimal animations to focus on functionality
- Currency fixed to USD (no multi-currency support)

---

## ♿ Accessibility

- Semantic HTML used
- Proper button elements
- Form validation included
- Clear error messages
- Good contrast in dark/light modes

---

## 🔧 Setup Instructions

### Clone repository
```bash
git clone https://github.com/JoyEzenwoke/invoice_management-_system.git
cd invoice_management-_system/invoice-app
