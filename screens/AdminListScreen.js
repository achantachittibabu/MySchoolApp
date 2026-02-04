import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Text, Button, TextInput, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ADMIN_DATA = [
  {
    id: 'A001',
    name: 'Mr. James Carter',
    email: 'jcarter@school.com',
    phone: '555-2001',
    position: 'Principal',
    department: 'Administration',
    qualification: 'M.Ed',
    experience: '20 years',
    office: 'Office 101',
  },
  {
    id: 'A002',
    name: 'Ms. Sarah Miller',
    email: 'smiller@school.com',
    phone: '555-2002',
    position: 'Vice Principal',
    department: 'Administration',
    qualification: 'M.A',
    experience: '15 years',
    office: 'Office 102',
  },
  {
    id: 'A003',
    name: 'Mr. Michael Thompson',
    email: 'mthompson@school.com',
    phone: '555-2003',
    position: 'Academic Dean',
    department: 'Academics',
    qualification: 'M.Sc',
    experience: '12 years',
    office: 'Office 103',
  },
  {
    id: 'A004',
    name: 'Ms. Jennifer White',
    email: 'jwhite@school.com',
    phone: '555-2004',
    position: 'Finance Manager',
    department: 'Finance',
    qualification: 'B.Com',
    experience: '10 years',
    office: 'Office 104',
  },
  {
    id: 'A005',
    name: 'Mr. Robert Garcia',
    email: 'rgarcia@school.com',
    phone: '555-2005',
    position: 'IT Manager',
    department: 'IT',
    qualification: 'B.Tech',
    experience: '8 years',
    office: 'Office 105',
  },
];

const AdminListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus-circle"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.navigate('AdminRegistration')}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  const filteredAdmins = useMemo(() => {
    return ADMIN_DATA.filter((admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleUpdateAdmin = (admin) => {
    alert(`Update functionality for ${admin.name} would be implemented here`);
  };

  const renderAdminItem = ({ item }) => (
    <Card style={styles.adminCard}>
      <View style={styles.cardHeader}>
        <View style={styles.adminAvatar}>
          <MaterialCommunityIcons
            name="account-tie"
            size={32}
            color="#fff"
          />
        </View>
        <View style={styles.adminBasicInfo}>
          <Text style={styles.adminName}>{item.name}</Text>
          <Text style={styles.adminId}>{item.id}</Text>
          <Text style={styles.adminEmail}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Position:</Text>
          <Text style={styles.infoValue}>{item.position}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Department:</Text>
          <Text style={styles.infoValue}>{item.department}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => handleViewAdmin(item)}
          style={styles.viewButton}
          contentStyle={styles.actionButtonContent}
          icon="eye"
        >
          View
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleUpdateAdmin(item)}
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
          placeholder="Search by name, position, or ID"
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
          Found {filteredAdmins.length} admin(s)
        </Text>
      </View>

      {filteredAdmins.length > 0 ? (
        <FlatList
          data={filteredAdmins}
          renderItem={renderAdminItem}
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
          <Text style={styles.emptyText}>No admins found</Text>
        </View>
      )}

      {selectedAdmin && (
        <View style={styles.detailsModal}>
          <View style={styles.detailsContent}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Admin Details</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setSelectedAdmin(null)}
              />
            </View>

            <ScrollView style={styles.detailsBody}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Position:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.position}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Department:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.department}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Qualification:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.qualification}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Experience:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.experience}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Office:</Text>
                <Text style={styles.detailValue}>{selectedAdmin.office}</Text>
              </View>
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => setSelectedAdmin(null)}
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
  adminCard: {
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
  adminAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f57c00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminBasicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  adminName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  adminId: {
    fontSize: 12,
    color: '#f57c00',
    fontWeight: '600',
    marginTop: 2,
  },
  adminEmail: {
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
    backgroundColor: '#f57c00',
  },
  updateButton: {
    flex: 1,
    borderColor: '#f57c00',
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
    backgroundColor: '#f57c00',
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default AdminListScreen;
