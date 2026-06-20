import { Routes, Route } from "react-router-dom";
import BudgetPage from "../pages/BudgetPage";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import GoalsPage from "../pages/GoalsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
    </Routes>
  );
}

export default AppRoutes;