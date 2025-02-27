import Home from "./component/Home";
import { NavbarWithMegaMenu } from "./component/NavListMenu"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Notfound from "./component/Notfound";
import Alquran from "./component/Alquran/Alquran";
import { FooterWithLogo } from './component/Footer';
import Sura from "./component/Alquran/Sura";
import MainHadis from "./component/Hadis/MainHadis";
import HadisAllbook from "./component/Hadis/HadisAllbook";
import HadisSection from "./component/Hadis/HadisSection";
import Singlehadis from "./component/Hadis/Singlehadis";
import Qari from "./component/Alquran/Qari";
import Planer from "./component/Planer/Planer";
import Calendermain from "./component/calender/Calendermain";

function App() {


  return (
    <Router>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/celender" element={<Calendermain />} />
        <Route path="/qari/:id" element={<Alquran />} />
        <Route path="/qari" element={<Qari />} />
        <Route path="/planer" element={<Planer />} />

        <Route path="/qari/:qari/alquran/:id" element={<Sura />} />
        <Route path="/hadis" element={<MainHadis />} />
        <Route path="/hadis/:name" element={<HadisAllbook />} />
        <Route path="/hadis/:name/:id" element={<Singlehadis />} />
        <Route path="/hadis/:name/section-hadis/:key" element={<HadisSection />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <FooterWithLogo />

    </Router>
  )
}

export default App
