import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../theme';

// Text box for filtering a list, with a clear (✕) button.
export default function SearchBar({ value, onChangeText, placeholder = 'Search' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: fontSizes.md,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm + 4,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  clear: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    paddingLeft: spacing.sm,
  },
});
