import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import "./ProductList.css";
import ErrorBanner from "./ErrorBanner";

export default function ProductList(props) {
  const { products, loading, error } = useProducts(props.endpoint);
  if (loading) return <div className="product-list loading">Loading products...</div>;
  if (error) return <div className="product-list error">{<ErrorBanner/>}</div>;
  if (products.length === 0) return <div className="product-list empty">{<ErrorBanner/>}</div>;


  return (
    <div className="product-list">
      <h1>{props.title}</h1>
      {props.category ?<div><strong>Category</strong> : {products[0].category}</div>:null}
      {props.search ?<div><strong>Search</strong> : {props.search}</div>:null}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            brand={product.brand}
            stock={product.stock}
            inStock={product.instock}
            category={product.category}
            rating={product.rating}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
