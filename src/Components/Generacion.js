import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { Body, Card, CardItem, Button, Icon, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Generacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          infoGeneracion: this.props.data || [],
        };
    }

    verListadoPokemon = (infoGeneracion) => {
        // console.log(infoGeneracion.pokemon_species)
        Actions.listadoPokemon({pokemons : infoGeneracion.pokemon_species})
    }

    render() {
        let { infoGeneracion } = this.state;
        return(
            <View>
                {typeof infoGeneracion['main_region'] !== 'undefined' && (
                    <View >
                        <Card key={infoGeneracion.name} onPress>
                            <CardItem >
                                <Image resizeMode="stretch" style={{width:'100%', height: 100}} source={require('../img/pokeball2.png')} />
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Body style={{justifyContent:'center', alignContent: 'center', textAlign: 'center'}}>
                                        <Text style={{color:'yellow', textShadowColor:'blue', textShadowRadius: 60, textAlign: 'center', fontSize: 50, fontFamily:'Pokemon'}}>
                                            Region {infoGeneracion.main_region.name}
                                        </Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem footer style={{alignContent: 'center', justifyContent:'center'}}>
                                <Button danger onPress={() => this.verListadoPokemon(infoGeneracion)}>
                                    <Icon name="eye" />
                                    <Text style={{color: 'white', paddingRight: 10}}>Ver Pokemons</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </View>
                )}
            </View>
        )
    }
}