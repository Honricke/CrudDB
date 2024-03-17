import { createContext, ReactNode, useEffect, useState } from "react";

interface ProviderType {
  items?: ItemType[];
  addItem: (iname: string, qtd: number) => void;
  removeItem: (item: ItemType) => void;
  editItem: (item: ItemType) => void;
  editQtd: (item: ItemType) => void;
}

interface ChildrenType {
  children: ReactNode;
}

export interface ItemType {
  id: number;
  name: string;
  qtd: number;
}

export const ItemsContext = createContext<ProviderType | undefined>(undefined);

export const ItemsProvider = ({ children }: ChildrenType) => {
  function loadApi() {
    fetch("http://localhost:8000/get-names")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a:ItemType, b:ItemType) => {
          const nameA = a.name.toUpperCase(); 
          const nameB = b.name.toUpperCase(); 
          
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
      });
        setItems(data);
      });
  }

  useEffect(() => loadApi(), []);

  const [items, setItems] = useState<ItemType[] | undefined>();

  const addItem = async (name: string, qtd: number) => {
    const response = await fetch("http://localhost:8000/insert-name", {
      method: "POST",
      body: JSON.stringify({ name: name, qtd: qtd }),
      headers: { "content-type": "application/json" },
    });
    const data: ItemType = await response.json();

    if (items) {
      // setItems([...items,data])
      loadApi();
    } else setItems([data]);
  };

  const removeItem = async (item: ItemType) => {
    await fetch("http://localhost:8000/remove-name", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    loadApi();
  };

  const editItem = async (item: ItemType) => {
    await fetch("http://localhost:8000/update-name", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    loadApi();
  };

  const editQtd = async (item: ItemType) => {
    await fetch("http://localhost:8000/update-qtd", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    loadApi();
  };

  return (
    <ItemsContext.Provider
      value={{ items, addItem, removeItem, editItem, editQtd }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
