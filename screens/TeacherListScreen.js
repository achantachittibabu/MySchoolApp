import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Text, Button, TextInput, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    department: 'Science & Math',
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
    department: 'Languages',
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
    department: 'Science & Math',
  },
  {
    id: 'T004',
    name: 'Ms. Jessica Lee',
    email: 'jlee@school.com',
    subject: 'History',
    phone: '555-1004',
    qualification: 'M.A History',
    experience: '6 years',
    office: 'Room 204',
    department: 'Social Studies',
  },
  {
    id: 'T005',
    name: 'Mr. Thomas Wilson',
    email: 'twilson@school.com',
    subject: 'Physical Education',
    phone: '555-1005',
    qualification: 'B.Sc PE',
    experience: '9 years',
    office: 'Gym 105',
    department: 'Sports',
  },
];

const TeacherListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus-circle"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.navigate('TeacherRegistration')}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  const filteredTeachers = useMemo(() => {
    return TEACHER_DATA.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleUpdateTeacher = (teacher) => {
    alert(`Update functionality for ${teacher.name} would be implemented here`);
  };

  const renderTeacherItem = ({ item }) => (
    <Card style={styles.teacherCard}>
      <View style={styles.cardHeader}>
        <View style={styles.teacherAvatar}>
          <MaterialCommunityIcons
            name="school"
            size={32}
            color="#fff"
          />
        </View>
        <View style={styles.teacherBasicInfo}>
          <Text style={styles.teacherName}>{item.name}</Text>
          <Text style={styles.teacherId}>{item.id}</Text>
          <Text style={styles.teacherEmail}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Subject:</Text>
          <Text style={styles.infoValue}>{item.subject}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Experience:</Text>
          <Text style={styles.infoValue}>{item.experience}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => handleViewTeacher(item)}
          style={styles.viewButton}
          contentStyle={styles.actionButtonContent}
          icon="eye"
        >
          View
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleUpdateTeacher(item)}
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
          placeholder="Search by name, subject, or ID"
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
      </View>

      <View style={styles.resultCount}>
        <Text style={styles.resultText}>
          Found {filteredTeachers.length} teacher(s)
        </Text>
      </View>

      {filteredTeachers.length > 0 ? (
        <FlatList
          data={filteredTeachers}
          renderItem={renderTeacherItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="school-search"
            size={64}
            color="#ccc"
          />
          <Text style={styles.emptyText}>No teachers found</Text>
        </View>
      )}

      {selectedTeacher && (
        <View style={styles.detailsModal}>
          <View style={styles.detailsContent}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Teacher Details</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setSelectedTeacher(null)}
              />
            </View>

            <ScrollView style={styles.detailsBody}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subject:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.subject}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Qualification:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.qualification}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Experience:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.experience}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Office:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.office}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Department:</Text>
                <Text style={styles.detailValue}>{selectedTeacher.department}</Text>
              </View>
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => setSelectedTeacher(null)}
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
  },
  searchInput: {
    backgroundColor: '#f9f9f9',
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
  teacherCard: {
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
  teacherAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherBasicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  teacherId: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 2,
  },
  teacherEmail: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 8,
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
    backgroundColor: '#4CAF50',
  },
  updateButton: {
    flex: 1,
    borderColor: '#4CAF50',
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
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default TeacherListScreen;
