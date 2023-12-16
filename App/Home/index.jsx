//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { Card } from 'react-native-basic-elements';
import { moderateScale } from '../Components/PixalRatio/index';
import { setuser } from './App/Redux/reducer/User';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/reducer/User';
import AuthService from '../Service/AuthService';
import Storage from '../Utils/Storage';

// create a component
const HomeScreen = () => {
    const dispatch = useDispatch();
    const [productdata, setProduct] = useState([])

    useEffect(() => {
        getProduct()
    }, [])
    const getProduct = () => {
        fetch('https://fakestoreapi.com/products', {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            setProduct(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const signOut = () =>{
        dispatch(logout())
        Storage.clear()
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={productdata}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <Card style={styles.cardStyle}>

                            <Image
                                source={{ uri: item?.image }}
                                style={{ height: '100%', width: moderateScale(100) }}
                            />
                            <View style={{ paddingHorizontal: moderateScale(8), width: '70%' }}>
                                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: moderateScale(16) }}
                                    numberOfLines={1}
                                >{item?.title}</Text>
                                <Text style={{ color: '#000', marginTop: moderateScale(10) }}
                                    numberOfLines={3}
                                >{item?.description}</Text>
                                <Text style={{ color: '#000', marginTop: moderateScale(10) }}>Price: ${item?.price}</Text>

                            </View>
                        </Card>
                    )
                }}
            />
            <Button
            title='Logout'
            onPress={signOut}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    cardStyle: {
        height: moderateScale(150),
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(10),
        flexDirection: 'row'
    }
});

//make this component available to the app
export default HomeScreen;
