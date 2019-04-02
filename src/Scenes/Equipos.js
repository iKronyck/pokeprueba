import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { Body, Card, CardItem, Button, Icon, Left } from 'native-base';
import firebase from 'react-native-firebase';

export default class Equipos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pokemons: this.props.pokemons || [],
          equipos: []
        };
    }

    componentDidMount() {
        this.obtenerEquipos();
        // let uid = firebase.auth().currentUser._user.uid;
        // let { pokemons } = this.state;
        // let equipos = [];
        // for (let i = 0; i < 6; i++) {
        //     let obj = {
        //         id: pokemons[i].id,
        //         name: pokemons[i].name,
        //         sprites: pokemons[i].sprites,
        //         types: pokemons[i].types
        //     };
        //     equipos.push(obj);
        // }
        // // // firebase.database().ref('Usuarios/'+uid).update({user: uid});
        // firebase.database().ref('Equipos/'+uid).push(equipos);
    }

    obtenerEquipos = async () => {
        let uid = firebase.auth().currentUser._user.uid;
        let equipos = [];
        await firebase.database().ref("Equipos/"+uid).once("value", snap => {
            let datos = snap.val();
            equipos = [...equipos, datos];
        });
        this.setState({ equipos })
    }

    render() {
        console.log(this.state.equipos);
        return(
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {this.state.equipos.map(data => {
                        <Text>Pokemon</Text>
                    })}
                </View>
            </View>
        )
    }
}