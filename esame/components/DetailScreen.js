import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import uuid from 'uuid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ElementFlatList extends React.Component {
  state = {
    number: 1,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
            source={{ uri: this.props.navigation.state.params.item.image }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text>{this.props.navigation.state.params.item.name}</Text>
          <Text style={{fontSize: 7}}>{this.props.navigation.state.params.item.info}</Text>
          <Text>{this.props.navigation.state.params.item.price}€</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title="-"
              onPress={() => this.setState({ number: this.state.number==0 ? 0 : this.state.number-1 })}
            />
            <Text>{this.state.number}</Text>
            <Button
              title="+"
              onPress={() => this.setState({ number: this.state.number + 1 })}
            />
          </View>
          <Button
            title={this.props.navigation.state.params.item.price*this.state.number+"€    -   Aggiungi al carello"}
            onPress={() => {
              let newItem = {
                id: uuid.v4() ,
                name: this.props.navigation.state.params.item.name,
                number: this.state.number,
                price: this.props.navigation.state.params.item.price}
              this.props.navigation.state.params.add(newItem);
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}
