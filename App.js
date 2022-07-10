/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';
import Day1 from './src/views/day1';
import Day2 from './src/views/day2';
import Day3 from './src/views/day3';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
// import { GestureHandlerRootView } from "react-native-gesture-handler"
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [days] = useState([
    {
      key: 0,
      title: 'A stopwatch',
      component: Day1,
      name: 'Day1',
      isFA: false,
      icon: 'ios-stopwatch',
      size: 48,
      color: '#ff856c',
      hideNav: false,
    },
    {
      key: 1,
      title: 'A weather app',
      component: Day2,
      name: 'Day2',
      isFA: false,
      icon: 'ios-partly-sunny',
      size: 60,
      color: '#90bdc1',
      hideNav: true,
    },
    {
      key: 2,
      title: 'twitter',
      component: Day3,
      name: 'Day3',
      isFA: false,
      icon: 'logo-twitter',
      size: 50,
      color: '#2aa2ef',
      hideNav: true,
    },
  ]);

  const boxs = days.map(function (elem, index) {
    return (
      <TouchableHighlight
        key={elem.key}
        style={[
          styles.touchBox,
          index % 3 === 0 && index > 0 ? styles.touchBox2 : styles.touchBox1,
        ]}
        underlayColor="#eee"
        onPress={() => _jumpToDay(elem)}>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Day{index + 1}</Text>
          <Icon
            size={elem.size}
            name={elem.icon}
            style={[styles.boxIcon, {color: elem.color}]}
          />
        </View>
      </TouchableHighlight>
    );
  });

  function _jumpToDay({name}) {
    navigation.push(name);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Swiper
          height={150}
          showsButtons={false}
          autoplay={true}
          activeDot={<View style={styles.swiperDot} />}
          style={styles.wrapper}>
          <View style={styles.slide}>
            <Image style={styles.image} source={{uri: 'day1'}} />
            <Text style={styles.slideText}>Day1: Timer</Text>
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={{uri: 'day2'}} />
            <Text style={styles.slideText}>Day2: Weather</Text>
          </View>
        </Swiper>
        <View style={styles.touchBoxContainer}>{boxs}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const App: () => Node = () => {
  const [days] = useState([
    {
      key: 0,
      title: 'A stopwatch',
      component: Day1,
      isFA: false,
      icon: 'ios-stopwatch',
      size: 48,
      name: 'Day1',
      color: '#ff856c',
      hideNav: false,
    },
    {
      key: 1,
      title: 'A weather app',
      component: Day2,
      isFA: false,
      icon: 'ios-partly-sunny',
      size: 60,
      color: '#90bdc1',
      name: 'Day2',
      hideNav: true,
    },
    {
      key: 2,
      title: 'twitter',
      component: Day3,
      name: 'Day3',
      isFA: false,
      icon: 'logo-twitter',
      size: 50,
      color: '#2aa2ef',
      hideNav: true,
    },
  ]);
  const dyaGrids = days.map(function (elem, index) {
    return (
      <Stack.Screen
        key={index}
        name={elem.name}
        component={gestureHandlerRootHOC(elem.component)}
        options={{headerShown: false}}
        headerTitleAlign="center"
      />
    );
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="30 Days of RN"
          component={HomeScreen}
          headerTitleAlign="center"
        />
        {/* <Stack.Screen name="Day1" component={Day1} headerTitleAlign="center" /> */}
        {dyaGrids}
      </Stack.Navigator>
    </NavigationContainer>
    // <GestureHandlerRootView>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  wrapper: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  swiperDot: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slide: {
    flexGrow: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    fontSize: 12,
    width: Dimensions.get('window').width,
  },
  image: {
    flexGrow: 1,
    alignSelf: 'stretch',
  },
  touchBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ccc',
    borderLeftWidth: 1 / PixelRatio.get(),
    borderLeftColor: '#ccc',
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: '#ccc',
  },
  boxContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxIcon: {
    position: 'relative',
    top: -10,
  },
  touchBox1: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc',
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: '#ccc',
  },
  touchBox2: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc',
  },
  touchBox: {
    width: (Dimensions.get('window').width - 4 / PixelRatio.get()) / 3,
    height: (Dimensions.get('window').width - 4 / PixelRatio.get()) / 3,
    backgroundColor: '#fff',
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
  },
});

export default App;
