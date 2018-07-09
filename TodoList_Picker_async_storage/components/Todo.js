import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  todoStyle: {
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 20,
  },
});

export default class Todo extends React.Component {
  state = {
    done: false,
  };
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({ done: !this.state.done })}
        underlayColor="rgba(0,0,0,0.3)">
        <View style={styles.todoStyle}>
          {this.state.done ? (
            <MaterialIcons name="check-box" size={24} color="black" />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color="black"
            />
          )}
          <Text style={styles.textStyle}>{this.props.value.text}</Text>
          <TouchableHighlight
            onPress={() => {
              this.props.nav(this.props.value);
            }}
            underlayColor="rgba(0,0,0,0.3)">
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}
