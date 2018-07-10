import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, FormLabel, FormInput, Card } from 'react-native-elements';
import { Permissions, MapView, Location } from 'expo';
import uuid from 'uuid';
import { KeyboardAvoidingView } from 'react-native';

import * as firebase from 'firebase';
var config = {
  apiKey: 'AIzaSyClhlrX24AECRXdq1nZvhEGdwC7BHymnNQ',
  authDomain: 'myfavorities-49de3.firebaseapp.com',
  databaseURL: 'https://myfavorities-49de3.firebaseio.com',
  projectId: 'myfavorities-49de3',
  storageBucket: 'myfavorities-49de3.appspot.com',
  messagingSenderId: '212535012908',
};

firebase.apps.length == 0 ? firebase.initializeApp(config) : null;

export default class LoginScreen extends React.Component {
  state = {
    nome: '',
    cognome: '',
    telefono: '',
    indirizzo: '',
  };

  _calcolaIndirizzo = async () => {
    let permissions = await Permissions.getAsync(Permissions.LOCATION);
    if (permissions.status !== 'granted') {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        alert('You need to enable the GPS and authorize it');
        return;
      }
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: location.coords,
    });
    let address = await Location.reverseGeocodeAsync(location.coords);
    await this.setState({
      indirizzo: address[0].city + ' ' + address[0].street,
    });
    address = address[0].city + ' ' + address[0].street;
    this._aggiungi(address);
  };

  _aggiungi = addr => {
    let item = {
      name: this.state.nome,
      cognome: this.state.cognome,
      telefono: this.state.telefono,
      indirizzo: addr,
    };
    firebase
      .database()
      .ref('orders/' + uuid.v4())
      .push(item);
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
        <View style={{flex:1}}>
          <FormLabel>Nome</FormLabel>
          <FormInput
            placeholder="Inserisci nome"
            onChangeText={text => this.setState({ nome: text })}
          />
          <FormLabel>Cognome</FormLabel>
          <FormInput
            placeholder="Inserisci cognome"
            onChangeText={text => this.setState({ cognome: text })}
          />
          <FormLabel>Telefono</FormLabel>
          <FormInput
            placeholder="Inserisci telefono"
            onChangeText={text => this.setState({ telefono: text })}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              title="Paga e aggiungi l'ordine al database."
              onPress={() => {
                this._calcolaIndirizzo();
                this.props.navigation.state.params.pay();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
