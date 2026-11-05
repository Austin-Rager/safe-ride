import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { getModels } from '../api/nhtsa';
import useApiData from '../hooks/useApiData';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import LoadingView from '../components/LoadingView';
import { colors, spacing } from '../theme';

// Screen 3: models a manufacturer sold in the chosen year.
export default function ModelsScreen({ navigation, route }) {
  const { year, make } = route.params;
  const { data: models, loading, refreshing, error, reload, refresh } =
    useApiData(() => getModels(year, make));

  if (loading) return <LoadingView message={`Loading ${make} models...`} />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={models}
      keyExtractor={(model) => model}
      renderItem={({ item: model }) => (
        <ListItem
          title={model}
          onPress={() => navigation.navigate('Variants', { year, make, model })}
        />
      )}
      ListHeaderComponent={
        <ListHeader title="Choose a model" subtitle={`${models.length} models`} />
      }
      ListEmptyComponent={<EmptyState title={`No ${make} models found`} />}
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
