import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { getMakes } from '../api/nhtsa';
import useApiData from '../hooks/useApiData';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import LoadingView from '../components/LoadingView';
import SearchBar from '../components/SearchBar';
import { colors, spacing } from '../theme';

// Screen 2: manufacturers for the chosen year, with a search filter.
export default function MakesScreen({ navigation, route }) {
  const { year } = route.params;
  const [query, setQuery] = useState('');
  const { data: makes, loading, refreshing, error, reload, refresh } =
    useApiData(() => getMakes(year));

  if (loading) return <LoadingView message="Loading makes..." />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  const filteredMakes = makes.filter((make) =>
    make.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Kept outside the FlatList so the keyboard stays open while typing. */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search makes (e.g. Toyota)"
        />
      </View>

      <FlatList
        contentContainerStyle={styles.content}
        data={filteredMakes}
        keyExtractor={(make) => make}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item: make }) => (
          <ListItem
            title={make}
            onPress={() => navigation.navigate('Models', { year, make })}
          />
        )}
        ListHeaderComponent={
          <ListHeader
            title="Choose a make"
            subtitle={`${filteredMakes.length} of ${makes.length} makes`}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="No matching makes"
            message={query ? `Nothing matches "${query}".` : undefined}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
