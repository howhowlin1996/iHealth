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
  } from '@chakra-ui/react';
  import { useState,useEffect} from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import jwt from 'jwt-decode';
  import NavBar from'./nbar';
  import Footer from './footer';
  import { useLocation} from 'react-router-dom';
  import api from './utils/api.js'
  

  export default function MemberInform() {
    const search = useLocation().search;
    let code = new URLSearchParams(search).get('code');
    const [notifyStatus, setnotifyStatus] = useState(false);
    
    
    useEffect(() => {
        async function lineNotify(){
          let response;
          if(code!==null) {
            let id=jwt(patientInform['user']['access_token'])['id'];
            response=await api.getLineNotify({code:code,id:id});
            alert(response['msg']);
          }
        }
        lineNotify();
   
    },[]);
 
    


    let patientInform=JSON.parse(localStorage.getItem('token'));
    console.log(patientInform);
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
        email:token['email']
      }



      return(
        <Stack direction={'column'}>  
          <NavBar/>
          <MemberCard data={data}/>
          <Footer/>
        </Stack>
      );
      
     
      
    }
  
   
  }

  function MemberCard(props){
    let data=props.data;
    let state= Math.random().toString(36).substring(7);
     return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                會員資料
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
             
             <FormControl id="name" >
                <FormLabel fontSize={'xl'}>姓名：</FormLabel>
                <Text>{data['name']} {data['gender']==='boy'?'先生':'小姐'}</Text>
             </FormControl>
             

              <FormControl id="email" >
                <FormLabel fontSize={'xl'}>Email address：</FormLabel>
                <Text>{data['email']}</Text>
               
              </FormControl>

              <FormControl id="birthday" >
                <FormLabel fontSize={'xl'}>出生年月日：</FormLabel>
                <Text>{data['birthday']}</Text>
              </FormControl>

              

            

              <Stack spacing={10} pt={2} direction={'row'}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=>{
                    

                  }}>
                 我的預約
                </Button>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=>{
                    window.location.href='https://notify-bot.line.me/oauth/authorize?response_type=code&scope=notify&client_id=LwQ8Kp1qb0y4iaw5pM7xOH&redirect_uri='+api.redirect_uri+'&state='+state

                  }}>
                 Line Notify
                </Button>
              </Stack>


            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }