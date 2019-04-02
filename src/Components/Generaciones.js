import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { Body, Card, CardItem, Button, Icon, Left } from 'native-base';

export default class Generaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
          generaciones: this.props.generaciones,
        };
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        let { generaciones } = this.state;
        return(
            <View>
                {generaciones.map(data => {
                    return(
                    <View key={data.name}>
                        <Generacion data={data} />
                    </View>
                    );
                })}
            </View>
        )
    }
}