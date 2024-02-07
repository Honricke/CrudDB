import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import { ItemsContext } from "../context/Items";

interface Props{
    id: number,
    name: string,
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
            context?.editItem(editInput,{
                "id": props.id,
                "name": name
            })
            setToogleEdit(false)
            setName(editInput)
        }
    }

    //@ts-ignore
    const enterKey = (e) => {
        if (e.key === 'Enter') {
            changeEdit()
        }
    }

    return ( 
        <div className="card">
            {!toogleEdit && name}
            {toogleEdit && <input 
                autoFocus
                type='text'
                value={editInput}
                onChange={e => setEditInput(e.target.value)}
                className="inputEdit"
                onKeyDown={enterKey}
            />}
            <section className="cardButton">
                {!toogleEdit && <FaEdit onClick={() => changeEdit()}/>}
                {toogleEdit && <FaCheck onClick={() => changeEdit()}/>}
                <FaTrash onClick={() => context?.removeItem({
                    "id": props.id,
                    "name": name
                })}/>
            </section>
        </div>
    );
}

export default Card;