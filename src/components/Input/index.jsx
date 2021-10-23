import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import { useField } from '@unform/core';

import { TextInput, ErrorText } from './styles';

const Input = ({ name, label, onChangeText, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleLoseFocus = () => {
    setIsFocused(false);
  }

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });

  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <>
      {error && (
        <View style={{ flexWrap: 'wrap' }}>
          <ErrorText>{error}</ErrorText>
        </View>
      )}
      <TextInput
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleLoseFocus}
        isFocused={isFocused}
        isErrored={!!error}
        {...rest}
      />
    </>
  );

}

export default Input;