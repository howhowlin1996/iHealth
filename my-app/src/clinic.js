import {
  Box,
  Image,
  Flex,
  Stack,
  Button,
  Text
} from '@chakra-ui/react';
import NavBar from'./nbar';
import Footer from './footer';
import { useLocation} from 'react-router-dom';

//import {getClinicNearBy,getClinicPopular,getDrugStoreNearBy}from'./utils/api';
import { useEffect,useState} from 'react';
import api from'./utils/api';

export default  function Clinic(){
    const search = useLocation().search;
    var name='popular';
    name = new URLSearchParams(search).get('catergory');
    const [clinicInform, setclinicInform] = useState({});
    useEffect(() => {
      if(name==='nearby'){
        navigator.geolocation.getCurrentPosition(async function(position) {
          const pos={
              lat:position.coords.latitude,
              lng: position.coords.longitude
          }
          setclinicInform(await api.getClinicNearBy(pos));
        });
      }
      else if(name==='popular'){
          async function getPopular(){
            setclinicInform(await api.getClinicPopular());
          }
          getPopular();


      }
      else{
        navigator.geolocation.getCurrentPosition(async function(position) {
          const pos={
              lat:position.coords.latitude,
              lng: position.coords.longitude
          }
          setclinicInform(await api.getDrugStoreNearBy(pos));
        });

      }
    },[]);
 
     
     
      if(Object.keys(clinicInform).length===0){
        return(
          <div>
          <img src='loading.gif' alt="loading..." style={{marginLeft:'auto',marginRight:'auto'}} />
         </div> 
        )

      }
      else{
         let clinicInformArray=clinicInform['status'];
         if(name==='drugStore'){
            return(
              <Stack direction={'column'}> 
                  <NavBar/>
                  <Text
                    as={'h1'}
                    fontSize={'30px'}
                    align={'center'}
                    fontWeight={'bold'}
                  >
                    {'附近藥局'}
                  
                  </Text>
                  <Stack direction={'column'} align={'center'}> 
                        {clinicInformArray.map((data)=>{
                          
                            return(
                            <DrugStoreCard key={data['id']} data={data}/>
                            );
                          
                        })}
                        
                      
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
                    {name==='popular' ? '熱門診所':'附近診所'}
                  
                  </Text>
                  <Stack direction={'column'} align={'center'}> 
                        {clinicInformArray.map((data)=>{
                            return(
                                <ClinicCard key={data['id']} data={data}/>
                            );
                          
                        })}
                        
                      
                  </Stack>
                  <Footer/>
              </Stack>
      
            );
          
         }
        

      }
     
}

 function ClinicCard(props) {
  console.log(props.data['name']);
    const property = {
      imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
      imageAlt: 'Clinic information',
      title: props.data['name'],
      address:props.data['address'],
      phoneNumber:props.data['phoneNumber'],
      clinicType:props.data['medicalType'],
    
    }
  
    return (
      <Stack maxW='60%'borderWidth='1px' borderRadius='lg' overflow='hidden'direction={'row'} mt={'10px'} mb={'10px'}>
        <Flex width='60%'>
          <Image src={property.imageUrl} alt={property.imageAlt}  />
        </Flex>
        <Flex width='40%'>
        <Box p='6' width='100%'>

          <Box
            mt='1'
            fontWeight='bold'
            fontSize='2xl'
            lineHeight='tight'
            noOfLines={1}
          >
            {property.title}
          </Box>
  
          <Box  mt='3'>
            <Text fontWeight={'bold'} fontSize={'xl'}mb={'2'}>診所科別:</Text>
            <Text fontSize={'l'}ml={'2'}>{property.clinicType}</Text>  
          </Box>
  
          <Box  mt='3'>
            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>地址:</Text>
            <Text fontSize={'l'}ml={'2'}>{property.address}</Text>  
          </Box>

          <Box  mt='3'>
            <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>電話:</Text>
            <Text fontSize={'l'}ml={'2'}>{property.phoneNumber}</Text>  
          </Box>

          

          <Box align={'right'} mt='3'>
            <Button
              bg={'blue.400'}
              as={'a'}
              href={'/clinicHomePage?type=clinic&&id='+props.data['id']}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
                 預約
             </Button>
          </Box>
          
        </Box>
        </Flex>
        
      </Stack>
    )
  }


  function DrugStoreCard(props) {
    console.log(props.data['name']);
      const property = {
        imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
        imageAlt: 'Clinic information',
        title: props.data['name'],
        address:props.data['address'],
        phoneNumber:props.data['phoneNumber'],
        insurance:props.data['insurance'],
      
      }
    
      return (
        <Stack maxW='60%'borderWidth='1px' borderRadius='lg' overflow='hidden'direction={'row'} mt={'10px'} mb={'10px'}>
          <Flex width='60%'>
            <Image src={property.imageUrl} alt={property.imageAlt}  />
          </Flex>
          <Flex width='40%'>
          <Box p='6' width='100%'>
  
            <Box
              mt='1'
              fontWeight='bold'
              fontSize='2xl'
              lineHeight='tight'
              noOfLines={1}
            >
              {property.title}
            </Box>
    
            
            <Box  mt='3'>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>地址:</Text>
              <Text fontSize={'l'}ml={'2'}> {property.address}</Text> 
            </Box>
  
            <Box  mt='3'>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>電話:</Text>
              <Text fontSize={'l'}ml={'2'}> {property.phoneNumber}</Text> 
            </Box>
            <Box  mt='3'>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={'2'}>是否為健保特約藥局:</Text>
              <Text fontSize={'l'}ml={'2'}>  {property.insurance===1?'是':'否'}</Text>
            </Box>
  
            
  
            <Box align={'right'} mt='3'>
              <Button
                bg={'blue.400'}
                as={'a'}
                href={'/clinicHomePage?type=drugStore&&id='+props.data['id']}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                   預約
               </Button>
            </Box>
            
          </Box>
          </Flex>
          
        </Stack>
      )
    }