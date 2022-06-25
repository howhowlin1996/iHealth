import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Box
  } from '@chakra-ui/react';
  import{ useState}from 'react'
  import NavBar from'./nbar';
  import Footer from './footer';
  export default function SplitScreen() {
    const [reserve,setReserve]=useState('我要預約');
    const property = {
        imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
        imageAlt: 'Clinic information',
        title: '康德診所',
        address:'新竹市東區新莊里光復路一段362之2號',
        phoneNumber:'03-5788282',
        physicalCheckUp:'門診診療,兒童預防保健,成人預防保健,定量免疫法糞便潛血檢查',
        profession:'不分科',
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
                        <Box  mt='2'>
                            <Text fontWeight={'bold'}>科別:</Text> {property.profession}
                        </Box>
                
                        <Box  mt='1'>
                            <Text fontWeight={'bold'}>地址:</Text>{property.address}
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'}>電話:</Text>{property.phoneNumber}
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'}>服務項目:</Text>{property.physicalCheckUp}
                        </Box>
                        <Box  mt='1'>
                            <Text fontWeight={'bold'}>看診時間:</Text>{property.time}
                        </Box>

                        <Box  mt='1'>
                            <Text fontWeight={'bold'}>等待人數: </Text>{reserveNum}
                        </Box>

                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            查看預約狀況

                        </Button>
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
                        <Button
                            rounded={'full'}
                            as={'a'}
                            href={'/videoChat?token=1234'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            進行看診

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