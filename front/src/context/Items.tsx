import { createContext, ReactNode, useEffect, useState } from "react";

interface ProviderType{
    items?: ItemType[],
    addItem: (name:string) => void
    removeItem: (item: ItemType) => void
    editItem: (name:string,item:ItemType) => void
}

interface ChildrenType{
    children: ReactNode
}

export interface ItemType{
    id: number
    name: string,
}

export const ItemsContext = createContext<ProviderType | undefined>(undefined)

export const ItemsProvider = ({ children }: ChildrenType) => {    
    function loadApi(){
        fetch("http://localhost:8000/get-names")
            .then(response => response.json())
            .then(data => {setItems(data);console.log(data)})
    }
        
    useEffect(() => loadApi(),[])

    const [items,setItems] = useState<ItemType[] | undefined>()

    console.log("Items: "+ JSON.stringify(items))

    const addItem = async (name: string) => {
        const response = await fetch("http://localhost:8000/insert-name",{
            method: "POST",
            body: JSON.stringify({name: name}),
            headers: {"content-type": "application/json"},
        })
        const data: ItemType = await response.json()
        if (items) {
            // setItems([...items,data])
            loadApi()
        }
        else setItems([data])
    }

    const removeItem = async (item: ItemType) => {
        const response = await fetch("http://localhost:8000/remove-name",{
            method: "DELETE",
            body: JSON.stringify({
                name: item.name,
                id: item.id
            }),
            headers: {"content-type": "application/json"},
        })
        // const data: ItemType = await response.json()
        // const newArray = items?.filter(el => el.id != item.id)
        // setItems(newArray)
        loadApi()
    }

    const editItem = async (name: string,item: ItemType) => {
        const response = await fetch("http://localhost:8000/update-name",{
            method: 'PUT',
            body: JSON.stringify({ 
                id: item.id,
                name: item.name,
                newName: name,            
            }),
            headers: {"content-type": "application/json"}
        })
        // const data = await response.json()
        // const newArray = items?.map(el => {
        //     el.name = el.id == item.id ? name : item.name;
        //     return el
        // })
        // setItems(data)
        loadApi()
    }

    return(
        <ItemsContext.Provider value={{items,addItem,removeItem,editItem}}>
            {children}
        </ItemsContext.Provider>
    )
}