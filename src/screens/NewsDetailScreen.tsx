import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNews } from '../hooks/useNews';

type Props = {
  route: RouteProp<{ params: { article: any } }, 'params'>;
};

export const NewsDetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;
  const { favorites, addToFavorites, removeFromFavorites } = useNews();
  const [showWebView, setShowWebView] = useState(false);

  const isFavorite = favorites.some(fav => fav.url === article.url);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(article.url);
    } else {
      addToFavorites(article);
    }
  };

  if (showWebView) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setShowWebView(false)}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <WebView source={{ uri: article.url }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.meta}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.description}>{article.description}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, isFavorite && styles.favorite]}
            onPress={handleFavorite}
          >
            <Text style={styles.buttonText}>
              {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.webButton]}
            onPress={() => setShowWebView(true)}
          >
            <Text style={styles.webButtonText}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  source: {
    color: '#007AFF',
    fontWeight: '600',
  },
  date: {
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  favorite: {
    backgroundColor: '#007AFF',
  },
  webButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  webButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  backText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});