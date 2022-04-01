import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Vibration,
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask(null);
    } else {
      Vibration.vibrate(50);
    }
  };

  const complateTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskWarpper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {taskItems.length > 0 ? (
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => complateTask(index)}>
                  <Task text={item}></Task>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                marginTop: '50%',
                borderRadius: 20,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 5,
              }}>
              Add new task....
            </Text>
          )}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          placeholderTextColor="gray"
          onChangeText={text => setTask(text)}
          value={task}></TextInput>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWarpper: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  items: {
    marginTop: 15,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: 'white',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    color: 'black',
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#C0C0C0',
    fontSize: 25,
  },
});
