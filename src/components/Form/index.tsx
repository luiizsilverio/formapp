import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../Button';
// import { Input } from '../Input';
import { ControlledInput as Input } from '../ControlledInput';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const schema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  email: yup.string().email("E-mail inválido")
    .required("Informe seu e-mail"),
  password: yup.string().min(6, "Senha deve ter no mínimo 6 dígitos")
    .required("Informe a senha"),
  password_confirm: yup.string().required("Confirme a senha")
    .oneOf([yup.ref('password')], "A senha não confere")
})

export function Form() {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const errors = formState.errors

  if (errors) {
    console.log(errors)
  }
  
  function handleUserRegister(data: FormData) {
    console.log(data)
  }

  return (
    <Container>
      <Input
        icon="user"
        placeholder="Nome"
        name="name"
        control={control}
        error={errors.name}
      />
      <Input
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        name="email"
        control={control}
        error={errors.email}
      />
      <Input
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        name="password"
        control={control}
        error={errors.password}
      />
      <Input
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        name="password_confirm"
        control={control}
        error={errors.password_confirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}