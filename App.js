//App.js
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/components/home/home';
import AboutScreen from './src/components/about/about';
import Favorites from './src/components/favorites/favorites';
import dataManager from './src/database/database';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeIcon from './assets/home.png';
import AboutIcon from './assets/aboutUs.png';
import FavoritesIcon from './assets/favourite.png';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userId, setUserId] = useState('');

  const signIn = (email, password) => {
    dataManager.signInWithEmailAndPassword(email, password).then(()=> {
      setUserId(dataManager.getUserId());
    });
  }

  const signOut = () => {
    dataManager.signOut();
    setUserId('');
  }

  const register = (email, password) => {
    dataManager.register(email, password).then(()=> {
      setUserId(dataManager.getUserId());
    });
  }
  
  return (
  
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}>
          {props => <HomeScreen {...props} userId={userId} dataManager={dataManager} />}
        </Tab.Screen>

        <Tab.Screen name="Favorites" options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={FavoritesIcon}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}>
          {props => <Favorites {...props} userId={userId} dataManager={dataManager}/>}
        </Tab.Screen>

        <Tab.Screen name="About" options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={AboutIcon}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}>
          {props => <AboutScreen {...props} signIn={signIn} userId={userId} signOut={signOut} register={register} />}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}
