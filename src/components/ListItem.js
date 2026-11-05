import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardShadow, colors, fontSizes, radius, spacing } from '../theme';

// A tappable card-style row with a title, optional subtitle, and a chevron.
export default function ListItem({ title, subtitle, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    ...cardShadow,
  },
  rowPressed: {
    opacity: 0.7,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  chevron: {
    fontSize: 28,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
});
