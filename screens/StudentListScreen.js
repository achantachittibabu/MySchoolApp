import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Text, Button, TextInput, Card, IconButton, Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STUDENT_DATA = [
  {
    id: 'S001',
    name: 'John Doe',
    email: 'john@school.com',
    grade: '10',
    gpa: '3.8',
    phone: '555-0101',
    address: '123 Main St',
    dob: '2008-05-15',
    guardian: 'Jane Doe',
  },
  {
    id: 'S002',
    name: 'Alice Smith',
    email: 'alice@school.com',
    grade: '10',
    gpa: '3.9',
    phone: '555-0102',
    address: '456 Oak Ave',
    dob: '2008-08-20',
    guardian: 'Bob Smith',
  },
  {
    id: 'S003',
    name: 'Michael Brown',
    email: 'michael@school.com',
    grade: '11',
    gpa: '3.7',
    phone: '555-0103',
    address: '789 Pine Rd',
    dob: '2007-03-10',
    guardian: 'Sarah Brown',
  },
  {
    id: 'S004',
    name: 'Emily Davis',
    email: 'emily@school.com',
    grade: '11',
    gpa: '4.0',
    phone: '555-0104',
    address: '321 Elm St',
    dob: '2007-12-05',
    guardian: 'David Davis',
  },
  {
    id: 'S005',
    name: 'James Wilson',
    email: 'james@school.com',
    grade: '9',
    gpa: '3.6',
    phone: '555-0105',
    address: '654 Cedar Ln',
    dob: '2009-07-22',
    guardian: 'Patricia Wilson',
  },
];

const StudentListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const grades = ['9', '10', '11', '12'];

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus-circle"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.navigate('StudentRegistration')}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  const filteredStudents = useMemo(() => {
    return STUDENT_DATA.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = selectedGrade === null || student.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [searchQuery, selectedGrade]);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleUpdateStudent = (student) => {
    alert(`Update functionality for ${student.name} would be implemented here`);
  };

  const renderStudentItem = ({ item }) => (
    <Card style={styles.studentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.studentAvatar}>
          <MaterialCommunityIcons
            name="account"
            size={32}
            color="#fff"
          />
        </View>
        <View style={styles.studentBasicInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>{item.id}</Text>
          <Text style={styles.studentEmail}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Grade:</Text>
          <Text style={styles.infoValue}>{item.grade}</Text>
          <Text style={styles.infoLabel}>GPA:</Text>
          <Text style={styles.infoValue}>{item.gpa}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => handleViewStudent(item)}
          style={styles.viewButton}
          contentStyle={styles.actionButtonContent}
          icon="eye"
        >
          View
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleUpdateStudent(item)}
          style={styles.updateButton}
          contentStyle={styles.actionButtonContent}
          icon="pencil"
        >
          Update
        </Button>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name, email, or ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          right={
            searchQuery ? (
              <TextInput.Icon
                icon="close"
                onPress={() => setSearchQuery('')}
              />
            ) : null
          }
        />

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Grade:</Text>
          <Menu
            visible={dropdownVisible}
            onDismiss={() => setDropdownVisible(false)}
            anchor={
              <Button
                onPress={() => setDropdownVisible(true)}
                mode="outlined"
                contentStyle={styles.filterButtonContent}
                labelStyle={styles.filterButtonLabel}
                icon="chevron-down"
                style={styles.filterButton}
              >
                {selectedGrade ? `Grade ${selectedGrade}` : 'All Grades'}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setSelectedGrade(null);
                setDropdownVisible(false);
              }}
              title="All Grades"
            />
            {grades.map((grade) => (
              <Menu.Item
                key={grade}
                onPress={() => {
                  setSelectedGrade(grade);
                  setDropdownVisible(false);
                }}
                title={`Grade ${grade}`}
              />
            ))}
          </Menu>
        </View>
      </View>

      <View style={styles.resultCount}>
        <Text style={styles.resultText}>
          Found {filteredStudents.length} student(s)
        </Text>
      </View>

      {filteredStudents.length > 0 ? (
        <FlatList
          data={filteredStudents}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="account-search"
            size={64}
            color="#ccc"
          />
          <Text style={styles.emptyText}>No students found</Text>
        </View>
      )}

      {selectedStudent && (
        <View style={styles.detailsModal}>
          <View style={styles.detailsContent}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Student Details</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setSelectedStudent(null)}
              />
            </View>

            <ScrollView style={styles.detailsBody}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{selectedStudent.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID:</Text>
                <Text style={styles.detailValue}>{selectedStudent.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{selectedStudent.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Grade:</Text>
                <Text style={styles.detailValue}>{selectedStudent.grade}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>GPA:</Text>
                <Text style={styles.detailValue}>{selectedStudent.gpa}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{selectedStudent.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.detailValue}>{selectedStudent.address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>DOB:</Text>
                <Text style={styles.detailValue}>{selectedStudent.dob}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guardian:</Text>
                <Text style={styles.detailValue}>{selectedStudent.guardian}</Text>
              </View>
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => setSelectedStudent(null)}
              style={styles.closeButton}
              contentStyle={styles.buttonContent}
            >
              Close
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    gap: 12,
  },
  searchInput: {
    backgroundColor: '#f9f9f9',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  filterButton: {
    flex: 1,
    borderColor: '#6200ea',
  },
  filterButtonContent: {
    paddingVertical: 6,
  },
  filterButtonLabel: {
    fontSize: 12,
  },
  resultCount: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  listContent: {
    padding: 15,
    gap: 12,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  studentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentBasicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentId: {
    fontSize: 12,
    color: '#6200ea',
    fontWeight: '600',
    marginTop: 2,
  },
  studentEmail: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#6200ea',
  },
  updateButton: {
    flex: 1,
    borderColor: '#6200ea',
  },
  actionButtonContent: {
    paddingVertical: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  detailsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  detailsContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsBody: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    flex: 0.35,
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    flex: 0.65,
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#6200ea',
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default StudentListScreen;
