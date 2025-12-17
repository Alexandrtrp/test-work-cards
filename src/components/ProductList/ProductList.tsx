import { useEffect, useState } from "react";
import { getProducts } from "../../api/productsApi";
import { Modal } from "../Modal/Modal";

import styles from "./ProductList.module.css";

export const ProductList = () => {
  const [products, setProducts] = useState<TProduct[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [modalProduct, setModalProduct] = useState<TProduct | null>(null);

  const filteredProducts = filter
    ? products.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      )
    : products;

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <input
        type="text"
        placeholder="Введите название товара"
        style={{ width: "200px", alignSelf: "center", padding: "0.5rem" }}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={styles.products}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setModalProduct(product)}
            className={styles.card}
          >
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <b>{product.price} €</b>
          </div>
        ))}
      </div>
      {modalProduct && (
        <Modal
          onClose={() => {
            setModalProduct(null);
          }}
          product={modalProduct}
        />
      )}
    </div>
  );
};
