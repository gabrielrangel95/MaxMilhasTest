import React , {Component} from 'react'

import Flight from '../models/Flight'
import FullFlight from '../models/FullFlight'
import FlightsList from '../components/FlightsList'
import Loading from '../components/Loading'

import {View,FlatList,StyleSheet, Alert} from 'react-native'
import { Container, Header, Content, Text, Left, Body, Right, Button, Icon, Title, Spinner, Footer, FooterTab} from 'native-base'


export default class ResultsScreen extends Component {
  state = {
    flights: [],
    originalArray: [],
    loading: true,
  }
  componentDidMount(){
    var searched = this.props.navigation.state.params.search;
    this.getFlightsResults(searched);
  }

  getFlightsResults = async (search) =>{
    console.log('Search',search)
    var api = "http://developer.goibibo.com/api/search/?app_id=2d9d7818&app_key=0aa65c300f6d5279dc14d52848517ad9&format=json";
    api = api + '&source='+search.source+'&destination='+search.destination+'&dateofdeparture='+search.departureDate+'&dateofarrival='+search.arrivalDate+'&seatingclass=E'+'&adults='+search.adults+'&children=0&infants=0&counter=100';
    console.log(api);
    await fetch(api)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.data.onwardflights);
      var flights = responseJson.data.onwardflights;
      this.passReturnedToModel(flights)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async passReturnedToModel(flightsRecieved){
    var novoArray = [];
    flightsRecieved.forEach((item)=>{
      var flight = new FullFlight();
      //going flight
      flight.goingFlight = new Flight();
      flight.goingFlight.source = item.origin;
      flight.goingFlight.destination = item.destination;

      var airline = item.airline;
      airline = airline.split(" ")[0];
      flight.goingFlight.airline = airline;

      flight.goingFlight.departureTime = item.deptime;
      flight.goingFlight.arrivalTime = item.arrtime;
      flight.goingFlight.duration = item.duration;
      flight.goingFlight.code = item.flightcode;
      flight.goingFlight.totalPrice = item.fare.totalfare;
      flight.goingFlight.date = item.depdate;

      var stops = item.stops;
      if(stops === "0"){
        flight.goingFlight.directState = "VOO DIRETO"
      }else{
        flight.goingFlight.directState = stops + " PARADA(S)"
      }

      //return flight
      flight.returnFlight = new Flight();
      flight.returnFlight.source = item.returnfl[0].origin;
      flight.returnFlight.destination = item.returnfl[0].destination;

      var airlineReturn = item.returnfl[0].airline;
      airlineReturn = airlineReturn.split(" ")[0];
      flight.returnFlight.airline = airlineReturn;

      flight.returnFlight.departureTime = item.returnfl[0].deptime;
      flight.returnFlight.arrivalTime = item.returnfl[0].arrtime;
      flight.returnFlight.duration = item.returnfl[0].duration;
      flight.returnFlight.code = item.returnfl[0].flightcode;
      flight.returnFlight.totalPrice = item.returnfl[0].fare.totalfare;
      flight.returnFlight.date = item.returnfl[0].depdate;

      var stops = item.returnfl[0].stops;
      if(stops === "0"){
        flight.returnFlight.directState = "VOO DIRETO"
      }else{
        flight.returnFlight.directState = stops + " PARADA(S)"
      }

      novoArray.push(flight);
    })
    console.log(novoArray)
    await this.setState({flights: novoArray, originalArray: novoArray})
    console.log(this.state.flights)
    this.setState({loading: false})
  }

  openAlertOrder(){
    Alert.alert(
      'Ordenar por:',
      'Escolha a ordenacao dos voos:',
      [
        {text: 'Menor Preco', onPress: () => this.filterForLessPrice()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )

  }

  openAlertFilter(){
    Alert.alert(
      'Filtrar por:',
      'Escolha sua companhia aerea',
      [
        {text: 'Azul', onPress: () => this.filterForCompany('Azul')},
        {text: 'Gol', onPress: () => this.filterForCompany('Gol')},
        {text: 'LATAM', onPress: () => this.filterForCompany('LATAM')},
        {text: 'Todas', onPress: () => this.filterForCompany('Todas')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )

  }

  filterForLessPrice(){
    var flights = this.state.flights;
    flights.sort(function(a,b){
      return a.goingFlight.totalPrice - b.goingFlight.totalPrice
    })
    this.setState({flights})
  }

  filterForCompany(company){
    var originalArray = this.state.originalArray;
    if(company === 'Todas'){
      this.setState({flights: originalArray })
    }else{
      const filtered = originalArray.filter((item)=> item.goingFlight.airline === company)
      console.log(filtered)
      this.setState({flights: filtered})
    }

  }


  render(){
    const {goBack} = this.props.navigation;
    if(this.state.loading){
      return(
        <Loading
          goBack = {goBack}
        />
      )
    }
    return(
      <Container>
        <Header style={{backgroundColor: '#1abc9c'}}>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name='arrow-back' style={{color: 'white'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white', fontWeight: 'bold'}}>PASSAGENS</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={styles.topView}>
            <Text style={{color: 'white'}}>Cia Aérea</Text>
            <Text style={{color: 'white'}}>Partida</Text>
            <Text style={{color: 'white'}}>Duração</Text>
            <Text style={{color: 'white'}}>Chegada</Text>
          </View>
          <FlightsList
            flights={this.state.flights}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={()=>this.openAlertFilter()}>
              <Icon name="ios-funnel-outline" style={{color: '#1abc9c'}} />
              <Text>FILTRAR</Text>
            </Button>
            <Button onPress={()=>this.openAlertOrder()}>
              <Icon name="md-funnel" style={{color: '#1abc9c'}} />
              <Text>ORDENAR</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  topView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#879395',
    height: 39,
    padding: 10
  }
});
