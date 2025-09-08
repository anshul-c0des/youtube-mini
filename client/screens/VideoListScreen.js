import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';

export default function VideoListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);   // stores the fetched array of videos
  const [loading, setLoading] = useState(true);   // loading state
  const [refreshing, setRefreshing] = useState(false);   // pull to refresh

  const fetchVideos = async () => {   // fetches the videos from backend
    try {
      const res = await axios.get(`${API_BASE_URL}/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error('Failed to fetch videos:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {   // handles pull to refresh gesture
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  useEffect(() => {   // load the videos on initial load
    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (   // renders a single video inside list
    <Pressable
      onPress={() => navigation.navigate('VideoPlayer', { videoId: item.videoId })}  // navigate to VideoPlayer screen
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.9 : 1 },
      ]}
      android_ripple={{ color: '#e0e0e0' }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.channel}>{item.channelTitle}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <FlatList   // renders list of videos
      data={videos}
      keyExtractor={item => item.videoId}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#ccc',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  channel: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
