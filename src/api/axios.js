import axios from "axios"

export const ProductsData = async() =>{
    let products = await axios.get("https://fakestoreapi.com/products");
    return products
}