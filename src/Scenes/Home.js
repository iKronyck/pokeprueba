import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Container, Content, Button, Icon, Body, Header, Left, Title, Right } from 'native-base';
import Generacion from '../Components/Generacion';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: this.props.userInfo || '',
          generacionesPokemon: [],
        };
    }

    componentDidMount() {
      this.buscarGeneraciones();
    }

    buscarGeneraciones = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/generation/");
      const json = await response.json();
      if (json) {
        let generaciones = json.results;
        let generacionesPokemon = [];
        for (let i = 0; i < generaciones.length; i++) {
          await fetch(generaciones[i].url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject(response.status);
            }
          })
          .then(datos => {
            generacionesPokemon.push(datos)
          })
          .catch(error => {
              console.log(error)
          });
        }
        this.setState({ generacionesPokemon })
      } 
    }

    render() {
        let { generacionesPokemon } = this.state;
        console.log(generacionesPokemon)
        return(
            <Container>
                <Header style={{backgroundColor: "#24ace4"}} androidStatusBarColor="#2a85af">
                  <Left>
                    <Button transparent>
                      <Icon name="menu" />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Regiones</Title>
                  </Body>
                </Header>
                {/* <Text>Bienvenido {this.props.userInfo.user.name}</Text> */}
                <Content style={{width: '100%'}}>
                  <View style={{flex: 1, padding:5}}>
                    {generacionesPokemon.map(data => {
                      return(
                        <View key={data.name}>
                          <Generacion data={data} />
                        </View>
                      );
                    })}
                  </View>
                </Content>
            </Container>
        )
    }
}