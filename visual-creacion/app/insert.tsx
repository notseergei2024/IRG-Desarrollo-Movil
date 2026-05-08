import { Href, router } from "expo-router";
import {
    Building2,
    FileText,
    Home,
    LayoutGrid,
    Search,
    User,
    X,
} from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const items: {
  label: string;
  route: Href;
  color: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
}[] = [
  {
    label: "Cliente",
    route: "/cliente" as Href,
    color: "#22C55E",
    icon: User,
  },
  {
    label: "Pedido",
    route: "/pedido" as Href,
    color: "#38BDF8",
    icon: FileText,
  },
  {
    label: "Inmueble",
    route: "/inmueble" as Href,
    color: "#FB7185",
    icon: Home,
  },
  {
    label: "Edificio",
    route: "/edificio" as Href,
    color: "#FBBF24",
    icon: Building2,
  },
  {
    label: "Complejo",
    route: "/complejo" as Href,
    color: "#EC4899",
    icon: LayoutGrid,
  },
  {
    label: "Busqueda",
    route: "/busqueda" as Href,
    color: "#0EA5E9",
    icon: Search,
  },
];

export default function InsertScreen() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Insertar</Text>

          <Pressable onPress={() => router.back()} hitSlop={14}>
            <X size={22} color="#8A94A6" strokeWidth={3} />
          </Pressable>
        </View>

        <View style={styles.list}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Pressable
                key={item.label}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => router.replace(item.route)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Icon size={22} color="#FFFFFF" strokeWidth={2.2} />
                </View>

                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.32)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 26,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 35,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    elevation: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "800",
  },
  list: {
    gap: 12,
  },
  option: {
    minHeight: 72,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E8EDF4",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    shadowColor: "#111827",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 1,
  },
  optionPressed: {
    transform: [{ scale: 0.985 }],
    backgroundColor: "#F1F5F9",
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  optionText: {
    color: "#171717",
    fontSize: 17,
    fontWeight: "600",
  },
});
