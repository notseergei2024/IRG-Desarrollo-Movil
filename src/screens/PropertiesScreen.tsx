import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBackButton } from '../components/HeaderBackButton';
import { BaseCard } from '../components/BaseCard';
import { CategoryDropdown } from '../components/CategoryDropdown';
import { ToolsToolbar } from '../components/ToolsToolbar';
import { PaginationBar } from '../components/PaginationBar';
import { PropertyDetailModal } from '../components/PropertyDetailModal';
import { PROPERTIES_SCREEN_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';
import { usePropertiesState } from '../hooks/usePropertiesState';

export function PropertiesScreen() {
  const state = usePropertiesState();

  return (
    <SafeAreaView style={styles.safeArea}>
      {}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{PROPERTIES_SCREEN_DATA.title}</Text>
          <Text style={styles.recordCount}>
            {state.filteredProperties.length} registros encontrados
          </Text>
        </View>
        <HeaderBackButton />
      </View>

      {}
      <CategoryDropdown
        categories={state.categories}
        selectedCategory={state.selectedCategory}
        activeCategoryLabel={state.activeCategoryLabel}
        isOpen={state.categoryDropdownOpen}
        onToggle={state.toggleCategoryDropdown}
        onSelect={state.selectCategory}
      />

      {}
      <ToolsToolbar
        searchQuery={state.searchQuery}
        onSearchChange={state.setSearchQuery}
        searchPlaceholder={PROPERTIES_SCREEN_DATA.searchPlaceholder}
        toolsMenuOpen={state.toolsMenuOpen}
        onToggleTools={state.toggleToolsMenu}
        toolsMenuItems={state.toolsMenuItems}
        onToolAction={state.handleToolAction}
      />

      {}
      <FlatList
        data={state.paginatedProperties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No se encontraron inmuebles</Text>
          </View>
        }
        renderItem={({ item }) => (
          <BaseCard
            title={`${item.code} · ${item.estadoInmueble}`}
            subtitle={`${item.propietario} — ${item.telPropietario}`}
            lines={[item.direccionCompleta]}
          />
        )}
      />

      {}
      <PaginationBar
        pagination={state.pagination}
        onFirst={state.goToFirstPage}
        onPrev={state.goToPrevPage}
        onNext={state.goToNextPage}
        onLast={state.goToLastPage}
      />

      {}
      <PropertyDetailModal
        visible={state.detailModalVisible}
        property={state.selectedProperty}
        onClose={state.closeDetail}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textMain,
    fontFamily: typography.title,
  },
  recordCount: {
    fontSize: 13,
    color: colors.slate400,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 12,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.slate400,
    fontSize: 14,
    fontWeight: '600',
  },
});
