import React from 'react'
import { View } from 'react-native'
import { Container, Header, Content, Text, Left, Body, Spinner, Right, Icon, Title, Button} from 'native-base'

const Loading = function(props){ //loading screen
  return(
    <Container>
      <Header style={{backgroundColor: '#1abc9c'}}>
        <Left>
          <Button transparent onPress={() => props.goBack()}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'white', fontWeight: 'bold'}}>PASSAGENS</Title>
        </Body>
        <Right/>
      </Header>
      <Content>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color={'#1abc9c'}/>
          <Text style={{fontWeight: 'bold'}}>Procurando voos ...</Text>
        </View>
      </Content>
    </Container>
  )
}
export default Loading;
