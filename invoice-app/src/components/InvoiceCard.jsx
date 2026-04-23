import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="block bg-white dark:bg-[#1E2139] rounded-lg shadow hover:shadow-md transition p-4"
    >
      {/* MOBILE LAYOUT */}
      <div className="flex flex-col gap-3 sm:hidden">

        {/* TOP */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-black dark:text-white">
            #{invoice.id}
          </p>

          <span
            className={`px-3 py-1 rounded text-xs font-semibold
              ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : invoice.status === "pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {invoice.status}
          </span>
        </div>

        {/* MIDDLE */}
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
          <p>{invoice.date}</p>
          <p className="truncate">{invoice.clientName}</p>
        </div>

        {/* BOTTOM */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-black dark:text-white text-lg">
            ${Number(invoice.total).toFixed(2)}
          </p>

          <span className="text-gray-400">→</span>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden sm:grid grid-cols-6 items-center gap-4 text-sm">

        {/* ID */}
        <p className="font-bold text-black dark:text-white">
          #{invoice.id}
        </p>

        {/* DATE */}
        <p className="text-gray-500 dark:text-gray-300">
          {invoice.date}
        </p>

        {/* CLIENT */}
        <p className="text-gray-700 dark:text-gray-200 truncate">
          {invoice.clientName}
        </p>

        {/* AMOUNT */}
        <p className="font-bold text-black dark:text-white text-right">
          ${Number(invoice.total).toFixed(2)}
        </p>

        {/* STATUS */}
        <div className="flex justify-center">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold
              ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : invoice.status === "pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {invoice.status}
          </span>
        </div>

        {/* ARROW */}
        <div className="text-right text-gray-400">
          →
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard;