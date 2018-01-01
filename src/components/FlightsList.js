import React, { Component } from 'react';
import { View, FlatList,StyleSheet } from 'react-native'
import { Text, Button, Icon } from 'native-base'

export default class FlightsList extends Component {


  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => (
    <View style={styles.renderItem}>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.textBold}>IDA</Text>
          <Icon name='md-arrow-round-forward' style={{color: '#1abc9c', fontSize:18, paddingTop: 4}} />
          <Text style={styles.textNormal}>{item.goingFlight.date}</Text>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.goingFlight.airline}</Text>
            <Text style={styles.textNormal}>{item.goingFlight.code}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.goingFlight.departureTime}</Text>
            <Text style={styles.textNormal}>{item.goingFlight.source}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.goingFlight.duration}</Text>
            <Text style={styles.textNormal}>{item.goingFlight.directState}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.goingFlight.arrivalTime}</Text>
            <Text style={styles.textNormal}>{item.goingFlight.destination}</Text>
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.cardRow}>
          <Text style={styles.textBold}>VOLTA</Text>
          <Icon name='md-arrow-round-forward' style={{color: '#1abc9c', fontSize:18, paddingTop: 4}} />
          <Text style={styles.textNormal}>{item.returnFlight.date}</Text>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.returnFlight.airline}</Text>
            <Text style={styles.textNormal}>{item.returnFlight.code}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.returnFlight.departureTime}</Text>
            <Text style={styles.textNormal}>{item.returnFlight.source}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.returnFlight.duration}</Text>
            <Text style={styles.textNormal}>{item.returnFlight.directState}</Text>
          </View>
          <View style={styles.cardSubRow}>
            <Text style={styles.textBold}>{item.returnFlight.arrivalTime}</Text>
            <Text style={styles.textNormal}>{item.returnFlight.destination}</Text>
          </View>
        </View>


        <View style={{alignItems:'center', width: 319, marginTop: 12}}>
          <Button full style={{backgroundColor: '#1abc9c'}} onPress={() => this.props.navigation.navigate('Results')}>
            <Text style={{fontWeight: 'bold'}}>Comprar R${item.goingFlight.totalPrice}</Text>
          </Button>
        </View>
      </View>
    </View>

  );

  render(){
    const {flights} = this.props
    return(
      <FlatList
        keyExtractor={this._keyExtractor}
        data={flights}
        renderItem={this._renderItem}
      />
    )
  }
}
const styles = StyleSheet.create({
  renderItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20
  },
  card:{
    backgroundColor: 'white',
    width:337,
    padding: 10,
    borderRadius: 4
  },
  cardRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:319,
    height:44
  },
  cardSubRow:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  textBold:{
    fontWeight: 'bold',
    fontSize: 20 ,
    color:'#879395'
  },
  textNormal:{
    color:'#879395'
  },
  divider:{
    backgroundColor:'#879395',
    width: 317,
    height: 2,
    marginVertical: 12
  }
});
