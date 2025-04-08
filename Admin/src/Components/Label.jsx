export default function Label(props) {
  return (
    <label
      htmlFor={`${props.htmlFor}`}
      className="block mb-2 text-md w-fit font-serif txt-Gray"
    >
      {props.children}
    </label>
  );
}
