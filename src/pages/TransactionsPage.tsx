import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AddTransactionForm from "../components/transactions/AddTransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import type { Transaction } from "../types/transaction";
import { useTransactions } from "../context/TransactionContext";
import { exportTransactions, } from "../utils/exportTransactions";
import Card from "../components/common/Card";
import { useTheme } from "../context/ThemeContext";

function TransactionsPage() {
    const {
        transactions,
        setTransactions,
    } = useTransactions();
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [filterType, setFilterType] =
        useState("all");

    const [filterCategory, setFilterCategory] =
        useState("all");

    const handleAddTransaction = (
        transaction: Transaction
    ) => {
        setTransactions((prev) => [
            transaction,
            ...prev,
        ]);
    };

    const handleDeleteTransaction = (
        id: string
    ) => {
        setTransactions((prev) =>
            prev.filter(
                (transaction) =>
                    transaction.id !== id
            )
        );
        setEditingTransaction(null);
    };
    const handleEditTransaction = (
        transaction: Transaction
    ) => {
        setEditingTransaction(transaction);
    };
    const handleUpdateTransaction = (
        updatedTransaction: Transaction
    ) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction.id === updatedTransaction.id
                    ? updatedTransaction
                    : transaction
            )
        );

        setEditingTransaction(null);
    };

    const filteredTransactions =
        transactions.filter((transaction) => {
            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesType =
                filterType === "all" ||
                transaction.type === filterType;

            const matchesCategory =
                filterCategory === "all" ||
                transaction.category ===
                filterCategory;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });

    const { theme } = useTheme();
    return (
        <MainLayout>
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    Transactions
                </h1>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className={`
                    mb-6
                    w-full
                    rounded-lg
                    border
                    p-3
                    ${theme === "light"
                            ? "border-vintage-sage bg-white text-vintage-navy"
                            : "border-neon-purple bg-[#1A1A1A] text-white"
                        }
`}
                />

                <select
                    value={filterType}
                    onChange={(e) =>
                        setFilterType(e.target.value)
                    }
                    className={`
                    mb-6
                    ml-4
                    rounded-lg
                    border
                    p-3
                    ${theme === "light"
                            ? "border-vintage-sage bg-white text-vintage-navy"
                            : "border-neon-purple bg-[#1A1A1A] text-white"
                        }
`}
                >
                    <option value="all">
                        All Transactions
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>
                </select>

                <select
                    value={filterCategory}
                    onChange={(e) =>
                        setFilterCategory(e.target.value)
                    }
                    className="mb-6 ml-4 rounded-lg border p-3"
                >
                    <option value="all">
                        All Categories
                    </option>

                    <option value="Salary">
                        Salary
                    </option>

                    <option value="Freelancing">
                        Freelancing
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Bills">
                        Bills
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>
                </select>

                <Card className="mb-6">
                    <AddTransactionForm
                        onAddTransaction={handleAddTransaction}
                        editingTransaction={editingTransaction}
                        onUpdateTransaction={handleUpdateTransaction}
                    />
                </Card>

                <button
                    onClick={() =>
                        exportTransactions(
                            transactions
                        )
                    }
                    className="
  mb-4
  rounded-lg
  bg-vintage-brown
  px-4
  py-2
  text-white
  transition
  hover:opacity-90
"
                >
                    Export Transactions
                </button>

                <Card>
                    <TransactionList
                        transactions={filteredTransactions}
                        onDeleteTransaction={
                            handleDeleteTransaction
                        }
                        onEditTransaction={
                            handleEditTransaction
                        }
                    />
                </Card>
            </div>
        </MainLayout>
    );
}

export default TransactionsPage;