import React from 'react';
import { StackNavigator } from 'react-navigation';

//screens
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'

const RootNavigator = StackNavigator({
  Search: {
    screen: SearchScreen,
  },
  Results:{
    screen: ResultsScreen,
  }

},
{
  headerMode:'none'
}

);

export default RootNavigator;
