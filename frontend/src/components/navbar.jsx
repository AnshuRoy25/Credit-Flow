import { Bell } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-logo">CREDIT FLOW</div>
      <button className="nav-icon">
        <Bell size={20} />
      </button>
    </header>
  );
}
