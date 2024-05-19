import Hero from "./Hero";
import MainHome from "./MainHome";
import Calendermain from "./calender/Calendermain";




const Home = () => {

    return (

        <div className="Poppins ">

            <MainHome />
            <Hero></Hero>
            <Calendermain></Calendermain>
        </div>

    );
};

export default Home;