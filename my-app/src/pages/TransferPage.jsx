import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

/* ---------- Iconos SVG inline (ligeros y sin dependencias) ---------- */
const IconBank = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 10h18v2H3zm2 4h2v6H5zm4 0h2v6H9zm4 0h2v6h-2zm4 0h2v6h-2zM3 22h18v2H3zm9-20l9 5v1H3V7z"/></svg>
);
const IconSearch = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5L21.5 20l-6-6zM9.5 14A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z"/></svg>
);
const IconUser = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 12a5 5 0 10-5-5a5 5 0 005 5m0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z"/></svg>
);
const IconArrowR = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M10 17l5-5l-5-5v10z"/></svg>
);
const IconInfo = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1010 10A10 10 0 0012 2z"/></svg>
);

/* --------------------------- Datos mock --------------------------- */
const accounts = [
  { id: "chk-001", name: "Current Account", currency: "USD", balance: 10000 },
  { id: "sav-002", name: "Savings Account", currency: "USD", balance: 5000 },
];

const quickAccess = [
  { id: "u1", name: "Emiliano Enriquez", tag: "Electric Bills" },
  { id: "u2", name: "Diego Pérez", tag: "Co-worker" },
  { id: "u3", name: "Emiliano Enriquez", tag: "CapEx" },
];

const frequent = [
  { id: "f1", name: "Emiliano Enriquez", cat: "Apps", amount: -120.0, type: "expense" },
  { id: "f2", name: "Credit Card Payment", cat: "Utilities", amount: -1200.0, type: "expense" },
  { id: "f3", name: "Vendor Payment", cat: "Invoices", amount: -1920.21, type: "expense" },
  { id: "f4", name: "Credit Card Payment", cat: "Restaurants", amount: -1200.0, type: "expense" },
];

export default function TransferPage() {
  /* --------- Estado del formulario --------- */
  const [fromId, setFromId] = useState(accounts[0].id);
  const [contactQuery, setContactQuery] = useState("");
  const [amount, setAmount] = useState(500);
  const [currency, setCurrency] = useState("USD");
  const [note, setNote] = useState("");
  const [rangeTab, setRangeTab] = useState("all"); // all | expense | income

  const fromAcc = useMemo(() => accounts.find(a => a.id === fromId), [fromId]);

  const handleContinue = (e) => {
    e.preventDefault();
    alert(`Transfer\nFrom: ${fromAcc?.name}\nAmount: ${currency} ${amount}\nTo: ${contactQuery || "New contact"}\nNote: ${note}`);
  };

  return (
    <div className="dash">
      <Sidebar />

      <div className="dash__content">
        <div className="transfer">
          {/* HEADER */}
          <header className="t__header">
            <h1>New Transfer</h1>
          </header>

          <div className="t__grid">
            {/* --------- Columna izquierda: Formulario --------- */}
            <section className="card t__form">
              {/* From account */}
              <div className="t__block">
                <label className="t__label">From account</label>
                <div className="t__input t__input--withIcon">
                  <IconBank className="t__leading" />
                  <select
                    className="t__select"
                    value={fromId}
                    onChange={(e) => setFromId(e.target.value)}
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} — {a.currency} {a.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search / add contact */}
              <div className="t__block">
                <div className="t__input t__input--withIcon">
                  <IconSearch className="t__leading" />
                  <input
                    className="t__text"
                    type="text"
                    placeholder="Search or add a new contact"
                    value={contactQuery}
                    onChange={(e) => setContactQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Beneficiary + Amount */}
              <div className="t__group2">
                <div className="t__block">
                  <label className="t__label">Beneficiary</label>
                  <div className="t__input">
                    <div className="t__prefixBox">
                      <IconUser />
                    </div>
                    <input
                      className="t__text"
                      type="text"
                      placeholder="Type name or account"
                      value={contactQuery}
                      onChange={(e) => setContactQuery(e.target.value)}
                    />
                    <button className="btn ghost" type="button">
                      + New Contact
                    </button>
                  </div>
                </div>

                <div className="t__block">
                  <label className="t__label">Amount</label>
                  <div className="t__input">
                    <select className="t__select t__select--tight" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>MXN</option>
                    </select>
                    <input
                      className="t__number"
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Note / Reference */}
              <div className="t__block">
                <label className="t__label">Concept / Reference</label>
                <div className="t__input">
                  <input
                    className="t__text"
                    type="text"
                    placeholder="e.g., October rent"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="t__actions">
                <button className="btn primary" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </section>

            {/* --------- Columna derecha: Quick Access + Frequent --------- */}
            <aside className="t__aside">
              {/* Quick Access */}
              <section className="card t__quick">
                <div className="t__cardHead">
                  <strong>Quick Access</strong>
                  <button className="btn link">View all</button>
                </div>

                <div className="t__list">
                  {quickAccess.map((q) => (
                    <div key={q.id} className="t__item">
                      <div className="t__avatar"><IconUser /></div>
                      <div className="t__info">
                        <div className="t__title">{q.name}</div>
                        <div className="t__muted">{q.tag}</div>
                      </div>
                      <button className="btn light">
                        Transfer again <IconArrowR style={{marginLeft:6}}/>
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Frequent Transfers */}
              <section className="card t__frequent">
                <div className="t__cardHead">
                  <strong>Frequent Transfers</strong>
                  <div className="segmented">
                    <button
                      className={rangeTab === "all" ? "active" : ""}
                      onClick={() => setRangeTab("all")}
                    >
                      All
                    </button>
                    <button
                      className={rangeTab === "expense" ? "active" : ""}
                      onClick={() => setRangeTab("expense")}
                    >
                      Expenses
                    </button>
                    <button
                      className={rangeTab === "income" ? "active" : ""}
                      onClick={() => setRangeTab("income")}
                    >
                      Income
                    </button>
                  </div>
                </div>

                <div className="t__list">
                  {frequent
                    .filter((f) =>
                      rangeTab === "all"
                        ? true
                        : rangeTab === "income"
                        ? f.amount > 0
                        : f.amount < 0
                    )
                    .map((f) => (
                      <div key={f.id} className="t__item">
                        <div className="t__avatar t__avatar--soft"><IconBank /></div>
                        <div className="t__info">
                          <div className="t__title">{f.name}</div>
                          <div className="t__muted">{f.cat}</div>
                        </div>
                        <div className={`t__amount ${f.amount >= 0 ? "pos" : ""}`}>
                          {f.amount >= 0 ? "+" : "−"} {Math.abs(f.amount).toLocaleString(undefined, { style: "currency", currency: "USD" })}
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Daily limit */}
              <section className="t__limit card">
                <IconInfo />
                <span>Remaining daily limit: <strong>USD 4,500</strong></span>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
