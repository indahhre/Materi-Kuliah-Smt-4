import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const PRODUCTS = [
  { id: "1", name: "Kopi Susu Gula Aren", price: 14000 },
  { id: "2", name: "Toast", price: 12000 },
];

const CheckoutScreen = ({ route }) => {
  const { cart } = route.params;
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashInput, setCashInput] = useState("");

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const finishPayment = () => {
    Alert.alert("✅ Pembayaran Berhasil", `Total: Rp${total.toLocaleString()}`, [
      {
        text: "Selesai",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  const renderPaymentForm = () => {
    if (paymentMethod === "QRIS") {
      return (
        <View style={styles.form}>
          <Text style={styles.text}>Silakan scan QRIS di kasir.</Text>
          <TouchableOpacity style={styles.button} onPress={finishPayment}>
            <Text style={styles.buttonText}>Sudah Bayar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (paymentMethod === "Cash") {
      const cashAmount = parseInt(cashInput) || 0;
      const change = cashAmount - total;

      return (
        <View style={styles.form}>
          <Text style={styles.text}>Masukkan uang tunai:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Contoh: 20000"
            value={cashInput}
            onChangeText={setCashInput}
          />
          {cashAmount > 0 && (
            <Text style={styles.text}>
              {change < 0
                ? `Kurang Rp${Math.abs(change).toLocaleString()}`
                : `Kembalian Rp${change.toLocaleString()}`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              cashAmount >= total
                ? finishPayment()
                : Alert.alert("⚠️ Uang tidak cukup")
            }
          >
            <Text style={styles.buttonText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (paymentMethod === "AM") {
      return (
        <View style={styles.form}>
          <Text style={styles.text}>Transfer ke: BCA 123456789 a.n KopiKuy</Text>
          <Text style={styles.text}>Total: Rp{total.toLocaleString()}</Text>
          <TouchableOpacity style={styles.button} onPress={finishPayment}>
            <Text style={styles.buttonText}>Sudah Transfer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <LinearGradient colors={["#4E342E", "#3E2723"]} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Metode Pembayaran</Text>
        <View style={styles.methods}>
          {["QRIS", "Cash", "AM"].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodBtn,
                paymentMethod === method && styles.activeBtn,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.methodText,
                  paymentMethod === method && styles.activeText,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderPaymentForm()}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  methods: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  methodBtn: {
    backgroundColor: "#D7CCC8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeBtn: {
    backgroundColor: "#FF9800",
  },
  methodText: {
    color: "#3E2723",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  form: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  text: {
    color: "#3E2723",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4E342E",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
