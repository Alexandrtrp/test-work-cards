import { useEffect } from "react";
import styles from "./Modal.module.css";

type TProps = {
  onClose: () => void;
  product: TProduct;
};

export const Modal: React.FC<TProps> = ({ onClose, product }) => {
  if (!product) return null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <img src={product.image} alt={product.title} className={styles.image} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <b>{product.price} €</b>
        <button type="button" style={{ background: "blue", color: "white" }}>
          Купить
        </button>
      </div>
    </div>
  );
};
