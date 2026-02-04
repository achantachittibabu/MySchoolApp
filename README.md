# MySchoolApp - React Native Expo

A React Native school management application built with Expo featuring login functionality for students, teachers, and admins.

## Features

### 🎯 Authentication
- Three distinct login options: Student, Teacher, and Admin
- Simulated authentication with success/failure screens
- Loading states during login process

### 📊 Dashboard
- **Student View**: Displays all registered students in a table format
  - View student details: ID, Name, Grade, GPA, Contact info, Guardian info
  - Pagination support for easy navigation
  - Click on Student ID to view full details

- **Teacher View**: Displays all registered teachers in a table format
  - View teacher details: ID, Name, Subject, Qualification, Experience
  - Pagination support
  - Click on Teacher ID to view full details

### 📄 Pages

1. **Login Screen**
   - Three large buttons for Student, Teacher, and Admin login
   - Attractive UI with loading indicators
   - Random success/failure simulation (80% success rate)

2. **Success Screen**
   - Personalized welcome message based on user type
   - Data table with paginated records
   - Action buttons to view full details
   - Logout functionality

3. **Failure Screen**
   - Clear error message
   - Troubleshooting tips
   - Options to retry or return to login
   - Support contact information

4. **Detail Screen**
   - Comprehensive display of all information for selected record
   - Icon-based field organization
   - Easy navigation back to the main list
   - Responsive design

## Project Structure

```
MySchoolApp/
├── App.js                          # Main app component with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── .babelrc                        # Babel configuration
├── .gitignore                      # Git ignore file
└── screens/
    ├── LoginScreen.js              # Login page with 3 buttons
    ├── SuccessScreen.js            # Dashboard with data tables
    ├── FailureScreen.js            # Login failure page
    └── DetailScreen.js             # Detailed view of student/teacher
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (optional but recommended)

### Steps

1. **Navigate to project directory**
   ```bash
   cd MySchoolApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Run on specific platform**
   - **iOS Simulator**: Press `i`
   - **Android Emulator**: Press `a`
   - **Web Browser**: Press `w`
   - **Device**: Scan QR code with Expo Go app

## Dependencies

- **expo** (~50.0.0): React Native framework
- **react** (18.2.0): React library
- **react-native** (0.73.0): React Native core
- **react-native-paper** (^5.11.0): UI components library
- **@react-navigation/native** (^6.1.9): Navigation library
- **@react-navigation/native-stack** (^6.9.17): Stack navigation
- **react-native-screens** (~3.27.0): Native screen components
- **react-native-safe-area-context** (4.8.2): Safe area handling
- **react-native-gesture-handler** (~2.14.0): Gesture handling

## Usage

### Login Flow
1. Select user type (Student, Teacher, or Admin)
2. The app simulates authentication (80% success rate)
3. On success → View data dashboard
4. On failure → See error page with troubleshooting tips

### Viewing Data
1. After successful login, view paginated table
2. Click on any ID (highlighted in blue) to see full details
3. Use pagination controls to navigate through records
4. Click "View" button or ID to see detailed information

### Available Data

**Sample Students** (5 records)
- S001 - John Doe
- S002 - Alice Smith
- S003 - Michael Brown
- S004 - Emily Davis
- S005 - James Wilson

**Sample Teachers** (5 records)
- T001 - Dr. Robert Johnson (Mathematics)
- T002 - Prof. Lisa Anderson (English)
- T003 - Mr. David Martinez (Science)
- T004 - Mrs. Jennifer Taylor (History)
- T005 - Mr. William Garcia (Physical Education)

## Key Features Explained

### Authentication Simulation
- Click any login button to simulate authentication
- Loading indicator shows during authentication
- ~20% chance of failure for realistic testing
- Navigate to Success or Failure screen accordingly

### Data Tables
- Responsive table design that works on mobile screens
- Horizontal scrolling for wide tables
- Pagination controls (3 items per page)
- Color-coded headers and interactive rows

### Navigation
- Stack-based navigation using React Navigation
- Smooth transitions between screens
- Consistent header styling across the app
- Back buttons for easy navigation

### UI/UX
- Material Design components via react-native-paper
- Consistent color scheme (Purple #6200ea primary color)
- Icon support via Expo Icons
- Responsive layout for different screen sizes

## Color Scheme

- **Primary**: #6200ea (Purple)
- **Secondary**: #4CAF50 (Green - Teachers)
- **Tertiary**: #f57c00 (Orange - Admin)
- **Error**: #f44336 (Red)
- **Background**: #f5f5f5 (Light Gray)

## Future Enhancements

- [ ] Real backend authentication
- [ ] Firebase integration
- [ ] Search and filter functionality
- [ ] Export data to PDF
- [ ] User profile management
- [ ] Real-time notifications
- [ ] Attendance tracking
- [ ] Grade management system

## Troubleshooting

### App won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo clear`

### Navigation issues
- Ensure all screen components are properly exported
- Check route names match exactly

### UI components not displaying
- Verify react-native-paper is installed
- Check that all dependencies are installed

## Support

For issues or questions, contact: support@myschoolapp.com

## License

© 2026 MySchoolApp. All rights reserved.
