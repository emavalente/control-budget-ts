import { Category, DraftExpense, Expense } from "../types/index";
import { v4 as uuidv4 } from "uuid";

// Types para los actions.
export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset-app" }
  | { type: "add-category-filter"; payload: { id: Category["id"] } };

// Type para el estado en general.
export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

// Recuperar datos iniciales de LocalStorage.
const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

// Declaración de estado inicial.
export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
  currentCategory: "",
};

// Crea un Gasto con id asignado.
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
      return { ...state, modal: false, editingId: "" };
    }
    case "add-expense": {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    }
    case "remove-expense": {
      const filteredState = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return { ...state, expenses: filteredState };
    }
    case "get-expense-by-id": {
      return { ...state, modal: true, editingId: action.payload.id };
    }
    case "update-expense": {
      const updateExpenses = state.expenses.map((currentExpense) => {
        if (currentExpense.id === action.payload.expense.id) {
          return action.payload.expense;
        }
        return currentExpense;
      });
      return {
        ...state,
        modal: false,
        editingId: "",
        expenses: updateExpenses,
      };
    }
    case "reset-app": {
      return {
        ...state,
        budget: 0,
        expenses: [],
      };
    }
    case "add-category-filter": {
      return { ...state, currentCategory: action.payload.id };
    }
    default:
      return state;
  }
};
