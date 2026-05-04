import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, Plus, User, Search } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

type SearchHeaderProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPressPlus?: () => void;
  onPressBell?: () => void;
  onPressProfile?: () => void;
};

const SearchHeader = ({
  value,
  placeholder = 'Buscar...',
  onChangeText,
  onPressPlus,
  onPressBell,
  onPressProfile,
}: SearchHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <Search size={16} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconButton, styles.actionSpacing]} onPress={onPressPlus}>
          <Plus size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.actionSpacing]} onPress={onPressBell}>
          <Bell size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={onPressProfile}>
          <User size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: COLORS.textDark,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionSpacing: {
    marginRight: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.info,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchHeader;
