import { FaTaxi } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="border-b border-gray-200 p-5">
      <div className="container mx-auto">
        <div className="logo flex items-center text-2xl gap-4">
          <FaTaxi />
          GoTaxi
        </div>
      </div>
    </header>
  );
}
