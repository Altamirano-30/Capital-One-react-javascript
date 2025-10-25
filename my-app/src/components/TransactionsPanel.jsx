const items = [
  { icon: 'A', name: 'Apple', tag: 'Electronic', amount: '-799$' },
  { icon: 'G', name: 'Google Play Store', tag: 'Apps', amount: '-49$' },
  { icon: 'A', name: 'Amazon', tag: 'Shopping', amount: '-59$' },
  { icon: '⇄', name: 'Quick Transfer', tag: 'Emiliano Enriquez', amount: '+350$', positive: true },
  { icon: '🛒', name: 'The Market', tag: 'Groceries', amount: '-9$' },
  { icon: '🍕', name: 'Dominos pizza', tag: 'Restaurant', amount: '-9$' },
  { icon: '🚗', name: 'Uber', tag: 'Uber services', amount: '-9$' },
];

export default function TransactionsPanel({ className = "" }) {
  return (
    <div className={`card trans ${className}`}>
      <div className="trans__head">
        <strong>Transactions</strong>
        <a href="#" className="muted">View all</a>
      </div>

      <div className="trans__tabs muted">
        All &nbsp;·&nbsp; Expenses &nbsp;·&nbsp; Income
      </div>

      <div className="trans__list">
        {items.map((t, i)=>(
          <div key={i} className="trans__item">
            <div className="trans__left">
              <div className="trans__icon">{t.icon}</div>
              <div>
                <div className="trans__name">{t.name}</div>
                <div className="muted">{t.tag}</div>
              </div>
            </div>
            <div className={`trans__amount ${t.positive ? 'pos' : ''}`}>
              {t.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
