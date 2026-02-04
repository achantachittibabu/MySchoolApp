import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailScreen = ({ navigation, route }) => {
  const { record, type, userType } = route.params;

  const detailFields =
    userType === 'teacher'
      ? [
          { label: 'Teacher ID', value: record.id, icon: 'badge-id' },
          { label: 'Full Name', value: record.name, icon: 'account' },
          { label: 'Email', value: record.email, icon: 'email' },
          { label: 'Subject', value: record.subject, icon: 'book' },
          { label: 'Phone', value: record.phone, icon: 'phone' },
          { label: 'Qualification', value: record.qualification, icon: 'school' },
          { label: 'Experience', value: record.experience, icon: 'briefcase' },
          { label: 'Office Room', value: record.office, icon: 'door' },
        ]
      : [
          { label: 'Student ID', value: record.id, icon: 'badge-id' },
          { label: 'Full Name', value: record.name, icon: 'account' },
          { label: 'Email', value: record.email, icon: 'email' },
          { label: 'Grade', value: record.grade, icon: 'school' },
          { label: 'GPA', value: record.gpa, icon: 'chart-box' },
          { label: 'Phone', value: record.phone, icon: 'phone' },
          { label: 'Address', value: record.address, icon: 'map-marker' },
          { label: 'Date of Birth', value: record.dob, icon: 'cake' },
          { label: 'Guardian', value: record.guardian, icon: 'account-supervisor' },
        ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={userType === 'teacher' ? 'account-tie' : 'school'}
          size={60}
          color="#fff"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>{type} Information</Text>
        <Text style={styles.headerSubtitle}>{record.id}</Text>
      </View>

      <View style={styles.detailsContainer}>
        {detailFields.map((field, index) => (
          <View key={field.label}>
            <View style={styles.detailRow}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons
                  name={field.icon}
                  size={20}
                  color="#6200ea"
                  style={styles.icon}
                />
                <Text style={styles.label}>{field.label}</Text>
              </View>
              <Text style={styles.value} numberOfLines={2}>
                {field.value}
              </Text>
            </View>
            {index < detailFields.length - 1 && <Divider style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          contentStyle={styles.buttonContent}
        >
          Back to {type === 'Teacher' ? 'Teachers' : 'Students'}
        </Button>
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
    backgroundColor: '#6200ea',
    padding: 30,
    alignItems: 'center',
    paddingBottom: 40,
  },
  headerIcon: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e1bee7',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  divider: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  actionContainer: {
    padding: 20,
  },
  backButton: {
    backgroundColor: '#6200ea',
    marginBottom: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default DetailScreen;
