import React,{ useState } from 'react'
import Header from '../Components/Header';
import ProductList from '../Components/ProductList';

export default function Wishlist() {
    const [endpt,setEndpt] = useState("/products")
    
    const handleSearch=(searchTxt)=>{
        setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`)
    }
    return (
        <div className="home-page">
            <Header onSearch={handleSearch} />
            <ProductList title= "Wishlist" endpoint={endpt} category=""/>
        </div>
    );
}
