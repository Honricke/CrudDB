import './App.css'
import { ItemsContext } from './context/Items';
import { useState, useContext } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Card from "./components/Card";

function App() {
    const [search, setSearch] = useState<string>("")
    const [addInput, setAddInput] = useState<string>("")
    const context = useContext(ItemsContext)
    const items = context?.items

    const addItems = () => {
        if(items) context?.addItem(addInput)
        setAddInput("")
    }

  return (
    <main>
        <nav>
          <input 
            id='searchInput'
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="inputButton" />
        </nav>  
        <section id='cardBox'>
          {context && context?.items?.map((name: string) => {
            if (name.toLowerCase().includes(search.toLowerCase()) || search == ""){
              return <Card key={Math.random()} name={name}/>
            }
          })}
        </section>
        <div id='inputFooter'>
          <input 
            id='addInput'
            type="text"
            value={addInput}
            onChange={e => setAddInput(e.target.value)}
          />
          <IoIosAddCircle className="inputButton" onClick={() => addItems()}/>
        </div>
    </main>
  )
}

export default App;
