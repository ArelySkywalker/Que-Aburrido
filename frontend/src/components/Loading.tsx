import clsx from "clsx";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={clsx(
          "animate-spin rounded-full",
          "h-16 w-16",
          "border-t-4 border-b-4 border-purple-600"
        )}
      />
    </div>
  );
};

export default Loading;
