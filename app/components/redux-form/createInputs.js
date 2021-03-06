import React from 'react'
import { Text, View } from 'react-native'
import {
  Field
} from 'redux-form/immutable'
import {
  Input as InputRenderer,
  Select as SelectRenderer,
  Switch as SwitchRenderer
} from 'react-native-clean-form';

const createInputs = inputCreator => {
  const renderInput = ({ input: { onChange, onBlur, ...restInput }, placeholder}) => (
    <InputRenderer onChangeText={onChange} placeholder={placeholder} {...restInput} />
  )
  const Input = inputCreator('Input', renderInput, InputRenderer.PropTypes, InputRenderer.defaultProps)

  const renderSelect = ({ input: { onChange, value }, labelKey, valueKey, options, placeholder }) => {
    return (
      <SelectRenderer
        labelKey={labelKey}
        options={options}
        placeholder={placeholder}
        value={value}
        valueKey={valueKey}
        onValueChange={onChange}
      />
    );
  }

  const Select = inputCreator('Select', renderSelect, SelectRenderer.PropTypes, SelectRenderer.defaultProps)

  const renderSwitch = ({ input: { onChange, value }}) => {
    // redux-form default value is '', however Switch must take a boolean value
    if (value === '') {
      value = SwitchRenderer.defaultProps.value
    }

    return <SwitchRenderer onValueChange={onChange} value={value} />
  }
  const Switch = inputCreator('Switch', renderSwitch, SwitchRenderer.PropTypes, SwitchRenderer.defaultProps)

  return {
    Input,
    Select,
    Switch
  }
}

export default createInputs
