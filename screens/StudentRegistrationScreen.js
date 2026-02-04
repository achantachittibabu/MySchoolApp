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

const StudentRegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    gpa: '',
    phone: '',
    address: '',
    dob: '',
    guardian: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const grades = ['9', '10', '11', '12'];

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

    // Grade validation
    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
    }

    // GPA validation
    if (!formData.gpa.trim()) {
      newErrors.gpa = 'GPA is required';
    } else if (isNaN(parseFloat(formData.gpa))) {
      newErrors.gpa = 'GPA must be a number';
    } else if (parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4) {
      newErrors.gpa = 'GPA must be between 0 and 4';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10 digits)';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // DOB validation
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required (YYYY-MM-DD)';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.dob)) {
        newErrors.dob = 'Date format must be YYYY-MM-DD';
      } else {
        const date = new Date(formData.dob);
        if (isNaN(date.getTime())) {
          newErrors.dob = 'Invalid date';
        } else if (date > new Date()) {
          newErrors.dob = 'Date of Birth cannot be in the future';
        }
      }
    }

    // Guardian validation
    if (!formData.guardian.trim()) {
      newErrors.guardian = 'Guardian name is required';
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
        `Student ${formData.name} registered successfully!`,
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
      grade: '',
      gpa: '',
      phone: '',
      address: '',
      dob: '',
      guardian: '',
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
          color="#6200ea"
        />
        <Text style={styles.headerTitle}>Register New Student</Text>
        <Text style={styles.headerSubtitle}>
          Fill in all required fields to register a new student
        </Text>
      </View>

      <View style={styles.content}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Student Photo (Optional)</Text>
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
          <Text style={styles.sectionTitle}>Student Information</Text>

          {/* Name */}
          <Text style={styles.label}>Name *</Text>
          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            mode="outlined"
            style={[styles.input, errors.name && styles.inputError]}
            outlineColor={errors.name ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="Enter student's full name"
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
            outlineColor={errors.email ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="student@school.com"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Grade */}
          <Text style={styles.label}>Grade *</Text>
          <Menu
            visible={dropdownVisible}
            onDismiss={() => setDropdownVisible(false)}
            anchor={
              <Button
                onPress={() => setDropdownVisible(true)}
                mode="outlined"
                contentStyle={styles.dropdownContent}
                labelStyle={styles.dropdownLabel}
                style={[styles.dropdown, errors.grade && styles.inputError]}
                disabled={isLoading}
                icon="chevron-down"
              >
                {formData.grade ? `Grade ${formData.grade}` : 'Select Grade'}
              </Button>
            }
          >
            {grades.map((grade) => (
              <Menu.Item
                key={grade}
                onPress={() => {
                  handleInputChange('grade', grade);
                  setDropdownVisible(false);
                }}
                title={`Grade ${grade}`}
              />
            ))}
          </Menu>
          {errors.grade && <Text style={styles.errorText}>{errors.grade}</Text>}

          {/* GPA */}
          <Text style={styles.label}>GPA *</Text>
          <TextInput
            label="GPA (0-4)"
            value={formData.gpa}
            onChangeText={(text) => handleInputChange('gpa', text)}
            mode="outlined"
            style={[styles.input, errors.gpa && styles.inputError]}
            outlineColor={errors.gpa ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="3.5"
            keyboardType="decimal-pad"
          />
          {errors.gpa && <Text style={styles.errorText}>{errors.gpa}</Text>}

          {/* Phone */}
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            mode="outlined"
            style={[styles.input, errors.phone && styles.inputError]}
            outlineColor={errors.phone ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="555-0101 or 5550101"
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          {/* Address */}
          <Text style={styles.label}>Address *</Text>
          <TextInput
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            mode="outlined"
            style={[styles.input, errors.address && styles.inputError]}
            outlineColor={errors.address ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="123 Main Street"
            multiline
            numberOfLines={2}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          {/* DOB */}
          <Text style={styles.label}>Date of Birth *</Text>
          <TextInput
            label="Date of Birth"
            value={formData.dob}
            onChangeText={(text) => handleInputChange('dob', text)}
            mode="outlined"
            style={[styles.input, errors.dob && styles.inputError]}
            outlineColor={errors.dob ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="YYYY-MM-DD"
          />
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          {/* Guardian */}
          <Text style={styles.label}>Guardian Name *</Text>
          <TextInput
            label="Guardian's Full Name"
            value={formData.guardian}
            onChangeText={(text) => handleInputChange('guardian', text)}
            mode="outlined"
            style={[styles.input, errors.guardian && styles.inputError]}
            outlineColor={errors.guardian ? '#d32f2f' : '#6200ea'}
            disabled={isLoading}
            placeholder="Parent or Guardian's name"
          />
          {errors.guardian && <Text style={styles.errorText}>{errors.guardian}</Text>}

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
              Register Student
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
    backgroundColor: '#6200ea',
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
    color: '#6200ea',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#6200ea',
  },
  clearButton: {
    flex: 1,
    borderColor: '#6200ea',
  },
  backButton: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default StudentRegistrationScreen;
