

import Home from "./component/Home";
import { NavbarWithMegaMenu } from "./component/NavListMenu"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    //   <NavbarWithMegaMenu></NavbarWithMegaMenu>
    // </>
    // <ContextApi.Provider value={[userLogin, setUserLogin]}>
    <Router>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/provideUser" element={<Getstart />} />
          <Route
            path="/userDeshBord"
            element={
              <PrivetRoute childern={<UserDeshBord />} />
            }
          />
          <Route
            path="/donerfrom"
            element={
              <PrivetRoute childern={<DonerFrom />} />
            }
          />
          <Route
            path="/resivedfrom"
            element={
              <PrivetRoute childern={<ResivedFrom />} />
            }
          />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footers></Footers> */}
    </Router>
    // </ContextApi.Provider>
  )
}

export default App
