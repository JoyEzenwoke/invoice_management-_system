const Modal = ({ children, close }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* MODAL CONTENT */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg relative w-full max-w-md mx-4 shadow-lg">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;