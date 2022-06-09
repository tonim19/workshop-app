import { ReactComponent as Logo } from "../../assets/images/svg/logo.svg";
import "./header.css";
import { useNavigate } from "react-router-dom";
import Cart from "../Cart";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <Logo onClick={() => navigate("/")} className="logo" />
      <Cart />
    </header>
  );
}

export default Header;
