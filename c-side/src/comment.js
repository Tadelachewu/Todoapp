import React,{useState,useEffect} from "react";
const Comment=()=>{
  const [comment,setComment]=useState("");
  const [list,cList]=useState([]);
  const [sent,setSent]=useState("");
  const sendMessage=(e)=>{
    e.preventDefault();
    setSent(comment + " " + " is sent successfully");
  }
  return(
  <div className="comment"> <h1> leave a comment here:</h1>
  <div> 
  <h1>{sent}</h1>
  <form onSubmit={sendMessage}> 
  <textarea type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="type your comment here"></textarea>
  <button type="submit"> send </button>
  </form>
  </div>
  </div>);
}
export default Comment;