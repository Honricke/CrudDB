import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import { ItemsContext } from "../context/Items";

interface Props{
    name: string
}

function Card(props: Props) {
    const [toogleEdit, setToogleEdit] = useState<boolean>(false)
    const [name,setName] = useState<string>(props.name)
    const [editInput, setEditInput] = useState<string>(name)
    const context = useContext(ItemsContext)

    const changeEdit = () => {
        if(!toogleEdit){
            setToogleEdit(true)
            setEditInput(name)
        }else{
            setToogleEdit(false)
            context?.editItem(editInput,name)
            setName(editInput)
        }
    }

    return ( 
        <div className="card">
            {!toogleEdit && name}
            {toogleEdit && <input 
                type='text'
                value={editInput}
                onChange={e => setEditInput(e.target.value)}
            />}
            <section className="cardButton">
                {!toogleEdit && <FaEdit onClick={() => changeEdit()}/>}
                {toogleEdit && <FaCheck onClick={() => changeEdit()}/>}
                <FaTrash onClick={() => context?.removeItem(name)}/>
            </section>
        </div>
    );
}

export default Card;