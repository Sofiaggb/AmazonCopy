import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    ScrollRestoration
} from "react-router-dom";

//  Components
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

// pages
import Home from "./pages/home";
import SingIn from "./pages/SingIn";
import Cart from "./pages/Cart";
import Registration from "./pages/Registration";


// data cards
import { ProductsData } from "./api/axios";

const Layout = () => {
    return (
        <div>
            <Header />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </div>
    )
}

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} loader={ProductsData} />
                <Route path="/cart" element={<Cart />} />

            </Route>
            <Route path="/singin" element={<SingIn />} />
            <Route path="/registration" element={<Registration />} />

        </Route>


    )
);

export default Router