import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Button, TextInput, Snackbar, Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AdminRegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    qualification: '',
    experience: '',
    office: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [positionDropdownVisible, setPositionDropdownVisible] = useState(false);
  const [departmentDropdownVisible, setDepartmentDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const positions = ['Principal', 'Vice Principal', 'Academic Dean', 'Finance Manager', 'IT Manager', 'HR Manager'];
  const departments = ['Administration', 'Academics', 'Finance', 'IT', 'Human Resources'];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10 digits)';
    }

    // Position validation
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    // Qualification validation
    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    } else if (!/^\d+\s*years?$/.test(formData.experience.toLowerCase())) {
      newErrors.experience = 'Experience format: e.g., "10 years"';
    }

    // Office validation
    if (!formData.office.trim()) {
      newErrors.office = 'Office location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleRegister = () => {
    if (!validateForm()) {
      setSnackbarMessage('Please correct all errors');
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      Alert.alert(
        'Success',
        `Admin ${formData.name} registered successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ]
      );
    }, 1500);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      qualification: '',
      experience: '',
      office: '',
      photo: null,
    });
    setErrors({});
  };

  const handlePhotoUpload = () => {
    Alert.alert('Upload Photo', 'Photo upload functionality would be implemented here', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Select from Gallery',
        onPress: () => {
          setSnackbarMessage('Gallery picker would be implemented');
          setSnackbarVisible(true);
        },
      },
      {
        text: 'Take Photo',
        onPress: () => {
          setSnackbarMessage('Camera picker would be implemented');
          setSnackbarVisible(true);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="account-plus"
          size={40}
          color="#f57c00"
        />
        <Text style={styles.headerTitle}>Register New Admin</Text>
        <Text style={styles.headerSubtitle}>
          Fill in all required fields to register a new admin
        </Text>
      </View>

      <View style={styles.content}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Admin Photo (Optional)</Text>
          <TouchableOpacity
            onPress={handlePhotoUpload}
            style={styles.photoUploadBox}
          >
            {formData.photo ? (
              <Image source={{ uri: formData.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={40}
                  color="#ccc"
                />
                <Text style={styles.photoUploadText}>Tap to upload photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Admin Information</Text>

          {/* Name */}
          <Text style={styles.label}>Name *</Text>
          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            mode="outlined"
            style={[styles.input, errors.name && styles.inputError]}
            outlineColor={errors.name ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="Enter admin's full name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          {/* Email */}
          <Text style={styles.label}>Email *</Text>
          <TextInput
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            mode="outlined"
            style={[styles.input, errors.email && styles.inputError]}
            outlineColor={errors.email ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="admin@school.com"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Phone */}
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            mode="outlined"
            style={[styles.input, errors.phone && styles.inputError]}
            outlineColor={errors.phone ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="555-2001 or 5552001"
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          {/* Position */}
          <Text style={styles.label}>Position *</Text>
          <Menu
            visible={positionDropdownVisible}
            onDismiss={() => setPositionDropdownVisible(false)}
            anchor={
              <Button
                onPress={() => setPositionDropdownVisible(true)}
                mode="outlined"
                contentStyle={styles.dropdownContent}
                labelStyle={styles.dropdownLabel}
                style={[styles.dropdown, errors.position && styles.inputError]}
                disabled={isLoading}
                icon="chevron-down"
              >
                {formData.position || 'Select Position'}
              </Button>
            }
          >
            {positions.map((position) => (
              <Menu.Item
                key={position}
                onPress={() => {
                  handleInputChange('position', position);
                  setPositionDropdownVisible(false);
                }}
                title={position}
              />
            ))}
          </Menu>
          {errors.position && <Text style={styles.errorText}>{errors.position}</Text>}

          {/* Department */}
          <Text style={styles.label}>Department *</Text>
          <Menu
            visible={departmentDropdownVisible}
            onDismiss={() => setDepartmentDropdownVisible(false)}
            anchor={
              <Button
                onPress={() => setDepartmentDropdownVisible(true)}
                mode="outlined"
                contentStyle={styles.dropdownContent}
                labelStyle={styles.dropdownLabel}
                style={[styles.dropdown, errors.department && styles.inputError]}
                disabled={isLoading}
                icon="chevron-down"
              >
                {formData.department || 'Select Department'}
              </Button>
            }
          >
            {departments.map((dept) => (
              <Menu.Item
                key={dept}
                onPress={() => {
                  handleInputChange('department', dept);
                  setDepartmentDropdownVisible(false);
                }}
                title={dept}
              />
            ))}
          </Menu>
          {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}

          {/* Qualification */}
          <Text style={styles.label}>Qualification *</Text>
          <TextInput
            label="Qualification"
            value={formData.qualification}
            onChangeText={(text) => handleInputChange('qualification', text)}
            mode="outlined"
            style={[styles.input, errors.qualification && styles.inputError]}
            outlineColor={errors.qualification ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="M.Ed or B.Com"
          />
          {errors.qualification && <Text style={styles.errorText}>{errors.qualification}</Text>}

          {/* Experience */}
          <Text style={styles.label}>Experience *</Text>
          <TextInput
            label="Experience"
            value={formData.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
            mode="outlined"
            style={[styles.input, errors.experience && styles.inputError]}
            outlineColor={errors.experience ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="15 years"
          />
          {errors.experience && <Text style={styles.errorText}>{errors.experience}</Text>}

          {/* Office */}
          <Text style={styles.label}>Office Location *</Text>
          <TextInput
            label="Office"
            value={formData.office}
            onChangeText={(text) => handleInputChange('office', text)}
            mode="outlined"
            style={[styles.input, errors.office && styles.inputError]}
            outlineColor={errors.office ? '#d32f2f' : '#f57c00'}
            disabled={isLoading}
            placeholder="Office 101"
          />
          {errors.office && <Text style={styles.errorText}>{errors.office}</Text>}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
            >
              Register Admin
            </Button>

            <Button
              mode="outlined"
              onPress={handleClear}
              disabled={isLoading}
              style={styles.clearButton}
              contentStyle={styles.buttonContent}
            >
              Clear
            </Button>
          </View>

          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            disabled={isLoading}
            style={styles.backButton}
          >
            Back to List
          </Button>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#f57c00',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  photoSection: {
    marginBottom: 25,
  },
  photoUploadBox: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  photoUploadText: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginBottom: 10,
    marginTop: 4,
  },
  dropdown: {
    marginBottom: 4,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  dropdownContent: {
    height: 50,
    justifyContent: 'center',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#f57c00',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#f57c00',
  },
  clearButton: {
    flex: 1,
    borderColor: '#f57c00',
  },
  backButton: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default AdminRegistrationScreen;
