export interface CookieConsentState {
  version: 1;
  preferences: boolean;
  analytics: boolean;
  updatedAt: string;
}

export const CONSENT_STORAGE_KEY = 'quina-cookie-consent';
export const CONSENT_EVENT = 'quina:consent-change';

const PREFERENCE_COOKIES = ['quina-theme', 'quina-lang'] as const;

export function readConsent(): CookieConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'version' in parsed &&
      (parsed as { version: unknown }).version === 1 &&
      'preferences' in parsed &&
      typeof (parsed as { preferences: unknown }).preferences === 'boolean' &&
      'analytics' in parsed &&
      typeof (parsed as { analytics: unknown }).analytics === 'boolean'
    ) {
      return parsed as CookieConsentState;
    }
    return null;
  } catch {
    return null;
  }
}

export function allowsPreferences(): boolean {
  const saved = readConsent();
  return saved ? saved.preferences : true;
}

export function allowsAnalytics(): boolean {
  const saved = readConsent();
  return saved ? saved.analytics : false;
}

export function clearPreferenceCookies(): void {
  const secure = location.protocol === 'https:' ? '; secure' : '';
  for (const name of PREFERENCE_COOKIES) {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax${secure}`;
  }
  try {
    localStorage.removeItem('theme');
  } catch {
    // Sin acceso a almacenamiento local
  }
}

export function saveConsent(input: {
  preferences: boolean;
  analytics: boolean;
}): CookieConsentState {
  const next: CookieConsentState = {
    version: 1,
    preferences: input.preferences,
    analytics: input.analytics,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Almacenamiento bloqueado por el navegador
  }

  if (!next.preferences) {
    clearPreferenceCookies();
  }

  window.dispatchEvent(new CustomEvent<CookieConsentState>(CONSENT_EVENT, { detail: next }));
  return next;
}
