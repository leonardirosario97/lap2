import React from 'react';
import { StyleSheet, TextInput, Text, View, Switch } from 'react-native';
import DataComponent from './DataComponent.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },

  rowStyle: {
    backgroundColor: 'white',
    paddingLeft: 10,
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class AddTodo extends React.Component {
  static navigationOptions = {
    title: 'AddTodo',
  };

  state = {
    text: '',
    remind: false,
  };

  _save = () => {
    const newTodo = {
      text: this.state.text,
      done: false,
      remind: this.state.remind,
    };
    this.props.navigation.state.params.onAdd
      ? this.props.navigation.state.params.onAdd(newTodo)
      : null;
    this.props.navigation.goBack();
  };

  _edit = () => {
    const updateTodo = {
      text: this.state.text,
      done: this.props.navigation.state.params.item.done,
      remind: this.state.remind,
      id: this.props.navigation.state.params.item.id
    };
    this.props.navigation.state.params.onEdit
      ? this.props.navigation.state.params.onEdit(updateTodo)
      : null;
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.navigation.state.params.item ? (
          <TextInput
            underlineColorAndroid="#ffffff00"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Inserisci i Todo"
            placeholderTextColor="black"
            style={styles.rowStyle}
            onSubmitEditing={this._save}
          />
        ) : (
          <TextInput
            underlineColorAndroid="#ffffff00"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder={this.props.navigation.state.params.item.text}
            placeholderTextColor="black"
            style={styles.rowStyle}
            onSubmitEditing={this._edit}
          />
        )}
        <View style={styles.rowStyle}>
          <Text>Remind me</Text>
          <Switch
            onValueChange={() => this.setState({ remind: !this.state.remind })}
            value={this.state.remind}
          />
        </View>
        <DataComponent/>
      </View>
    );
  }
}
