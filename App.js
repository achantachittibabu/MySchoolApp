import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SchoolInformationScreen from './screens/SchoolInformationScreen';
import StudentListScreen from './screens/StudentListScreen';
import StudentRegistrationScreen from './screens/StudentRegistrationScreen';
import TeacherListScreen from './screens/TeacherListScreen';
import TeacherRegistrationScreen from './screens/TeacherRegistrationScreen';
import AdminListScreen from './screens/AdminListScreen';
import AdminRegistrationScreen from './screens/AdminRegistrationScreen';
import SuccessScreen from './screens/SuccessScreen';
import FailureScreen from './screens/FailureScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6200ea',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'MySchoolApp - Login' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ 
              title: 'Home',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="SchoolInformation"
            component={SchoolInformationScreen}
            options={{ title: 'School Information' }}
          />
          <Stack.Screen
            name="StudentList"
            component={StudentListScreen}
            options={{ title: 'Student List' }}
          />
          <Stack.Screen
            name="StudentRegistration"
            component={StudentRegistrationScreen}
            options={{ title: 'Register Student' }}
          />
          <Stack.Screen
            name="TeacherList"
            component={TeacherListScreen}
            options={{ title: 'Teacher List' }}
          />
          <Stack.Screen
            name="TeacherRegistration"
            component={TeacherRegistrationScreen}
            options={{ title: 'Register Teacher' }}
          />
          <Stack.Screen
            name="AdminList"
            component={AdminListScreen}
            options={{ title: 'Admin List' }}
          />
          <Stack.Screen
            name="AdminRegistration"
            component={AdminRegistrationScreen}
            options={{ title: 'Register Admin' }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{ title: 'Dashboard' }}
          />
          <Stack.Screen
            name="Failure"
            component={FailureScreen}
            options={{ title: 'Login Failed' }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({ route }) => ({
              title: `${route.params?.type} Details`,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
