import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import CategoryList from "../Components/CategoryList";
import ProductList from "../Components/ProductList";
import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [endpt, setEndpt] = useState("/products");
  const [searchedTxt, setSearchedTxt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryClick = (category) => {
    setEndpt(`/products/filter?category=${encodeURIComponent(category)}`);
    setSelectedCategory(category);
  };

  const handleSearch = (searchTxt) => {
    setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`);
    setSearchedTxt(searchTxt);
  };
  
  const handleSubmit = (searchTxt) => {
    setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`);
    setSearchedTxt(searchTxt);
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} onClick={handleSubmit} />
      <CategoryList onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <ProductList title="Products" endpoint={endpt} category={selectedCategory} search={searchedTxt} />
    </div>
  );
}
