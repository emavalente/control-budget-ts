import { useMemo, useState } from "react";
import useBudget from "../hooks/useBudget";

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  // Validamos el presupuesto para activar el boton [true, false] - usamos useMemo para guardar el valor hasta que cambie budget.
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  // Captura del input sobre el estado del componente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="Define tu presupuesto aquí"
          className="w-full bg-white bborder border-gray-200 p-2"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 w-full p-2 cursor-pointer uppercase font-black text-white disabled:opacity-20"
        disabled={isValid}
      />
    </form>
  );
};

export default BudgetForm;
