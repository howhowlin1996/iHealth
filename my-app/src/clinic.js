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
import { useLocation } from 'react-router-dom';

export default function Clinic(){
    const search = useLocation().search;
    var name='popular';
     name = new URLSearchParams(search).get('catergory');
    console.log(name);
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
                  <ClinicCard/>
                  <ClinicCard/>
                  <ClinicCard/>
                  <ClinicCard/>
                  <ClinicCard/>
             </Stack>
             <Footer/>
        </Stack>

      );
}

 function ClinicCard() {
    const property = {
      imageUrl: 'https://www.kantfamilyclinic.com/upload/images/P1010472.JPG',
      imageAlt: 'Clinic information',
      title: '康德診所',
      address:'新竹市東區新莊里光復路一段362之2號',
      phoneNumber:'03-5788282',
      physicalCheckUp:'門診診療,兒童預防保健,成人預防保健,定量免疫法糞便潛血檢查',
      profession:'不分科',
    
    }
  
    return (
      <Stack maxW='60%'borderWidth='1px' borderRadius='lg' overflow='hidden'direction={'row'} mt={'10px'} mb={'10px'}>
        <Flex width='50%'>
          <Image src={property.imageUrl} alt={property.imageAlt}  />
        </Flex>
        <Flex>
        <Box p='6'>

          <Box
            mt='1'
            fontWeight='bold'
            fontSize='xl'
            lineHeight='tight'
            noOfLines={1}
          >
            {property.title}
          </Box>
  
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

          <Box align={'right'} mt='1'>
            <Button
              bg={'blue.400'}
              as={'a'}
              href={'/clinicHomePage'}
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