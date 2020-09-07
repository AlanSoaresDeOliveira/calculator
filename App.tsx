import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operations, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const addDigit = (n) => {
    const clearDisplayToZero = displayValue === '0' || clearDisplay;

    if (n === '.' && !clearDisplayToZero && displayValue.includes('.')) {
      return;
    }
    const currentValue = clearDisplayToZero ? '' : displayValue;
    const valueDisplay = currentValue + n;
    setDisplayValue(valueDisplay);
    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(valueDisplay);
      const newValueArray = [...values];
      newValueArray[current] = newValue;
      setValues(newValueArray);
    }
  };

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const onHandleOperation = (operation) => {
    if (current === 0) {
      setOperation(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const newValues = [...values];
      try {
        // eslint-disable-next-line no-eval
        newValues[0] = eval(`${newValues[0]} ${operations} ${newValues[1]}`);
      } catch (e) {
        newValues[0] = values[0];
      }

      newValues[1] = 0;
      setDisplayValue(`${newValues[0]}`);
      setOperation(equals ? null : operation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(newValues);
    }
  };
  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.button}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={onHandleOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={onHandleOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={onHandleOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={onHandleOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={onHandleOperation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
