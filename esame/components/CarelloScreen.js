import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class CarelloScreen extends React.Component {
  state = {
    totale: 0,
  };

  setTotale = () => {
    let totale = 0;
    this.props.navigation.state.params.list.map((l, i) => {
      totale += l.price * l.number;
      return l;
    });
    this.setState({ totale: totale });
  };

  componentDidMount() {
    this.setTotale();
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.props.navigation.state.params.list.map((l, i) => {
            return (
              <ListItem
                title={
                  l.number + 'x    ' + l.name + '  ' + l.price * l.number + '€'
                }
                subtitle="Click to remove"
                onPress={() => this.props.navigation.state.params.del(l.id)}
              />
            );
          })}
        </List>
        <Button
          title={this.state.totale + '€    Vai al pagamento'}
          onPress={() => this.props.navigation.navigate('OrdinaScreen',{pay: this.props.navigation.state.params.pay})}
        />
      </View>
    );
  }
}
