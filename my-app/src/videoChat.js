import {
    Box,
    Flex,
    Stack,
    Button,
    Text,
    FormControl,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useEffect,useState} from 'react';
  import jwt from 'jwt-decode';
  import { useLocation} from 'react-router-dom';
  import api from'./utils/api';
 
  
function VideoButton(){
    return(
        <Box direction={'row'} align={'center'} mt={"10px"}> 
              <Button 
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
              bg: 'blue.500',
              }}
              className="initialBtn">
                  準備看診
              </Button>
          
              <Button  
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                  bg: 'blue.500',
                  }}
                  className="btnCall"
                  ml={'10px'}>
                  開始看診
              </Button >

              <Button  
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                  bg: 'blue.500',
                  }}
                  className="endCall"
                  ml={'10px'}>
                  結束看診
              </Button >
        </Box>

      );




}

async function sendRecord(data,id){
    console.log(data,id);
    let response= await api.sendRecord(data,id);
    window.location.href='/waitingPage';



}


function MedicalForm(){
    const search = useLocation().search;
    let id = new URLSearchParams(search).get('token');
    const [record,setRecord]=useState({});
      useEffect(() => {
        async function  getInform(){
            let response= await api.getRecord(id);
            setRecord(response);
        }
        getInform()
    },[]);
    console.log(record);
    if(Object.keys(record).length!==0){
        let inform=record['response'][0];
        var time = new Date(inform['birthday']);
        //console.log(inform['medicalHistory']==='')
        var medicalRecord={pathology:'',medicine:''};
        return(
            <Flex
                align={'center'}
                justify={'center'}
                >
                <Stack spacing={8} mx={'auto'} minW={'100%'} >
                  <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
        
                    <Stack spacing={5}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                診斷書
                            </Heading>
                        </Stack>
                  
        
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
                            <Text fontWeight={'bold'}>{inform['medicalHistory']===''?'無':inform['medicalHistory']}</Text> 
                        </Stack >
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>身高:</Text>
                            <Text fontWeight={'bold'}>{inform['height'] }cm</Text> 
                        </Stack >
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>體重:</Text>
                            <Text fontWeight={'bold'}>{inform['weight'] }kg</Text> 
                        </Stack >
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>病因:</Text>
                        </Stack >
        
                        <Stack  mt='2' direction={'column'} align={"left"}>
                           
                            <FormControl id="illness" isRequired>
                                <textarea  style={{border:"1px solid",minWidth:"100%",minHeight:"300px"}} onChange={(e)=>{medicalRecord['pathology']=e.target.value}}/>
                            </FormControl>
                        </Stack>
        
                        <Stack  mt='2' direction={'row'}>
                            <Text fontWeight={'bold'}>用藥:</Text>
                        </Stack >
        
                        <Stack  mt='2' direction={'column'} align={"left"}>
                           
                            <FormControl id="illness" isRequired>
                                <textarea  style={{border:"1px solid",minWidth:"100%",minHeight:"300px"}} onChange={(e)=>{medicalRecord['medicine']=e.target.value}} />
                            </FormControl>
                        </Stack>
                      
        
        
                    
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          onClick={async ()=>{await sendRecord(record,id)}}>
                          
                         送出診斷
                        </Button>
                      </Stack>
        
                      
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            );
    }
    else{

        return(
            <div>
            <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
           </div>                 

        );
    }
   
}





  export default function VideoChat(){
        let patientInform=JSON.parse(localStorage.getItem('token'));
        let identity;
        if(patientInform===null){
            window.location.href='/signIn'
            alert('請先登入')
        }
        else{
            let expired=Date.parse(patientInform['user']['login_at'])+patientInform['user']['access_expired']<Date.parse(new Date());
            let token=jwt(patientInform['user']['access_token']);
            identity=token['identity'];
            /*if(expired){
                window.location.href='/signIn'
                alert('請先登入')
            }*/
            
        }
       useEffect(() => {
        const script = document.createElement('script');
        script.src = "./video.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);
        if(identity==='patient'){
            return(
              
                <PatientVideo/>
            );
        }
        else{
            return(
              
                <DoctorVideo/>
            );

        }
        
  }

  function DoctorVideo(){
    
    return(
        <Stack direction={'column'}>
             <VideoButton/>
           
            <Stack direction={'row'} > 
                <Box w="60%" verticalAlign={"center"}>
                    <video 
                    style={{ width:"60%"
                    ,zIndex:"auto",position:"absolute",aspectRatio:"1.33",background:"black",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}autoPlay id="remoteVideo"
                    playsInline ></video>

                    <video style={{ width:"20%"
                    ,zIndex:"auto",position:"absolute",aspectRatio:"1.33",background:"black"}}
                    autoPlay playsInline id="myVideo"
                   ></video>

                </Box>
                <Box align={"center"} w="40%" style={{aspectRatio:"0.8",overflowY:"scroll"}} >                        
                    <MedicalForm />
                </Box>
            </Stack>
             
        </Stack>     

    );



  }


  function PatientVideo(){
    return(
        <Stack direction={'column'}>
             <VideoButton/>
           
            <Stack direction={'row'} > 
                <Box ml={'20%'}>
                <video 
                    style={{ width:"60%"
                    ,zIndex:"auto",position:"absolute",aspectRatio:"1.33",background:"black",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}autoPlay id="remoteVideo"
                    playsInline ></video>

                    <video style={{ width:"20%"
                    ,zIndex:"auto",position:"absolute",aspectRatio:"1.33",background:"black"}}
                    autoPlay playsInline id="myVideo"
                   ></video>

                </Box>
                
            </Stack>
             
        </Stack>     

    );



  }