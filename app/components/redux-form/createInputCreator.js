import React from 'react';
import { View } from 'react-native';
import { Label, FormGroup } from 'react-native-clean-form';
import styled from 'styled-components/native';
import defaultTheme from '../../stylesheets/FormTheme';

const ErrorMessage = styled.Text`
  color: ${props => props.theme.ErrorMessage.color};
  fontSize: ${props => props.theme.ErrorMessage.fontSize};
  marginBottom: ${props => props.theme.ErrorMessage.marginBottom};
  textAlign: ${props => props.theme.ErrorMessage.textAlign};
`

ErrorMessage.defaultProps = {
  theme: defaultTheme
}

const render = renderComponent => props => {
  const { border, input : { onChange, ...restInput }, label, inlineLabel, theme, meta: { touched, error, active } } = props


  if (active) {
    theme.FormGroup.borderColor = '#4286DD';
    theme.Label.color = '#4286DD';
  } else {
    theme.FormGroup.borderColor = '#EBEBEB';
    theme.Label.color = '#BFC2C9';
  }

  return (
    <View>
      <FormGroup border={border} inlineLabel={inlineLabel} theme={theme} error={touched && !!error} {...props} >
        { renderComponent(props) }
      </FormGroup>
      { touched && error && <ErrorMessage theme={theme}>{ error }</ErrorMessage> }
    </View>
  )
}


const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypes = {}, defaultProps = {}) => {
  const Component = render(renderFunction)
  Component.displayName = name

  const FieldWrapper = props => {
    const { component, name, ...rest } = props

    return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
  }

  FieldWrapper.displayName = 'FieldWrapper'
  FieldWrapper.PropTypes = Object.assign({
    border: React.PropTypes.bool,
    inlineLabel: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  }, PropTypes)
  FieldWrapper.defaultProps = Object.assign({
    border: FormGroup.defaultProps.border,
    inlineLabel: FormGroup.defaultProps.inlineLabel
  }, defaultProps)

  return FieldWrapper
}

export default createInputCreator
