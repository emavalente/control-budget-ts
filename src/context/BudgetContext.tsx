import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

// Declaramos un type para las props que compartirá el contexto.
type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
};

// Declaramos un type para los children que recibe el componente proveedor.
type BudgetProviderProps = {
  children: ReactNode;
};

// Creamos una instancia de createContext().
export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

/*
NOTA: createContext en typescript pide un parametro por defecto para el cual tenemos dos
opciones para evitarlo.
1- Colocar (null!)
2- Colocar ({} as BudgetContextProps) utilizando el type correcto. "Typescript confia que este objeto
es de tipo BudgetContextProps".
*/

// Creamos el componente proveedor.
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
