import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, TextInput, Text, Snackbar, Menu, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // User type validation
    if (!userType) {
      newErrors.userType = 'Please select a user type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      setSnackbarMessage('Please correct the errors below');
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      const isSuccess = Math.random() > 0.2; // 80% success rate

      if (isSuccess) {
        navigation.navigate('Home', { 
          userType,
          username 
        });
      } else {
        navigation.navigate('Failure', { 
          userType,
          username 
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setUserType('student');
    setErrors({});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MySchoolApp</Text>
        <Text style={styles.subtitle}>
          Sign in to your account
        </Text>

        <View style={styles.formContainer}>
          {/* User Type Dropdown */}
          <Text style={styles.label}>User Type *</Text>
          <View style={[styles.pickerContainer, errors.userType && styles.inputError]}>
            <Menu
              visible={dropdownVisible}
              onDismiss={() => setDropdownVisible(false)}
              anchor={
                <Button
                  onPress={() => setDropdownVisible(true)}
                  mode="text"
                  contentStyle={styles.dropdownButton}
                  labelStyle={styles.dropdownLabel}
                  icon="chevron-down"
                >
                  {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setUserType('student');
                  setDropdownVisible(false);
                  if (errors.userType) {
                    const newErrors = { ...errors };
                    delete newErrors.userType;
                    setErrors(newErrors);
                  }
                }}
                title="Student"
              />
              <Menu.Item
                onPress={() => {
                  setUserType('teacher');
                  setDropdownVisible(false);
                  if (errors.userType) {
                    const newErrors = { ...errors };
                    delete newErrors.userType;
                    setErrors(newErrors);
                  }
                }}
                title="Teacher"
              />
              <Menu.Item
                onPress={() => {
                  setUserType('admin');
                  setDropdownVisible(false);
                  if (errors.userType) {
                    const newErrors = { ...errors };
                    delete newErrors.userType;
                    setErrors(newErrors);
                  }
                }}
                title="Admin"
              />
            </Menu>
          </View>
          {errors.userType && (
            <Text style={styles.errorText}>{errors.userType}</Text>
          )}

          {/* Username Input */}
          <Text style={styles.label}>Username *</Text>
          <TextInput
            label="Enter your username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) {
                const newErrors = { ...errors };
                delete newErrors.username;
                setErrors(newErrors);
              }
            }}
            style={[styles.input, errors.username && styles.inputError]}
            mode="outlined"
            placeholder="Username (min 3 characters)"
            disabled={isLoading}
            outlineColor={errors.username ? '#d32f2f' : '#6200ea'}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          {/* Password Input */}
          <Text style={styles.label}>Password *</Text>
          <TextInput
            label="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                const newErrors = { ...errors };
                delete newErrors.password;
                setErrors(newErrors);
              }
            }}
            style={[styles.input, errors.password && styles.inputError]}
            mode="outlined"
            secureTextEntry={!showPassword}
            placeholder="Password (min 6 characters)"
            disabled={isLoading}
            outlineColor={errors.password ? '#d32f2f' : '#6200ea'}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Login and Clear Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={[styles.button, styles.loginButton]}
              contentStyle={styles.buttonContent}
            >
              Login
            </Button>

            <Button
              mode="outlined"
              onPress={handleClear}
              disabled={isLoading}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Clear
            </Button>
          </View>
        </View>

        <Text style={styles.footer}>© 2026 MySchoolApp. All rights reserved.</Text>
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
  content: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginBottom: 12,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#6200ea',
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownButton: {
    height: 50,
    justifyContent: 'center',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#6200ea',
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#6200ea',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default LoginScreen;
