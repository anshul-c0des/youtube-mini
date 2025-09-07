import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VideoListScreen from './screens/VideoListScreen.js';
import VideoPlayerScreen from './screens/VideoPlayerScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoList">
        <Stack.Screen name="VideoList" component={VideoListScreen} options={{ title: 'Videos' }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ title: 'Play Video' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
