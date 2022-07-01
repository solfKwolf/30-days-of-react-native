import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  FlatList,
  PixelRatio,
} from 'react-native';

function WatchFace({totalTime, sectionTime}) {
  return (
    <View style={styles.watchFaceContainer}>
      <View style={styles.watchFaceInnerContainer}>
        <Text style={styles.sectionTime}>{sectionTime}</Text>
        <Text style={styles.totalTime}>{totalTime}</Text>
      </View>
    </View>
  );
}
WatchFace.propTypes = {
  sectionTime: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired,
};

function WatchControl({startWatch, stopWatch, addRecord, clearRecord}) {
  const [watchOn, setWatchOn] = useState(false);
  const [stopBtnText, setStopBtnText] = useState('计次');
  const [startBtnText, setStartBtnText] = useState('启动');
  const [startBtnColor, setStartBtnColor] = useState('#60B644');
  const [underlayColor, setUnderlayColor] = useState('#eee');

  function _addRecord() {
    if (watchOn) {
      addRecord();
    } else {
      clearRecord();
      setStopBtnText('计次');
    }
  }

  function _startWatch() {
    if (!watchOn) {
      startWatch();
      setStartBtnText('停止');
      setStartBtnColor('#ff0044');
      setStopBtnText('计次');
      setUnderlayColor('#eee');
      setWatchOn(true);
    } else {
      stopWatch();
      setStartBtnText('启动');
      setStartBtnColor('#60B644');
      setStopBtnText('复位');
      setUnderlayColor('#eee');
      setWatchOn(false);
    }
  }

  return (
    <View style={styles.watchControlContainer}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.btnStop}
        onPress={() => _addRecord()}>
        <Text style={styles.btnStopText}>{stopBtnText}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.btnStop}
        underlayColor={underlayColor}
        onPress={() => _startWatch()}>
        <Text style={[styles.btnStartText, {color: startBtnColor}]}>
          {startBtnText}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

WatchControl.propTypes = {
  stopWatch: PropTypes.func.isRequired,
  clearRecord: PropTypes.func.isRequired,
  startWatch: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired,
};

const Item = ({title, time}) => {
  return (
    <View style={styles.recordItem}>
      <Text>{title}</Text>
      <Text>{time}</Text>
    </View>
  );
};

function WatchRecord({record}) {
  return (
    <FlatList
      data={record}
      renderItem={({item}) => <Item title={item.title} time={item.time} />}
    />
  );
}

function Day1() {
  const [resetWatch, setResetWatch] = useState(true);
  const [totalTime, setTotalTime] = useState('00:00:00');
  const [sectionTime, setSectionTime] = useState('00:00:00');
  const currentTime = useRef(0);
  const initialTime = useRef(0);
  const timeAccumulation = useRef(0);
  const stopWatch = useRef(false);
  const recordTime = useRef(0);
  const [recordCounter, setRecordCounter] = useState(0);
  const [record, setRecord] = useState([
    {title: '', time: ''},
    {title: '', time: ''},
    {title: '', time: ''},
    {title: '', time: ''},
    {title: '', time: ''},
    {title: '', time: ''},
    {title: '', time: ''},
  ]);

  useEffect(() => {
    return () => {
      _stopWatch();
      _clearRecord();
    };
  }, []);

  function _startWatch() {
    stopWatch.current = false;
    initialTime.current = new Date().getTime();
    if (resetWatch) {
      setResetWatch(false);
      timeAccumulation.current = 0;
    }
    let countingTime,
      milSecond,
      second,
      minute,
      secmilSecond,
      secsecond,
      secminute,
      seccountingTime;

    const interval = setInterval(() => {
      currentTime.current = new Date().getTime();
      countingTime =
        timeAccumulation.current + currentTime.current - initialTime.current;
      minute = Math.floor(countingTime / (60 * 1000));
      second = Math.floor((countingTime - 6000 * minute) / 1000);
      milSecond = Math.floor((countingTime % 1000) / 10);
      seccountingTime = countingTime - recordTime.current;
      secminute = Math.floor(seccountingTime / (60 * 1000));
      secsecond = Math.floor((seccountingTime - 6000 * secminute) / 1000);
      secmilSecond = Math.floor((seccountingTime % 1000) / 10);
      setTotalTime(
        (minute < 10 ? '0' + minute : minute) +
          ':' +
          (second < 10 ? '0' + second : second) +
          '.' +
          (milSecond < 10 ? '0' + milSecond : milSecond),
      );
      setSectionTime(
        (secminute < 10 ? '0' + secminute : secminute) +
          ':' +
          (secsecond < 10 ? '0' + secsecond : secsecond) +
          '.' +
          (secmilSecond < 10 ? '0' + secmilSecond : secmilSecond),
      );

      if (stopWatch.current) {
        timeAccumulation.current = countingTime;
        console.log('停止', interval);
        clearInterval(interval);
      }
    }, 10);
  }

  function _stopWatch() {
    stopWatch.current = true;
  }

  function _addRecord() {
    setRecordCounter(recordCounter + 1);
    if (recordCounter < 8) {
      setRecord(prev => prev.slice(0, prev.length - 1)); // pop
    }
    setRecord(prev => [
      {title: '计次' + (recordCounter + 1), time: sectionTime},
      ...prev,
    ]);
    recordTime.current =
      timeAccumulation.current + currentTime.current - initialTime.current;
  }

  function _clearRecord() {
    stopWatch.current = false;
    setResetWatch(true);
    initialTime.current = 0;
    currentTime.current = 0;
    recordTime.current = 0;
    timeAccumulation.current = 0;
    setTotalTime('00:00:00');
    setSectionTime('00:00:00');
    setRecordCounter(0);
    setRecord([
      {title: '', time: ''},
      {title: '', time: ''},
      {title: '', time: ''},
      {title: '', time: ''},
      {title: '', time: ''},
      {title: '', time: ''},
      {title: '', time: ''},
    ]);
  }

  return (
    <View style={styles.watchContainer}>
      <WatchFace totalTime={totalTime} sectionTime={sectionTime} />
      <WatchControl
        addRecord={() => _addRecord()}
        clearRecord={() => _clearRecord()}
        startWatch={() => _startWatch()}
        stopWatch={() => _stopWatch()}
      />
      <WatchRecord record={record} />
    </View>
  );
}

const styles = StyleSheet.create({
  watchContainer: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  watchFaceContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchFaceInnerContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  sectionTime: {
    fontSize: 20,
    fontWeight: '100',
    color: '#555',
    textAlign: 'right',
  },
  totalTime: {
    fontSize: 70,
    fontWeight: '100',
    color: '#222',
    textAlign: 'center',
  },
  watchControlContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 0,
  },
  btnStop: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStart: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStopText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#555',
  },
  btnStartText: {
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  recordItem: {
    width: Dimensions.get('window').width,
    height: 40,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#bbb',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Day1;
