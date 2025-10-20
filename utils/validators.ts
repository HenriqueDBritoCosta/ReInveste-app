//utils/validators.ts
export function isNotEmpty(value?: string) {
  return !!value && value.trim().length > 0;
}

export function isNumber(value?: string) {
  if (!value) return false;
  return !isNaN(Number(value));
}

export function isPhone(value?: string) {
  if (!value) return false;
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length >= 8 && cleaned.length <= 15;
}
