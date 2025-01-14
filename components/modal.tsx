import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable, View, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";

import { Button } from './button';

import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';

const Text = createText<ThemeProps>();


type Props = {
  title: string;
  placeholder: string;
  onAdd: (produto: string) => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

const ModalT = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [produto, setProduto] = React.useState('');

  const handleOutsideClick = () => {
    setModalVisible(false);
  };

  const adicionarProduto = () => {
    if (produto.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o nome do produto.');
      return;
    }
    props.onAdd(produto); // Chama o callback para adicionar o produto
    setProduto('');
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text variant='button_secondary' style={styles.modalText}>{`Adicione um titulo ${props.title}:`}</Text>
              <TextInput
                    style={styles.input}
                    mode='outlined'
                    label='Nome'
                    onChangeText={setProduto}
                    value={produto}
                    placeholder={props.placeholder}
                    keyboardType="twitter"
                />
              <View style={styles.buttonView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={adicionarProduto}>
                  <Text style={styles.textStyle}>adicionar</Text>
                </Pressable>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Pressable
          
          onPress={() => setModalVisible(true)}>
          <Button icon='add-task' variant="modal" onPress={() => setModalVisible(true)} /> 
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  buttonView: {
    flexDirection: 'row',
    display: 'flex',
    padding: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '85%',
    elevation: 10,
    zIndex: 99999999999999
  },
  buttonOpen: {
    backgroundColor: '#000',
  },
  buttonClose: {
    backgroundColor: '#000',

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    padding: 5,
    minWidth: '80%',
    maxWidth: '80%',
    textAlign: 'left',
  },
  input: {
    height: 40,
    marginBottom: 10,
    minWidth: '80%',
    maxWidth: '80%',
    overflowX: 'auto',
    fontFamily: 'Poppins_500Medium'
  },
});

export default ModalT;