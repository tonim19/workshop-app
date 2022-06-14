import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

interface Props {
  open: boolean;
  children: ReactNode;
}

function Modal({ open, children }: Props) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay">
        <div className="modal">{children}</div>
      </div>
    </>,
    document.getElementById("portal")!
  );
}

export default Modal;
