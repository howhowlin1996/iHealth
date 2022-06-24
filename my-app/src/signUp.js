import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox, 
    CheckboxGroup,
    RadioGroup,
    Radio
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    return (
      
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                註冊
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
             
             <FormControl id="firstName" isRequired>
                <FormLabel>姓名</FormLabel>
                <Input type="text" />
             </FormControl>
             

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>地址</FormLabel>
                <Input type="address" />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>密碼</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmedPassword" isRequired>
                <FormLabel>確認密碼</FormLabel>
                <InputGroup>
                  <Input type={showConfirmedPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowConfirmedPassword((showConfirmedPassword) => !showConfirmedPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <HStack>
                <Box>
                    <FormControl id="height" isRequired>
                    <FormLabel>身高</FormLabel>
                    <NumberInput defaultValue={160} min={10} max={250}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="weight" isRequired>
                    <FormLabel>體重</FormLabel>
                    <NumberInput defaultValue={60} min={10} max={300}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                </Box>
              </HStack>

              <FormControl as='fieldset' isRequired>
                <FormLabel as='gender'>性別</FormLabel>
                <RadioGroup defaultValue='boy'>
                    <HStack spacing='24px'>
                        <Radio value='boy'>男</Radio>
                        <Radio value='girl'>女</Radio>
                        <Radio value='other'>其他</Radio>
                    </HStack>
                </RadioGroup>
             </FormControl>

             <FormControl as='fieldset' isRequired>
                <FormLabel as='medicalHistory'>過去病史</FormLabel>
                <CheckboxGroup colorScheme='blue' defaultValue={['none']}>
                    <Stack spacing={5} direction='row'>
                        <Checkbox value='none' defaultChecked>
                            無
                        </Checkbox>
                        <Checkbox value='hypertension' >
                            高血壓
                        </Checkbox>
                        <Checkbox value='diabetes' >
                            糖尿病
                        </Checkbox>
                        <Checkbox value='stomachUlcer' >
                            胃潰傷
                        </Checkbox>
                        
                    </Stack>
                    <Stack spacing={5} direction='row'>
                        <Checkbox value='asthma' >
                            氣喘
                        </Checkbox>
                        <Checkbox value='epilepsy' >
                            癲癇
                        </Checkbox>
                        <Checkbox value='heartDisease' >
                            心臟病
                        </Checkbox>
                        <Checkbox value='favaDisease' >
                            蠶豆症
                        </Checkbox>
                    </Stack>
                </CheckboxGroup>
             </FormControl>

             <FormControl id="allergy" isRequired>
                <FormLabel>過敏藥物</FormLabel>
                <Input type="text" placeholder='無'/>
             </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                 申請註冊
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={'center'}>
                  已經有帳號了? <Link color={'blue.400'}>登入</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }