import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Stack,
    Text,
    Button
  } from '@chakra-ui/react'
  import api from'./utils/api'
  import jwt from 'jwt-decode';
  import NavBar from'./nbar';
  import Footer from './footer';
  import { useEffect,useState} from 'react';

  export default function WaitingPage(){
    let patientInform=JSON.parse(localStorage.getItem('token'));
    if(patientInform===null){
      window.location.href='/signIn'
    }
    else{
      let expired=Date.parse(patientInform['user']['login_at'])+patientInform['user']['access_expired']<Date.parse(new Date());
      let token=jwt(patientInform['user']['access_token']);
      //console.log(token);
      let identity=token['identity'];
      let patientId=token['id']
      let clinicId=token['clinicId']
      if(identity==='patient'){
        return(
            <Stack direction={'column'}> 
                  <NavBar/>
                  <Text
                    as={'h1'}
                    fontSize={'30px'}
                    align={'center'}
                    fontWeight={'bold'}
                  >
                    我的預約
                  
                  </Text>
                  <Stack direction={'column'} align={'center'}> 
                        
                        <PatientTable id={ patientId}/>
                      
                  </Stack>
                  <Footer/>
              </Stack>
        );
      }
      else{
           
            return(
                <Stack direction={'column'}> 
                    <NavBar/>
                      <Text
                        as={'h1'}
                        fontSize={'30px'}
                        align={'center'}
                        fontWeight={'bold'}
                      >
                        線上看診
                      </Text>
                      <Stack direction={'column'} align={'center'}> 
                        
                        <ClinicTable id={ clinicId}/>
                      
                      </Stack>
                  
                  
                    <Footer/>
                </Stack>
            );

      }
      
    }

    
  }


  async function sendNotify(userId,clinicId){
    //console.log(userId,clinicId);
    let response=await api.sendNotify(userId,clinicId);
    alert(response['msg']);

  }

  function PatientTable(props){
    const [reserveinform,setReserveInform]=useState([]);
    useEffect(() => {
        async function getInform(){
            let response=await api.getReserveInform('patient',props.id);
            //console.log(response['response']);
            setReserveInform(response['response']);
        }
        getInform();
         
      },[]);
        if(reserveinform.length===0){
            return(
                <div>
                <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
               </div>                 

            );

        }
        else{
            return(
                <TableContainer style={{width:'50%'}} mt={'4'} mb={'4'}>
                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                        <Tr >
                            <Th fontSize={'xl'} fontWeight={'bold'}>診所</Th>
                            <Th fontSize={'xl'} fontWeight={'bold'}>預約時間</Th>
                            <Th fontSize={'xl'} fontWeight={'bold'}>看診按鈕</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                        {reserveinform.map(
                                function(inform){
                                    //console.log(inform);
                                    var time = new Date(inform['reserveDay']);
                                    
                                    //console.log(time.toLocaleString());
                                    return(
                                        <Tr key={inform['id']}>
                                            <Td fontSize={'l'}>{inform['name']}</Td>
                                            <Td fontSize={'l'}>{time.toLocaleString()}</Td>
                                            <Td  > 
                                                <Button
                                                    
                                                    bg={'blue.400'}
                                                    as={'a'}
                                                    href={'/videoChat?token='+inform['id']}
                                                    color={'white'}
                                                    _hover={{
                                                        bg: 'blue.500',
                                                    }}
                                                    fontSize={'l'}
                                                    >
                                                        進行看診
                                                </Button>
                                            </Td>
                                        </Tr>
                                    );

                                }
                            )
                            }
                        
                        </Tbody>
                    
                    </Table>
                 </TableContainer>
            );
        }
        

  }

  function ClinicTable(props){
    const [reserveinform,setReserveInform]=useState([]);
    useEffect(() => {
        async function getInform(){
            let response=await api.getReserveInform('clinic',props.id);
            console.log(response['response']);
            setReserveInform(response['response']);
        }
        getInform();
         
      },[]);
        if(reserveinform.length===0){
            return(
                <div>
                <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
               </div>                 

            );

        }
        else{
            return(
                <TableContainer style={{width:'50%'}} mt={'4'} mb={'4'}>
                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                        <Tr >
                            <Th fontSize={'xl'} fontWeight={'bold'}>病人姓名</Th>
                            <Th fontSize={'xl'} fontWeight={'bold'}>預約時間</Th>
                            <Th fontSize={'xl'} fontWeight={'bold'}>看診按鈕</Th>
                            <Th fontSize={'xl'} fontWeight={'bold'}>提醒按鈕</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                        {reserveinform.map(
                                function(inform){
                                    console.log(inform['userId']);
                                    var time = new Date(inform['reserveDay']);
                                    //console.log(time.toLocaleString());
                                    return(
                                        <Tr key={inform['id']}>
                                            <Td fontSize={'l'}>{inform['name']}</Td>
                                            <Td fontSize={'l'}>{time.toLocaleString()}</Td>
                                            <Td  > 
                                                <Button
                                                    
                                                    bg={'blue.400'}
                                                    as={'a'}
                                                    href={'/videoChat?token='+inform['id']}
                                                    color={'white'}
                                                    _hover={{
                                                        bg: 'blue.500',
                                                    }}
                                                    fontSize={'l'}
                                                    >
                                                        進行看診
                                                </Button>
                                            </Td>
                                            <Td  > 
                                                <Button
                                                    
                                                    bg={'blue.400'}
                                                    as={'a'}
                                                    color={'white'}
                                                    _hover={{
                                                        bg: 'blue.500',
                                                    }}
                                                    fontSize={'l'}
                                                    onClick={async()=>{await sendNotify(inform['userId'],props.id)}}
                                                    >
                                                        提醒看診
                                                </Button>
                                            </Td>
                                        </Tr>
                                    );

                                }
                            )
                            }
                        
                        </Tbody>
                    
                    </Table>
                 </TableContainer>
            );
        }
        

  }