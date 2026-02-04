import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Sample employee data with attendance
const employeeAttendanceDatabase = [
  {
    id: 'EMP-001',
    name: 'Mr. Rajesh Kumar',
    role: 'Teacher',
    monthlyAttendance: {
      'February 2026': [
        { date: '2026-02-01', loginTime: '09:00 AM', logoutTime: '05:30 PM', status: 'Present' },
        { date: '2026-02-02', loginTime: '09:05 AM', logoutTime: '05:25 PM', status: 'Present' },
        { date: '2026-02-03', loginTime: '08:55 AM', logoutTime: '05:35 PM', status: 'Present' },
        { date: '2026-02-04', loginTime: '09:10 AM', logoutTime: '05:20 PM', status: 'Present' },
        { date: '2026-02-05', loginTime: '09:00 AM', logoutTime: '05:30 PM', status: 'Present' },
      ],
    },
  },
  {
    id: 'EMP-002',
    name: 'Ms. Priya Singh',
    role: 'Teacher',
    monthlyAttendance: {
      'February 2026': [
        { date: '2026-02-01', loginTime: '09:15 AM', logoutTime: '05:45 PM', status: 'Present' },
        { date: '2026-02-02', status: 'Absent' },
        { date: '2026-02-03', loginTime: '09:00 AM', logoutTime: '05:30 PM', status: 'Present' },
        { date: '2026-02-04', loginTime: '09:20 AM', logoutTime: '05:15 PM', status: 'Present' },
        { date: '2026-02-05', loginTime: '09:10 AM', logoutTime: '05:25 PM', status: 'Present' },
      ],
    },
  },
  {
    id: 'EMP-003',
    name: 'Mr. Amit Patel',
    role: 'Admin',
    monthlyAttendance: {
      'February 2026': [
        { date: '2026-02-01', loginTime: '08:30 AM', logoutTime: '06:00 PM', status: 'Present' },
        { date: '2026-02-02', loginTime: '08:45 AM', logoutTime: '06:15 PM', status: 'Present' },
        { date: '2026-02-03', loginTime: '08:30 AM', logoutTime: '06:00 PM', status: 'Present' },
        { date: '2026-02-04', loginTime: '08:35 AM', logoutTime: '06:05 PM', status: 'Present' },
        { date: '2026-02-05', loginTime: '08:30 AM', logoutTime: '06:00 PM', status: 'Present' },
      ],
    },
  },
  {
    id: 'EMP-004',
    name: 'Ms. Sneha Sharma',
    role: 'Admin',
    monthlyAttendance: {
      'February 2026': [
        { date: '2026-02-01', loginTime: '08:45 AM', logoutTime: '05:45 PM', status: 'Present' },
        { date: '2026-02-02', loginTime: '08:50 AM', logoutTime: '05:40 PM', status: 'Present' },
        { date: '2026-02-03', status: 'Absent' },
        { date: '2026-02-04', loginTime: '08:45 AM', logoutTime: '05:45 PM', status: 'Present' },
        { date: '2026-02-05', loginTime: '08:50 AM', logoutTime: '05:40 PM', status: 'Present' },
      ],
    },
  },
];

