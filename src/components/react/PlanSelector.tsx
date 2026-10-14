import { useState } from 'react';
import { Check } from 'lucide-react';
import { planCopy } from '@/i18n/islands';

type Billing = 'monthly' | 'yearly';

const prices = [
  { name: 'Casero', monthly: 0, yearly: null, featured: false },
  { name: 'Bodega Pro', monthly: 29, yearly: 279, featured: true },
  { name: 'Negocio Plus', monthly: 69, yearly: 660, featured: false },
] as const;

const fmt = (n: number) => n.toLocaleString('es-PE', { maximumFractionDigits: 2 });

interface Props {
  signupUrl: string;
  lang?: 'es' | 'en' | 'qu';
}

export default function PlanSelector({ signupUrl, lang = 'es' }: Props) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const t = planCopy[lang];

  return (
    <div className="plans">
      <div className="plans-toggle" role="radiogroup" aria-label={t.billingLabel}>
        {(['monthly', 'yearly'] as const).map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={billing === b}
            className={billing === b ? 'is-active' : ''}
            onClick={() => setBilling(b)}
          >
            {b === 'monthly' ? t.monthly : t.yearly}
          </button>
        ))}
      </div>

      <ul className="plans-grid">
        {prices.map((plan, i) => {
          const copy = t.plans[i]!;
          const yearly = billing === 'yearly' && plan.yearly !== null;
          const price = yearly && plan.yearly !== null ? plan.yearly / 12 : plan.monthly;
          return (
            <li key={plan.name} className={`plan ${plan.featured ? 'is-featured' : ''}`}>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-pitch">{copy.pitch}</p>
              <p className="plan-price">
                <span className="plan-amount">S/ {fmt(Math.round(price * 100) / 100)}</span>
                <span className="plan-period">{plan.monthly === 0 ? t.forever : t.perMonth}</span>
              </p>
              <p className="plan-billing">
                {plan.monthly === 0
                  ? t.noCard
                  : yearly && plan.yearly !== null
                    ? t.billedYearly(fmt(plan.yearly))
                    : t.perDay(Math.ceil(plan.monthly / 30))}
              </p>
              <a href={signupUrl} className="plan-cta">
                {copy.cta}
              </a>
              <ul className="plan-features">
                {copy.features.map((f) => (
                  <li key={f}>
                    <Check aria-hidden="true" size={18} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
