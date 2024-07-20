import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error(
      "this hook has not a context file linked or you need a Provider rounding your aplication"
    );
  }
  return context;
};

export default useBudget;
