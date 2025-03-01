export default function Input({
  id,
  type = "text",
  placeholder,
  name,
  value,
  className,
}) {
  return (
    <div className="Name w-72 m-5">
      <input
        // {value? value = {`${value}`}: null}
        id={`${id ?? name}`}
        type={`${type}`}
        className={`border-gray-900/30 border txt-light-brown text-sm rounded-lg block w-5/6  p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none flex justify-center items-center  ${className}`}
        placeholder={`${placeholder}`}
        name={`${name}`}
        required
        {...(value && { value })}
      />
    </div>
  );
}
