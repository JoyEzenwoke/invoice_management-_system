import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="block p-4 rounded-lg shadow bg-white dark:bg-gray-800 hover:shadow-md transition"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

        <p className="font-bold text-black dark:text-white">
          #{invoice.id}
        </p>

        <p className="text-gray-500 text-sm">
          {invoice.date}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between mt-2 gap-2">

        <p className="text-gray-700 dark:text-gray-200">
          {invoice.clientName}
        </p>

        <p className="font-bold text-black dark:text-white">
          ${Math.abs(invoice.total)}
        </p>
      </div>

      <div className="mt-2">
        <span className="px-2 py-1 text-xs rounded bg-yellow-200">
          {invoice.status}
        </span>
      </div>
    </Link>
  );
};

export default InvoiceCard;