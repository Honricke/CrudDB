import "./App.css";
import { ItemsContext } from "./context/Items";
import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Card from "./components/Card";
import { ItemType } from "./context/Items";
//
function App() {
  const [search, setSearch] = useState<string>("");
  const [addName, setAddInput] = useState<string>("");
  const [addQtd, setAddQtd] = useState<string>("");
  const context = useContext(ItemsContext);

  const addItems = () => {
    if (addName != "" && addQtd != "") {
      context?.addItem(addName, Number(addQtd));
      setAddInput("");
      setAddQtd("");
    }
  };

  //@ts-ignore
  const enterKey = (e) => {
    if (e.key === "Enter") {
      addItems();
    }
  };

  return (
    <main>
      <nav>
        <div id="inputHeader">
          <input
            id="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="inputButton" />
        </div>
      </nav>
      <section id="cardBox">
        {context &&
          context?.items?.map((item: ItemType) => {
            if (
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              search == ""
            ) {
              return (
                <Card
                  id={item.id}
                  name={item.name}
                  qtd={item.qtd}
                  key={item.id}
                />
              );
            }
          })}
      </section>
      <footer>
        <div id="inputFooter">
          <input
            placeholder="Descrição..."
            className="addInput"
            type="text"
            value={addName}
            onChange={(e) => setAddInput(e.target.value)}
            onKeyDown={enterKey}
          />
          <input
            placeholder="Quantidade..."
            className="addInput"
            type="number"
            value={addQtd}
            onChange={(e) => setAddQtd(e.target.value)}
            onKeyDown={enterKey}
          />
          <IoMdSend className="inputButton" onClick={() => addItems()} />
        </div>
      </footer>
    </main>
  );
}

export default App;
