import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, ImageBackground, Image, StatusBar} from 'react-native';
import { Button, Spinner, Content } from 'native-base';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class Initial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infoUsuario: null,
      cargando: true
    };
  }

  async componentDidMount() {
    this.verificarLogueoGoogle();
  }

  verificarLogueoGoogle = async () => {
    try {
      await GoogleSignin.configure();
      const data = await GoogleSignin.signInSilently();
      if (data) {
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        const currentUser = await firebase.auth().signInWithCredential(credential);
        Actions.home();
      } else {
        this.setState({ cargando: false });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        this.verificarLogueoFacebook();
      } else {
        console.error(e);
      }
    }
  }

  verificarLogueoFacebook = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      const currentUser = await firebase.auth().signInWithCredential(credential);
      // Actions.home();
      this.setState({ cargando: false});
    } catch (e) {
      console.error(e);
    }
  }

  verificarUsuarioActual = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
      Actions.home({userInfo, methodLog: 'G'});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        this.setState({ cargando: false})
      } else {
        console.error(error);
      }
    }
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo });
      Actions.home({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null });
    } catch (error) {
      console.error(error);
    }
  };

  onLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(error)
      });
  }

  render() {
    let { userInfo, cargando } = this.state;
    console.log(userInfo)
    return (
      <ImageBackground style={{width:'100%', height: '100%', flex: 1}} source={require('../img/back.png')}>
        <View style={{flex: 2, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{textShadowColor:'blue', textShadowRadius: 200,fontFamily: "Pokemon", fontSize: 70, textAlign: 'center', color:'yellow'}}>PokePrueba</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {!userInfo && !cargando && (
            <View style={{marginBottom: 20}}>

              <View>
                <GoogleSigninButton
                  style={{ width: 312, height: 60}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={this._signIn}
                />
              </View>
              <View>
                <Button style={{marginLeft: 4, backgroundColor: '#4267B2', width: 305, height: 55, justifyContent:'center'}} onPress={this.onLoginFacebook}>
                  <Text style={{color: 'white', padding: 5, textAlign: 'center', fontSize: 17}}>Acceder con facebook</Text>
                </Button>
              </View>
              {/* <View style={{flex: 1, width: '100%',height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Image resizeMode='contain' style={{width: 140, height: 140, resizeMode:'contain'}} source={require('../img/poke2.gif')} />
                  <View style={{width:'100%', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: 'white',textShadowColor:'black', textShadowRadius: 15, fontSize: 30, fontFamily: 'Pokemon'}}>Verificando sesion..</Text>
                  </View>
                </View> */}
            </View>
          )}
          {cargando && (
            <Content>
              <Spinner style={{width: 100, height: 100}} color="red" />
            </Content>
          )}
        </View>
      </ImageBackground>
    );
  }
}
