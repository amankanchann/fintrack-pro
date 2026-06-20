import type { Transaction }
  from "../types/transaction";

export function exportTransactions(
  transactions: Transaction[]
) {
  const jsonData =
    JSON.stringify(
      transactions,
      null,
      2
    );

  const blob = new Blob(
    [jsonData],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "transactions.json";

  link.click();

  URL.revokeObjectURL(url);
}