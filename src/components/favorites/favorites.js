import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { styles, localStyles } from '../../../styles/styles';
import Word from '../word/word';

const Favorites = (props) => {
  if (props.userId === '' || props.userId === null) {
    return (
      <View style={styles.container}>
        <Text>To explore your favorite list, please register on the 'About' page. Unleash the full experience of browsing your favorites by completing the registration process.</Text>
      </View>
    );
  }

  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWord, setModalWord] = useState('');

  const showModal = (word) => {
    setModalVisible(true);
    setModalWord(word);
  }

  useEffect(() => {
    props.dataManager.listenForWords((words) => {
      setFavorites(words);
      console.log(words);
      console.log(favorites);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={localStyles.title}>My Favorites</Text>
      <ScrollView>
        {favorites.map((word, index) => (
          <Pressable key={index} onPress={() => {showModal(word.word)}}>
            <View key={index} style={localStyles.item}>
              { word.remembered ?
                <Text style={localStyles.wordGreen}>{word.word}</Text>
                : <Text style={localStyles.word}>{word.word}</Text>
              }
              <Text sytle={localStyles.phonetic}>{word.phonetic}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={localStyles.center}>
          <View style={localStyles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={localStyles.redText}>X Close</Text>
            </Pressable>
            <Word word={modalWord} dataManager={props.dataManager} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Favorites;

