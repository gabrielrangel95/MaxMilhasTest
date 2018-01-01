import React, {Component} from 'react'
import {View,Image,StyleSheet, Alert} from 'react-native'
import {Item, Input, Icon, Button,Text } from 'native-base'
import Search from '../models/Search'

export default class SearchScreen extends Component{
  state = {
    source: '',
    destination: '',
    departureDate: '',
    arrivalDate: '',
    adults: '',
  }

  _onPesquisarClicked(){
    const { source, destination, departureDate, arrivalDate, adults} = this.state;
    if(source && destination && departureDate && arrivalDate && adults ){
      var search = new Search();
      search.source = source;
      search.destination = destination;
      search.departureDate = departureDate;
      search.arrivalDate = arrivalDate;
      search.adults = adults;
      this.props.navigation.navigate('Results',{search: search})
    }else{
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
                onChangeText={(departureDate) => this.setState({departureDate})}
                value={this.state.departureDate}
              />
              <Icon active name='ios-calendar-outline' style={{color: '#1abc9c'}} />
            </Item>
            <Item regular style={styles.datesItem}>
              <Input
                placeholder='Data da volta'
                onChangeText={(arrivalDate) => this.setState({arrivalDate})}
                value={this.state.arrivalDate}
              />
              <Icon active name='ios-calendar-outline' style={{color: '#1abc9c'}} />
            </Item>
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
