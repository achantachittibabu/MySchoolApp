import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Table,
  Modal,
} from 'react-native';
import { Text, Card, Button, Divider, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample student fee data with grade
const studentFeeDatabase = [
  {
    studentName: 'John Doe',
    studentId: 'STU-001',
    grade: '10A',
    totalFees: 150000,
    monthlyFees: [
      { month: 'January 2026', amount: 12500, status: 'Paid', dueDate: '2026-01-15' },
      { month: 'February 2026', amount: 12500, status: 'Paid', dueDate: '2026-02-15' },
      { month: 'March 2026', amount: 12500, status: 'Pending', dueDate: '2026-03-15' },
      { month: 'April 2026', amount: 12500, status: 'Pending', dueDate: '2026-04-15' },
      { month: 'May 2026', amount: 12500, status: 'Pending', dueDate: '2026-05-15' },
    ],
  },
  {
    studentName: 'Jane Smith',
    studentId: 'STU-002',
    grade: '10B',
    totalFees: 150000,
    monthlyFees: [
      { month: 'January 2026', amount: 12500, status: 'Paid', dueDate: '2026-01-15' },
      { month: 'February 2026', amount: 12500, status: 'Pending', dueDate: '2026-02-15' },
      { month: 'March 2026', amount: 12500, status: 'Pending', dueDate: '2026-03-15' },
      { month: 'April 2026', amount: 12500, status: 'Pending', dueDate: '2026-04-15' },
      { month: 'May 2026', amount: 12500, status: 'Pending', dueDate: '2026-05-15' },
    ],
  },
  {
    studentName: 'Robert Johnson',
    studentId: 'STU-003',
    grade: '10A',
    totalFees: 150000,
    monthlyFees: [
      { month: 'January 2026', amount: 12500, status: 'Paid', dueDate: '2026-01-15' },
      { month: 'February 2026', amount: 12500, status: 'Paid', dueDate: '2026-02-15' },
      { month: 'March 2026', amount: 12500, status: 'Paid', dueDate: '2026-03-15' },
      { month: 'April 2026', amount: 12500, status: 'Pending', dueDate: '2026-04-15' },
      { month: 'May 2026', amount: 12500, status: 'Pending', dueDate: '2026-05-15' },
    ],
  },
  {
    studentName: 'Sarah Davis',
    studentId: 'STU-004',
    grade: '10B',
    totalFees: 150000,
    monthlyFees: [
      { month: 'January 2026', amount: 12500, status: 'Paid', dueDate: '2026-01-15' },
      { month: 'February 2026', amount: 12500, status: 'Paid', dueDate: '2026-02-15' },
      { month: 'March 2026', amount: 12500, status: 'Pending', dueDate: '2026-03-15' },
      { month: 'April 2026', amount: 12500, status: 'Pending', dueDate: '2026-04-15' },
      { month: 'May 2026', amount: 12500, status: 'Pending', dueDate: '2026-05-15' },
    ],
  },
  {
    studentName: 'Michael Brown',
    studentId: 'STU-005',
    grade: '9A',
    totalFees: 150000,
    monthlyFees: [
      { month: 'January 2026', amount: 12500, status: 'Paid', dueDate: '2026-01-15' },
      { month: 'February 2026', amount: 12500, status: 'Pending', dueDate: '2026-02-15' },
      { month: 'March 2026', amount: 12500, status: 'Pending', dueDate: '2026-03-15' },
      { month: 'April 2026', amount: 12500, status: 'Pending', dueDate: '2026-04-15' },
      { month: 'May 2026', amount: 12500, status: 'Pending', dueDate: '2026-05-15' },
    ],
  },
];

const GRADES = ['10A', '10B', '9A', '9B', '8A', '8B'];

const FeeDetailsScreen = ({ navigation }) => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [gradeDropdownVisible, setGradeDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('view'); // 'view' or 'add'

  // Filter students by selected grade
  const filteredStudents = useMemo(() => {
    if (!selectedGrade) return [];
    return studentFeeDatabase.filter((student) => student.grade === selectedGrade);
  }, [selectedGrade]);

  // Search for student by ID
  const searchStudent = (studentId) => {
    if (studentId.trim() === '') {
      setSelectedStudent(null);
      return;
    }
    const student = studentFeeDatabase.find(
      (s) => s.studentId.toLowerCase() === studentId.toLowerCase()
    );
    if (student) {
      setSelectedStudent(student);
    } else {
      setSelectedStudent(null);
    }
  };

  const handleStudentNamePress = (student, type) => {
    setSelectedStudent(student);
    setModalType(type);
    setModalVisible(true);
  };

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setGradeDropdownVisible(false);
  };

  const getStatusColor = (status) => {
    return status === 'Paid' ? '#4CAF50' : '#FF9800';
  };

  const getStatusIcon = (status) => {
    return status === 'Paid' ? 'check-circle' : 'alert-circle';
  };

  // Calculate totals
  const calculateStats = () => {
    if (!selectedStudent) return { paid: 0, pending: 0, total: 0 };
    const paid = selectedStudent.monthlyFees
      .filter((f) => f.status === 'Paid')
      .reduce((sum, f) => sum + f.amount, 0);
    const pending = selectedStudent.monthlyFees
      .filter((f) => f.status === 'Pending')
      .reduce((sum, f) => sum + f.amount, 0);
    return { paid, pending, total: paid + pending };
  };

  const stats = calculateStats();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="currency-inr"
            size={40}
            color="#fff"
          />
          <Text style={styles.headerTitle}>Fee Details</Text>
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('FeeRegister')}
        >
          <MaterialCommunityIcons name="plus" size={20} color="#fff" />
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Grade Dropdown Section */}
        <Card style={styles.dropdownCard}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setGradeDropdownVisible(!gradeDropdownVisible)}
          >
            <View style={styles.dropdownButtonContent}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={20}
                color="#00BCD4"
              />
              <Text style={styles.dropdownButtonText}>
                {selectedGrade ? `Grade: ${selectedGrade}` : 'Select Grade'}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={gradeDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#00BCD4"
            />
          </TouchableOpacity>

          {gradeDropdownVisible && (
            <View style={styles.dropdownList}>
              {GRADES.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.dropdownItem,
                    selectedGrade === grade && styles.dropdownItemActive,
                  ]}
                  onPress={() => handleGradeSelect(grade)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedGrade === grade && styles.dropdownItemTextActive,
                    ]}
                  >
                    {grade}
                  </Text>
                  {selectedGrade === grade && (
                    <MaterialCommunityIcons
                      name="check"
                      size={20}
                      color="#00BCD4"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card>

        {/* Students Table - Show when grade is selected */}
        {selectedGrade && filteredStudents.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              Students in Grade {selectedGrade}
            </Text>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                  Student Name
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>
                  ID
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>
                  Pending
                </Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>
                  Actions
                </Text>
              </View>

              {/* Table Rows */}
              {filteredStudents.map((student, index) => {
                const pending = student.monthlyFees
                  .filter((f) => f.status === 'Pending')
                  .reduce((sum, f) => sum + f.amount, 0);

                return (
                  <View key={index}>
                    <View style={styles.tableRow}>
                      <View style={{ flex: 2 }}>
                        <TouchableOpacity
                          onPress={() =>
                            handleStudentNamePress(student, 'view')
                          }
                        >
                          <Text style={styles.studentNameButton}>
                            {student.studentName}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1.2 }}>
                        <Text style={styles.idText}>{student.studentId}</Text>
                      </View>
                      <View style={{ flex: 1.2 }}>
                        <Text
                          style={[
                            styles.pendingText,
                            pending > 0 && styles.pendingTextWarning,
                          ]}
                        >
                          ₹{pending.toLocaleString()}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1.2,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          gap: 8,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleStudentNamePress(student, 'view')
                          }
                          style={styles.iconButton}
                        >
                          <MaterialCommunityIcons
                            name="eye"
                            size={18}
                            color="#00BCD4"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleStudentNamePress(student, 'add')
                          }
                          style={styles.iconButton}
                        >
                          <MaterialCommunityIcons
                            name="plus-circle"
                            size={18}
                            color="#4CAF50"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {index < filteredStudents.length - 1 && <Divider />}
                  </View>
                );
              })}
            </View>
          </>
        ) : selectedGrade && filteredStudents.length === 0 ? (
          <View style={styles.noResultContainer}>
            <MaterialCommunityIcons
              name="folder-open"
              size={60}
              color="#ccc"
            />
            <Text style={styles.noResultText}>No students found in Grade {selectedGrade}</Text>
          </View>
        ) : (
          <View style={styles.noResultContainer}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={60}
              color="#ccc"
            />
            <Text style={styles.noResultText}>Select a grade to view students</Text>
          </View>
        )}
      </View>

      {/* Modal for Fee Details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            {selectedStudent && (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <MaterialCommunityIcons
                      name="close"
                      size={28}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>
                    {modalType === 'view' ? 'View' : 'Add'} Fee Details
                  </Text>
                  <View style={{ width: 28 }} />
                </View>

                <View style={styles.modalContentPadding}>
                  {/* Student Info Card */}
                  <Card style={styles.infoCard}>
                    <View style={styles.cardContent}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Student Name:</Text>
                        <Text style={styles.value}>
                          {selectedStudent.studentName}
                        </Text>
                      </View>
                      <Divider />
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Student ID:</Text>
                        <Text style={styles.value}>
                          {selectedStudent.studentId}
                        </Text>
                      </View>
                      <Divider />
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Grade:</Text>
                        <Text style={styles.value}>
                          {selectedStudent.grade}
                        </Text>
                      </View>
                    </View>
                  </Card>

                  {/* Fee Summary Stats */}
                  <Text style={styles.sectionTitle}>Fee Summary</Text>
                  <View style={styles.summaryGrid}>
                    <Card style={styles.summaryCard}>
                      <View style={styles.summaryContent}>
                        <MaterialCommunityIcons
                          name="cash"
                          size={32}
                          color="#00BCD4"
                        />
                        <Text style={styles.summaryLabel}>Total Fees</Text>
                        <Text style={styles.summaryAmount}>
                          ₹{stats.total.toLocaleString()}
                        </Text>
                      </View>
                    </Card>

                    <Card style={styles.summaryCard}>
                      <View style={styles.summaryContent}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={32}
                          color="#4CAF50"
                        />
                        <Text style={styles.summaryLabel}>Paid</Text>
                        <Text
                          style={[styles.summaryAmount, { color: '#4CAF50' }]}
                        >
                          ₹{stats.paid.toLocaleString()}
                        </Text>
                      </View>
                    </Card>

                    <Card style={styles.summaryCard}>
                      <View style={styles.summaryContent}>
                        <MaterialCommunityIcons
                          name="alert-circle"
                          size={32}
                          color="#FF9800"
                        />
                        <Text style={styles.summaryLabel}>Pending</Text>
                        <Text
                          style={[styles.summaryAmount, { color: '#FF9800' }]}
                        >
                          ₹{stats.pending.toLocaleString()}
                        </Text>
                      </View>
                    </Card>
                  </View>

                  {/* Monthly Fee Table */}
                  <Text style={styles.sectionTitle}>
                    Month-wise Fee Details
                  </Text>
                  <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                        Month
                      </Text>
                      <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                        Amount
                      </Text>
                      <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>
                        Status
                      </Text>
                    </View>

                    {/* Table Rows */}
                    {selectedStudent.monthlyFees.map((fee, index) => (
                      <View key={index}>
                        <View style={styles.tableRow}>
                          <View style={{ flex: 2 }}>
                            <Text style={styles.monthText}>{fee.month}</Text>
                            <Text style={styles.dueDate}>
                              Due: {fee.dueDate}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.amountText}>
                              ₹{fee.amount.toLocaleString()}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1.5,
                              alignItems: 'center',
                            }}
                          >
                            <View
                              style={[
                                styles.statusBadge,
                                {
                                  backgroundColor: getStatusColor(fee.status),
                                },
                              ]}
                            >
                              <MaterialCommunityIcons
                                name={getStatusIcon(fee.status)}
                                size={14}
                                color="#fff"
                              />
                              <Text style={styles.statusBadgeText}>
                                {fee.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {index <
                          selectedStudent.monthlyFees.length - 1 && <Divider />}
                      </View>
                    ))}
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    {modalType === 'add' && (
                      <Button
                        mode="contained"
                        onPress={() => {
                          // Add fee logic here
                          alert(
                            `Add fee for ${selectedStudent.studentName}`
                          );
                        }}
                        style={styles.payButton}
                        contentStyle={styles.buttonContent}
                      >
                        Add Fee Details
                      </Button>
                    )}
                    {modalType === 'view' && (
                      <Button
                        mode="contained"
                        onPress={() => {
                          // Pay fee logic here
                          alert(
                            `Pay fees for ${selectedStudent.studentName}`
                          );
                        }}
                        style={styles.payButton}
                        contentStyle={styles.buttonContent}
                      >
                        Pay Pending Fees
                      </Button>
                    )}

                    <Button
                      mode="outlined"
                      onPress={() => setModalVisible(false)}
                      style={styles.resetButton}
                      contentStyle={styles.buttonContent}
                    >
                      Close
                    </Button>
                  </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  // Dropdown Section
  dropdownCard: {
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dropdownButton: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdownList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemActive: {
    backgroundColor: '#E0F2F1',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dropdownItemTextActive: {
    color: '#00BCD4',
    fontWeight: '600',
  },
  // Table Styles
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
  studentNameButton: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00BCD4',
    textDecorationLine: 'underline',
  },
  idText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  pendingTextWarning: {
    color: '#FF9800',
  },
  iconButton: {
    padding: 6,
  },
  monthText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 11,
    color: '#999',
  },
  amountText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  // No Result
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
  // Info Card
  infoCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardContent: {
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  // Summary Grid
  summaryGrid: {
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  summaryContent: {
    alignItems: 'center',
    padding: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginTop: 5,
  },
  // Action Buttons
  actionButtons: {
    gap: 10,
    marginBottom: 30,
  },
  payButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    borderColor: '#00BCD4',
  },
  buttonContent: {
    paddingVertical: 8,
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
  modalContentPadding: {
    padding: 20,
  },
});

export default FeeDetailsScreen;
