import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Input({ id, type = "text", placeholder, name, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="Name w-72 m-5 relative">
      <input
        onChange={onChange}
        id={id}
        type={type === "password" && showPassword ? "text" : type}
        className="border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-5/6 p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
        placeholder={placeholder}
        name={name}
        required
        // {...(value && { value })}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
