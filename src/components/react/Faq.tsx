import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export default function Faq({ items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = idPrefix + useId();

  return (
    <ul className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <Plus className="faq-icon" aria-hidden="true" size={22} strokeWidth={2} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel">
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
