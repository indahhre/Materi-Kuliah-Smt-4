// Attendance.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";

function AttendanceScreen() {
  const [name, setName] = useState(""); // State untuk menyimpan nama kasir
  const [attendanceStatus, setAttendanceStatus] = useState(null); // State untuk status absensi

  // Fungsi untuk handle saat kasir melakukan absen
  const handleCheckIn = () => {
    if (name.trim()) {
      setAttendanceStatus(`Kasir ${name} hadir!`); // Menampilkan status absen
    } else {
      setAttendanceStatus("Nama kasir tidak boleh kosong."); // Jika nama kosong
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Absensi Kasir</Text>

      {/* Input untuk nama kasir */}
      <TextInput
        style={styles.input}
        placeholder="Nama Kasir"
        value={name}
        onChangeText={(text) => setName(text)} // Mengupdate state nama
      />

      {/* Tombol Absen */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleCheckIn}>
        <Text style={styles.submitText}>Absen</Text>
      </TouchableOpacity>

      {/* Menampilkan status absensi */}
      {attendanceStatus && (
        <Text style={styles.attendanceStatus}>{attendanceStatus}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: "#6D4C41",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold" },
  attendanceStatus: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "green",
  },
});

export default AttendanceScreen;
