import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="block bg-white dark:bg-[#1E2139] rounded-lg shadow hover:shadow-md transition"
    >
      <div className="grid grid-cols-6 items-center gap-4 p-4 text-sm">

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