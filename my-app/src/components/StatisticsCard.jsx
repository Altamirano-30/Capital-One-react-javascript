import { useMemo, useState } from "react";

const presets = {
  "7d": {
    label: "Últimos 7 días",
    income: [40, 52, 30, 70, 65, 58, 80],
    expenses: [25, 30, 18, 28, 22, 24, 35],
    x: ["L", "M", "X", "J", "V", "S", "D"],
  },
  "1m": {
    label: "Último mes",
    income: [40,42,45,52,44,48,50,55,53,60,62,58,65,70,68,64,66,72,75,71,69,67,74,76,73,70,68,72,74,78],
    expenses:[22,24,25,20,23,21,24,26,23,25,27,22,24,28,26,24,25,27,29,26,25,24,28,30,27,26,25,28,29,31],
    x: Array.from({length: 30}, (_,i)=>`${i+1}`),
  },
  "1y": {
    label: "Último año",
    income:  [40,45,42,50,55,58,60,65,70,68,72,75],
    expenses:[22,25,24,26,28,30,29,31,33,32,34,36],
    x: ["E","F","M","A","M","J","J","A","S","O","N","D"],
  }
};

export default function StatisticsCard() {

  const [range, setRange] = useState("7d");
  const data = presets[range];

  const maxY = useMemo(() => Math.max(...data.income, ...data.expenses), [data]);

  const incBars = data.income.map(v => Math.round((v / maxY) * 100));
  const expBars = data.expenses.map(v => Math.round((v / maxY) * 100));

  const n = data.x.length;
  const step = n > 12 ? Math.ceil(n / 12) : 1;

  return (
    <div className="card statsCard">
      
      {/* HEADER */}
      <div className="statsCard__head">
        <strong>Statistics</strong>

        <div className="statsCard__controls">

          <span className="legend">
            <span className="dot dot--inc" /> Income
          </span>

          <span className="legend">
            <span className="dot dot--exp" /> Expenses
          </span>

          <div className="segmented">
            <button className={range === "7d" ? "active" : ""} onClick={() => setRange("7d")}>
              7 días
            </button>
            <button className={range === "1m" ? "active" : ""} onClick={() => setRange("1m")}>
              1 mes
            </button>
            <button className={range === "1y" ? "active" : ""} onClick={() => setRange("1y")}>
              1 año
            </button>
          </div>

        </div>
      </div>

      {/* GRID CON LÍNEAS DE REFERENCIA */}
      <div className="statsCard__grid" style={{ "--n": n }}>

        {/* Income bars */}
        <div className="bars" style={{ "--n": n }}>
          {incBars.map((h, i) => (
            <div key={`inc-${i}`} className="bar bar--inc" style={{ height: `${h}%` }} />
          ))}
        </div>

        {/* Expenses bars */}
        <div className="bars bars--overlay" style={{ "--n": n }}>
          {expBars.map((h, i) => (
            <div key={`exp-${i}`} className="bar bar--exp" style={{ height: `${h}%` }} />
          ))}
        </div>

        {/* Etiquetas eje X */}
        <div className="xaxis" style={{ "--n": n }}>
          {data.x.map((t, i) => (
            <span key={i}>{i % step === 0 ? t : ""}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
