import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import { mockTransactions } from "../data/mockTransactions";

import type { Transaction } from "../types/transaction";

interface TransactionContextType {
    transactions: Transaction[];

    setTransactions:
    React.Dispatch<
        React.SetStateAction<Transaction[]>
    >;
}

const TransactionContext =
    createContext<
        TransactionContextType | undefined
    >(undefined);


export function TransactionProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [transactions, setTransactions] =
        useState<Transaction[]>(() => {
            const savedTransactions =
                localStorage.getItem(
                    "transactions"
                );

            return savedTransactions
                ? JSON.parse(savedTransactions)
                : mockTransactions;
        });
    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context =
        useContext(TransactionContext);

    if (!context) {
        throw new Error(
            "useTransactions must be used inside TransactionProvider"
        );
    }

    return context;
}