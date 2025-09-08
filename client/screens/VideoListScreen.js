import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function VideoListScreen({ navigation }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchVideos = async () => {
        try {
        const res = await axios.get('http://192.168.1.13:5000/videos');
        setVideos(res.data);
        } catch (err) {
        console.error('Failed to fetch videos:', err.message);
        } finally {
        setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
        await fetchVideos();
        } catch (err) {
        console.error('Failed to refresh videos:', err.message);
        } finally {
        setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('VideoPlayer', { videoId: item.videoId })}
        activeOpacity={0.8}
        >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.channel}>{item.channelTitle}</Text>
        </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#333" />
        </View>
        );
    }

    return (
        <FlatList
        data={videos}
        keyExtractor={item => item.videoId}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
    );
}
  

const styles = StyleSheet.create({
    list: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      backgroundColor: '#f8f9fa'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 6,
    },
    thumbnail: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      backgroundColor: '#ddd'
    },
    textContainer: {
      padding: 12,
    },
    title: {
      fontSize: 16,
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
    }
});
  