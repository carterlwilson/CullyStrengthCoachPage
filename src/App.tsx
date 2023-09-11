import './App.css';
import { Box, ChakraProvider, Stack, VStack, useColorModeValue, Drawer, DrawerContent, Flex, Button } from '@chakra-ui/react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ClientPage from './pages/ClientPage/ClientPage';
import ScheduleBuilder from './pages/ScheduleBuilder/ScheduleBulder';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import ExerciseEditorPage from './pages/ExerciseEditorPage';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Flex flexDirection={"row"}>
            <Box 
              minH="100vh" 
              bg={useColorModeValue('gray.100', 'gray.900')} 
              w="15%" 
              id='sidebar_box'>
              <Flex flexDirection={"column"}
                id='sidebar_flexbox'>
                <Link to="/clients">
                  <Button 
                    variant="ghost" 
                    colorScheme="green" 
                    width="100%" 
                    id='link_btn_1'>
                    Clients
                  </Button>
                </Link>
                <Link to="/schedule-builder">
                  <Button 
                    variant="ghost" 
                    colorScheme="green" 
                    width="100%" 
                    id='lind_btn_2'>
                    Schedule Builder
                  </Button>
                </Link>
                <Link to="/exercises">
                  <Button 
                    variant="ghost" 
                    colorScheme="green" 
                    width="100%" 
                    id='lind_btn_2'>
                    Exercise Editor
                  </Button>
                </Link>
              </Flex>
            </Box>
            
            <Box w="100%" id='content-container'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/clients' element={<ClientPage />} />
                <Route path='/schedule-builder' element={<ScheduleBuilder />} />
                <Route path='/exercises' element={<ExerciseEditorPage />} />
              </Routes>
            </Box>
          </Flex>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
