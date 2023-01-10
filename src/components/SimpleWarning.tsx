export default function SimpleWarning({
  message,
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      className="alert alert-danger fade show d-flex justify-content-between p-2 ps-3 lh-lg"
      role="alert"
    >
      <span>{message || "Something goes wrong, please come back later"}</span>
      <button
        type="button"
        className="btn btn-sm close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true" onClick={onClose}>
          &times;
        </span>
      </button>
    </div>
  );
}
