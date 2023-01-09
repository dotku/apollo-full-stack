export default function SimpleWarning({
  message,
  slog,
}: {
  message?: string;
  slog?: string;
}) {
  // @todo send slog message to server for tracking issue
  return (
    <div className="bg-warning text-gray p-2">
      {message || "Something goes wrong, please come back later"}
    </div>
  );
}
