const LoadingSpinner = () => {
  return (
    <div className="inline-block w-20 h-20">
      <div className="w-16 h-16 mx-auto rounded-full border-4 border-purple-700 border-t-transparent animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
