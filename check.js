import React,{useContext} from "react";
import styles from "./check.module.css";
import {context} from "./App";
import image from "./Tade2024.jpg";
import im from "./Eleni.jpg";
 const Checkout=()=>{
  const {val,setVal}=useContext(context);
  return(
  <div className={styles.check}>
<img className={styles.img} src={image} alt="not found"/>
    <h1 className={styles.h}> The task you entered is:<p className={styles.p1}>{val}</p></h1>
    </div>
  );
}
export default Checkout;