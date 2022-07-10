import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  //   ScrollView,
  TouchableHighlight,
  Image,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {ScrollView} from 'react-native-gesture-handler';

function Day3() {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} nestedScrollEnabled>
      <View style={styles.slide1}>
        <View style={styles.boxWrap}>
          <ScrollView
            styles={styles.boxRow}
            horizontal
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            directionalLockEnabled={false}
            disableScrollViewPanResponder
            removeClippedSubviews={false}>
            <View style={styles.box}></View>

            <View style={styles.box}></View>

            <View style={styles.box}></View>
          </ScrollView>
        </View>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  boxWrap: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
  },
  boxRow: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'red',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: 'skyblue',
    marginRight: 10,
  },
});

export default Day3;
