import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../hooks/useNews';
import { NewsCard } from '../components/NewsCard';
import { NewsFilter } from '../components/NewsFilter';
import { Loading } from '../components/Loading';
import { ErrorAlert } from '../components/ErrorAlert';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    articles,
    loading,
    error,
    search,
    category,
    categories,
    loadNews,
    setSearchQuery,
    setCategoryFilter,
    refreshNews,
  } = useNews();

  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    loadNews();
  }, [category]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setSearchQuery(text);
    loadNews(1, text, category);
  };

  const handleArticlePress = (article: any) => {
    navigation.navigate('NewsDetail', { article });
  };

  const handleLoadMore = () => {
    if (!loading && articles.length > 0) {
      loadNews(2, search, category);
    }
  };

  const handleRefresh = () => {
    refreshNews();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.search}
          placeholder="Search news..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshText}>⟳</Text>
        </TouchableOpacity>
      </View>

      <NewsFilter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategoryFilter}
      />

      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => loadNews()} 
          showRetry={true}
        />
      )}

      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <NewsCard article={item} onPress={handleArticlePress} />
        )}
        keyExtractor={(item) => item.url}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Loading /> : null}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No articles found</Text>
              <Text style={styles.emptySubtext}>Try changing search or category</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});