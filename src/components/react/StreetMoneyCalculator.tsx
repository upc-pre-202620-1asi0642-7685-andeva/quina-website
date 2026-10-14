import { useEffect, useId, useRef, useState } from 'react';
import { calcCopy } from '@/i18n/islands';

const PRO_PRICE = 29;
const FREE_CLIENT_LIMIT = 15;

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

export default function StreetMoneyCalculator({ lang = 'es' }: { lang?: 'es' | 'en' | 'qu' }) {
  const t = calcCopy[lang];
  const [clients, setClients] = useState(40);
  const [average, setAverage] = useState(60);
  const [lostPct, setLostPct] = useState(10);

  const street = clients * average;
  const atRisk = (street * lostPct) / 100;
  const isFree = clients <= FREE_CLIENT_LIMIT;
  const breakEven = atRisk > 0 ? (PRO_PRICE / atRisk) * 100 : 0;

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
      </div>

      <div className="calc-result" aria-live="polite">
        <p className="calc-result-label">{t.resultLabel}</p>
        <p className="calc-big">{soles(Math.round(streetShown))}</p>
        <p
          className="calc-risk"
          dangerouslySetInnerHTML={{ __html: t.risk(soles(Math.round(riskShown))) }}
        />
        <p className="calc-verdict">
          {isFree
            ? t.free(clients)
            : breakEven <= 100
              ? t.breakEven(
                  PRO_PRICE,
                  breakEven.toLocaleString('es-PE', { maximumFractionDigits: 1 }),
                )
              : t.small}
        </p>
      </div>
    </div>
  );
}
