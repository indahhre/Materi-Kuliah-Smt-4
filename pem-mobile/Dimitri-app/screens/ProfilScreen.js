import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('akun');

  const handleEdit = (field) => {
    console.log(`Edit ${field} pressed`);
    // Replace with navigation or modal logic
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'akun':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Akun Saya</Text>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Email</Text><Text style={styles.prefValue}>kopilover@email.com</Text></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Alamat</Text><TouchableOpacity onPress={() => handleEdit('alamat')}><Text style={[styles.prefValue, styles.clickable]}>Edit</Text></TouchableOpacity></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Password</Text><TouchableOpacity onPress={() => handleEdit('password')}><Text style={[styles.prefValue, styles.clickable]}>Ubah</Text></TouchableOpacity></View>
          </View>
        );
      case 'aktivitas':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aktivitas Saya</Text>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Pesanan Terakhir</Text><Text style={styles.prefValue}>Espresso (2 Apr)</Text></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Poin Loyalty</Text><Text style={styles.prefValue}>2.580</Text></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Riwayat Top-Up</Text><Text style={styles.prefValue}>Rp50.000</Text></View>
          </View>
        );
      case 'pengaturan':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pengaturan Aplikasi</Text>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Notifikasi</Text><Text style={styles.prefValue}>Nyala</Text></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Dark Mode</Text><Text style={styles.prefValue}>Mati</Text></View>
            <View style={styles.prefRow}><Text style={styles.prefLabel}>Keluar Akun</Text><Text style={styles.prefValue}>Logout</Text></View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      {/* Nama dan Deskripsi */}
      <View style={styles.profileSection}>
        <Text style={styles.name}>Kopi Lover</Text>
        <Text style={styles.bio}>Pencinta kopi sejati sejak 2001</Text>
      </View>

      {/* Quick Actions as Text Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('akun')} style={[styles.tabItem, activeTab === 'akun' && styles.activeTab]}>
          <Text style={[styles.tabLabel, activeTab === 'akun' && styles.activeTabLabel]}>Akun</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('aktivitas')} style={[styles.tabItem, activeTab === 'aktivitas' && styles.activeTab]}>
          <Text style={[styles.tabLabel, activeTab === 'aktivitas' && styles.activeTabLabel]}>Aktivitas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('pengaturan')} style={[styles.tabItem, activeTab === 'pengaturan' && styles.activeTab]}>
          <Text style={[styles.tabLabel, activeTab === 'pengaturan' && styles.activeTabLabel]}>Pengaturan</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfaf6',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b2e2b',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4b2e2b',
  },
  bio: {
    color: '#7b6f63',
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f0e9e0',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7b6f63',
  },
  activeTab: {
    backgroundColor: '#4b2e2b',
  },
  activeTabLabel: {
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b2e2b',
    marginBottom: 15,
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  prefLabel: {
    color: '#7b6f63',
    fontSize: 14,
  },
  prefValue: {
    color: '#4b2e2b',
    fontWeight: '600',
    fontSize: 14,
  },
  clickable: {
    textDecorationLine: 'underline',
  },
});
