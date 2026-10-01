import Header from "./Components/Header.jsx";
import Route from "./Routing/Route.jsx";
import { useState , createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchContext = createContext();

export default function App() {
    const [endpt, setEndpt] = useState("/products");
    const [searchedTxt, setSearchedTxt] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = (searchTxt) => {
    setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`);
    setSearchedTxt(searchTxt);
    navigate("/", { replace: true });
    };

    
  return (
    <>
      <SearchContext.Provider value={{endpt, setEndpt, searchedTxt, setSearchedTxt}}>
        <Header onClick={handleSubmit} />
        <Route/>
      </SearchContext.Provider>
    </>
  );
}
