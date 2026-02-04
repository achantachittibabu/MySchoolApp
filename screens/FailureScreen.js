import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FailureScreen = ({ navigation, route }) => {
  const userType = route?.params?.userType || 'user';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={80}
            color="#f44336"
          />
        </View>

        <Text style={styles.title}>Login Failed</Text>

        <Text style={styles.errorMessage}>
          {`We couldn't authenticate your ${userType} account. Please check your credentials and try again.`}
        </Text>

        <View style={styles.errorDetails}>
          <Text style={styles.detailsTitle}>Possible reasons:</Text>
          <Text style={styles.bulletPoint}>• Invalid username or password</Text>
          <Text style={styles.bulletPoint}>• Account not activated</Text>
          <Text style={styles.bulletPoint}>• Network connection issue</Text>
          <Text style={styles.bulletPoint}>• Account locked due to multiple failed attempts</Text>
        </View>

        <Text style={styles.supportText}>
          If you continue to experience issues, please contact your school administrator or visit the help center.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.retryButton}
            contentStyle={styles.buttonContent}
          >
            Try Again
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
            style={styles.backButton}
            contentStyle={styles.buttonContent}
          >
            Back to Login
          </Button>
        </View>

        <Text style={styles.footer}>
          Need help? Contact: support@myschoolapp.com
        </Text>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  iconContainer: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  errorDetails: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    padding: 15,
    borderRadius: 4,
    marginBottom: 25,
    width: '100%',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 8,
  },
  bulletPoint: {
    color: '#d32f2f',
    marginBottom: 5,
    lineHeight: 20,
  },
  supportText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  retryButton: {
    marginBottom: 10,
    backgroundColor: '#6200ea',
  },
  backButton: {
    borderColor: '#6200ea',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FailureScreen;
