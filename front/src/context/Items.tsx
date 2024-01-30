import { createContext, ReactNode, useState } from "react";

interface ProviderType{
    items?: string[],
    addItem: (name:string) => void
    removeItem: (name:string) => void
    editItem: (prevName:string,name:string) => void
}

interface ChildrenType{
    children: ReactNode
}

export const ItemsContext = createContext<ProviderType | undefined>(undefined)

export const ItemsProvider = ({ children }: ChildrenType) => {
    const [items,setItems] = useState<string[]>(["Henrique","Iris"])

    const addItem = (name: string) => {
        if (items) setItems([...items,name])
    }

    const removeItem = (name: string) => {
        const newArray = items.filter(item => item != name)
        setItems(newArray)
    }

    const editItem = (name: string,prevName: string) => {
        const newArray = items?.map(item => item == prevName ? name:item)
        setItems(newArray)
        console.log(newArray)
    }

    return(
        <ItemsContext.Provider value={{items,addItem,removeItem,editItem}}>
            {children}
        </ItemsContext.Provider>
    )
}