import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample student data
const studentDatabase = [
  { studentId: 'STU-001', studentName: 'John Doe', grade: '10A' },
  { studentId: 'STU-002', studentName: 'Jane Smith', grade: '10B' },
  { studentId: 'STU-003', studentName: 'Robert Johnson', grade: '10A' },
  { studentId: 'STU-004', studentName: 'Sarah Davis', grade: '10B' },
  { studentId: 'STU-005', studentName: 'Michael Brown', grade: '9A' },
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FeeRegisterScreen = ({ navigation }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [studentDropdownVisible, setStudentDropdownVisible] = useState(false);
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [yearDropdownVisible, setYearDropdownVisible] = useState(false);
  const [registeredFees, setRegisteredFees] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    month: '',
    year: new Date().getFullYear().toString(),
    amount: '',
    dueDate: '',
    status: 'Pending',
  });

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ].map((y) => y.toString());

  const handleStudentSelect = (student) => {
    setFormData({
      ...formData,
      studentId: student.studentId,
      studentName: student.studentName,
    });
    setStudentDropdownVisible(false);
  };

  const handleMonthSelect = (month) => {
    setFormData({ ...formData, month });
    setMonthDropdownVisible(false);
  };

  const handleYearSelect = (year) => {
    setFormData({ ...formData, year });
    setYearDropdownVisible(false);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (
      !formData.studentId ||
      !formData.month ||
      !formData.year ||
      !formData.amount ||
      !formData.dueDate
    ) {
      alert('Please fill all required fields');
      return false;
    }
    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newFeeRecord = {
        id: Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount),
      };
      setRegisteredFees([...registeredFees, newFeeRecord]);
      alert(`Fee registered successfully for ${formData.studentName}`);
      resetForm();
      setShowAddModal(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      studentName: '',
      month: '',
      year: new Date().getFullYear().toString(),
      amount: '',
      dueDate: '',
      status: 'Pending',
    });
  };

  const handleDeleteFee = (id) => {
    setRegisteredFees(registeredFees.filter((fee) => fee.id !== id));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Add Button */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="clipboard-list"
            size={40}
            color="#fff"
          />
          <Text style={styles.headerTitle}>Fee Registration</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <MaterialCommunityIcons name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {registeredFees.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Registered Fees</Text>
            <View style={styles.feesList}>
              {registeredFees.map((fee, index) => (
                <View key={fee.id}>
                  <Card style={styles.feeCard}>
                    <View style={styles.feeCardContent}>
                      <View style={styles.feeHeader}>
                        <View>
                          <Text style={styles.studentNameInCard}>
                            {fee.studentName}
                          </Text>
                          <Text style={styles.studentIdInCard}>
                            {fee.studentId}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDeleteFee(fee.id)}
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
                      <View style={styles.feeDetailsRow}>
                        <View style={styles.feeDetailItem}>
                          <Text style={styles.feeDetailLabel}>Month & Year</Text>
                          <Text style={styles.feeDetailValue}>
                            {fee.month} {fee.year}
                          </Text>
                        </View>
                        <View style={styles.feeDetailItem}>
                          <Text style={styles.feeDetailLabel}>Amount</Text>
                          <Text style={styles.feeDetailValue}>
                            ₹{fee.amount.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.feeDetailsRow}>
                        <View style={styles.feeDetailItem}>
                          <Text style={styles.feeDetailLabel}>Due Date</Text>
                          <Text style={styles.feeDetailValue}>
                            {fee.dueDate}
                          </Text>
                        </View>
                        <View style={styles.feeDetailItem}>
                          <Text style={styles.feeDetailLabel}>Status</Text>
                          <View
                            style={[
                              styles.statusBadge,
                              {
                                backgroundColor:
                                  fee.status === 'Pending'
                                    ? '#FF9800'
                                    : '#4CAF50',
                              },
                            ]}
                          >
                            <Text style={styles.statusText}>
                              {fee.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                  {index < registeredFees.length - 1 && (
                    <View style={styles.spacing} />
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="folder-open"
              size={60}
              color="#ccc"
            />
            <Text style={styles.emptyText}>No fees registered yet</Text>
            <Text style={styles.emptySubText}>
              Tap the + button to add fee details
            </Text>
          </View>
        )}
      </View>

      {/* Add Fee Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add Fee Details</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.modalBody}>
              {/* Student Selection */}
              <Text style={styles.formLabel}>
                Select Student <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() =>
                    setStudentDropdownVisible(!studentDropdownVisible)
                  }
                >
                  <Text
                    style={[
                      styles.dropdownButtonText,
                      !formData.studentName && styles.placeholderText,
                    ]}
                  >
                    {formData.studentName || 'Select a Student'}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      studentDropdownVisible ? 'chevron-up' : 'chevron-down'
                    }
                    size={24}
                    color="#00BCD4"
                  />
                </TouchableOpacity>

                {studentDropdownVisible && (
                  <View style={styles.dropdownList}>
                    {studentDatabase.map((student) => (
                      <TouchableOpacity
                        key={student.studentId}
                        style={[
                          styles.dropdownItem,
                          formData.studentId === student.studentId &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() => handleStudentSelect(student)}
                      >
                        <View>
                          <Text
                            style={[
                              styles.dropdownItemText,
                              formData.studentId === student.studentId &&
                                styles.dropdownItemTextActive,
                            ]}
                          >
                            {student.studentName}
                          </Text>
                          <Text
                            style={[
                              styles.dropdownItemSubText,
                              formData.studentId === student.studentId &&
                                styles.dropdownItemSubTextActive,
                            ]}
                          >
                            {student.studentId} - {student.grade}
                          </Text>
                        </View>
                        {formData.studentId === student.studentId && (
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
              </View>

              {/* Month Selection */}
              <Text style={styles.formLabel}>
                Month <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() =>
                    setMonthDropdownVisible(!monthDropdownVisible)
                  }
                >
                  <Text
                    style={[
                      styles.dropdownButtonText,
                      !formData.month && styles.placeholderText,
                    ]}
                  >
                    {formData.month || 'Select Month'}
                  </Text>
                  <MaterialCommunityIcons
                    name={monthDropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#00BCD4"
                  />
                </TouchableOpacity>

                {monthDropdownVisible && (
                  <View style={styles.dropdownList}>
                    {MONTHS.map((month) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.dropdownItem,
                          formData.month === month &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() => handleMonthSelect(month)}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            formData.month === month &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {month}
                        </Text>
                        {formData.month === month && (
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
              </View>

              {/* Year Selection */}
              <Text style={styles.formLabel}>
                Year <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setYearDropdownVisible(!yearDropdownVisible)}
                >
                  <Text style={styles.dropdownButtonText}>
                    {formData.year}
                  </Text>
                  <MaterialCommunityIcons
                    name={yearDropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#00BCD4"
                  />
                </TouchableOpacity>

                {yearDropdownVisible && (
                  <View style={styles.dropdownList}>
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.dropdownItem,
                          formData.year === year && styles.dropdownItemActive,
                        ]}
                        onPress={() => handleYearSelect(year)}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            formData.year === year &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {year}
                        </Text>
                        {formData.year === year && (
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
              </View>

              {/* Amount Input */}
              <Text style={styles.formLabel}>
                Amount (₹) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter amount"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={formData.amount}
                onChangeText={(value) =>
                  handleInputChange('amount', value)
                }
              />

              {/* Due Date Input */}
              <Text style={styles.formLabel}>
                Due Date (YYYY-MM-DD) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 2026-02-15"
                placeholderTextColor="#999"
                value={formData.dueDate}
                onChangeText={(value) =>
                  handleInputChange('dueDate', value)
                }
              />

              {/* Status Info */}
              <Text style={styles.formLabel}>Status</Text>
              <View style={styles.statusInfoContainer}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={20}
                  color="#FF9800"
                />
                <Text style={styles.statusInfoText}>
                  Default status is set to "Pending"
                </Text>
              </View>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                contentStyle={styles.buttonContent}
              >
                Submit
              </Button>

              {/* Cancel Button */}
              <Button
                mode="outlined"
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                style={styles.cancelButton}
                contentStyle={styles.buttonContent}
              >
                Cancel
              </Button>
            </View>
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
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
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
  feesList: {
    gap: 15,
  },
  spacing: {
    height: 0,
  },
  feeCard: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
  },
  feeCardContent: {
    padding: 15,
  },
  feeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  studentNameInCard: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  studentIdInCard: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  divider: {
    marginVertical: 10,
  },
  feeDetailsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  feeDetailItem: {
    flex: 1,
  },
  feeDetailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  feeDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
  },
  emptySubText: {
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
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
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
  dropdownItemSubText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  dropdownItemSubTextActive: {
    color: '#00BCD4',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  statusInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  statusInfoText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  cancelButton: {
    borderColor: '#00BCD4',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default FeeRegisterScreen;
