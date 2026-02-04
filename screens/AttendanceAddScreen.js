import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Sample teacher/admin data
const teacherAdminDatabase = [
  { id: 'EMP-001', name: 'Mr. Rajesh Kumar', role: 'Teacher' },
  { id: 'EMP-002', name: 'Ms. Priya Singh', role: 'Teacher' },
  { id: 'EMP-003', name: 'Mr. Amit Patel', role: 'Admin' },
  { id: 'EMP-004', name: 'Ms. Sneha Sharma', role: 'Admin' },
  { id: 'EMP-005', name: 'Mr. Vikram Gupta', role: 'Teacher' },
];

const AttendanceAddScreen = ({ navigation }) => {
  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // Get current location
  const getLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        setLocationLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: loc.coords.latitude.toFixed(6),
        longitude: loc.coords.longitude.toFixed(6),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    }
    setLocationLoading(false);
  };

  const handleEmployeeSelect = (employee) => {
    setCurrentEmployee(employee);
    setEmployeeDropdownVisible(false);
    setLoginTime(null);
    setLogoutTime(null);
    setLocation(null);
  };

  const handleLogin = async () => {
    if (!currentEmployee) {
      Alert.alert('Error', 'Please select an employee first');
      return;
    }

    const now = new Date();
    setLoginTime({
      time: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      date: now.toLocaleDateString('en-US'),
    });

    await getLocation();
  };

  const handleLogout = () => {
    if (!loginTime) {
      Alert.alert('Error', 'Please login first');
      return;
    }

    const now = new Date();
    setLogoutTime({
      time: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      date: now.toLocaleDateString('en-US'),
    });
  };

  const handleSubmit = () => {
    if (!currentEmployee || !loginTime || !logoutTime || !location) {
      Alert.alert(
        'Incomplete Data',
        'Please complete login, logout, and location details'
      );
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      employee: currentEmployee,
      loginTime: loginTime.time,
      loginDate: loginTime.date,
      logoutTime: logoutTime.time,
      logoutDate: logoutTime.date,
      location: location,
    };

    setAttendanceRecords([...attendanceRecords, newRecord]);
    Alert.alert('Success', `Attendance recorded for ${currentEmployee.name}`);
    resetForm();
  };

  const resetForm = () => {
    setCurrentEmployee(null);
    setLoginTime(null);
    setLogoutTime(null);
    setLocation(null);
    setEmployeeDropdownVisible(false);
  };

  const handleDelete = (id) => {
    setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={40}
          color="#fff"
        />
        <Text style={styles.headerTitle}>Add Attendance</Text>
      </View>

      <View style={styles.content}>
        {/* Form Section */}
        <Card style={styles.formCard}>
          <View style={styles.formContent}>
            <Text style={styles.formTitle}>Record Attendance</Text>

            {/* Employee Selection */}
            <Text style={styles.label}>Select Employee <Text style={styles.required}>*</Text></Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  setEmployeeDropdownVisible(!employeeDropdownVisible)
                }
              >
                <Text
                  style={[
                    styles.dropdownButtonText,
                    !currentEmployee && styles.placeholderText,
                  ]}
                >
                  {currentEmployee
                    ? `${currentEmployee.name} (${currentEmployee.role})`
                    : 'Select Employee'}
                </Text>
                <MaterialCommunityIcons
                  name={
                    employeeDropdownVisible ? 'chevron-up' : 'chevron-down'
                  }
                  size={24}
                  color="#4CAF50"
                />
              </TouchableOpacity>

              {employeeDropdownVisible && (
                <View style={styles.dropdownList}>
                  {teacherAdminDatabase.map((emp) => (
                    <TouchableOpacity
                      key={emp.id}
                      style={[
                        styles.dropdownItem,
                        currentEmployee?.id === emp.id &&
                          styles.dropdownItemActive,
                      ]}
                      onPress={() => handleEmployeeSelect(emp)}
                    >
                      <View>
                        <Text
                          style={[
                            styles.dropdownItemText,
                            currentEmployee?.id === emp.id &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {emp.name}
                        </Text>
                        <Text
                          style={[
                            styles.dropdownItemSubText,
                            currentEmployee?.id === emp.id &&
                              styles.dropdownItemSubTextActive,
                          ]}
                        >
                          {emp.id} - {emp.role}
                        </Text>
                      </View>
                      {currentEmployee?.id === emp.id && (
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color="#4CAF50"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {currentEmployee && (
              <>
                <Divider style={styles.divider} />

                {/* Login Section */}
                <Text style={styles.sectionTitle}>Login Details</Text>
                {loginTime ? (
                  <Card style={styles.detailCard}>
                    <View style={styles.detailCardContent}>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color="#4CAF50"
                        />
                        <View style={styles.detailInfo}>
                          <Text style={styles.detailLabel}>Login Time</Text>
                          <Text style={styles.detailValue}>
                            {loginTime.time}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="calendar-outline"
                          size={20}
                          color="#4CAF50"
                        />
                        <View style={styles.detailInfo}>
                          <Text style={styles.detailLabel}>Date</Text>
                          <Text style={styles.detailValue}>
                            {loginTime.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                ) : (
                  <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.loginButton}
                    contentStyle={styles.buttonContent}
                  >
                    <MaterialCommunityIcons name="login" size={20} />{' '}
                    Login
                  </Button>
                )}

                {/* Location Section */}
                {loginTime && (
                  <>
                    <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                      Location Details
                    </Text>
                    {location ? (
                      <Card style={styles.detailCard}>
                        <View style={styles.detailCardContent}>
                          <View style={styles.detailRow}>
                            <MaterialCommunityIcons
                              name="map-marker-outline"
                              size={20}
                              color="#00BCD4"
                            />
                            <View style={styles.detailInfo}>
                              <Text style={styles.detailLabel}>Latitude</Text>
                              <Text style={styles.detailValue}>
                                {location.latitude}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.detailRow}>
                            <MaterialCommunityIcons
                              name="map-marker-outline"
                              size={20}
                              color="#00BCD4"
                            />
                            <View style={styles.detailInfo}>
                              <Text style={styles.detailLabel}>Longitude</Text>
                              <Text style={styles.detailValue}>
                                {location.longitude}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Card>
                    ) : (
                      <Button
                        mode="outlined"
                        onPress={getLocation}
                        loading={locationLoading}
                        style={styles.locationButton}
                        contentStyle={styles.buttonContent}
                      >
                        <MaterialCommunityIcons name="map" size={20} /> Get
                        Location
                      </Button>
                    )}
                  </>
                )}

                {/* Logout Section */}
                {loginTime && location && (
                  <>
                    <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                      Logout Details
                    </Text>
                    {logoutTime ? (
                      <Card style={styles.detailCard}>
                        <View style={styles.detailCardContent}>
                          <View style={styles.detailRow}>
                            <MaterialCommunityIcons
                              name="clock-outline"
                              size={20}
                              color="#FF9800"
                            />
                            <View style={styles.detailInfo}>
                              <Text style={styles.detailLabel}>Logout Time</Text>
                              <Text style={styles.detailValue}>
                                {logoutTime.time}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.detailRow}>
                            <MaterialCommunityIcons
                              name="calendar-outline"
                              size={20}
                              color="#FF9800"
                            />
                            <View style={styles.detailInfo}>
                              <Text style={styles.detailLabel}>Date</Text>
                              <Text style={styles.detailValue}>
                                {logoutTime.date}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Card>
                    ) : (
                      <Button
                        mode="contained"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        contentStyle={styles.buttonContent}
                      >
                        <MaterialCommunityIcons name="logout" size={20} />{' '}
                        Logout
                      </Button>
                    )}
                  </>
                )}

                {/* Submit Button */}
                {logoutTime && (
                  <View style={styles.actionButtons}>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={styles.submitButton}
                      contentStyle={styles.buttonContent}
                    >
                      Submit Attendance
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={resetForm}
                      style={styles.resetButton}
                      contentStyle={styles.buttonContent}
                    >
                      Reset Form
                    </Button>
                  </View>
                )}
              </>
            )}
          </View>
        </Card>

        {/* Records List */}
        {attendanceRecords.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recorded Attendance</Text>
            {attendanceRecords.map((record, index) => (
              <Card key={record.id} style={styles.recordCard}>
                <View style={styles.recordContent}>
                  <View style={styles.recordHeader}>
                    <View>
                      <Text style={styles.recordName}>
                        {record.employee.name}
                      </Text>
                      <Text style={styles.recordRole}>
                        {record.employee.role} • {record.employee.id}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(record.id)}
                      style={styles.deleteButton}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={20}
                        color="#FF5252"
                      />
                    </TouchableOpacity>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.recordDetails}>
                    <View style={styles.recordDetailItem}>
                      <Text style={styles.recordDetailLabel}>Login</Text>
                      <Text style={styles.recordDetailValue}>
                        {record.loginTime} • {record.loginDate}
                      </Text>
                    </View>
                    <View style={styles.recordDetailItem}>
                      <Text style={styles.recordDetailLabel}>Logout</Text>
                      <Text style={styles.recordDetailValue}>
                        {record.logoutTime} • {record.logoutDate}
                      </Text>
                    </View>
                    <View style={styles.recordDetailItem}>
                      <Text style={styles.recordDetailLabel}>Location</Text>
                      <Text style={styles.recordDetailValue}>
                        {record.location.latitude}, {record.location.longitude}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}
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
    backgroundColor: '#4CAF50',
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
  formCard: {
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 20,
  },
  formContent: {
    padding: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF5252',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemActive: {
    backgroundColor: '#E8F5E9',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  dropdownItemTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  dropdownItemSubText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  dropdownItemSubTextActive: {
    color: '#4CAF50',
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: '#f9f9f9',
    elevation: 1,
    marginBottom: 12,
  },
  detailCardContent: {
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginTop: 2,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#FF9800',
    marginBottom: 12,
  },
  locationButton: {
    borderColor: '#00BCD4',
    marginBottom: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  actionButtons: {
    gap: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    borderColor: '#00BCD4',
  },
  recordCard: {
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 12,
  },
  recordContent: {
    padding: 15,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recordName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recordRole: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  recordDetails: {
    marginTop: 10,
  },
  recordDetailItem: {
    marginBottom: 10,
  },
  recordDetailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  recordDetailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
});

export default AttendanceAddScreen;
