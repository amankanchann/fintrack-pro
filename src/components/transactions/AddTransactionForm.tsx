import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../../types/transaction";
import { useTheme } from "../../context/ThemeContext";

interface AddTransactionFormProps {
  onAddTransaction: (
    transaction: Transaction
  ) => void;

  editingTransaction: Transaction | null;

  onUpdateTransaction: (
    transaction: Transaction
  ) => void;
}

function AddTransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
}: AddTransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(
        editingTransaction.amount.toString()
      );
      setCategory(
        editingTransaction.category
      );
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      setError("Please fill all fields.");
      return;
    }

    setError("");

    if (editingTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        title,
        amount: Number(amount),
        category,
        type: type as "income" | "expense",
      });

      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");

      return;
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      title,
      amount: Number(amount),
      category,
      type: type as "income" | "expense",
      date: new Date().toISOString(),
    };

    onAddTransaction(newTransaction);

    setTitle("");
    setAmount("");
    setCategory("");
    setType("expense");
  };

  const { theme } = useTheme();

  const [error, setError] = useState("");

  return (
    <div
      className={`
    mb-6
    rounded-xl
    border
    p-6
    ${theme === "light"
          ? "bg-white border-vintage-sage"
          : "bg-[#1A1A1A] border-neon-purple/30"
        }
  `}
    >
      <h2
        className={`mb-4 text-xl font-semibold ${theme === "light"
            ? "text-vintage-navy"
            : "text-neon-purple-light"
          }`}
      >
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <input
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={`
  rounded-lg
  border
  p-3
  ${theme === "light"
              ? "bg-white border-vintage-sage text-vintage-navy"
              : "bg-black border-neon-purple text-white"
            }
`}
        />

        <input
          required
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className={`
  rounded-lg
  border
  p-3
  ${theme === "light"
              ? "bg-white border-vintage-sage text-vintage-navy"
              : "bg-black border-neon-purple text-white"
            }
`}
        />

        <input
          required
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className={`
  rounded-lg
  border
  p-3
  ${theme === "light"
              ? "bg-white border-vintage-sage text-vintage-navy"
              : "bg-black border-neon-purple text-white"
            }
`}
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className={`
  rounded-lg
  border
  p-3
  ${theme === "light"
              ? "bg-white border-vintage-sage text-vintage-navy"
              : "bg-black border-neon-purple text-white"
            }
`}
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        {error && (
          <p className="text-red-500 md:col-span-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`
  rounded-lg
  p-3
  text-white
  transition
  ${theme === "light"
              ? "bg-vintage-brown"
              : "bg-neon-purple"
            }
`}
        >
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>

      <div
        className={`mt-4 text-sm ${theme === "light"
            ? "text-gray-500"
            : "text-gray-400"
          }`}
      >
        <p>Title: {title}</p>
        <p>Amount: {amount}</p>
        <p>Category: {category}</p>
        <p>Type: {type}</p>
      </div>
    </div>
  );
}

export default AddTransactionForm;