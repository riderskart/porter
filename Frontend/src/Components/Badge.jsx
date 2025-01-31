import { CheckCircle } from "lucide-react";

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
    <CheckCircle className="w-4 h-4 mr-1" />
    {children}
  </span>
);

export default Badge;