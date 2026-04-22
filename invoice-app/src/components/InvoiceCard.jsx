import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

const InvoiceCard = ({ invoice }) => {
  const statusStyles = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    draft: "bg-gray-200 text-gray-700",
  };

  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="block p-4 rounded-lg shadow bg-white dark:bg-gray-800 hover:shadow-lg transition border border-transparent hover:border-purple-500"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <p className="font-bold text-black dark:text-white">
          #{invoice.id}
        </p>

        <p className="text-gray-500 text-sm">
          {invoice.date}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2">
        <p className="text-gray-700 dark:text-gray-200">
          {invoice.clientName}
        </p>

        <p className="font-bold text-black dark:text-white">
          {formatCurrency(invoice.total)}
        </p>
      </div>

      <div className="mt-3">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
            statusStyles[invoice.status]
          }`}
        >
          {invoice.status}
        </span>
      </div>
    </Link>
  );
};

export default InvoiceCard;