import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

import type { Property } from '../data/mockData';
import { colors } from '../theme/colors';

type PropertyDetailModalProps = {
  visible: boolean;
  property: Property | null;
  onClose: () => void;
};

export function PropertyDetailModal({ visible, property, onClose }: PropertyDetailModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{property?.code ?? 'Detalle'}</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X color={colors.slate50} size={18} />
            </Pressable>
          </View>


          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {property && (
              <>
                {/* 
                  PARTE B
                */}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.backgroundMain,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.slate50,
    fontSize: 17,
    fontWeight: '800',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
    gap: 18,
  },
});
