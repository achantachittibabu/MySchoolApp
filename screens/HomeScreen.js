import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation, route }) => {
  const username = route?.params?.username || 'User';
  const userType = route?.params?.userType || 'student';

  const menuItems = [
    {
      id: 1,
      title: 'School Information',
      description: 'View school details and policies',
      icon: 'school',
      color: '#6200ea',
      action: () => navigation.navigate('SchoolInformation'),
    },
    {
      id: 2,
      title: 'Announcements',
      description: 'Latest news and announcements',
      icon: 'bell',
      color: '#f57c00',
      action: () => navigation.navigate('Detail', { type: 'Announcements' }),
    },
    {
      id: 3,
      title: 'School Events',
      description: 'Upcoming events and activities',
      icon: 'calendar-month',
      color: '#4CAF50',
      action: () => navigation.navigate('Detail', { type: 'School Events' }),
    },
    {
      id: 4,
      title: 'Academic Calendar',
      description: 'Term dates and holidays',
      icon: 'calendar-heat',
      color: '#2196F3',
      action: () => navigation.navigate('Detail', { type: 'Academic Calendar' }),
    },
    {
      id: 5,
      title: 'Facilities',
      description: 'School facilities and resources',
      icon: 'home-city',
      color: '#9C27B0',
      action: () => navigation.navigate('Detail', { type: 'Facilities' }),
    },
    {
      id: 6,
      title: 'Contact Us',
      description: 'School contact information',
      icon: 'phone',
      color: '#FF5722',
      action: () => navigation.navigate('Detail', { type: 'Contact Us' }),
    },
    {
      id: 7,
      title: 'Fee Details',
      description: 'View fee structure and payment status',
      icon: 'currency-inr',
      color: '#00BCD4',
      action: () => navigation.navigate('FeeDetails'),
    },
    {
      id: 8,
      title: 'Attendance',
      description: 'Check attendance records and statistics',
      icon: 'clipboard-check',
      color: '#FF9800',
      action: () => navigation.navigate('Attendance'),
    },
  ];

  const capitalizeUserType = userType.charAt(0).toUpperCase() + userType.slice(1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.welcomeSection}>
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color="#6200ea"
          />
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.userType}>{capitalizeUserType}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>School Menu</Text>

        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.action}
              activeOpacity={0.8}
            >
              <Card style={[styles.menuCard, { borderLeftColor: item.color }]}>
                <View style={styles.cardContent}>
                  <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={32}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#ccc"
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Detail', { type: 'Profile' })}
            style={styles.profileButton}
            contentStyle={styles.buttonContent}
          >
            View Profile
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
            style={styles.logoutButton}
            contentStyle={styles.buttonContent}
          >
            Logout
          </Button>
        </View>

        <Text style={styles.footer}>
          © 2026 MySchoolApp. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#6200ea',
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  userType: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuGrid: {
    gap: 12,
    marginBottom: 25,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  menuDescription: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    gap: 10,
    marginBottom: 20,
  },
  profileButton: {
    backgroundColor: '#6200ea',
  },
  logoutButton: {
    borderColor: '#6200ea',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default HomeScreen;
