import { FormControl } from '@chakra-ui/react'
import React from 'react'
import InputLabel from './InputLabel'
import TextInput from './TextInput'
import InputError from './InputError'

const FormSectionControl = ({ data, id = 'unique_id', errors, setData, label = 'Label', type = 'text', inputProps = {} }) => {
  return (

    <FormControl isInvalid={errors[id]} >
        <InputLabel
            htmlFor={id}
            value={label}
        />

        <TextInput
            id={id}
            type={type}
            className="mt-1 block w-full"
            value={data[id]}
            onChange={(e) =>
                setData(id, e.target.value)
            }
            required
            autoComplete={id}
            {...inputProps}
        />

        <InputError
            className="mt-2"
            message={errors[id]}
        />
    </FormControl>
  )
}

export default FormSectionControl