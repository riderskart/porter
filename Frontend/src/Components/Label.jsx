export default function Label(props) {
  return (
    <label
      htmlFor={`${props.htmlFor}`}
      className="block text-md w-fit font-Fredoka heading-text-gray"
    >
      {props.children}
    </label>
  );
}
