import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{

    constructor(){
        super();
        this.state = {
          hasCameraPermission:null,
          scanned:false,
          scannedData:'',
          buttonState:'normal',
        }
      }
      
      getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
        this.setState({
          hasCameraPermissions: status === 'granted',
          buttonState: 'clicked',
          scanned: false,
        });
      };


      handleBarCodeScanned = async({type, data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
      }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style={{alignSelf:'center'}}>

                <Image
                    source={{uri:
'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'}}
                    style={styles.image}
                />

        <Text style = {styles.text}>
        {hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permissions'}
        </Text>

    <TouchableOpacity
        onPress = {this.getCameraPermissions}
        style = {styles.button} 
        >
        <Text style = {styles.text}>SCAN QR CODE</Text>
    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
    backgroundColor: 'red',
      width: 150,
      padding:20,
      width:200,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'center',
      width:300,
    },
    image:{
        width: 300,
        height: 300,
        padding:40,
        margin:50,
        marginRight:100,
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
    }
});