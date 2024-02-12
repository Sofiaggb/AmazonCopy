import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from "../redux/AmazonSlice";
import { emptyCart } from "../assets";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity
      return setTotalPrice(Total.toFixed(2))
    });

  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-4">
      {
        products.length > 0 ? (
          <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
            <div className="w-full h-full bg-white px-4 col-span-4">
              <div className=" font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400
            py-3">
                <h2 className=" text-3xl font-medium">Shopping Cart </h2>
                <h4 className=" text-xl font-normal">Subtitle</h4>
              </div>

              {/* Products */}
              {
                products.map((item) => (
                  <div key={item.id} className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6">
                    <div className="w-full flex justify-between items-center gap-6">
                      <div className=" w-1/5" >
                        <img className="w-full h-44 object-contain" src={item.image} alt="image" />
                      </div>
                      <div className="w-4/5">
                        <h2 className=" font-semibold text-lg">{item.title}</h2>
                        <p className="pr-10 text-sm">{item.description.substring(0, 200)}</p>
                        <p className=" text-base">Unite Price
                          <span className=" font-semibold">${item.price}</span></p>
                        {/* quantity */}
                        <div className="bg-[#F2F0F0] flex justify-center items-center gap-1 w-24 py-1 text-center
                   drop-shadow-lg rounded-md">
                          <p>Qty:</p>
                          <p onClick={() => dispatch(decrementQuantity(item.id))}
                            className=" cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300">
                            -</p>
                          <p>{item.quantity}</p>
                          <p onClick={() => dispatch(incrementQuantity(item.id))}
                            className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300">
                            +</p>
                        </div>
                        {/* delete */}
                        <button onClick={() => dispatch(deleteItem(item.id))}
                          className=" bg-red-500 w-36 p-1 rounded-lg text-wrap mt-2 hover:bg-red-700
                   active:bg-red-900 duration-300">
                          Delete Item
                        </button>
                      </div>
                      {/* subtotal */}
                      <div>
                        <p className=" text-lg font-titleFont font-semibold">
                          ${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {/* clear cart button */}
              <div className="w-full py-2">
                <button onClick={() => dispatch(resetCart())}
                  className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500
     text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide">
                  Clear Cart</button>
              </div>

            </div>
            <div className="w-full h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4">
              <div>
                <p className="flex gap-2 items-start text-sm">
                  <span>
                    <CheckCircleIcon className=" bg-white text-green-500" />
                  </span>
                  Your order cualifies for FREE Shipping Choose this option at checkout. See details....
                </p>
              </div>
              <div>
                <p className=" font-semibold px-10 py-1 flex items-center gap-2 justify-between">
                  Total: <span className="text-lg font-bold">${totalPrice}</span></p>
              </div>
              <button className="buttonYellow">Proceed to Pay</button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className=" flex justify-center items-center gap-4 py-10">
            <div>
              <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptycartimg" />
            </div>
            <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
              <h1 className=" font-titleFont text-xl font-bold">
                Your cart feels lonely.
              </h1>
              <p className="text-sm text-center">
                Your shoping cart lives to serve. Give it purpouse - fill it  up with your favorite products!
              </p>
              <Link to={"/"}>
                <button className="mt-6 bg-yellow-400 rounded-md  font-semibold cursor-pointer
          hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-lg">
                  Continue Shopping</button>
              </Link>
            </div>
          </motion.div>
        )
      }

    </div>
  )
}

export default Cart
