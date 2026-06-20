interface EmptyStateProps {
  message: string;
}

function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border bg-white p-8 text-center">
      <p className="text-gray-500">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;