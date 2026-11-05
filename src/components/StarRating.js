import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../theme';

const MAX_STARS = 5;

// Shows a label with 1–5 stars. NHTSA sends ratings as strings like "4"
// or "Not Rated", so anything that isn't 1–5 shows a "Not Rated" badge.
export default function StarRating({ label, value }) {
  const stars = parseInt(value, 10);
  const isRated = stars >= 1 && stars <= MAX_STARS;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {isRated ? (
        <View style={styles.stars}>
          {Array.from({ length: MAX_STARS }, (_, i) => (
            <Text
              key={i}
              style={[styles.star, i < stars ? styles.filled : styles.empty]}
            >
              ★
            </Text>
          ))}
        </View>
      ) : (
        <View style={styles.notRatedBadge}>
          <Text style={styles.notRatedText}>Not Rated</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
  },
  label: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 22,
    marginLeft: 2,
  },
  filled: {
    color: colors.star,
  },
  empty: {
    color: colors.starEmpty,
  },
  notRatedBadge: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  notRatedText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
