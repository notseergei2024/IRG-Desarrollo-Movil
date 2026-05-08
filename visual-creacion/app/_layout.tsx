import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="insert"
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />

      <Stack.Screen name="cliente" />
      <Stack.Screen name="pedido" />
      <Stack.Screen name="inmueble" />
      <Stack.Screen name="edificio" />
      <Stack.Screen name="complejo" />
      <Stack.Screen name="busqueda" />
    </Stack>
  );
}
