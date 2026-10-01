import "./Home.css";
import { useState,useContext} from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import ProductList from "../Components/ProductList";
import CategoryList from "../Components/CategoryList";
import { SearchContext } from "../App";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const data = useContext(SearchContext);
  const handleCategoryClick = (category) => {
    data.setEndpt(`/products/filter?category=${encodeURIComponent(category)}`);
    setSelectedCategory(category);
  };

  return (
    <div className="home-page">
      <CategoryList onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <ProductList title="Products" endpoint={data.endpt} category={selectedCategory} search={data.searchedTxt} />
    </div>
  );
}
