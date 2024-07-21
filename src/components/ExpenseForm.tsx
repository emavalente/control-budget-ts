import { useState } from "react";
import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "amount") {
      setExpense({ ...expense, [e.target.name]: +e.target.value });
    } else {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    }
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          name="expenseAmount"
          id="expenseAmount"
          placeholder="Añade la cantidad del gasto"
          className="bg-slate-100 p-2"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseCategory" className="text-xl">
          Categoria:
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2"
          onChange={handleChange}
        >
          <option value="">-- Seleccione una categoria --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseCategory" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          onChange={handleChangeDate}
          value={expense.date}
          className="bg-slate-100 p-2 border-0"
        />
      </div>

      <input
        type="submit"
        value="Registrar Gasto"
        className="w-full p-2 uppercase text-white font-bold rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700"
      />
    </form>
  );
};

export default ExpenseForm;
