import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MoreHorizontal, Printer, Filter, Download } from 'lucide-react-native';

import { colors } from '../theme/colors';

const TOOL_ICONS: Record<string, typeof Printer> = {
  impresiones: Printer,
  filtros: Filter,
  descargar: Download,
};

type ToolsMenuItem = { key: string; label: string };

type ToolsToolbarProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  searchPlaceholder: string;
  toolsMenuOpen: boolean;
  onToggleTools: () => void;
  toolsMenuItems: readonly ToolsMenuItem[];
  onToolAction: (key: string) => void;
};

export function ToolsToolbar({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  toolsMenuOpen,
  onToggleTools,
  toolsMenuItems,
  onToolAction,
}: ToolsToolbarProps) {
  return (
    <>
      <View style={styles.toolbar}>
        <Pressable style={styles.toolsButton} onPress={onToggleTools}>
          <MoreHorizontal color={colors.textMain} size={18} />
          <Text style={styles.toolsButtonText}>Herramientas</Text>
        </Pressable>

        <TextInput
          style={styles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.slate400}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {toolsMenuOpen && (
        <View style={styles.dropdown}>
          {toolsMenuItems.map((tool) => {
            const Icon = TOOL_ICONS[tool.key] ?? MoreHorizontal;
            return (
              <Pressable
                key={tool.key}
                style={styles.toolItem}
                onPress={() => onToolAction(tool.key)}
              >
                <Icon color={colors.textMain} size={16} />
                <Text style={styles.toolLabel}>{tool.label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 8,
  },
  toolsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.slate50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  toolsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMain,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.slate50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textMain,
    fontSize: 13,
  },

  dropdown: {
    position: 'absolute',
    top: 190,
    left: 20,
    zIndex: 90,
    backgroundColor: colors.slate50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    paddingVertical: 6,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    minWidth: 170,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 8,
  },
  toolLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMain,
  },
});
