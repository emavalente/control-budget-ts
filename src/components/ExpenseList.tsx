import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);
  return (
    <div className="mt-10">
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
            {state.expenses.map((expense) => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
