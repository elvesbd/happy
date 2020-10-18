import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Ong {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OngsMap() {
  const [ongs, setOngs] = useState<Ong[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('institutions').then(response => {
      setOngs(response.data);
    });
  });

  function handleNavigationOngsDetails(id: number) {
    navigation.navigate('OngsDetails', { id });
  }

  function handleNavigationToCreateOng() {
    navigation.navigate('SelectedMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -3.7899632, 
          longitude: -38.5889784,
          latitudeDelta: 0.35,
          longitudeDelta: 0.35,  
        }}>

          {ongs.map(ong => {
            return (
              <Marker
                key={ong.id} 
                icon={mapMarker} 
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{latitude: ong.latitude, longitude: ong.longitude}}>
                
                <Callout tooltip onPress={() => handleNavigationOngsDetails(ong.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {ong.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{ongs.length} ongs encontradas</Text>

        <RectButton style={styles.createOngButton} onPress={handleNavigationToCreateOng}> 
            <Feather name={"plus"} size={20} color={"#fff"}/>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    marginLeft: 5,
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOngButton: {
    width:56,
    height: 56,
    backgroundColor: '#15c3b6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});