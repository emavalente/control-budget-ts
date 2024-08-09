import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses;

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [state.expenses]
  );
  return (
    <div className="bg-white shadow-lg mt-10 rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold text-center">
          No hay gastos registrados
        </p>
      ) : (
        <>
          <h2 className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos
          </h2>
          <div className="flex flex-col gap-2">
            {filteredExpenses.map((expense) => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
