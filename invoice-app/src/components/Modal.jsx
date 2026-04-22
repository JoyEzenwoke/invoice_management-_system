const Modal = ({ children, close }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        // className="bg-white dark:bg-gray-800 p-4 rounded-xl relative shadow-lg w-full max-w-lg"
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-lg"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;