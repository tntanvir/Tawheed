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

function App() {


  return (
    <Router>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alquran" element={<Alquran />} />
        <Route path="/alquran/:sura/:id/:arabi" element={<Sura />} />
        <Route path="/hadis" element={<MainHadis />} />
        <Route path="/hadis/:id/:name" element={<HadisAllbook />} />
        <Route path="/hadis/:id/:name/section-hadis/:key" element={<HadisSection />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <FooterWithLogo />

    </Router>
  )
}

export default App
