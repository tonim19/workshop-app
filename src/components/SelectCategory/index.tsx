import {
  ChangeEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as ArrowDown } from "../../assets/images/svg/arrow-down.svg";
import { ReactComponent as DesignLogo } from "../../assets/images/svg/design-logo.svg";
import { ReactComponent as FrontendLogo } from "../../assets/images/svg/frontend-logo.svg";
import { ReactComponent as BackendLogo } from "../../assets/images/svg/backend-logo.svg";
import { ReactComponent as MarketingLogo } from "../../assets/images/svg/marketing-logo.svg";
import CategoryInput from "../CategoryInput";
import { capitalizeFirstLetter } from "../../helpers/util-functions";
import "./select-category.css";
import CategoryContext from "../../context/category/categoryContext";

function SelectCategory() {
  const { category, setCategory } = useContext(CategoryContext);
  const [selectionHidden, setSelectionHidden] = useState(true);
  const categoryForm: MutableRefObject<HTMLFormElement | null> = useRef(null);

  useEffect(() => {
    categoryForm.current?.addEventListener("click", (ev: MouseEvent) => {
      const target = ev.target as HTMLInputElement;
      if (target.name === "category") {
        setSelectionHidden(true);
      }
      return;
    });
  }, []);

  const handleClick = () => {
    setSelectionHidden((prevState) => !prevState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <aside>
      <div
        className={
          selectionHidden ? "categoryHeading" : "categoryHeadingActive"
        }
      >
        <ArrowDown className="arrow" onClick={handleClick} />
        <h2 data-testid="currentCategory" onClick={handleClick}>
          {capitalizeFirstLetter(category)}
        </h2>
      </div>
      <div
        className={
          selectionHidden ? "categorySelection" : "categorySelectionActive"
        }
      >
        <p className="subtitle">Filter by category:</p>
        <form ref={categoryForm}>
          <CategoryInput
            categoryName="all"
            category={category}
            handleChange={handleChange}
          />
          <CategoryInput
            categoryName="design"
            category={category}
            handleChange={handleChange}
          >
            <DesignLogo fill={category === "design" ? "#0097cc" : "#000000"} />
          </CategoryInput>
          <CategoryInput
            categoryName="frontend"
            category={category}
            handleChange={handleChange}
          >
            <FrontendLogo
              fill={category === "frontend" ? "#0097cc" : "#000000"}
            />
          </CategoryInput>
          <CategoryInput
            categoryName="backend"
            category={category}
            handleChange={handleChange}
          >
            <BackendLogo
              fill={category === "backend" ? "#0097cc" : "#000000"}
            />
          </CategoryInput>
          <CategoryInput
            categoryName="marketing"
            category={category}
            handleChange={handleChange}
          >
            <MarketingLogo
              fill={category === "marketing" ? "#0097cc" : "#000000"}
            />
          </CategoryInput>
        </form>
      </div>
    </aside>
  );
}

export default SelectCategory;
