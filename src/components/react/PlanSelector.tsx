import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { planCopy, type PlanSlug } from '@/i18n/islands';

type Billing = 'monthly' | 'yearly';

const prices = [
  { slug: 'casero', name: 'Casero', monthly: 0, yearly: null, featured: false },
  { slug: 'bodega-pro', name: 'Bodega Pro', monthly: 29, yearly: 279, featured: true },
  { slug: 'negocio-plus', name: 'Negocio Plus', monthly: 69, yearly: 660, featured: false },
] as const;

const isSlug = (s: string | undefined): s is PlanSlug => prices.some((p) => p.slug === s);

const fmt = (n: number) => n.toLocaleString('es-PE', { maximumFractionDigits: 2 });

interface Props {
  signupUrl: string;
  lang?: 'es' | 'en' | 'qu';
}

export default function PlanSelector({ signupUrl, lang = 'es' }: Props) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const t = planCopy[lang];

  // Plan recomendado por la calculadora: llega por el hash (#plan-casero, también desde
  // /recursos/calculadora) o por el evento quina:plan cuando ambas están en la portada.
  // `round` cambia en cada elección para repetir el pulso del botón.
  const [picked, setPicked] = useState<{ slug: PlanSlug; round: number } | null>(null);
  const cards = useRef(new Map<PlanSlug, HTMLLIElement>());

  useEffect(() => {
    const pick = (slug: string | undefined) => {
      if (isSlug(slug)) setPicked((prev) => ({ slug, round: (prev?.round ?? 0) + 1 }));
    };
    const fromHash = () => pick(/^#plan-(.+)$/.exec(window.location.hash)?.[1]);
    const fromEvent = (e: Event) => pick((e as CustomEvent<string>).detail);
    fromHash();
    window.addEventListener('hashchange', fromHash);
    window.addEventListener('quina:plan', fromEvent);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener('quina:plan', fromEvent);
    };
  }, []);

  // El foco va a la tarjeta elegida (sin saltar: el scroll lo hace el enlace)
  useEffect(() => {
    if (picked) cards.current.get(picked.slug)?.focus({ preventScroll: true });
  }, [picked]);

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
          const isPicked = picked?.slug === plan.slug;
          return (
            <li
              key={plan.name}
              id={`plan-${plan.slug}`}
              tabIndex={-1}
              ref={(el) => {
                if (el) cards.current.set(plan.slug, el);
              }}
              className={`plan ${plan.featured ? 'is-featured' : ''} ${isPicked ? 'is-picked' : ''}`}
            >
              {isPicked && <p className="plan-picked">{t.picked}</p>}
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
              <a
                href={signupUrl}
                className="plan-cta"
                key={isPicked ? `picked-${picked.round}` : 'idle'}
              >
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
