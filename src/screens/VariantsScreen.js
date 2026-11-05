import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { getVariants } from '../api/nhtsa';
import useApiData from '../hooks/useApiData';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import LoadingView from '../components/LoadingView';
import { colors, spacing } from '../theme';

// Screen 4: specific versions of a model (body style, drivetrain, etc.).
export default function VariantsScreen({ navigation, route }) {
  const { year, make, model } = route.params;
  const { data: variants, loading, refreshing, error, reload, refresh } =
    useApiData(() => getVariants(year, make, model));

  if (loading) return <LoadingView message="Loading variants..." />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={variants}
      keyExtractor={(variant) => String(variant.VehicleId)}
      renderItem={({ item: variant }) => (
        <ListItem
          title={variant.VehicleDescription}
          subtitle={`Vehicle ID ${variant.VehicleId}`}
          onPress={() =>
            navigation.navigate('VehicleDetail', {
              year,
              make,
              model,
              vehicleId: variant.VehicleId,
            })
          }
        />
      )}
      ListHeaderComponent={
        <ListHeader
          title="Choose a variant"
          subtitle={`${variants.length} tested ${variants.length === 1 ? 'variant' : 'variants'}`}
        />
      }
      ListEmptyComponent={<EmptyState title="No variants found" />}
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
});
