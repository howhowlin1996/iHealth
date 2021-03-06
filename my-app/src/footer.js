import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SmallWithNavigation() {
    return (
      <Box
        bg={'blue.400'}
        color={useColorModeValue('gray.700', 'gray.200')}
        position={'fixed'}
          bottom={'0'}
          width={'100%'}
         >
        <Container
          as={Stack}
          maxW={'m'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={6}>
            <Link href={'#'}>Home</Link>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Contact</Link>
          </Stack>
          <Text>© 2022 Chakra Templates. All rights reserved</Text>
        </Container>
      </Box>
    );
  }