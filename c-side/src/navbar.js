import {Link} from "react-router-dom";
const Navbar=()=>{
  return(
    <div>
      <Link to="./home">Home</Link>
      <Link to="./about">About us</Link>
      <Link to="./contact">Contact us</Link>
      <Link to="./portfolio">Portfolio</Link>
    </div>);
}
export default Navbar;