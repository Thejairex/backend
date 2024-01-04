import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

const Filter = ({ filter, setFilter, text = 'Filtro', list }) => {
  return (
    <Menu>
        <MenuButton as={Button} colorScheme="blue" textTransform='uppercase' fontSize='small'>
            {text}
        </MenuButton>
        <MenuList>
            {list.map((item, index) => (
                <MenuItem as={Button} key={index} onClick={() => setFilter(item)}>{item}</MenuItem>
            ))}
        </MenuList>
    </Menu>
  )
}

export default Filter