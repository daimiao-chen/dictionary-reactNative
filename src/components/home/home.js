import React, { useState } from 'react';
import { TextInput, Button, Text, View, SafeAreaView } from 'react-native';
import { styles } from '../../../styles/styles'; 
import Word from '../word/word';

const HomeScreen = (props) => {
  const [inputText, setInputText] = useState('');
  const [word, setWords] = useState('');

  const clickSearch = () => {
    console.log("Search:" + inputText);
    setWords(inputText);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Enter a word" onChangeText={setInputText} value={inputText} />
        <Button title="Search" onPress={clickSearch} />
      </View>
      {word ? <Word word={word} dataManager={props.dataManager}/> : null}
    </View>
  );
}

export default HomeScreen;
