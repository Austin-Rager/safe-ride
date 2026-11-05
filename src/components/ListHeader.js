import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme';

// Title and subtitle shown above a list, e.g. "Choose a make" / "38 makes".
export default function ListHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
});
