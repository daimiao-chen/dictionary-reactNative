import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Button, Switch, Alert, ActivityIndicator } from 'react-native';
import styles from '../../../styles/styles';

const BasicUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const Word = (props) => {
  /* Three states: Loading, Loaded, Error */
  const [state, setState] = useState("Loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [phonetic, setPhonetic] = useState('');
  const [mark, setMark] = useState(false);

  const getWord = async () => {
    try {
      setState("Loading");
      let response = await fetch(BasicUrl + props.word);
      let json = await response.json();

      if (json.title === "No Definitions Found") {
        setState("Error");
        setErrorMsg("No Definitions Found");
        return;
      }

      console.log(json);
      setState("Loaded");
      let definitions = []

      json[0].meanings.forEach((meaningItem) => {
        tempDefinition = meaningItem.definitions.map((definitionItem) => {
          return {
            part: meaningItem.partOfSpeech,
            definition: definitionItem.definition,
            example: definitionItem.example,
          };
        });
        definitions = definitions.concat(tempDefinition);

      });
      console.log(definitions);
      setDefinitions(definitions);
      setPhonetic(json[0].phonetic);
    } catch (error) {
      //console.error(error);
      setState("Error");
      setErrorMsg(error.toString());
    }
  };

  const needLoginAlert = () => {
    Alert.alert(
      "Login",
      "Please login at about page first",
      [
        { text: "OK" }
      ]
    );
  }

  const getMark = async () => {
    let mark = await props.dataManager.isWordExist(props.word);
    setMark(mark);
  }

  switchMark = () => {
    if (props.dataManager.getUserId() === ''
      || props.dataManager.getUserId() === null) {
      needLoginAlert();
      return;
    }
    setMark(!mark);
  }

  useEffect(() => {
    getWord();
    if (props.dataManager.getUserId()) {
      getMark();
    }
  }, [props.word]);

  useEffect(() => {
    if (mark) {
      console.log("Add word: " + props.word);
      console.log("Add phonetic: " + phonetic);
      props.dataManager.addWord(props.word, phonetic);
    } else {
      props.dataManager.removeWord(props.word);
    }
  }, [mark]);

  return (
    <View style={{flex:1}}>
      <View>
        <Text style={styles.cardTitle}>{props.word}</Text>
        { state === "Loaded" && <Text>{phonetic}</Text>}
        { state === "Loaded" && (
          <View style={styles.switchView}>
            { mark ? <Text>Added</Text> : <Text>Add</Text>}
            <Switch value={mark} onValueChange={switchMark} />
          </View>
        )}
      </View>
      {state === "Loading" && <ActivityIndicator size="large"/> }
      {state === "Error" && (
        <Text>
          Error: {errorMsg}
        </Text>
      )}
      {state === "Loaded" && (
        <FlatList
          data={definitions}
          renderItem={({ item, index }) => (
            <View style={styles.definitionItem}>
              <Text style={styles.part}>{item.part}</Text>
              <Text style={styles.definition}>{index + 1}: {item.definition}</Text>
              <Text style={styles.example}>   {item.example}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

export default Word;

