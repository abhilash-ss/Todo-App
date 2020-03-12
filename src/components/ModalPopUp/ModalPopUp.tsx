import React from 'react';
import { View, Text, Modal, Alert, StyleSheet } from 'react-native';

export default function ModalPopUp(props: any) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text>Hello World!</Text>

            {/* <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text>Hide Modal</Text>
        </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    height: 200,
    borderWidth: 5,
    borderColor: 'coral',
  },
});
