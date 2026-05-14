import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, ChevronUp, Check } from 'lucide-react-native';

import type { PropertyCategory } from '../data/mockData';
import { colors } from '../theme/colors';

type CategoryDropdownProps = {
  categories: PropertyCategory[];
  selectedCategory: string;
  activeCategoryLabel: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (key: string) => void;
};

export function CategoryDropdown({
  categories,
  selectedCategory,
  activeCategoryLabel,
  isOpen,
  onToggle,
  onSelect,
}: CategoryDropdownProps) {
  return (
    <>
      {}
      <View style={styles.selectorRow}>
        <Pressable style={styles.pill} onPress={onToggle}>
          <View style={styles.dot} />
          <Text style={styles.pillText}>{activeCategoryLabel}</Text>
          {isOpen ? (
            <ChevronUp color={colors.textMain} size={16} />
          ) : (
            <ChevronDown color={colors.textMain} size={16} />
          )}
        </Pressable>
      </View>

      {}
      {isOpen && (
        <View style={styles.overlay}>
          <ScrollView style={styles.scroll} nestedScrollEnabled>
            {categories.map((cat) => {
              const isActive = cat.key === selectedCategory;
              return (
                <Pressable
                  key={cat.key}
                  style={[styles.item, isActive && styles.itemActive]}
                  onPress={() => onSelect(cat.key)}
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.itemDot, isActive && styles.itemDotActive]} />
                    <Text style={[styles.label, isActive && styles.labelActive]}>
                      {cat.label}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={[styles.count, isActive && styles.countActive]}>
                      {cat.count}
                    </Text>
                    {isActive && <Check color={colors.primary} size={16} />}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  selectorRow: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.slate50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMain,
  },

  overlay: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    zIndex: 100,
    backgroundColor: colors.slate50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    maxHeight: 340,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  scroll: {
    padding: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  itemActive: {
    backgroundColor: colors.gradientBackground[1],
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.slate400,
  },
  itemDotActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMain,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  count: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate400,
  },
  countActive: {
    color: colors.primary,
  },
});
