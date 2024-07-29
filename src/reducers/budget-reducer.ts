import { DraftExpense, Expense } from "../types/index";
import { v4 as uuidv4 } from "uuid";

// Types para los actions.
export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } };

// Type para el estado en general.
export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

// Declaración de estado inicial.
export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

// Creamos un Gasto con id asignado.
const createExpense = (expense: DraftExpense): Expense => {
  return { ...expense, id: uuidv4() };
};

// Declaración de Reducer.
export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "add-budget": {
      return { ...state, budget: action.payload.budget };
    }

    case "show-modal": {
      return { ...state, modal: true };
    }
    case "close-modal": {
      return { ...state, modal: false };
    }
    case "add-expense": {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    }
    default:
      return state;
  }
};
