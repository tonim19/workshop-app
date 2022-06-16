import { ChangeEvent, ReactNode } from "react";
import { capitalizeFirstLetter } from "../../helpers/util-functions";
import "./category-input.css";

type Props = {
  categoryName: string;
  category: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

function CategoryInput({
  categoryName,
  category,
  handleChange,
  children,
}: Props) {
  return (
    <div
      className={category === categoryName ? "formGroupActive" : "formGroup"}
    >
      <input
        type="radio"
        name="category"
        id={categoryName}
        value={categoryName}
        onChange={handleChange}
      />
      <label htmlFor={categoryName}>
        {children}
        <h2>{capitalizeFirstLetter(categoryName)}</h2>
      </label>
    </div>
  );
}

export default CategoryInput;
