import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import Logo from './Logo';
import Login from './Login';
import Signup from './Signup';
import AdminHome from './Admin/AdminHome';
import PoliceAccounts from './Admin/PoliceAccounts';
import Policestations from './Admin/Policestations';
import AddPolice from './Admin/AddPolice';
import UserHome from './User/UserHome';
import ReportIncident from './ReportIncident';
import PoliceHome from './Police/PoliceHome';
import ApprovedReports from './Police/ApprovedReports';
import AddIncidentByPolice from './Police/AddIncidentByPolice';
import LetsMoveSafely from './User/LetsMoveSafely';
import Threshold from './Admin/Threshold';
import Selectlocation from './User/Selectlocation';
import Zones from './Admin/Zones';
import AddZone from './Admin/AddZone';
import UserSecurity from './Admin/UserSecurity';
import Rejected from './Police/Rejected';
import Allreports from './Police/Allreports';
import PoliceSelectLocation from './Police/PoliceSelectLocation';
import Viewzones from './Admin/Viewzones';
import From from './User/From';
import To from './User/To';
import Planeroute from './User/Planeroute';
import Next from './User/Next';
const Stack = createNativeStackNavigator();
import Editpolicezone from './Admin/Editpolicezone';
import Viewspecificzone from './Admin/Viewspecificzone';
import Userreports from './User/Userreports';
function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Logo'>
          <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login}options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }} />
          <Stack.Screen name='PoliceAccounts' component={PoliceAccounts} options={{title: 'Police Accounts',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Policestations' component={Policestations} options={{title: 'Police Stations',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='AddPolice' component={AddPolice} options={{title: 'Add Police',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='UserHome' component={UserHome} options={{ headerShown: false }}/>
          <Stack.Screen name='ReportIncident' component={ReportIncident} options={{title: 'Report Incident',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='PoliceHome' component={PoliceHome} options={{ headerShown: false }}/>
          <Stack.Screen name='ApprovedReports' component={ApprovedReports} options={{title: 'Approved Reports',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='AddIncidentByPolice' component={AddIncidentByPolice} options={{title: 'Add Incident',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='LetsMoveSafely' component={LetsMoveSafely} options={{title: 'Lets Move Safely',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Threshold' component={Threshold} options={{title: 'Threshold',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Selectlocation' component={Selectlocation} options={{title: 'Select Location',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Zones' component={Zones} options={{title: 'Zones',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='AddZone' component={AddZone} options={{title: 'Add Zones',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='UserSecurity' component={UserSecurity} options={{title: 'All Users',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Rejected' component={Rejected} options={{title: 'Rejected Reports',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Allreports' component={Allreports} options={{title: 'Check Reports',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='PoliceSelectLocation' component={PoliceSelectLocation} options={{title: 'Select Location',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Viewzones' component={Viewzones} options={{title: 'View Zones',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='From' component={From} options={{title: 'From Select Location',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='To' component={To} options={{title: 'To Select Location',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Planeroute' component={Planeroute} options={{title: 'Plane Route',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Next' component={Next} options={{title: 'Plane Route',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Editpolicezone' component={Editpolicezone} options={{title: 'Police Zones',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Viewspecificzone' component={Viewspecificzone} options={{title: 'Zones',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>
          <Stack.Screen name='Userreports' component={Userreports} options={{title: 'Your Reports',headerStyle: {  backgroundColor: 'black'},headerTintColor: '#20b2aa', headerTitleStyle: {fontWeight: 'bold', fontSize:30   },}}/>


        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

export default App;
