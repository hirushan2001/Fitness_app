import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Signin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();

  const handleSignin = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   Alert.alert('Error', 'Please enter a valid email address');
    //   return;
    // }

    // if (password.trim() === '') {
    //   Alert.alert('Error', 'Password cannot be empty');
    //   return;
    // }
    console.log('Email:', email);
    console.log('Password:', password);
    //Alert.alert('Success', 'Signed in successfully');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Background Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/img1.jpg')} 
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.5)', 'transparent']}
              style={styles.gradient}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Sign In</Text>

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#AAA"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AAA"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {/* Sign In Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Navigate to Sign Up */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    color: '#AAA',
    fontSize: 14,
  },
  signupLink: {
    color: '#FFF',
    fontWeight: '600',
  },
});
