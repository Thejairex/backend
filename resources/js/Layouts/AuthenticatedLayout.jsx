import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { FaRegBell } from "react-icons/fa6";
import { Link, router } from "@inertiajs/react";
import {
    Box,
    Container,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Avatar,
    Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Authenticated({ user, header, children, props = {}, containerProps = {} }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [links] = useState([
        {
            href: route("dashboard"),
            active: route().current("dashboard"),
            label: "Inicio",
        },
        {
            href: route("raffles.index"),
            active:
                route().current("raffles.index") ||
                route().current("raffles.show") ||
                route().current("raffles.create"),
            label: "Sorteos",
            items: [
                {
                    href: route("raffles.create"),
                    active: route().current("raffles.create"),
                    label: 'Crear Sorteos'
                },
                {
                    href: route("raffles.index"),
                    active:
                        route().current("raffles.index") ||
                        route().current("raffles.show"),
                    label: "Sorteos disponibles",
                }
            ]
        },
        {
            href: route("purchases.index"),
            active:
                route().current("purchases.index") ||
                route().current("purchases.show"),
            label: "Pagos",
        },
    ]);

    useEffect(() => {
        console.log(user.unreadNotifications);
    }, [])

    return (
        <Box pos="relative" minH="100vh" bg="blue.50" {...containerProps}>
            <Box
                bg="white"
                maxH="24"
                borderBottom="1px solid var(--chakra-colors-gray-400)"
                py="4"
            >
                <Container maxW="container.xl">
                    <Flex justify="space-between" align="center">
                        <Flex as={motion.div} layout align="center" gap="8">
                            <Link href={route("dashboard")}>
                                <ApplicationLogo className="w-16 h-16" />
                            </Link>
                            {links.map((link) => (
                                <>{link?.items ? <Menu>
                                    <MenuButton
                                        as={Button}
                                        pos="relative"
                                        variant="link"
                                        h="12"
                                        key={link.href}
                                        isActive={link.active}
                                        _active={{ color: "blue.500" }}
                                        _focus={{ outline: "none" }}
                                        _hover={{
                                            color: "blue.400",
                                            _before: {
                                                opacity: 1,
                                                transform: "scaleX(0.5)",
                                            },
                                            _after: {
                                                opacity: 1,
                                                transform: "scaleX(0.5)",
                                            },
                                        }}
                                        _before={{
                                            content: '""',
                                            pos: "absolute",
                                            bottom: "0",
                                            left: "0",
                                            w: "full",
                                            h: "2px",
                                            bg: "blue.500",
                                            transition: "all .2s ease-in-out",
                                            opacity: "0",
                                            transform: "scaleX(0)",
                                        }}
                                        _after={{
                                            content: '""',
                                            pos: "absolute",
                                            top: "0",
                                            left: "0",
                                            w: "full",
                                            h: "2px",
                                            bg: "blue.500",
                                            transition: "all .2s ease-in-out",
                                            opacity: "0",
                                            transform: "scaleX(0)",
                                        }}>
                                        {link.label}
                                        {link.active && (
                                            <Box
                                                as={motion.div}
                                                pos="absolute"
                                                bottom="0"
                                                h="2px"
                                                w="full"
                                                layoutId="underline"
                                                bg="blue.500"
                                            />
                                        )}
                                        {link.active && (
                                            <Box
                                                as={motion.div}
                                                pos="absolute"
                                                top="0"
                                                h="2px"
                                                w="full"
                                                layoutId="supraline"
                                                exit={{ opacity: 0 }}
                                                bg="blue.500"
                                            />
                                        )}
                                    </MenuButton>
                                    <MenuList zIndex='2'>
                                        {link.items.map(item => (
                                            <MenuItem as={Button} variant='link' justifyContent='flex-start' rounded='0' fontWeight='medium' w='full' onClick={() => router.visit(item.href)} isActive={item.active} key={item.href}
                                                _before={{
                                                    content: '""',
                                                    pos: "absolute",
                                                    top: "0",
                                                    right: "0",
                                                    h: "full",
                                                    w: "2px",
                                                    bg: "blue.500",
                                                    transition: "all .2s ease-in-out",
                                                    opacity: "0",
                                                    transform: "scaleY(0)",
                                                }}
                                                _hover={{
                                                    _before: {
                                                        opacity: 1,
                                                        transform: "scaleY(1)",
                                                    },
                                                }}
                                                _active={{
                                                    _before: {
                                                        opacity: 1,
                                                        transform: "scaleY(1)",
                                                    },
                                                    color: 'blue.500'
                                                }}>{item.label}</MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu> : <Button
                                    as={Link}
                                    pos="relative"
                                    variant="link"
                                    h="12"
                                    key={link.href}
                                    href={link.href}
                                    isActive={link.active}
                                    _active={{ color: "blue.500" }}
                                    _focus={{ outline: "none" }}
                                    _hover={{
                                        color: "blue.400",
                                        _before: {
                                            opacity: 1,
                                            transform: "scaleX(0.5)",
                                        },
                                        _after: {
                                            opacity: 1,
                                            transform: "scaleX(0.5)",
                                        },
                                    }}
                                    _before={{
                                        content: '""',
                                        pos: "absolute",
                                        bottom: "0",
                                        left: "0",
                                        w: "full",
                                        h: "2px",
                                        bg: "blue.500",
                                        transition: "all .2s ease-in-out",
                                        opacity: "0",
                                        transform: "scaleX(0)",
                                    }}
                                    _after={{
                                        content: '""',
                                        pos: "absolute",
                                        top: "0",
                                        left: "0",
                                        w: "full",
                                        h: "2px",
                                        bg: "blue.500",
                                        transition: "all .2s ease-in-out",
                                        opacity: "0",
                                        transform: "scaleX(0)",
                                    }}
                                >
                                    {link.label}
                                    {link.active && (
                                        <Box
                                            as={motion.div}
                                            pos="absolute"
                                            bottom="0"
                                            h="2px"
                                            w="full"
                                            layoutId="underline"
                                            bg="blue.500"
                                        />
                                    )}
                                    {link.active && (
                                        <Box
                                            as={motion.div}
                                            pos="absolute"
                                            top="0"
                                            h="2px"
                                            w="full"
                                            layoutId="supraline"
                                            exit={{ opacity: 0 }}
                                            bg="blue.500"
                                        />
                                    )}
                                </Button>}</>
                            ))}
                        </Flex>
                        <Flex direction="row" align="center" gap="4">
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    variant="link"
                                    px="2"
                                    isActive={route().current(
                                        "notifications.index"
                                    )}
                                    _before={{
                                        content: '""',
                                        pos: "absolute",
                                        top: "0",
                                        right: "0",
                                        h: "full",
                                        w: "2px",
                                        bg: "blue.500",
                                        transition: "all .2s ease-in-out",
                                        opacity: "0",
                                        transform: "scaleY(0)",
                                    }}
                                    _hover={{
                                        _before: {
                                            opacity: 1,
                                            transform: "scaleY(1)",
                                        },
                                    }}
                                    _active={{
                                        _before: {
                                            opacity: 1,
                                            transform: "scaleY(1)",
                                        },
                                    }}
                                >
                                    <Flex align="flex-" justify="flex-start">
                                        <FaRegBell />
                                        {user?.unreadNotifications?.length >
                                            0 && (
                                                <Box
                                                    rounded="full"
                                                    bg="red.500"
                                                    w="2"
                                                    h="2"
                                                    marginLeft="-2"
                                                />
                                            )}
                                    </Flex>
                                </MenuButton>
                                <MenuList zIndex="2">
                                    <MenuItem
                                        as={Link}
                                        href={route("notifications.index")}
                                    >
                                        Ver todas
                                    </MenuItem>
                                    <MenuDivider />
                                    {user?.unreadNotifications?.map(
                                        (notification) => (
                                            <MenuItem
                                                as={Link}
                                                href={route(
                                                    "notifications.show",
                                                    notification?.id
                                                )}
                                                key={notification?.id}
                                                borderBlock="1px solid var(--chakra-colors-gray-400)"
                                            >
                                                <Flex
                                                    direction="column"
                                                    gap="2"
                                                >
                                                    <Text
                                                        fontSize="md"
                                                        fontWeight="semibold"
                                                    >
                                                        {
                                                            notification?.data
                                                                ?.title
                                                        }
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="normal"
                                                    >
                                                        {
                                                            notification?.data
                                                                ?.message
                                                        }
                                                    </Text>
                                                </Flex>
                                            </MenuItem>
                                        )
                                    )}
                                    {user?.unreadNotifications?.length ===
                                        0 && (
                                            <MenuItem>
                                                <Text
                                                    fontSize="md"
                                                    fontWeight="semibold"
                                                >
                                                    No tienes notificaciones
                                                </Text>
                                            </MenuItem>
                                        )}
                                    {user?.unreadNotifications?.length > 0 && (
                                        <>
                                            <MenuDivider />
                                            <MenuItem
                                                as={Link}
                                                href={route(
                                                    "notifications.markAsReadAll"
                                                )}
                                                method="post"
                                            >
                                                Marcar como leídas
                                            </MenuItem>
                                        </>
                                    )}
                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    variant="link"
                                    px="2"
                                    isActive={route().current("profile.edit")}
                                    _before={{
                                        content: '""',
                                        pos: "absolute",
                                        top: "0",
                                        right: "0",
                                        h: "full",
                                        w: "2px",
                                        bg: "blue.500",
                                        transition: "all .2s ease-in-out",
                                        opacity: "0",
                                        transform: "scaleY(0)",
                                    }}
                                    _hover={{
                                        _before: {
                                            opacity: 1,
                                            transform: "scaleY(1)",
                                        },
                                    }}
                                    _active={{
                                        _before: {
                                            opacity: 1,
                                            transform: "scaleY(1)",
                                        },
                                    }}
                                >
                                    <Flex
                                        align="center"
                                        justify="center"
                                        gap="2"
                                    >
                                        <Text
                                            fontSize="sm"
                                            fontWeight="semibold"
                                        >
                                            {user.username}
                                        </Text>
                                        <Avatar src={user.image} size="sm" />
                                    </Flex>
                                </MenuButton>
                                <MenuList zIndex="2">
                                    <MenuItem
                                        as={Link}
                                        href={route("profile.edit", user.id)}
                                    >
                                        Perfil
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => router.visit(route("logout"), { method: 'post' })}
                                    >
                                        Cerrar Sesión
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Box
                bg="white"
                borderBottom="1px solid var(--chakra-colors-gray-400)"
                py="4"
                pos="sticky"
                top="0"
                zIndex="1"
            >
                <Container maxW="container.xl">{header}</Container>
            </Box>
            <Box as='main' className="py-4" {...props} >{children}</Box>
            <Box h='24' />
            <Box
                as="footer"
                pos="absolute"
                bottom="0"
                w="full"
                h='24'
                bg="white"
                borderTop="1px solid var(--chakra-colors-gray-400)"
            >
                <Container maxW="container.xl" h='full'>
                    <Flex justify="space-around" align="center" py="4" h='full'>
                        <Text fontSize="sm" color="gray.500">
                            &copy; 2024 RifaYA Inc. All rights reserved.
                        </Text>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}
