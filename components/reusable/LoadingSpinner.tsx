import { FiLoader } from "react-icons/fi";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export default function LoadingSpinner({
  size = 22,
  className = "",
  label,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <FiLoader
        size={size}
        className="animate-spin text-[#CE2425]"
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      )}
    </div>
  );
}
