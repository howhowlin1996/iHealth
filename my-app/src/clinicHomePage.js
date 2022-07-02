import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Box
  } from '@chakra-ui/react';
  import{ useState,useEffect}from 'react'
  import NavBar from'./nbar';
  import Footer from './footer';
  import { useLocation} from 'react-router-dom';
  import api from'./utils/api'
  import jwt from 'jwt-decode';
  
  async function createReserve(clientId){
    console.log(clientId);
    let patientInform=JSON.parse(localStorage.getItem('token'));
    if(patientInform===null){
      window.location.href='/signIn'
    }
    else{
      let expired=Date.parse(patientInform['user']['login_at'])+patientInform['user']['access_expired']<Date.parse(new Date());
      let token=jwt(patientInform['user']['access_token']);
      let identity=token['identity'];
      let patientId=token['id']
      if(identity==='patient'){
        let waiting=await api.insertClinicReserve({userId:patientId,clientId:parseInt(clientId)});
        return waiting['response']['num'];
        
      }
      
    }

   
  }



  export default function ClinicHomePage() {
    const search = useLocation().search;
    
    var type = new URLSearchParams(search).get('type');
    var id = new URLSearchParams(search).get('id');
    //console.log(type,id);
    const [clinicInform, setclinicInform] = useState({});
    useEffect(() => {
        async function getInform(){
            let response=await api.getIndividualInform({id:id,type:type});
            setclinicInform(response);
        }
        getInform();
    },[]);
    if(Object.keys(clinicInform).length===0){
        return(
            <div>
            <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
           </div> 
        );
        

    }
    else if (type==='clinic'){
        return(
            <ClinicCard data={clinicInform} id={id}/>
        );

    }
    else{
        return(
            <DrugStoreCard data={clinicInform} id={id}/>
        );

    }
   
    
  }



  function ClinicCard(props){
    const [reserve,setReserve]=useState('我要預約');
    
   
    //console.log(props.id)
    const property = {
        imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
        imageAlt: 'Clinic information',
        title: props.data[0]['name'],
        address:props.data[0]['address'],
        phoneNumber:props.data[0]['phoneNumber'],
        physicalCheckUp:'門診診療,兒童預防保健,成人預防保健,定量免疫法糞便潛血檢查',
        medicalType:props.data[0]['medicalType'],
        time:'星期一到星期五8:00~21:00',
        patientNum:'資料讀取中'
      
      }
    const [reserveNum,setReserveNum]=useState(property.patientNum);
    useEffect(() => {
        async function getReserveNum(){
            setInterval(async() => {
                let response=await api. getClinicReserve(props.id);
                setReserveNum(response['response']['num']);
              }, 1000);
          
        }
        getReserveNum();
    },[]);
    return (
    <Stack direction={'column'}> 
        <NavBar/>
            <Stack direction={'column'}>
                <Stack minH={'30%'}maxH={'50%'} direction={{ base: 'column', md: 'row' }} width={'60%'} alignSelf={'center'}>
                    <Flex flex={1}>
                        <Image
                            alt={'Login Image'}
                            objectFit={'cover'}
                            src={
                            'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG'
                            }
                        />
                        
                    </Flex>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                          >
                            {property.title}
                        </Text>
                        <br />{' '}
                        </Heading>
                        <Box  mt='2'>
                            
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>診所類別:</Text>
                            <Text fontSize={'l'}ml={'2'}>{property.medicalType}</Text> 
                        </Box>
                
                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>地址:</Text>
                            <Text fontSize={'l'}ml={'2'}> {property.address}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>電話:</Text>
                            <Text fontSize={'l'}ml={'2'}>{property.phoneNumber}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>服務項目:</Text>
                            <Text fontSize={'l'}ml={'2'}>{property.physicalCheckUp}</Text> 
                        </Box>
                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>看診時間:</Text>
                            <Text fontSize={'l'}ml={'2'}>{property.time}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>等待人數:</Text>
                            <Text fontSize={'l'}ml={'2'}>{reserveNum}</Text> 
                        </Box>

                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify={'right'}>
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                            onClick={async()=>{
                                if(reserve==='我要預約'){
                                    alert('預約成功');
                                    setReserve('我要解除預約');
                                    setReserveNum(await createReserve(props.id));
                                }
                                else{
                                    alert('解除成功');
                                    setReserve('我要預約');
                                    setReserveNum(reserveNum-1);
                                }
                            }}>
                            {reserve}

                        </Button>
                        </Stack>
                    </Stack>
                    </Flex>
                </Stack>
                <Stack minH={'30%'}maxH={'50%'} direction={"column"} width={'60%'} alignSelf={'center'} mt={'100px'}>
                    <Text fontSize={'xl'} fontWeight={'bold'}>醫師群:</Text>
                    <Flex flex={1} direction={'row'}>
                        <Image
                            alt={'DoctorPhoto'}
                            objectFit={'cover'}
                            width={'25%'}
                            src={
                            'https://shh.tmu.edu.tw/upload_files/doc/20191203161152885449.jpg'
                            }
                        />
                        <Flex direction={'column'} ml={'20px'}>
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>醫師名:</Text> 盧伯文 醫師
                            </Box>
                    
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>擅長科別:</Text>肝膽腸胃科
                            </Box>
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>學經歷: </Text>台大醫學院
                            </Box>
                        </Flex >
                        <Image
                            alt={'DoctorPhoto'}
                            objectFit={'cover'}
                            width={'25%'}
                            ml={'10%'}
                            src={
                            'https://shh.tmu.edu.tw/upload_files/doc/20211227144841626729.jpg'
                            }
                        />
                        <Flex direction={'column'} ml={'20px'}>
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>醫師名:</Text> 鄭弘彥 醫師
                            </Box>
                    
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>擅長科別:</Text>兒童胃腸及肝膽疾病
                            </Box>
                            <Box  mt='5'>
                                <Text fontWeight={'bold'}>學經歷: </Text>中國醫藥大學醫學系
                            </Box>
                        </Flex >

                        

                    </Flex>
                  
                </Stack>


                
            </Stack>
        <Footer/>
        </Stack>

    );





  }




  function DrugStoreCard(props){
    const [reserve,setReserve]=useState('我要預約');
    //console.log(props.data[0])
    const property = {
        imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
        imageAlt: 'Clinic information',
        title: props.data[0]['name'],
        address:props.data[0]['address'],
        phoneNumber:props.data[0]['phoneNumber'],
        time:'星期一到星期五8:00~21:00',
        patientNum:2
      
      }
    const [reserveNum,setReserveNum]=useState(property.patientNum);
    return (
    <Stack direction={'column'}> 
        <NavBar/>
            <Stack direction={'column'}>
                <Stack minH={'30%'}maxH={'50%'} direction={{ base: 'column', md: 'row' }} width={'60%'} alignSelf={'center'}>
                    <Flex flex={1}>
                        <Image
                            alt={'Login Image'}
                            objectFit={'cover'}
                            src={
                            'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG'
                            }
                        />
                        
                    </Flex>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                          >
                            {property.title}
                        </Text>
                        <br />{' '}
                        </Heading>
                
                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>地址:</Text>
                            <Text fontSize={'l'}ml={'2'}> {property.address}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>電話:</Text>
                            <Text fontSize={'l'}ml={'2'} > {property.phoneNumber}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>營業時間:</Text>
                            <Text fontSize={'l'}ml={'2'}> {property.time}</Text> 
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>等待人數:</Text>
                            <Text fontSize={'l'}ml={'2'}> {property. patientNum}</Text> 
                        </Box>

                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                            onClick={()=>{
                                if(reserve==='我要預約'){
                                    alert('預約成功');
                                    setReserve('我要解除預約');
                                    setReserveNum(reserveNum+1);
                                }
                                else{
                                    alert('解除成功');
                                    setReserve('我要預約');
                                    setReserveNum(reserveNum-1);
                                }
                            }}>
                            {reserve}

                        </Button>
                        </Stack>
                    </Stack>
                    </Flex>
                </Stack>
            </Stack>
        <Footer/>
        </Stack>

    );





  }