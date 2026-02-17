import ReactDOM from "react-dom";

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }){
    
    return show && ReactDOM.createPortal(
        <div className="container-modal">
            <div className="modal">
                <h2>{title}</h2>
                <span>{content}</span>
                <button onClick={onClose}>Chiudi</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        document.body
    )
}