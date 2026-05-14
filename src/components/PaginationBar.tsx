import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react-native';

import { colors } from '../theme/colors';

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
  hasPrev: boolean;
  hasNext: boolean;
};

type PaginationBarProps = {
  pagination: PaginationInfo;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
};

export function PaginationBar({
  pagination,
  onFirst,
  onPrev,
  onNext,
  onLast,
}: PaginationBarProps) {
  return (
    <View style={styles.bar}>
      <Text style={styles.info}>
        {pagination.totalItems === 0
          ? 'Sin resultados'
          : `${pagination.from} a ${pagination.to} de ${pagination.totalItems}`}
      </Text>
      <View style={styles.buttons}>
        <Pressable
          style={[styles.pageBtn, !pagination.hasPrev && styles.pageBtnDisabled]}
          onPress={onFirst}
          disabled={!pagination.hasPrev}
        >
          <ChevronsLeft color={pagination.hasPrev ? colors.primary : colors.slate400} size={16} />
        </Pressable>
        <Pressable
          style={[styles.pageBtn, !pagination.hasPrev && styles.pageBtnDisabled]}
          onPress={onPrev}
          disabled={!pagination.hasPrev}
        >
          <ChevronLeft color={pagination.hasPrev ? colors.primary : colors.slate400} size={16} />
        </Pressable>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>{pagination.currentPage}</Text>
        </View>
        <Pressable
          style={[styles.pageBtn, !pagination.hasNext && styles.pageBtnDisabled]}
          onPress={onNext}
          disabled={!pagination.hasNext}
        >
          <ChevronRight color={pagination.hasNext ? colors.primary : colors.slate400} size={16} />
        </Pressable>
        <Pressable
          style={[styles.pageBtn, !pagination.hasNext && styles.pageBtnDisabled]}
          onPress={onLast}
          disabled={!pagination.hasNext}
        >
          <ChevronsRight color={pagination.hasNext ? colors.primary : colors.slate400} size={16} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gradientBackground[2],
    backgroundColor: colors.slate50,
  },
  info: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate400,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gradientBackground[1],
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  indicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  indicatorText: {
    color: colors.slate50,
    fontSize: 13,
    fontWeight: '700',
  },
});
