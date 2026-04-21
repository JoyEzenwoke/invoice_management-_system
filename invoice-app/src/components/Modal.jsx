const Modal = ({ children, close }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;