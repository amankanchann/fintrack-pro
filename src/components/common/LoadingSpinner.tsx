function LoadingSpinner() {
  return (
    <div className="flex justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
}

export default LoadingSpinner;