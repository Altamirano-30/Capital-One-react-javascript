import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";

export default function App() {
  return (
    <div className="dash">
      {/* Sidebar siempre visible */}
      <Sidebar />

      {/* Área dinámica de páginas */}
      <div className="dash__content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountsPage />} />
          {/* Rutas futuras */}
          {/* <Route path="/transfer" element={<TransferPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}
