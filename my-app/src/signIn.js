import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';

  import api from './utils/api.js'
  
  async function signIn(inform){
    console.log(inform);
    let patientResult= await api.signIn(inform);
    let clinicResult= await api.clinicSignIn(inform);
    console.log(patientResult,clinicResult);
    if(patientResult['error']!==undefined&&clinicResult['error']!=undefined) {
      alert('密碼錯誤');
      return;
    }
    else if(patientResult['error']!==undefined){
      localStorage.setItem('token',JSON.stringify(clinicResult));
       window.location.href='/';

    }
    else {
      localStorage.setItem('token',JSON.stringify(patientResult));
       window.location.href='/';

    }
    

  }
  export default function SimpleCard() {
    let inform={
      email:'',
      password:'',
      remember:false
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>登入</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onBlur={(e)=>{inform.email=e.target.value}}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>密碼</FormLabel>
                <Input type="password" onBlur={(e)=>{inform.password=e.target.value}}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox onChange={(e)=>{inform.remember=e.target.checked}}>記住我</Checkbox>
                  <Link color={'blue.400'}>忘記密碼?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={(e)=>{signIn(inform)}}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }