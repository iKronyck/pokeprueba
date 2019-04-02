import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { Body, Card, CardItem, Button, Icon, Left, Container, Content, Badge } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

export default class ListadoPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: this.props.pokemons || [],
            listadoPokemon: [], cargando: true,
        };
    }

    componentDidMount() {
        this.call();
    }

    componentWillUnmount() {
        this.setState({ listadoPokemon: [] })
    }

    call = async() => {
        console.log('paso1')
        let listadoPokemon = [];
        let { pokemons } = this.state;
        for (let i = 0; i < pokemons.length; i++) {
            await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemons[i].name +'/')
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return Promise.reject(response.status);
              }
            })
            .then(datos => {
              listadoPokemon.push(datos)
            })
            .catch(error => {
                console.log(error)
            });
        }
        listadoPokemon = listadoPokemon.sort((a, b) => b.id - a.id);
        this.setState({ listadoPokemon, cargando: false });
    }

    primerLetraMayuscula = (texto) => {
        let mayuscula = texto.replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, l => l.toUpperCase());
        return mayuscula;
    }

    colorTipo = (tipo) => {
        if (tipo === 'bug') {
            return '#B7FF04';
        } else if (tipo === 'dark') {
            return '#261104';
        } else if (tipo === 'dragon') {
            return '#8272FF';
        } else if (tipo === 'electric') {
            return '#FFBE0A';
        } else if (tipo === 'fairy') {
            return '#E86ED5';
        } else if (tipo === 'fighting') {
            return '#732E09';
        } else if (tipo === 'fire') {
            return '#E83204';
        } else if (tipo === 'flying') {
            return '#667CE8';
        } else if (tipo === 'ghost') {
            return '#2C007A';
        } else if (tipo === 'grass') {
            return '#16C005';
        } else if (tipo === 'ground') {
            return '#E8CB7F';
        } else if (tipo === 'ice') {
            return '#5BCEE2';
        } else if (tipo === 'normal') {
            return '#AFB2BA';
        } else if (tipo === 'poison') {
            return '#A20D98';
        } else if (tipo === 'psychic') {
            return '#C500D1';
        } else if (tipo === 'rock') {
            return '#AF8A45';
        } else if (tipo === 'steel') {
            return 'silver';
        } else if (tipo === 'water') {
            return '#438DF4';
        }
    }

    render() {
        if (this.state.cargando) {
            return (
                <View style={styles.contenedorCargando}>
                    <Image resizeMode='contain' style={{width: 140, height: 140, resizeMode:'contain'}} source={require('../img/poke2.gif')} />
                    <View style={{width:'100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'yellow',textShadowColor:'black', textShadowRadius: 15, fontSize: 30}}>Cargando Datos...</Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <Container>
                    <Button onPress={() => Actions.equipos({pokemons: this.state.listadoPokemon})} iconLeft style={{width:'100%', justifyContent: 'center', alignItems:'center', height: 60, padding: 5, borderRadius: 0}}>
                        <Image style={{height: '100%', width: 125}} resizeMode="stretch" source={require('../img/team.png')} />
                        <Text style={{color:'white', fontFamily: 'Pokemon', fontSize: 20}}> Ver Equipos </Text>
                    </Button>
                    <Content>
                        {this.state.listadoPokemon.map(data => {
                            return(
                                <View style={styles.contenedorPadre} key={data.id}>
                                    <View style={styles.contenedor}>
                                        <View style={{flex: 4}}>
                                            <Text style={styles.encabezadoPokemon}>#{data.id}  {this.primerLetraMayuscula(data.name)}</Text>
                                            <View style={styles.contenedorTexto}>
                                                {data.types.map(tipos => {
                                                    return (
                                                        <View style={{padding: 3, width: data.types.length > 1 ? '40%' : '80%'}}>
                                                            <Text style={[styles.tipoPokemon, {backgroundColor: this.colorTipo(tipos.type.name)}]}>
                                                            {this.primerLetraMayuscula(tipos.type.name)}
                                                        </Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                        <View style={{flex: 1}}>
                                        {data.sprites['front_default'] && (
                                            <Image style={{width:'100%', height: '100%'}} resizeMode="stretch"  source={{uri: data.sprites.front_default}} />
                                        )}
                                        {!data.sprites['front_default'] && (
                                            <Image style={{width:'100%', height: '100%'}} resizeMode="stretch"  source={require('../img/not_found.png')} />
                                        )}   
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </Content>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    contenedorPadre: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    contenedor: {
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        padding: 3
    },
    encabezadoPokemon: {
        fontSize: 20,
        color: 'white'
    },
    contenedorTexto: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent:'center'
    },
    tipoPokemon: {
        shadowOffset:{  width: 10,  height: 10,  },
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        textAlign: 'center',
        borderRadius: 8,
        fontSize: 20,
        color: 'white',
        textShadowColor:'black',
        textShadowRadius: 30,
        flex: 1
    },
    contenedorCargando: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})