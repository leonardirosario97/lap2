import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import TodoList from './components/TodoList.js';
import AddTodo from './components/AddTodo.js';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

const datalist = [
  {
    done: false,
    text: 'Buy milk',
    remind: false,
  },
  {
    done: false,
    text: 'Compito 2',
    remind: false,
  },
  {
    done: false,
    text: 'Compito 3',
    remind: false,
  },
  {
    done: false,
    text: 'Compito 4',
    remind: false,
  },
  {
    done: false,
    text: 'Compito 5',
    remind: false,
  },
];

class HomeScreen extends React.Component {
  state = {
    datalist: datalist || [],
  };

  _add = async item => {
    await this.setState({ datalist: [...this.state.datalist, item] });
    await AsyncStorage.setItem('datalist', JSON.stringify(this.state.datalist));
  };

  _edit = async newItem => {
    let newDatalist = this.state.datalist.map(
      item => (item.id === newItem.id ? (item = newItem) : item)
    );
    await this.setState({ datalist: newDatalist });
    await AsyncStorage.setItem('datalist', JSON.stringify(this.state.datalist));
  };

  _navAdd = item => {
    this.props.navigation.navigate('AddTodo', {
      item: item,
      onEdit: this._edit,
    });
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'TodoList',
    headerRight: (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('AddTodo', {
            onAdd: navigation.state.params.onAdd,
          })
        }>
        <Entypo name="plus" size={24} />
      </TouchableHighlight>
    ),
  });

  componentDidMount() {
    const loadData = async () => {
      let value = await AsyncStorage.getItem('datalist');
      this.setState({ datalist: JSON.parse(value) || datalist });
    };
    loadData();
    this.props.navigation.setParams({ onAdd: this._add });
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoList
          data={this.state.datalist}
          nav={this._navAdd}
          edit={this._edit}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  TodoList: { screen: HomeScreen },
  AddTodo: { screen: AddTodo },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}
