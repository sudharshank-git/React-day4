import React, {useState}from 'react'
import Header from '../Components/Header'
import ProductList from '../Components/ProductList'
export default function Cart() {
    const [endpt,setEndpt] = useState("/products")
    
    const handleSearch=(searchTxt)=>{
        setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`)
    }
    return (
        <div className="home-page">
            <Header onSearch={handleSearch} />
            <ProductList title= "Cart" endpoint={endpt} category=""/>
        </div>
    );
}

