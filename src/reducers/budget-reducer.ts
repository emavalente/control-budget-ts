// Types para los actions.
export type BudgetActions = { type: "add-budget"; payload: { budget: number } };

// Type para el estado en general.
export type BudgetState = {
  budget: number;
};

// Declaración de estado inicial.
export const initialState: BudgetState = {
  budget: 0,
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
    default:
      return state;
  }
};
