import LoadingSpinner from "./LoadingSpinner";

export default function NavigationOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-10 py-8">
        <LoadingSpinner size={28} label="Loading" />
      </div>
    </div>
  );
}
