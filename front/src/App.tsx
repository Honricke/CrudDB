import './App.css'
import { ItemsContext } from './context/Items';
import { useState, useContext } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Card from "./components/Card";
import { ItemType } from './context/Items';

function App() {
      const [search, setSearch] = useState<string>("")
      const [addInput, setAddInput] = useState<string>("")
      const context = useContext(ItemsContext)
      
      const addItems = () => {
          if(addInput != ""){
            context?.addItem(addInput)
            setAddInput("")
          }
      }

      //@ts-ignore
      const enterKey = (e) => {
        if (e.key === 'Enter') {
          addItems()
        }
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
            <div id="scrollDiv">
              {context && context?.items?.map((item: ItemType) => {
                if (item.name.toLowerCase().includes(search.toLowerCase()) || search == ""){
                  return <Card key={item.id} name={item.name} id={item.id}/>
                }
              })}
            </div>
          </section>
          <div id='inputFooter'>
            <input 
              id='addInput'
              type="text"
              value={addInput}
              onChange={e => setAddInput(e.target.value)}
              onKeyDown={enterKey}
            />
            <IoIosAddCircle className="inputButton" onClick={() => addItems()}/>
          </div>
      </main>
    )
}

export default App;
