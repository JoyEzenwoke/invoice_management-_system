import { useEffect } from "react";

const Modal = ({ children, close }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-white dark:bg-[#141625]"
      onClick={close}
    >
      <div
        className="relative bg-white dark:bg-[#1E2139]
                   p-6 rounded-2xl shadow-2xl
                   w-full max-w-2xl
                   max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500
                     hover:text-black dark:hover:text-white text-lg"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;