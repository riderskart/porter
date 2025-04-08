const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

export default Card;
