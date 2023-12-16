//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, Pressable, Alert, } from 'react-native';
import { moderateScale, verticalScale } from '../Components/PixalRatio/index';
import { COLORS } from '../Constants/Color';
import { Font } from '../Constants/FontFamily';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, Icon } from 'react-native-basic-elements';
import { Global_Style } from '../Constants/GlobalStyle';
import Toast from 'react-native-simple-toast';
import AuthService from '../Service/AuthService';
import { useDispatch } from 'react-redux';
import { setuser } from '../Redux/reducer/User';

const { height, width } = Dimensions.get('window');

// create a component
const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [hidePass, sethidePass] = useState(true)
    const [loader, setLoader] = useState(false)
    const [PasswordFocus, setPasswordFocus] = useState(false);
    const dispatch = useDispatch();
    const cheakPassword = isPasswordValid(pass).every(
        item => item.isValid == true,
    );

    function isPasswordValid(password) {
        const validationPoints = [];
        const lowercaseMatches = password.match(/[a-z]/g);
        if (!lowercaseMatches || lowercaseMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two lowercase letters',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two lowercase letters',
            });
        }
        const uppercaseMatches = password.match(/[A-Z]/g);
        if (!uppercaseMatches || uppercaseMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two uppercase letters',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two uppercase letters',
            });
        }
        const numberMatches = password.match(/[0-9]/g);
        if (!numberMatches || numberMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two numbers',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two numbers',
            });
        }
        const specialCharMatches = password.match(/[!@#$%^&*]/g);
        if (!specialCharMatches || specialCharMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two special characters (!@#$%^&*)',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two special characters (!@#$%^&*)',
            });
        }
        if (password.length < 8) {
            validationPoints.push({
                isValid: false,
                error: 'Password must be at least 8 characters long',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must be at least 8 characters long',
            });
        }

        return validationPoints;
    }

    const userLogin = () => {
        let pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);
        if (!emailresult) {
            return Toast.show('Please Enter Valid Email')
        }
        if (pass == "") {
            return Toast.show('Please Enter Password')
        }
        let data = {
            email:email,
            password:pass
        }
        AuthService.setAccount(data);
        dispatch(setuser(data));
        Toast.show('Login Successfull');
    }
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                translucent={false}
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.logoImgView}>
                    <Image
                        source={{ uri: 'https://www.carlogos.org/logo/Volkswagen-emblem-2014-1920x1080.png' }}
                        style={styles.logoImg}
                    />
                </View>
                <Text
                    style={{
                        ...styles.boldtext,
                        marginTop: moderateScale(10),
                        color: COLORS.deepDark,
                    }}>
                    Welcome, {'\n'}
                    Please Sign in.
                </Text>

                <Text
                    style={{
                        ...styles.text,
                        marginTop: moderateScale(20),
                        marginHorizontal: moderateScale(15),
                    }}>
                    Sign in to your account
                </Text>

                <Card style={styles.cardview}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Email"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => setEmail(value)}
                        value={email}
                    />
                    <View style={styles.border} />
                    <View
                        style={{
                            ...styles.input,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <TextInput
                            style={{ color: COLORS.black }}
                            placeholderTextColor={COLORS.gray33}
                            onChangeText={value => setPass(value)}
                            value={pass}
                            secureTextEntry={hidePass}
                            placeholder="Enter Your Password"
                            onFocus={() => setPasswordFocus(true)}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Pressable onPress={() => sethidePass(!hidePass)}>
                                <Icon
                                    name={hidePass ? 'eye-with-line' : 'eye'}
                                    type="Entypo"
                                    style={styles.iconStyle}
                                />
                            </Pressable>
                            <Text
                                style={{
                                    fontSize: moderateScale(12),
                                    color: COLORS.PrimaryOrange,
                                    fontFamily: Font.Bold,
                                }}>
                                {/* Forgot? */}
                            </Text>
                        </View>
                    </View>
                </Card>
                {!cheakPassword && PasswordFocus ? (
                    <View style={{ marginHorizontal: 15 }}>
                        {isPasswordValid(pass).map(item => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                {item.isValid ? (
                                    <Icon
                                        name="check"
                                        type="AntDesign"
                                        color={'green'}
                                        size={17}
                                    />
                                ) : (
                                    <Icon name="cross" type="Entypo" color={'red'} size={19} />
                                )}
                                <Text
                                    style={{
                                        color: item.isValid ? 'green' : 'red',
                                        marginLeft: 10,
                                    }}>
                                    {item.error}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : null}
                <Pressable
                    onPress={userLogin}
                    style={{
                        ...Global_Style.button,
                        backgroundColor: COLORS.primaryYellow,
                        height: verticalScale(42),
                        width: '90%',
                        marginTop: moderateScale(20),
                        borderRadius: 30,
                    }}>
                    {loader ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.signText}>SIGN IN</Text>
                    )}
                </Pressable>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.text}>Don’t have an account?</Text>
                    <Pressable >
                        <Text
                            style={{
                                ...styles.text,
                                color: COLORS.primaryYellow,
                                fontFamily: Font.Bold,
                            }}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.smallline} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    boldtext: {
        fontSize: moderateScale(18),
        color: COLORS.dark11,
        fontFamily: Font.Bold,
        marginHorizontal: moderateScale(15),
    },
    iconStyle: {
        fontSize: moderateScale(18),
        alignSelf: 'center',
        color: COLORS.primaryYellow,
        paddingRight: moderateScale(10)
    },
    text: {
        color: COLORS.gray2,
        fontFamily: Font.Regular,
        fontSize: moderateScale(12),
    },
    input: {
        height: 60,
        marginHorizontal: moderateScale(10),
        color: COLORS.black
    },
    cardview: {
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(25),
        borderRadius: moderateScale(8),

    },
    border: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.gray33,
        opacity: 0.6,
    },
    bottom: {
        width: '100%',
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(15),
        borderTopWidth: 0.6,
        borderTopColor: COLORS.border,
    },
    smallline: {
        borderWidth: 2,
        borderRadius: moderateScale(10),
        width: '30%',
        alignSelf: 'center',
        marginTop: moderateScale(25),
        borderColor: COLORS.gray1,
        opacity: 0.6,
    },
    twobtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '78%',
        alignSelf: 'center',
        marginTop: moderateScale(25),
        marginBottom: moderateScale(40),
    },
    img: {
        resizeMode: 'center',
    },

    signText: {
        fontSize: moderateScale(12),
        fontFamily: Font.Bold,
        color: COLORS.white,
    },

    logoImgView: {
        paddingHorizontal: moderateScale(16),
        alignSelf: 'center',
        resizeMode: 'contain'

    },

    logoImg: {
        height: verticalScale(200),
        width: width,
        resizeMode: 'cover',
        marginBottom: moderateScale(20),
    },

    socialView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: moderateScale(66),
        justifyContent: 'center',
        paddingVertical: moderateScale(8),
        borderRadius: 30,
        backgroundColor: '#F8F8F8',
    },

    policyView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        marginBottom: moderateScale(20),
    },

    lightText: {
        fontSize: moderateScale(12),
        fontFamily: Font.Medium,
        color: COLORS.dark11,
    },
});

//make this component available to the app
export default Login;
