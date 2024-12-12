import React,{createContext,useState} from "react";
import Checkout from "./check";
import Todo from "./todo";
import Footer from "./foot";
import Comment from "./comment";
export const context=createContext();
function App() {
  const [val,setVal]=useState("");
  return(<div>
    <context.Provider value={{val,setVal}}>
     <Checkout/>
     <Todo/>
     <Footer/>
    <Comment/>
</context.Provider>
  </div>);


          
}

export default App;
