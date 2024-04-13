import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { styles } from '../../../styles/styles'; 

const AboutScreen = (prop) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {prop.userId === '' && (
        <View style={styles.section}>
          <Text style={styles.testAccountText}>Test account: test@test.com / test1234</Text>
          <TextInput 
            placeholder="Email" 
            onChangeText={setEmail} 
            value={email} 
            style={styles.inputKeyWord} 
            autoCapitalize='none' 
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            style={styles.inputKeyWord}
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <Button title="Login" onPress={() => {prop.signIn(email, password)}} style={styles.button} />
          <Button title="Register" onPress={() => {prop.register(email, password)}} style={styles.button} />
        </View>
      )}
      {prop.userId !== '' && (
        <View style={styles.section}>
          <Text style={styles.userIdText}>UserId: {prop.userId}</Text>
          <Button title="Logout" onPress={() => {prop.signOut()}} style={styles.button} />
        </View>
      )}
      <Text style={styles.leftTitle}>The Final Project.</Text>
      <Text style={styles.leftTitle}>The Dictionary App.</Text>
      <View style={styles.divider}></View>
      <Text style={styles.studentText}>Student: Oleg Baryshev</Text>
      <Text style={styles.studentNumber}>Student number: 1138630</Text>
      <View style={styles.divider}></View>
      <Text style={styles.studentText}>Student: Daimiao Chen</Text>
      <Text style={styles.studentNumber}>Student number: 1172321</Text>
      <View style={styles.divider}></View>
      <Text style={styles.studentText}>Student: Nonye Asogwa</Text>
      <Text style={styles.studentNumber}>Student number: 1176041</Text>
      <View style={styles.divider}></View>
    </View>
  );
};

export default AboutScreen;

