import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Button, DataTable } from 'react-native-paper';

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

const TEACHER_DATA = [
  {
    id: 'T001',
    name: 'Dr. Robert Johnson',
    email: 'rjohnson@school.com',
    subject: 'Mathematics',
    phone: '555-1001',
    qualification: 'M.Sc Mathematics',
    experience: '12 years',
    office: 'Room 201',
  },
  {
    id: 'T002',
    name: 'Prof. Lisa Anderson',
    email: 'landerson@school.com',
    subject: 'English',
    phone: '555-1002',
    qualification: 'M.A English',
    experience: '8 years',
    office: 'Room 202',
  },
  {
    id: 'T003',
    name: 'Mr. David Martinez',
    email: 'dmartinez@school.com',
    subject: 'Science',
    phone: '555-1003',
    qualification: 'B.Sc Physics',
    experience: '10 years',
    office: 'Lab 103',
  },
  {
    id: 'T004',
    name: 'Mrs. Jennifer Taylor',
    email: 'jtaylor@school.com',
    subject: 'History',
    phone: '555-1004',
    qualification: 'M.A History',
    experience: '6 years',
    office: 'Room 203',
  },
  {
    id: 'T005',
    name: 'Mr. William Garcia',
    email: 'wgarcia@school.com',
    subject: 'Physical Education',
    phone: '555-1005',
    qualification: 'B.P.Ed',
    experience: '5 years',
    office: 'Gymnasium',
  },
];

const SuccessScreen = ({ navigation, route }) => {
  const userType = route?.params?.userType || 'student';
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 3;

  const data = userType === 'teacher' ? TEACHER_DATA : STUDENT_DATA;
  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  const columns =
    userType === 'teacher'
      ? ['ID', 'Name', 'Subject', 'Action']
      : ['ID', 'Name', 'Grade', 'Action'];

  const handleViewDetails = (record) => {
    navigation.navigate('Detail', {
      record,
      type: userType === 'teacher' ? 'Teacher' : 'Student',
      userType,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {userType.toUpperCase()}!
        </Text>
        <Text style={styles.subText}>
          {userType === 'teacher'
            ? 'Here are all registered teachers'
            : 'Here are all registered students'}
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>
          {userType === 'teacher' ? 'Teachers Database' : 'Students Database'}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.tableHeader}>
              {columns.map((col) => (
                <DataTable.Title
                  key={col}
                  style={[
                    styles.tableCell,
                    col === 'Action' && styles.actionColumn,
                  ]}
                >
                  <Text style={styles.headerText}>{col}</Text>
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {data.slice(from, to).map((item) => (
              <DataTable.Row key={item.id} style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(item)}
                    style={styles.idLink}
                  >
                    <Text style={styles.idText}>{item.id}</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Text style={styles.cellText} numberOfLines={1}>
                    {item.name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Text style={styles.cellText} numberOfLines={1}>
                    {userType === 'teacher' ? item.subject : item.grade}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tableCell, styles.actionColumn]}>
                  <Button
                    mode="text"
                    onPress={() => handleViewDetails(item)}
                    compact
                    labelStyle={styles.buttonLabel}
                  >
                    View
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}–${to} of ${data.length}`}
          style={styles.pagination}
        />
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutButton}
        >
          Logout
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
    padding: 20,
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#e1bee7',
  },
  tableContainer: {
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dataTable: {
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#6200ea',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableRow: {
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 100,
  },
  actionColumn: {
    minWidth: 80,
  },
  cellText: {
    fontSize: 13,
    color: '#333',
  },
  idText: {
    color: '#6200ea',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  idLink: {
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 11,
    color: '#6200ea',
  },
  pagination: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#f57c00',
  },
});

export default SuccessScreen;
