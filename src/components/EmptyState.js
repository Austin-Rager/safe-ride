import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme';

// Friendly placeholder shown when a list has no items.
export default function EmptyState({ icon = '🔍', title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    marginTop: spacing.xs,
    fontSize: fontSizes.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
