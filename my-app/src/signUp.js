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
  import api from './utils/api'
  import { createBrowserHistory } from 'history';

  async function signUp(data){
      if(data['name']===''||data['email']===''||data['address']===''||data['password']===''||data['birthday']===''){
        alert('資料不齊全');
        return;
      }
      let msg=await api.signUp(data);   
      if(msg['status'].includes('dupicate email')) alert('Email 已被使用');
      if(msg['status']==='success') window.location.href='/signIn';
      
   

  }



  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  
    let userInform={
        name:"",
        email:"",
        address:"",
        password:"",
        confirmedPassword:"",
        birthday:"",
        height:160,
        weight:60,
        gender:'boy',
        medicalHistory:"",
        allergy:""
    }
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
             
             <FormControl id="name" isRequired>
                <FormLabel>姓名</FormLabel>
                <Input type="text" onBlur={(e)=>{userInform.name=e.target.value}}/>
             </FormControl>
             

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onBlur={
                    (e)=>{userInform.email=e.target.value}}/>
              </FormControl>

              <FormControl id="address" isRequired>
                <FormLabel>地址</FormLabel>
                <Input type="address" onBlur={
                    (e)=>{userInform.address=e.target.value}}/>
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>密碼</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onBlur={
                    (e)=>{userInform.password=e.target.value}}/>
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
                  <Input type={showConfirmedPassword ? 'text' : 'password'} onBlur={
                    (e)=>{userInform.confirmedPassword=e.target.value;
                      if(e.target.value!==userInform.password) alert('密碼不相符')}
                    }/>
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

              <FormControl id="birthday" isRequired>
                <FormLabel>出生年月日</FormLabel>
                <Input type="date" id="birthday"onChange={(e)=>{userInform.birthday=e.target.value}}/>
              </FormControl>

              <HStack>
                <Box>
                    <FormControl id="height" isRequired>
                    <FormLabel>身高</FormLabel>
                    <NumberInput defaultValue={160} min={10} max={250} onChange={(e)=>{userInform.height=e}}>
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
                    <NumberInput defaultValue={60} min={10} max={300} onChange={(e)=>{userInform.weight=e}}>
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
                <FormLabel >性別</FormLabel>
                <RadioGroup defaultValue='boy' onChange={(e)=>{userInform.gender=e}}>
                    <HStack spacing='24px'>
                        <Radio value='boy'>男</Radio>
                        <Radio value='girl'>女</Radio>
                        <Radio value='other'>其他</Radio>
                    </HStack>
                </RadioGroup>
             </FormControl>

             <FormControl as='fieldset' >
                <FormLabel >過去病史</FormLabel>
                <CheckboxGroup colorScheme='blue'>
                    <Stack spacing={5} direction='row'>
                        xw
                        <Checkbox value='hypertension' 	onChange={(e)=>{
                          if(e.target.checked) userInform.medicalHistory+='高血壓/'
                          else userInform.medicalHistory=userInform.medicalHistory.replace('高血壓/','');
                          console.log(userInform.medicalHistory)
                        }}>
                            高血壓
                        </Checkbox>
                        <Checkbox value='diabetes' 
                        onChange={(e)=>{
                          if(e.target.checked) userInform.medicalHistory+='糖尿病/'
                          else userInform.medicalHistory=userInform.medicalHistory.replace('糖尿病/','');
                          console.log(userInform.medicalHistory)
                        }}>
                            糖尿病
                        </Checkbox>
                        <Checkbox value='stomachUlcer' 
                          onChange={(e)=>{
                            if(e.target.checked) userInform.medicalHistory+='胃潰傷/'
                            else userInform.medicalHistory=userInform.medicalHistory.replace('胃潰傷/','');
                            console.log(userInform.medicalHistory)
                          }}>
                            胃潰傷
                        </Checkbox>
                        <Checkbox value='asthma' 
                          onChange={(e)=>{
                            if(e.target.checked) userInform.medicalHistory+='氣喘/'
                            else userInform.medicalHistory=userInform.medicalHistory.replace('氣喘/','');
                            console.log(userInform.medicalHistory)
                          }}>
                            氣喘
                        </Checkbox>
                        
                    </Stack>
                    <Stack spacing={5} direction='row'>
                        
                        
                        <Checkbox value='heartDisease' 
                        onChange={(e)=>{
                            if(e.target.checked) userInform.medicalHistory+='心臟病/'
                            else userInform.medicalHistory=userInform.medicalHistory.replace('心臟病/','');
                            console.log(userInform.medicalHistory)
                          }}>
                            心臟病
                        </Checkbox>
                        <Checkbox value='favaDisease' 
                        onChange={(e)=>{
                          if(e.target.checked) userInform.medicalHistory+='蠶豆症/'
                          else userInform.medicalHistory=userInform.medicalHistory.replace('蠶豆症/','');
                          console.log(userInform.medicalHistory)
                        }}>
                            蠶豆症
                        </Checkbox>
                        <Checkbox value='epilepsy' 
                        onChange={(e)=>{
                          if(e.target.checked) userInform.medicalHistory+='癲癇/'
                          else userInform.medicalHistory=userInform.medicalHistory.replace('癲癇/','');
                          console.log(userInform.medicalHistory)
                        }}>
                            癲癇
                        </Checkbox>
                    </Stack>
                </CheckboxGroup>
             </FormControl>

             <FormControl id="allergy" >
                <FormLabel>過敏藥物</FormLabel>
                <Input type="text" placeholder='無'onBlur={(e)=>{userInform.allergy=e.target.value}}/>
             </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=>{
                    if(userInform.password!==userInform.confirmedPassword)alert("密碼不相符");
                    else signUp(userInform);

                  }}>
                 申請註冊
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={'center'}>
                  已經有帳號了? <Link color={'blue.400'} href={'/'}>登入</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }