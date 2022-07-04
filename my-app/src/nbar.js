import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  Badge
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import jwt from 'jwt-decode';
import{ useState,useEffect}from 'react';
import api from'./utils/api';
export default function WithSubnavigation(props) {
  
    let patientInform=JSON.parse(localStorage.getItem('token'));
    let chaneReserve=0;
    if(props.reserveNum!==undefined&&props.reserveNum!==0) console.log(props.reserveNum);
    if(patientInform===null){
      return(
        <SignInBar/>
      );
    }
    else{
      let expired=Date.parse(patientInform['user']['login_at'])+patientInform['user']['access_expired']<Date.parse(new Date());
      let token=jwt(patientInform['user']['access_token']);
      let identity=token['identity'];
      //console.log(token)
      if(identity==='patient'){
        return(
          <PatientBar data={token} changeReserve={props.reserveNum}/>
        );
      }
      else{
        return(
          <ClinicBar data={token}/>
        );
        
      }
      
    }
    
  

  
}

function signOut(){
  localStorage.removeItem('token');
  window.location.href='/';
}

function PatientBar(props){
  
  const { isOpen, onToggle } = useDisclosure();
  const[reserveNum,setReserveNum]=useState(0);
  //console.log(props.changeReserve);

  useEffect(() => {
    async function getInform(){
        let response=await api.getIndividualTotal(props.data['id']);

        setReserveNum(response['response']['num']);
        //console.log(response['response']['num']);
    }
    getInform();
},[props.changeReserve]);
  return (
  
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={0}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Link href={'/'}>
          <Image
            alt={'Logo Image'}
            objectFit={'cover'}
            src={
              './logo.jpg'
            }
            h={"100px"}
          />
        </Link>
       

          <Flex display={{ base: 'none', md: 'flex' }}align={'center'} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"waitingPage"}
            _hover={{
              bg: 'blue.300',
            }}>
            等待看診 <Badge ml='2' fontSize='0.8em' colorScheme='red'>
                    {reserveNum!=0?reserveNum:''}
                    </Badge>
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"memberInform"}
            _hover={{
              bg: 'blue.300',
            }}>
            會員資料
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300',
            }} onClick={()=>{signOut()}}>
            登出
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Box bg='blue.400' w='100%' p={4} >
      </Box>
    </Box>
     
   
  );



}

function ClinicBar(props){
  
  const { isOpen, onToggle } = useDisclosure();
  const[reserveNum,setReserveNum]=useState(0);
  //console.log(props.changeReserve);
  console.log(props.data);
  useEffect(() => {
    async function getInform(){
        let response=await api.getClinicReserve(props.data['clinicId']);
        setReserveNum(response['response']['num']);
        //console.log(response['response']['num'])
    }
    getInform();
},[]);
    
  return (
  
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={0}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Link href={'/waitingPage'}>
          <Image
            alt={'Logo Image'}
            objectFit={'cover'}
            src={
              './logo.jpg'
            }
            h={"100px"}
          />
        </Link>
       

          <Flex display={{ base: 'none', md: 'flex' }}align={'center'} ml={10}>
           
          </Flex>
        </Flex>
        <Text mr='10' fontSize={'xl'} fontWeight={600}>{props.data['clinicName']} 您好</Text>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"waitingPage"}
            _hover={{
              bg: 'blue.300',
            }}>
            等待看診 <Badge ml='2' fontSize='0.8em' colorScheme='red'>
                    {reserveNum!=0?reserveNum:''}
                    </Badge>
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300',
            }} onClick={()=>{signOut()}}>
            登出
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Box bg='blue.400' w='100%' p={4} >
      </Box>
    </Box>
     
   
  );



}



function SignInBar(){
  const { isOpen, onToggle } = useDisclosure();
  return (
  
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={0}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Link href={'/'}>
          <Image
            alt={'Logo Image'}
            objectFit={'cover'}
            src={
              './logo.jpg'
            }
            h={"100px"}
          />
        </Link>
       

          <Flex display={{ base: 'none', md: 'flex' }}align={'center'} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"clinicSignIn"}
            _hover={{
              bg: 'blue.300',
            }}>
            診所登入
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"signIn"}
            _hover={{
              bg: 'blue.300',
            }}>
            登入會員
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'xl'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={"signUp"}
            _hover={{
              bg: 'blue.300',
            }}>
            註冊會員
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Box bg='blue.400' w='100%' p={4} >
      </Box>
    </Box>
     
   
  );





}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                fontSize={'xl'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );

  

  
};



const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href }
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: '開始看診',
    children: [
      {
        label: '搜尋附近診所',
        href: '/clinic?catergory=nearby',
      },
      {
        label: '搜尋熱門診所',
        href: '/clinic?catergory=popular',
      },
    ],
  },
  {
    label: '預約領藥',
    children: [
      {
        label: '搜尋附近藥局',
        href: '/clinic?catergory=drugStore',
      },
    ],
  }
];