const AttendanceViewScreen = ({ navigation }) => {
  const [roleFilter, setRoleFilter] = useState(''); // 'Teacher', 'Admin', or ''
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleDropdownVisible, setRoleDropdownVisible] = useState(false);

  // Filter employees by role
  const filteredEmployees = useMemo(() => {
    if (!roleFilter) return [];
    return employeeAttendanceDatabase.filter((emp) => emp.role === roleFilter);
  }, [roleFilter]);

  const handleRoleSelect = (role) => {
    setRoleFilter(role);
    setRoleDropdownVisible(false);
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const getAttendanceStats = (employee) => {
    const monthData =
      employee.monthlyAttendance['February 2026'] || [];
    const presentCount = monthData.filter(
      (d) => d.status === 'Present'
    ).length;
    const absentCount = monthData.filter(
      (d) => d.status === 'Absent'
    ).length;
    return { presentCount, absentCount, totalCount: monthData.length };
  };

  const getMonthlyDetails = (employee) => {
    return employee.monthlyAttendance['February 2026'] || [];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="eye-outline"
          size={40}
          color="#fff"
        />
        <Text style={styles.headerTitle}>View Attendance</Text>
      </View>

      <View style={styles.content}>
        {/* Role Filter Dropdown */}
        <Text style={styles.filterLabel}>Filter by Role</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setRoleDropdownVisible(!roleDropdownVisible)}
          >
            <Text
              style={[
                styles.dropdownButtonText,
                !roleFilter && styles.placeholderText,
              ]}
            >
              {roleFilter || 'Select Role'}
            </Text>
            <MaterialCommunityIcons
              name={roleDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#00BCD4"
            />
          </TouchableOpacity>

          {roleDropdownVisible && (
            <View style={styles.dropdownList}>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  roleFilter === 'Teacher' && styles.dropdownItemActive,
                ]}
                onPress={() => handleRoleSelect('Teacher')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    roleFilter === 'Teacher' &&
                      styles.dropdownItemTextActive,
                  ]}
                >
                  Teacher
                </Text>
                {roleFilter === 'Teacher' && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="#00BCD4"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  roleFilter === 'Admin' && styles.dropdownItemActive,
                ]}
                onPress={() => handleRoleSelect('Admin')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    roleFilter === 'Admin' && styles.dropdownItemTextActive,
                  ]}
                >
                  Admin
                </Text>
                {roleFilter === 'Admin' && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="#00BCD4"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Employees Table */}
        {roleFilter && filteredEmployees.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              {roleFilter}s - February 2026
            </Text>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { flex: 1.8 }]}>
                  Name
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                  Present
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                  Absent
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                  Details
                </Text>
              </View>

              {/* Table Rows */}
              {filteredEmployees.map((employee, index) => {
                const stats = getAttendanceStats(employee);
                return (
                  <View key={employee.id}>
                    <View style={styles.tableRow}>
                      <View style={{ flex: 1.8 }}>
                        <TouchableOpacity
                          onPress={() =>
                            handleEmployeePress(employee)
                          }
                        >
                          <Text style={styles.nameButton}>
                            {employee.name}
                          </Text>
                          <Text style={styles.idText}>
                            {employee.id}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.presentCount}>
                          {stats.presentCount}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.absentCount}>
                          {stats.absentCount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleEmployeePress(employee)
                          }
                          style={styles.detailButton}
                        >
                          <MaterialCommunityIcons
                            name="information-outline"
                            size={18}
                            color="#00BCD4"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {index < filteredEmployees.length - 1 && <Divider />}
                  </View>
                );
              })}
            </View>
          </>
        ) : roleFilter && filteredEmployees.length === 0 ? (
          <View style={styles.noResultContainer}>
            <MaterialCommunityIcons
              name="folder-open"
              size={60}
              color="#ccc"
            />
            <Text style={styles.noResultText}>
              No {roleFilter}s found
            </Text>
          </View>
        ) : (
          <View style={styles.noResultContainer}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={60}
              color="#ccc"
            />
            <Text style={styles.noResultText}>
              Select a role to view records
            </Text>
            <Text style={styles.noResultHint}>
              Choose Teacher or Admin from the dropdown above
            </Text>
          </View>
        )}
      </View>

      {/* Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedEmployee && (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={28}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Monthly Details</Text>
                  <View style={{ width: 28 }} />
                </View>

                <View style={styles.modalBody}>
                  {/* Employee Info */}
                  <Card style={styles.infoCard}>
                    <View style={styles.cardContent}>
                      <Text style={styles.empName}>
                        {selectedEmployee.name}
                      </Text>
                      <Text style={styles.empRole}>
                        {selectedEmployee.role} • {selectedEmployee.id}
                      </Text>
                      <Divider style={{ marginVertical: 10 }} />
                      {(() => {
                        const stats = getAttendanceStats(
                          selectedEmployee
                        );
                        return (
                          <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                              <Text style={styles.statLabel}>
                                Present
                              </Text>
                              <Text style={styles.statValue}>
                                {stats.presentCount}
                              </Text>
                            </View>
                            <View style={styles.statItem}>
                              <Text style={styles.statLabel}>
                                Absent
                              </Text>
                              <Text style={styles.statValue}>
                                {stats.absentCount}
                              </Text>
                            </View>
                            <View style={styles.statItem}>
                              <Text style={styles.statLabel}>
                                Total
                              </Text>
                              <Text style={styles.statValue}>
                                {stats.totalCount}
                              </Text>
                            </View>
                          </View>
                        );
                      })()}
                    </View>
                  </Card>

                  {/* Daily Records */}
                  <Text style={styles.detailsTitle}>
                    February 2026 - Daily Details
                  </Text>
                  {getMonthlyDetails(selectedEmployee).map(
                    (record, index) => (
                      <Card key={index} style={styles.recordCard}>
                        <View style={styles.recordCardContent}>
                          <View style={styles.dateRow}>
                            <Text style={styles.dateText}>
                              {new Date(
                                record.date
                              ).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Text>
                            <View
                              style={[
                                styles.statusBadge,
                                {
                                  backgroundColor:
                                    record.status === 'Present'
                                      ? '#4CAF50'
                                      : '#FF5252',
                                },
                              ]}
                            >
                              <Text style={styles.statusText}>
                                {record.status}
                              </Text>
                            </View>
                          </View>
                          {record.status === 'Present' && (
                            <>
                              <Divider style={{ marginVertical: 8 }} />
                              <View style={styles.timeRow}>
                                <View style={styles.timeItem}>
                                  <MaterialCommunityIcons
                                    name="login"
                                    size={16}
                                    color="#4CAF50"
                                  />
                                  <View style={styles.timeInfo}>
                                    <Text style={styles.timeLabel}>
                                      Login
                                    </Text>
                                    <Text style={styles.timeValue}>
                                      {record.loginTime}
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.timeItem}>
                                  <MaterialCommunityIcons
                                    name="logout"
                                    size={16}
                                    color="#FF9800"
                                  />
                                  <View style={styles.timeInfo}>
                                    <Text style={styles.timeLabel}>
                                      Logout
                                    </Text>
                                    <Text style={styles.timeValue}>
                                      {record.logoutTime}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      </Card>
                    )
                  )}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
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
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 20,
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
    backgroundColor: '#E0F2F1',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  dropdownItemTextActive: {
    color: '#00BCD4',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#00BCD4',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 13,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nameButton: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00BCD4',
    textDecorationLine: 'underline',
  },
  idText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  presentCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  absentCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5252',
  },
  detailButton: {
    padding: 6,
  },
  noResultContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
  },
  noResultHint: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
  },
  modalHeader: {
    backgroundColor: '#00BCD4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 20,
  },
  cardContent: {
    padding: 15,
  },
  empName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  empRole: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00BCD4',
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  recordCard: {
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 10,
  },
  recordCardContent: {
    padding: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 20,
  },
  timeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 11,
    color: '#999',
  },
  timeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
});

export default AttendanceViewScreen;
