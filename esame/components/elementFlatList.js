import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  todoStyle: {
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textStyle: {
    fontSize: 15,
  },
});

export default class ElementFlatList extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.nav(this.props.value)}
        underlayColor="rgba(0,0,0,0.3)">
        <View style={styles.todoStyle}>
          <View style={{ flex: 3 }}>
            <Text style={styles.textStyle}>{this.props.value.name+"   "+this.props.value.price+"€"}</Text>
            <Text style={{fontSize: 7}}>{this.props.value.info}</Text>
            <Text style={styles.textStyle}>{this.props.value.category}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                justifyContent: 'center',
              }}
              source={{ uri: this.props.value.image }}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
