import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Daftar produk lengkap (Produk minuman dan makanan)
const PRODUCTS = [
  { id: "1", name: "Americano", price: 15000, category: "Drinks" },
  { id: "2", name: "Macchiato", price: 18000, category: "Drinks" },
  { id: "3", name: "Kopi Susu Gula Aren", price: 14000, category: "Drinks" },
  { id: "4", name: "Toast", price: 12000, category: "Foods" },
  { id: "5", name: "French Fries", price: 10000, category: "Foods" },
  { id: "6", name: "Spaghetti", price: 21000, category: "Foods" },
  { id: "7", name: "Soda Orenji", price: 11000, category: "Drinks" },
  { id: "8", name: "Cappuccino", price: 17000, category: "Drinks" },
  { id: "9", name: "Iced Latte", price: 16000, category: "Drinks" },
  { id: "10", name: "Pasta Carbonara", price: 25000, category: "Foods" },
  { id: "11", name: "Fried Chicken", price: 22000, category: "Foods" },
  { id: "12", name: "Pizza Margherita", price: 35000, category: "Foods" },
  { id: "13", name: "Lemonade", price: 13000, category: "Drinks" },
  { id: "14", name: "Tea", price: 10000, category: "Drinks" },
  { id: "15", name: "Garlic Bread", price: 12000, category: "Foods" },
];

const CATEGORIES = ["Drinks", "Foods"];

function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Drinks");
  const [cart, setCart] = useState({});

  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: prev[item.id] ? prev[item.id] + 1 : 1,
    }));
  };

  const filtered = PRODUCTS.filter((p) => p.category === selectedCategory);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kasir Kopi</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categoryBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text>Rp{item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />

      {total > 0 && (
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout", { cart })}
        >
          <Text style={styles.checkoutText}>
            Bayar Sekarang (Rp{total.toLocaleString()})
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

function CheckoutScreen({ route, navigation }) {
  const { cart } = route.params;
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleSubmit = () => {
    if (paymentMethod && Object.values(form).every((val) => val !== "")) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.success}>✅ Pembayaran berhasil!</Text>
        <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.backBtn}>
          <Text style={{ color: "#fff" }}>Kembali ke Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.total}>Total: Rp{total.toLocaleString()}</Text>
      <Text style={{ marginTop: 10 }}>Pilih Metode Pembayaran:</Text>

      {["QRIS", "ATM", "Cash"].map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.methodBtn,
            paymentMethod === method && styles.methodBtnActive,
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text
            style={[
              styles.methodText,
              paymentMethod === method && styles.methodTextActive,
            ]}
          >
            {method}
          </Text>
        </TouchableOpacity>
      ))}

      {paymentMethod === "QRIS" && (
        <View style={styles.form}>
          <TextInput
            placeholder="Nama Pengirim"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, nama: text })}
          />
          <TextInput
            placeholder="ID Transaksi"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, trxId: text })}
          />
        </View>
      )}

      {paymentMethod === "ATM" && (
        <View style={styles.form}>
          <TextInput
            placeholder="Nama Pengirim"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, nama: text })}
          />
          <TextInput
            placeholder="Bank"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, bank: text })}
          />
        </View>
      )}

      {paymentMethod === "Cash" && (
        <View style={styles.form}>
          <TextInput
            placeholder="Uang diterima"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, uang: text })}
          />
        </View>
      )}

      {paymentMethod && (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Sudah Bayar</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  categoryRow: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  categoryBtn: {
    backgroundColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  categoryBtnActive: { backgroundColor: "#4E342E" },
  categoryText: { color: "#333" },
  categoryTextActive: { color: "#fff" },
  card: {
    padding: 14,
    marginVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  productName: { fontSize: 16, fontWeight: "bold" },
  checkoutBtn: {
    backgroundColor: "#3E2723",
    padding: 14,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  total: { fontSize: 18, fontWeight: "bold" },
  methodBtn: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#aaa",
  },
  methodBtnActive: { backgroundColor: "#4E342E", borderColor: "#4E342E" },
  methodText: { textAlign: "center" },
  methodTextActive: { color: "#fff" },
  form: { marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  submitBtn: {
    backgroundColor: "#4E342E",
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold" },
  success: { fontSize: 20, color: "green", textAlign: "center", marginTop: 20 },
  backBtn: {
    backgroundColor: "#4E342E",
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
});
