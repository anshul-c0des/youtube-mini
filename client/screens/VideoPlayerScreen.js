import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialIcons } from '@expo/vector-icons';

export default function VideoPlayerScreen({ route }) {
  const { videoId } = route.params;

  const [isLandscape, setIsLandscape] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playing, setPlaying] = useState(true);

  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const playerRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  const portraitWidth = Dimensions.get('window').width;
  const portraitHeight = (portraitWidth * 9) / 16;
  const landscapeHeight = Dimensions.get('window').height;
  const landscapeWidth = (landscapeHeight * 16) / 9;

  const videoWidth = isLandscape ? landscapeWidth : portraitWidth;
  const videoHeight = isLandscape ? landscapeHeight : portraitHeight;

  const startHideControlsTimer = () => {
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    hideControlsTimeout.current = setTimeout(() => {
      fadeOutControls();
    }, 1000);
  };

  const fadeOutControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowControls(false);
    });
  };

  const fadeInControls = () => {
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    setShowControls(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      startHideControlsTimer();
    });
  };

  const onScreenTap = () => {
    if (showControls) {
      // Hide controls immediately on tap if shown
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
      fadeOutControls();
    } else {
      // Show controls on tap if hidden
      fadeInControls();
    }
  };

  const toggleOrientation = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setIsLandscape(false);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      setIsLandscape(true);
    }
  };

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    startHideControlsTimer();

    return () => {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  return (
  <View style={[styles.container]} pointerEvents="box-none">
    <View pointerEvents="box-none" style={{ width: videoWidth, height: videoHeight }}>
      <YoutubePlayer
        ref={playerRef}
        height={videoHeight}
        width={videoWidth}
        videoId={videoId}
        play={playing}
        onChangeState={onStateChange}
        webViewStyle={{ backgroundColor: '#000' }}
        playerParams={{
          controls: 0,
          modestbranding: true,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          fs: 0,
        }}
      />

      <Animated.View
        style={[
          styles.controlsContainer,
          { opacity: controlsOpacity, width: videoWidth, height: videoHeight },
        ]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <View style={styles.orientationToggle}>
          <TouchableOpacity onPress={toggleOrientation} style={styles.toggleButton}>
            <MaterialIcons
              name={isLandscape ? 'screen-rotation' : 'screen-lock-portrait'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>

    <TouchableOpacity
      activeOpacity={1}
      onPress={onScreenTap}
      style={{
        width: videoWidth,
        height: videoHeight,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
  },
  orientationToggle: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  toggleButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 25,
  },
});
