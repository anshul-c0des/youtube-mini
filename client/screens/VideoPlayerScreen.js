import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoPlayerScreen({ route }) {
  const { videoId } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth * 9) / 16; // 16:9 aspect ratio

  return (
    <View style={styles.container}>
      <WebView
        style={{ width: screenWidth, height: videoHeight }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        source={{ uri: `https://www.youtube.com/embed/${videoId}?controls=1&autoplay=1&modestbranding=1` }}
        startInLoadingState={true}
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
});
