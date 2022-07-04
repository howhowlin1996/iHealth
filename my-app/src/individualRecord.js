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
  import { useState,useEffect} from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import api from './utils/api'
  import { createBrowserHistory } from 'history';
  import { useLocation} from 'react-router-dom';
  import jwt from 'jwt-decode';

  export default function IndividualRecord(){
    const [inform, setInform] = useState({});
    const search = useLocation().search;
    let id = new URLSearchParams(search).get('id');
    let patientInform=JSON.parse(localStorage.getItem('token'));
    console.log(patientInform);
    useEffect(() => {
        async function getInform(){
            let response=await api.getMedicalRecord(id);
            setInform(response);
        }
        getInform();

      },[]);
    if(patientInform===null){
      window.location.href='/signIn';
    }
    else{
      let expired=Date.parse(patientInform['user']['login_at'])+patientInform['user']['access_expired']<Date.parse(new Date());
      let token=jwt(patientInform['user']['access_token']);
      let identity=token['identity'];
     
      let data={
        name:token['name'],
        gender:token['gender'],
        birthday:new Date(Date.parse(token['birthday'])).toLocaleDateString(),
        email:token['email'],
        medicalRecord:inform['pathology'],
        medicine:inform['medicine']
      }
      if(Object.keys(inform).length===0){
        return(
            <div>
                <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
        </div> 
        );
      }
      else{
        return(
            <RecordCard data={data}/>
            );

      }
      
    }

       
        
  }
  function RecordCard(props) {
     let inform=props.data;
     var time = new Date(inform['birthday']);
    return (
      
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={'50%'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                處方簽
            </Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
                 <Stack spacing={5}>
            
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>姓名:</Text>
                            <Text fontWeight={'bold'}>{inform['name']}</Text> 
                        </Stack >
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>性別:</Text>
                            <Text fontWeight={'bold'}>{inform['gender']==='boy'?'男':'女'}</Text> 
                        </Stack >
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>出生年月日:</Text>
                            <Text fontWeight={'bold'}>{time.toLocaleDateString()}</Text> 
                        </Stack >
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>病史:</Text>
                            <Text fontWeight={'bold'}>{inform['medicalRecord']}</Text> 
                        </Stack >
        
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>用藥:</Text>
                            <Text fontWeight={'bold'}>{inform['medicine']}</Text> 
                        </Stack >
                    </Stack>
    
          </Box>
          
        </Stack>
      </Flex>
    );
  }