import React, { useState } from "react";
import CategoryContext from "./categoryContext";

interface Props {
  children: React.ReactNode;
}

const CategoryContextProvider = (props: Props) => {
  const [category, setCategory] = useState("all");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
