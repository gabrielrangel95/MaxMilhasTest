import React, {Component} from 'react'
import {View,Image,StyleSheet, Alert} from 'react-native'
import {Item, Input, Icon, Button,Text } from 'native-base'
import Search from '../models/Search'
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class SearchScreen extends Component{
  state = {
    source: '', 
    destination: '',
    departureDate: '',
    departureDateToShow: '',
    arrivalDate: '',
    arrivalDateToShow: '',
    adults: '',
    isDatePickerDepartureVisible: false,
    isDatePickerArrivalVisible: false,
  }

  _showDatePicker = (from) => { //show the date picker, based on from param passed
    if(from === 'departureDate'){
      this.setState({ isDatePickerDepartureVisible: true });
    }else{
      this.setState({ isDatePickerArrivalVisible: true });
    }

  }

  _hideDateTimePicker = () => this.setState({ isDatePickerDepartureVisible: false, isDatePickerArrivalVisible: false }); //hide the date picker

  _handleDatePicked = (date) => { //get the date choosed from date picker
    var day = date.getDate(); //get the day
    var month = date.getMonth(); //get the month
    month = month +1; //month on JavaScript starts on 0 , so add 1
    var year = date.getFullYear(); //get the year

    if(day < 10){ //put 0 before the day if is less then 10, ex: if is 1, put 01
      day = "0"+day
    }
    if(month < 10){ //put 0 before the month if is less then 10, ex: if is 1, put 01
      month = "0"+month
    }

    var dateToShow = day+'/'+month+'/'+year; //date that will be show for the user on format 00/00/0000
    var dateToSearch = year+month+day; //date that will be passed on search param for the next screen

    if(this.state.isDatePickerDepartureVisible){ //if the departure picker is showing, put on departure date's variables
      this.setState({departureDate: dateToSearch, departureDateToShow: dateToShow})
    }else{ //else put on the arrival variables
      this.setState({arrivalDate: dateToSearch, arrivalDateToShow: dateToShow})
    }


    this._hideDateTimePicker(); //hide after date selected
  };

  _onPesquisarClicked(){ //handle the search button selected
    const { source, destination, departureDate, arrivalDate, adults} = this.state; //get the variables from state
    if(source && destination && departureDate && arrivalDate && adults ){ //validate if is not null
      var search = new Search();
      search.source = source;
      search.destination = destination;
      search.departureDate = departureDate;
      search.arrivalDate = arrivalDate;
      search.adults = adults;
      this.props.navigation.navigate('Results',{search: search}) //navigate to results screen
    }else{ //if is null emit an alert
      Alert.alert('Todos os campos são obrigatórios!')
    }
  }


  render(){
    return(
      <View>
        <Image
          source={require('../resources/banner.png')}
        />
        <View style={styles.container}>
          <Item regular style={styles.item}>
            <Input
              placeholder='IATA Origem'
              onChangeText={(source) => this.setState({source})}
              value={this.state.source}
            />
            <Icon active name='ios-pin-outline' style={{color: '#1abc9c'}} />
          </Item>
          <Item regular style={styles.item}>
            <Input
              placeholder='IATA Destino'
              onChangeText={(destination) => this.setState({destination})}
              value={this.state.destination}
            />
            <Icon active name='ios-pin-outline' style={{color: '#1abc9c'}} />
          </Item>

          <View style={styles.datesContainer}>
            <Item regular style={{width: 161.4, height: 54, backgroundColor: 'white'}}>
              <Input
                placeholder='Data da ida'
                onFocus={()=>this._showDatePicker('departureDate')}
                value={this.state.departureDateToShow}
              />
              <Icon active name='ios-calendar-outline' style={{color: '#1abc9c'}} />
            </Item>
            <DateTimePicker
              isVisible={this.state.isDatePickerDepartureVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
            <Item regular style={styles.datesItem}>
              <Input
                placeholder='Data da volta'
                onFocus={()=>this._showDatePicker('arrivalDate')}
                value={this.state.arrivalDateToShow}
              />
              <Icon active name='ios-calendar-outline' style={{color: '#1abc9c'}} />
            </Item>
            <DateTimePicker
              isVisible={this.state.isDatePickerArrivalVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

          </View>

          <Item regular style={styles.itemAdults}>
            <Input
              placeholder='Quantidade de passageiros'
              onChangeText={(adults) => this.setState({adults})}
              value={this.state.adults}
            />
            <Icon active name='ios-people-outline' style={{color: '#1abc9c'}} />
          </Item>
          <View style={styles.buttonView}>
            <Button onPress={() => this._onPesquisarClicked()} full iconLeft style={{backgroundColor: '#1abc9c'}}>
              <Icon name='ios-search' />
              <Text>Pesquisar passagem</Text>
            </Button>
          </View>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:30
  },
  item:{
    width: 337, height: 54, backgroundColor: 'white'
  },
  datesContainer:{
    width: 337, flexDirection: 'row', marginTop:48, alignItems: 'center', justifyContent: 'space-between'
  },
  datesItem:{
    width: 161.4, height: 54, backgroundColor: 'white'
  },
  itemAdults:{
    width: 337, height: 54, backgroundColor: 'white',marginTop: 48
  },
  buttonView:{
    alignItems:'center', width: 337, marginTop: 12
  }
});
