import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SchoolInformationScreen = ({ navigation }) => {
  const informationOptions = [
    {
      id: 1,
      title: 'Student Information',
      description: 'View and manage student records',
      icon: 'account-multiple',
      color: '#6200ea',
      action: () => navigation.navigate('StudentList'),
    },
    {
      id: 2,
      title: 'Teacher Information',
      description: 'View and manage teacher records',
      icon: 'school',
      color: '#4CAF50',
      action: () => navigation.navigate('TeacherList'),
    },
    {
      id: 3,
      title: 'Admin Information',
      description: 'View and manage admin records',
      icon: 'account-tie',
      color: '#f57c00',
      action: () => navigation.navigate('AdminList'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="information"
          size={40}
          color="#6200ea"
        />
        <Text style={styles.headerTitle}>School Information</Text>
        <Text style={styles.headerSubtitle}>
          Manage and view school records
        </Text>
      </View>

      <View style={styles.content}>
        {informationOptions.map((option) => (
          <Card
            key={option.id}
            style={[styles.optionCard, { borderLeftColor: option.color }]}
            onPress={option.action}
          >
            <View style={styles.cardContent}>
              <View style={[styles.iconBox, { backgroundColor: option.color }]}>
                <MaterialCommunityIcons
                  name={option.icon}
                  size={40}
                  color="#fff"
                />
              </View>
              <View style={styles.textContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={28}
                color="#ccc"
              />
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          contentStyle={styles.buttonContent}
        >
          Back to Menu
        </Button>
      </View>

      <Text style={styles.footer}>© 2026 MySchoolApp</Text>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  content: {
    padding: 20,
    gap: 15,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 13,
    color: '#999',
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    borderColor: '#6200ea',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SchoolInformationScreen;
