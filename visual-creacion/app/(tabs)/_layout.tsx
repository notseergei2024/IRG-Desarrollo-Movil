import { Tabs, router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarButton: () => (
            <Pressable
              style={styles.plusButton}
              onPress={() => router.push("/insert")}
            >
              <Plus size={34} color="#FFFFFF" strokeWidth={2.6} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 76,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E6EAF0",
    borderTopWidth: 1,
    justifyContent: "center",
  },
  plusButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -26,
    alignSelf: "center",
    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
});
