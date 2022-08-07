import NavBar from "./components/header/NavBar";
import Body from "./components/Body";
import Footer from "./components/footer/Footer";
import Router from "./router";

const Client = () => {
    return (
        <div className='client'>
            <NavBar/>
            <Body/>
            <Footer/>
        </div>
    );
};

export default Client;
