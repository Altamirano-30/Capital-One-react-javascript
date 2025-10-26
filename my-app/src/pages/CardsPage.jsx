// src/pages/CardsPage.jsx
import Sidebar from "../components/Sidebar";
import CardCarousel from "../components/CardCarousel";

import ProductTile from "../components/ProductTile";

import BlockIcon from "../assets/block.svg";
import ReplaceIcon from "../assets/replace.svg";
import pinIcon from "../assets/pin.svg";
import cardSvg1 from "../assets/card-1.svg";
import cardSvg2 from "../assets/card-2.svg";
import cardSvg3 from "../assets/card-3.svg";

export default function CardsPage(){
  const cards = [
    { id: 1, svg: cardSvg1, title: "Debit Card (Main)", last4: "9012", cvv: "123", type: "debit" },
    { id: 2, svg: cardSvg2, title: "Savings Card", last4: "3456", cvv: "456", type: "debit" },
    { id: 3, svg: cardSvg3, title: "Credit Card (Platinum)", last4: "7890", cvv: "789", type: "credit" },
  ];

  const quickActions = [
    { icon: BlockIcon, label: "Block Temporarily" },
    { icon: ReplaceIcon, label: "Report Theft" },
    { icon: ReplaceIcon, label: "Replace Card" },
    { icon: pinIcon, label: "Change PIN" },
  ];

  return (
    <div className="dash">
      <Sidebar />

      <div className="dash__content">
        <header className="cards__header">
          <h1>My Cards</h1>
          <p className="muted">Manage and control your debit & credit cards</p>
        </header>

        {/* Carrusel grande de tarjetas */}
        <section className="cards__carouselWrap">
          <CardCarousel items={cards} />
        </section>

        {/* Quick actions */}
        <section className="cards__quickActions">
          {quickActions.map((q, i) => (
            <button key={i} className="quickAction">
              <img src={q.icon} alt="" className="quickAction__icon" />
              <div className="quickAction__label">{q.label}</div>
            </button>
          ))}
        </section>

        {/* Bottom row: Limits, Summary, Products */}
        <section className="cards__bottom">
          <div className="card limitsCard">
            <h3>Limits & Spending Controls</h3>
            <p className="muted">Daily ATM withdrawal limit</p>

            <div className="limitRow">
              <div className="limitBarWrap">
                <div className="limitBar">
                  <div className="limitBar__fill" style={{ width: "32%" }} />
                </div>
                <div className="muted small">$800.00</div>
              </div>
              <div className="limitActions">
                <button className="btn">Modify</button>
              </div>
            </div>

            <div style={{ height: 10 }} />

            <div className="limitRow">
              <div>
                <div className="muted small">E-commerce (daily)</div>
                <div className="muted">$2,000 / day</div>
              </div>
              <div>
                <button className="btn btn--ghost">Activate</button>
              </div>
            </div>
          </div>

          <div className="card summaryCard">
            <h3>Card Summary</h3>
            <div className="summaryLine">
              <div>Credit Card (Visa Platinum)</div>
              <div className="muted small">USD $1,500 used</div>
            </div>

            <div style={{ height: 12 }} />

            <div className="summaryActions">
              <button className="btn btn--primary">Pay Card</button>
              <button className="btn btn--ghost">View Statement</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
