// ── Validation helpers used across auth + onboarding ─────────────────────

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(email.trim())) return "Enter a valid email address";
  return null;
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required`;
  return null;
}

export function validateMinLength(value: string, min: number, label: string): string | null {
  if (value.length < min) return `${label} must be at least ${min} characters`;
  return null;
}

export function validatePasswordMatch(password: string, confirm: string): string | null {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return null;
}

// ── Password strength ─────────────────────────────────────────────────────
export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4; // 0 = empty, 1 = weak → 4 = strong
  label: string;
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", color: "bg-gray-200", textColor: "text-gray-400" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Clamp to 1-4
  const s = Math.min(4, Math.max(1, score)) as 1 | 2 | 3 | 4;

  const map: Record<1 | 2 | 3 | 4, Omit<PasswordStrength, "score">> = {
    1: { label: "Weak",      color: "bg-red-400",    textColor: "text-red-500" },
    2: { label: "Fair",      color: "bg-orange-400", textColor: "text-orange-500" },
    3: { label: "Good",      color: "bg-yellow-400", textColor: "text-yellow-600" },
    4: { label: "Strong",    color: "bg-emerald-500", textColor: "text-emerald-600" },
  };

  return { score: s, ...map[s] };
}

// ── Generic form error helpers ────────────────────────────────────────────
export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function hasErrors<T extends string>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some((v) => !!v);
}
