import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://northwind.vercel.app/api/products"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="App">
      
      <h3>^\_/^Search Filter^\_/^</h3>
      <input
        style={{ width: "35%", height: "35px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      /><div>   <button onClick={()=>{setPosts([...posts].sort((a,b) => (a.unitPrice > b.unitPrice) ? 1 : ((b.unitPrice > a.unitPrice) ? -1 : 0)))}}
      >Azdan coxa</button>
       <button onClick={()=>{setPosts([...posts].sort((a,b) => (b.unitPrice > a.unitPrice) ? 1 : ((a.unitPrice > b.unitPrice) ? -1 : 0)))}}
      >Çoxdan aza</button></div>
      <button onClick={()=>{setPosts([...posts].sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))}}
      >Id sirasi</button>
   
      
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <div key={item.id} className="esas">
            <h5>{item.id}.</h5>
            <div className="qiymetler">
              <h5>Name : {item.name}</h5>
              <h5>{item.quantityPerUnit}</h5>
              <h4>Price : {item.unitPrice}</h4>
            </div>
          </div>)

      )}
    </div>
  );
}

export default App;

