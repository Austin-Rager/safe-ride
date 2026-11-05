import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { getModelYears } from '../api/nhtsa';
import useApiData from '../hooks/useApiData';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import LoadingView from '../components/LoadingView';
import { colors, spacing } from '../theme';

// Screen 1: every model year NHTSA has crash-test data for.
export default function YearsScreen({ navigation }) {
  const { data: years, loading, refreshing, error, reload, refresh } =
    useApiData(getModelYears);

  if (loading) return <LoadingView message="Loading model years..." />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={years}
      keyExtractor={(year) => String(year)}
      renderItem={({ item: year }) => (
        <ListItem
          title={String(year)}
          onPress={() => navigation.navigate('Makes', { year })}
        />
      )}
      ListHeaderComponent={
        <ListHeader
          title="Choose a model year"
          subtitle={`${years.length} years with safety ratings`}
        />
      }
      ListEmptyComponent={<EmptyState title="No model years found" />}
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
