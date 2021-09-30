
import './App.css';
import { AiOutlineRight,AiOutlineLeft } from 'react-icons/ai';
import { createClient } from 'pexels';
import{ useEffect, useState } from 'react';
import Photos from './Photos';



function App() {

const [photo, setPhoto] = useState([]);
const [input, setİnput] = useState("");
const [pagenr, setPagenr] = useState(1);
const [curated, setCurated] = useState(false);  
const client = createClient(process.env.React_App_Key);

useEffect(async() => {
    const result = await client.photos.curated(
    {per_page:20, page:pagenr});
    setPhoto(result.photos);
 
}, []);


const searchbyvalue = async () => {
  document.getElementById("a").click();
  setPagenr(1);
  setCurated(true);
  const query = input;
  if(curated)
  {
  const result = await client.photos.search({
     query,
     per_page:20,
     page:pagenr,
    });
    setPhoto(result.photos)
  }else{
      const result = await client.photos.curated(
      {per_page:20, page:pagenr});
      setPhoto(result.photos);
  }
};

const increasepagenr = () => {
  document.getElementById("a").click();
  setPagenr((state) => state+1)
  searchbybuttons()
}
const decreasepagenr = () => {
  document.getElementById("a").click();
  setPagenr((state) => state-1)
  searchbybuttons()
}

const searchbybuttons = async () => {
  const query = input;
  if(curated)
  {
  const result = await client.photos.search({
     query,
     per_page:20,
     page:pagenr,
    });
    setPhoto(result.photos)
  }else{
      const result = await client.photos.curated(
      {per_page:20, page:pagenr});
      setPhoto(result.photos);
  }
}


  return (
    <div>
       <header>
         <a className="logo">Photo gallery</a>
         <input value= {input} onChange= {(e) => setİnput(e.target.value)} type="text" placeholder="Search a photo" />
         <button onClick= {searchbyvalue}>Search</button>
       </header>

       <div className="photobody" id="photobody">
           <div className="right"> <AiOutlineRight size="40" onClick= {increasepagenr} /> </div>      
           <div className="left" ><AiOutlineLeft size="40" onClick= {decreasepagenr} /></div>         
           {photo?.map((item) => (
              <Photos 
              key= {item.id} 
              src= {item.src.landscape} 
              photographer= {item.photographer}
              /> 
           ))}
           <a href="#photobody" id= "a">
             
           </a>
       </div>
    </div>
  );
}

export default App;
