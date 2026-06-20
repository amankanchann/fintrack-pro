import type { Transaction } from "../types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 50000,
    type: "income",
    category: "Salary",
    date: "2026-06-01",
  },
  {
    id: "2",
    title: "Groceries",
    amount: 3000,
    type: "expense",
    category: "Food",
    date: "2026-06-05",
  },
  {
    id: "3",
    title: "Freelancing",
    amount: 10000,
    type: "income",
    category: "Freelancing",
    date: "2026-06-10",
  },
];