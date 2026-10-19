import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { calcCopy, type PlanSlug } from '@/i18n/islands';

const PRO_PRICE = 29;
const FREE_CLIENT_LIMIT = 15;
// Usuarios por tienda (docs/pricing-strategy.md): Casero 1, Bodega Pro hasta 3, Negocio Plus
// ilimitados. Por eso el equipo se elige en tres tramos y no con un slider.
const TEAMS = ['solo', 'small', 'large'] as const;
type Team = (typeof TEAMS)[number];

const soles = (n: number, decimals = 0) =>
  'S/ ' +
  n.toLocaleString('es-PE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Interpola un número hacia su nuevo valor para que las cifras "cuenten". */
function useTweened(value: number, duration = 450) {
  const [display, setDisplay] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 0 : duration;
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = total === 0 ? 1 : Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 4);
      const next = origin + (value - origin) * eased;
      from.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  // La variable CSS se fija en el cliente para evitar diferencias de hidratación
  useEffect(() => {
    input.current?.style.setProperty('--fill', `${pct}%`);
  }, [pct]);
  return (
    <div className="calc-field">
      <div className="calc-field-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        ref={input}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

// children: el botón de registro, que llega desde Calculator.astro como HTML estático
// para que sea el mismo Button.astro (con efecto imán) del resto del sitio
// pricingPage: página con las tarjetas de planes ('' = esta misma, o '/planes')
export default function StreetMoneyCalculator({
  lang = 'es',
  pricingPage = '/planes',
  children,
}: {
  lang?: 'es' | 'en' | 'qu';
  pricingPage?: string;
  children?: ReactNode;
}) {
  const t = calcCopy[lang];
  const [clients, setClients] = useState(40);
  const [average, setAverage] = useState(60);
  const [lostPct, setLostPct] = useState(10);
  const [team, setTeam] = useState<Team>('solo');
  const teamName = useId();
  const teamRef = useRef<HTMLFieldSetElement>(null);

  // Si eligieron un tramo antes de que la isla se hidratara, el radio ya está marcado
  // en el HTML pero React no se enteró: se toma de ahí al montar
  useEffect(() => {
    const value = teamRef.current?.querySelector<HTMLInputElement>('input:checked')?.value;
    if (TEAMS.some((t) => t === value)) setTeam(value as Team);
  }, []);

  const street = clients * average;
  const atRisk = (street * lostPct) / 100;
  const isFree = clients <= FREE_CLIENT_LIMIT;
  const breakEven = atRisk > 0 ? (PRO_PRICE / atRisk) * 100 : 0;

  // El nombre del plan enlaza a su tarjeta: ↓ si está en la misma página, → si es otra
  const link = (plan: string, slug: PlanSlug) =>
    `<a href="${pricingPage}#plan-${slug}" class="calc-plan-link" data-plan="${slug}">${plan}<span aria-hidden="true"> ${
      pricingPage ? '→' : '↓'
    }</span></a>`;

  // En la misma página avisa a PlanSelector qué plan marcar (Lenis no siempre dispara hashchange)
  const pick = (e: ReactMouseEvent) => {
    const slug = (e.target as HTMLElement).closest<HTMLElement>('[data-plan]')?.dataset['plan'];
    if (slug && !pricingPage) window.dispatchEvent(new CustomEvent('quina:plan', { detail: slug }));
  };
  // Primero el equipo: con más de 3 personas solo sirve Plus y con 2 o 3 ya no alcanza Casero
  const verdict =
    team === 'large'
      ? t.plus(link)
      : team === 'small'
        ? t.team(link)
        : isFree
          ? t.free(clients, link)
          : breakEven <= 100
            ? t.breakEven(
                PRO_PRICE,
                breakEven.toLocaleString('es-PE', { maximumFractionDigits: 1 }),
                link,
              )
            : t.small(link);

  const streetShown = useTweened(street);
  const riskShown = useTweened(atRisk);

  return (
    <div className="calc" data-ui>
      <div className="calc-inputs">
        <Slider
          label={t.clients}
          value={clients}
          min={5}
          max={150}
          step={1}
          format={(n) => `${n}`}
          onChange={setClients}
        />
        <Slider
          label={t.average}
          value={average}
          min={10}
          max={400}
          step={5}
          format={(n) => soles(n)}
          onChange={setAverage}
        />
        <Slider
          label={t.lost}
          value={lostPct}
          min={1}
          max={30}
          step={1}
          format={(n) => `${n} %`}
          onChange={setLostPct}
        />
        <fieldset className="calc-team" ref={teamRef}>
          <legend>{t.people}</legend>
          <div className="calc-team-options">
            {TEAMS.map((value, i) => (
              <label key={value}>
                <input
                  type="radio"
                  name={teamName}
                  value={value}
                  defaultChecked={value === 'solo'}
                  onChange={() => setTeam(value)}
                />
                <span>{t.teamOptions[i]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="calc-result" aria-live="polite">
        <p className="calc-result-label">{t.resultLabel}</p>
        <p className="calc-big">{soles(Math.round(streetShown))}</p>
        <p
          className="calc-risk"
          dangerouslySetInnerHTML={{ __html: t.risk(soles(Math.round(riskShown))) }}
        />
        {/* El clic se escucha en el párrafo: el enlace llega como HTML */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <p className="calc-verdict" onClick={pick} dangerouslySetInnerHTML={{ __html: verdict }} />
        {/* La recomendación y enseguida el botón: el argumento cierra con la acción */}
        {children && <div className="calc-cta">{children}</div>}
      </div>
    </div>
  );
}
