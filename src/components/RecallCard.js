import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardShadow, colors, fontSizes, radius, spacing } from '../theme';
import { formatRecallDate } from '../utils/format';

// One recall. Tap the card to expand the consequence and remedy details.
export default function RecallCard({ recall }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.component}>{recall.Component}</Text>
      <Text style={styles.meta}>
        {formatRecallDate(recall.ReportReceivedDate)} · Campaign #
        {recall.NHTSACampaignNumber}
      </Text>

      <Text style={styles.body} numberOfLines={expanded ? undefined : 3}>
        {recall.Summary}
      </Text>

      {expanded ? (
        <View>
          <Text style={styles.sectionLabel}>Consequence</Text>
          <Text style={styles.body}>{recall.Consequence}</Text>
          <Text style={styles.sectionLabel}>Remedy</Text>
          <Text style={styles.body}>{recall.Remedy}</Text>
        </View>
      ) : null}

      <Text style={styles.toggle}>{expanded ? 'Show less' : 'Show more'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    ...cardShadow,
  },
  cardPressed: {
    opacity: 0.85,
  },
  component: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    marginTop: 2,
    marginBottom: spacing.sm,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  sectionLabel: {
    marginTop: spacing.md,
    marginBottom: 2,
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.danger,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  body: {
    fontSize: fontSizes.sm + 1,
    lineHeight: 20,
    color: colors.text,
  },
  toggle: {
    marginTop: spacing.sm,
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.primary,
  },
});
