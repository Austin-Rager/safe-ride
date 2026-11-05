import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { getRecalls, getVehicleRatings } from '../api/nhtsa';
import useApiData from '../hooks/useApiData';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';
import RecallCard from '../components/RecallCard';
import StarRating from '../components/StarRating';
import { cardShadow, colors, fontSizes, radius, spacing } from '../theme';
import { getVehicleImage } from '../utils/format';

// Loads crash-test ratings and recalls at the same time.
function loadVehicleDetails(vehicleId, year, make, model) {
  return Promise.all([
    getVehicleRatings(vehicleId),
    getRecalls(year, make, model),
  ]).then(([ratings, recalls]) => ({ ratings, recalls }));
}

// Screen 5: photo, star ratings, and recalls for one vehicle.
export default function VehicleDetailScreen({ route }) {
  const { year, make, model, vehicleId } = route.params;
  const { data, loading, refreshing, error, reload, refresh } = useApiData(() =>
    loadVehicleDetails(vehicleId, year, make, model)
  );

  if (loading) return <LoadingView message="Loading safety details..." />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  const { ratings, recalls } = data;
  const imageUrl = getVehicleImage(ratings);

  const header = (
    <View>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
        </View>
      )}

      <Text style={styles.title}>{ratings.VehicleDescription}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>NHTSA Crash-Test Ratings</Text>
        <StarRating label="Overall" value={ratings.OverallRating} />
        <StarRating label="Frontal Crash" value={ratings.OverallFrontCrashRating} />
        <StarRating label="Side Crash" value={ratings.OverallSideCrashRating} />
        <StarRating label="Rollover" value={ratings.RolloverRating} />
      </View>

      <Text style={styles.sectionHeading}>
        Recalls {recalls.length > 0 ? `(${recalls.length})` : ''}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={recalls}
      keyExtractor={(recall) => recall.NHTSACampaignNumber}
      renderItem={({ item }) => <RecallCard recall={item} />}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState
          title="No recalls found"
          message="NHTSA has no recalls on file for this vehicle."
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: radius.lg,
    backgroundColor: colors.border,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 56,
  },
  title: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...cardShadow,
  },
  sectionTitle: {
    paddingVertical: spacing.sm,
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionHeading: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm + 4,
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
});
