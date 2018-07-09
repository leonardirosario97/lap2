import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  TimePickerAndroid,
} from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class DateComponent extends React.Component {
  state = {
    date: new Date(),
    _pickerVisible: false,
  };

  _showPicker = () => {
    if (Platform.OS === 'ios') {
      this.setState({ _pickerVisible: !this.state._pickerVisible });
    } else {
      this._showPickerDataAndroid();
    }
  };

  _showPickerDataAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let newDate = moment()
          .year(year)
          .month(month)
          .date(day)
          .toDate();
        this._showPickerTimerAndroid(newDate);
      }
    } catch ({ error }) {
      console.warn('Cannot open date picker', error);
    }
  };

  _showPickerTimerAndroid = async updateDate => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        let newDate = moment(updateDate)
          .hour(hour)
          .minute(minute)
          .toDate();
        this.setState({ date: newDate });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <TouchableHighlight onPress={() => this._showPicker()}>
          <View style={styles.rowStyle}>
            <Text>Data</Text>
            <Text>{moment(this.state.date).format('lll')}</Text>
          </View>
        </TouchableHighlight>
        {Platform.OS === 'ios' && this.state._pickerVisible ? (
          <DatePickerIOS
            date={this.state.date}
            onDateChange={newDate => this.setState({ date: newDate })}
          />
        ) : null}
      </View>
    );
  }
}
