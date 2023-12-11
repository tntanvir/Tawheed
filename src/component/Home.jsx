
// import AudioPlayerComponent from "./Alquran/AudioPlayerComponent";
import Hero from "./Hero";
import MainHome from "./MainHome";

import Calendermain from "./calender/Calendermain";

const Home = () => {
    return (
        <div className="Poppins ">
            <MainHome />
            <Hero></Hero>
            <Calendermain></Calendermain>
            {/* <FooterWithLogo /> */}
            {/* <AudioPlayerComponent audioUrlProp={`https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/100.mp3`} /> */}

        </div>

    );
};

export default Home;