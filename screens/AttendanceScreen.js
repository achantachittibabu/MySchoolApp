import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AttendanceScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="clipboard-check"
          size={40}
          color="#fff"
        />
        <Text style={styles.headerTitle}>Attendance</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Main Action Cards */}
        <View style={styles.buttonContainer}>
          {/* Add Attendance Button */}
          <View style={styles.cardWrapper}>
            <View style={styles.actionCard}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={60}
                color="#4CAF50"
              />
              <Text style={styles.cardTitle}>Add Attendance</Text>
              <Text style={styles.cardDescription}>
                Record teacher/admin login and logout times
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('AttendanceAdd')}
                style={styles.actionButton}
                contentStyle={styles.buttonContent}
              >
                Go to Add Attendance
              </Button>
            </View>
          </View>

          {/* View Attendance Button */}
          <View style={styles.cardWrapper}>
            <View style={styles.actionCard}>
              <MaterialCommunityIcons
                name="eye"
                size={60}
                color="#00BCD4"
              />
              <Text style={styles.cardTitle}>View Attendance</Text>
              <Text style={styles.cardDescription}>
                View attendance records and monthly details
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('AttendanceView')}
                style={styles.viewButton}
                contentStyle={styles.buttonContent}
              >
                Go to View Attendance
              </Button>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="#00BCD4"
          />
          <Text style={styles.infoTitle}>Attendance Management</Text>
          <Text style={styles.infoText}>
            Manage teacher and admin attendance with automatic location tracking and login/logout times.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#00BCD4',
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  buttonContainer: {
    gap: 20,
    marginBottom: 30,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  viewButton: {
    backgroundColor: '#00BCD4',
    width: '100%',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  infoSection: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00695C',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#00897B',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AttendanceScreen;
