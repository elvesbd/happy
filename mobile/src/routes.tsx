import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OngsMap from './pages/OngsMap';
import OngsDetails from './pages/OngsDetails';
import SelectedMapPosition from './pages/CreateOngs/SelectedMapPosition';
import OngsData from './pages/CreateOngs/OngsData';

import Header from './components/Header';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'} }}>
        <Screen name="OngsMap" component={OngsMap}/>
        <Screen 
          name="OngsDetails" 
          component={OngsDetails} 
          options={{headerShown: true, header: () => <Header showCancel={false} title="Ong"/>}}/>
        <Screen 
          name="SelectedMapPosition" 
          component={SelectedMapPosition}
          options={{headerShown: true, header: () => <Header title="Selecione no mapa"/>}}/>
        <Screen 
          name="OngsData" 
          component={OngsData}
          options={{headerShown: true, header: () => <Header title="Informe os dados"/>}}/>
      </Navigator>
    </NavigationContainer>
  );
}