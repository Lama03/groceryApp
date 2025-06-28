// screens/FavoritesListScreen.tsx
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useFavorites } from '../context/FavoriteContext';
import { colors } from '../components/Color';

const FavoritesListScreen = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    const handleRemove = (id: string) => {
        Alert.alert(
            'Remove Favorite',
            'Are you sure you want to remove this item from favorites?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => removeFromFavorites(id),
                },
            ]
        );
    };

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorites yet.</Text>
            </View>
        );
    }

    return (

        <SafeAreaView>
            <View style={styles.labelcontainer}>
                <Text style={styles.label}>Favorites List</Text>

            </View>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
                            <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    price: {
        color: 'green',
        marginTop: 4,
    },
    removeButton: {
        backgroundColor: '#e53935',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    removeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    labelcontainer: {
        padding: 10,
        alignItems:'center',
        backgroundColor:colors.mainGreen
    },
    label: {
        fontFamily: 'Cairo-bold', fontSize: 22,
        color:'white'
    },
});

export default FavoritesListScreen;
