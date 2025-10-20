import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../hooks/useNews';
import { NewsCard } from '../components/NewsCard';

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { favorites, removeFromFavorites } = useNews();

  const handleArticlePress = (article: any) => {
    navigation.navigate('NewsDetail', { article });
  };

  const handleRemove = (article: any) => {
    removeFromFavorites(article.url);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>Add articles from the news list</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <NewsCard article={item} onPress={handleArticlePress} />
            <TouchableOpacity 
              style={styles.remove}
              onPress={() => handleRemove(item)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    marginBottom: 10,
  },
  remove: {
    backgroundColor: '#ff3b30',
    padding: 10,
    alignItems: 'center',
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});