import React from 'react'
import { StatusBar } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Initial from './Scenes/Initial';
import Home from './Scenes/Home';
import ListadoPokemon from './Scenes/ListadoPokemon';
import Equipos from './Scenes/Equipos';

const Routes = () => (
    <Router>
        <Scene key="root" headerTintColor="#000">
            <Scene key="initial" hideNavBar component={Initial} title="Inicial" initial />
            <Scene key="home" hideNavBar component={Home} title="Home" />
            <Scene titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor: '#24ace4'}} key="listadoPokemon" head component={ListadoPokemon} title="Listado de Pokemon" />
            <Scene titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor: '#24ace4'}} key="equipos" head component={Equipos} title="Listado de Equipos" />
        </Scene>
    </Router>
);

export default Routes;