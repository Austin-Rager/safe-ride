// Shared design tokens so every screen looks consistent.

export const colors = {
  primary: '#1D4ED8',
  primaryDark: '#1E3A8A',
  background: '#F3F5F9',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
  star: '#F59E0B',
  starEmpty: '#CBD5E1',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  success: '#15803D',
  successLight: '#DCFCE7',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  sm: 13,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

// Soft drop shadow used on cards (iOS uses shadow*, Android uses elevation).
export const cardShadow = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};
