import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import About from "./about";
import Contact from "./contact";
import Portfolio from "./portfolio";
//import Homepage from "./homepage";
import Navbar from "./navbar";
//import Header from "./Headerh";
import Footer from "./footer";
const AppMain=()=>{
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="./about" element={<About/>}/>
          <Route path="./contact" element={<Contact/>}/>
  <Route path="./portfolio" element={<Portfolio/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}
export default AppMain;