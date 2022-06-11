import React, { createContext } from "react";

const CategoryContext = createContext<{
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}>({ category: "all", setCategory: () => {} });

export default CategoryContext;
