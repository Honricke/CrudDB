import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useContext, useState } from "react";
import { ItemsContext } from "../context/Items";

interface Props {
  id: number;
  name: string;
  qtd: number;
}

function Card(props: Props) {
  const [toogleEdit, setToogleEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(props.name);
  const [qtd, setQtd] = useState<number>(props.qtd);
  const [editInput, setEditInput] = useState<string>(name);
  const context = useContext(ItemsContext);

  const changeEdit = () => {  
    if (!toogleEdit) {
      setToogleEdit(true);
      setEditInput(name);
    } else {
      const nProps = {...props}
      nProps.name = editInput
      context?.editItem(nProps);

      setToogleEdit(false);
      setName(editInput);
    }
  };

  const changeQtd = (qtd: number) => {
    setQtd(qtd);
    
    const nProps = {...props}
    nProps.qtd = qtd
    context?.editItem(nProps);

    if (qtd <= 0) {
      context?.removeItem(nProps);
    } else {
      context?.editQtd(nProps);
    }
  };

  //@ts-ignore
  const enterKey = (e) => {
    if (e.key === "Enter") {
      changeEdit();
    }
  };

  return (
    <div className="card">
      {!toogleEdit && name}
      {toogleEdit && (
        <input
          autoFocus
          type="text"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          className="inputEdit"
          onKeyDown={enterKey}
        />
      )}
      <div className="qtdEdit" style={{ gap: 5 }}>
        <IoIosRemoveCircle onClick={() => changeQtd(qtd - 1)} />
        <p style={{ cursor: "default" }}>{qtd}</p>
        <IoMdAddCircle onClick={() => changeQtd(qtd + 1)} />
      </div>
      <section className="cardButton">
        {!toogleEdit && <FaEdit onClick={() => changeEdit()} />}
        {toogleEdit && <FaCheck onClick={() => changeEdit()} />}
        <FaTrash onClick={() => context?.removeItem(props)} />
      </section>
    </div>
  );
}

export default Card;
