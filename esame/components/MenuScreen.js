import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ElementFlatList from './elementFlatList.js';
import { SearchBar } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    flex: 1,
  },
});

export default class MenuScreen extends React.Component {
  state = {
    datalist: [],
    search: '',
    carelloList: [],
    currentDataList: [],
  };

  _add = async item => {
    await this.setState({ carelloList: [...this.state.carelloList, item] });
  };

  _delete = async deleteItem => {
    let newDatalist = this.state.carelloList.filter(function(item) {
      return item.id !== deleteItem;
    });

    await this.setState({ carelloList: newDatalist });
    this.props.navigation.navigate('MenuScreen');
  };

  _pay = () => {
    this.setState({ carelloList: [] });
    this.props.navigation.navigate('MenuScreen');
  };

  _navAdd = item => {
    this.props.navigation.navigate('DetailScreen', {
      item: item,
      add: this._add,
    });
  };

  _filter = text => {
    let newDatalist = this.state.datalist.filter(function(item) {
      return item.name.startsWith(text) || item.category.startsWith(text);
    });
    this.setState({ currentDataList: newDatalist });
  };

  makeRequest = () => {
    const url = 'http://www.dmi.unict.it/~calanducci/LAP2/food.json';
    const newDatalist = [];
    fetch(url)
      .then(res => res.json())
      .then(res => {
        res.data.forEach(item => {
          newDatalist.push(item);
        });
        this.setState({ datalist: newDatalist, currentDataList: newDatalist });
      });
  };

  componentDidMount() {
    this.makeRequest();
  }
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={text => this._filter(text)}
          placeholder="Search"
        />
        <FlatList
          style={[styles.flatListStyle]}
          data={this.state.currentDataList}
          renderItem={({ item }) => (
            <ElementFlatList value={item} nav={this._navAdd} />
          )}
          keyExtractor={this._keyExtractor}
        />
        <View style={{ height: 50, flexDirection: 'row', justifyContent:'center', alignItems:'center'  }}>
          <Button
            title="Menu"
            containerStyle={{ flex: 1}}
          />
          <Button
            title="Carrello"
            containerStyle={{ flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('CarelloScreen', {
                list: this.state.carelloList,
                pay: this._pay,
                del: this._delete,
              });
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}
