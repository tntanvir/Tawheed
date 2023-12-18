
// import { useEffect } from "react";
import Hero from "./Hero";
import MainHome from "./MainHome";
import Calendermain from "./calender/Calendermain";

const Home = () => {
    // useEffect(() => {
    //     // fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-abudawud.json")
    //     fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-bukhari.min.json")
    //         .then(res => res.json())
    //         .then(data => console.log(data))

    // }, []);
    return (
        <div className="Poppins ">
            <MainHome />
            <Hero></Hero>
            <Calendermain></Calendermain>




        </div>

    );
};

export default Home;