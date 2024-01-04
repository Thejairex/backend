import { Button, Flex, FormControl, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InputLabel from './InputLabel'
import TextInput from './TextInput'
import InputError from './InputError'

const ImageInput = ({ id = 'unique_id', label = 'Text', recomendedText, setData, error, imageProps = {  } }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setData(id, e.target.files[0])
    }

  return (
    <FormControl isInvalid={error} >
        <InputLabel
            htmlFor={id}
            value={label}
        />

        <Flex
            direction="column"
            gap="2"
            justify="space-between"
        >
            <TextInput
                id={id}
                className="mt-1 block w-full"
                /* value={data.image} */
                type="file"
                onChange={onSelectFile}
                display="none"
            />
            <Button
                onClick={() =>
                    document
                        .getElementById(id)
                        .click()
                }
            >
                Seleccionar imagen
            </Button>
            <Text
                fontSize="xs"
                color="gray.500"
                textAlign="center"
            >
                {recomendedText}
            </Text>
            {selectedFile  && (
                <>
                    <Image
                        src={preview}
                        alt=""
                        marginInline="auto"
                        h="64"
                        aspectRatio="1/1"
                        objectFit="cover"
                        rounded="md"
                        {...imageProps}
                    />
                    <Text
                        fontSize="xs"
                        color="gray.500"
                        textAlign="center"
                    >
                        {selectedFile?.name}
                    </Text>
                </>
            )}
        </Flex>

        <InputError
            className="mt-2"
            message={error}
        />
    </FormControl>
  )
}

export default ImageInput