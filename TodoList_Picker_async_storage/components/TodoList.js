import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Todo from './Todo.js';

const styles = StyleSheet.create({
  flatListStyle: {
    flex: 1,
  },
});

export default class TodoList extends React.Component {
  _keyExtractor = (item, index) => {
    item.id = index;
    index.toString();
  };
  render() {
    return (
      <FlatList
        style={[styles.flatListStyle]}
        data={this.props.data}
        renderItem={({ item }) => <Todo value={item} nav={this.props.nav} />}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
