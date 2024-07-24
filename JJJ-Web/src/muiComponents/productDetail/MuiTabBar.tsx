import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { theme } from '../../styles/theme';

export default function MuiTabBar() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            sx={{
              border: '1px solid black',
            }}
            onChange={handleChange}
            aria-label='lab API tabs example'
          >
            <Tab
              label='상품 설명'
              value='1'
              sx={{
                flex: '1',
                backgroundColor: 'default',
                color: 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main', // Background color when selected
                  color: 'text.secondary', // Text color when selected
                },
              }}
            />
            <Tab
              label='상품 리뷰'
              value='2'
              sx={{
                flex: '1',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                backgroundColor: 'default',
                color: 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main', // Background color when selected
                  color: 'text.secondary', // Text color when selected
                },
              }}
            />
            <Tab
              label='Q & A'
              value='3'
              sx={{
                flex: '1',
                backgroundColor: 'default',
                color: 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main', // Background color when selected
                  color: 'text.secondary', // Text color when selected
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value='1' sx={{ width: '100%' }}>
          <Box>
            아이템 : 1 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur aut cumque, voluptatum sequi rerum dolorum corrupti
            dolor quo incidunt eius quibusdam, voluptatibus, sapiente placeat
            tempora cupiditate necessitatibus maxime assumenda voluptates. Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Consectetur aut
            cumque, voluptatum sequi rerum dolorum corrupti dolor quo incidunt
            eius quibusdam, voluptatibus, sapiente placeat tempora cupiditate
            necessitatibus maxime assumenda voluptates. Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Consectetur aut cumque,
            voluptatum sequi rerum dolorum corrupti dolor quo incidunt eius
            quibusdam, voluptatibus, sapiente placeat tempora cupiditate
            necessitatibus maxime assumenda voluptates. Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Consectetur aut cumque,
            voluptatum sequi rerum dolorum corrupti dolor quo incidunt eius
            quibusdam, voluptatibus, sapiente placeat tempora cupiditate
            necessitatibus maxime assumenda voluptates. Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Consectetur aut cumque,
            voluptatum sequi rerum dolorum corrupti dolor quo incidunt eius
            quibusdam, voluptatibus, sapiente placeat tempora cupiditate
            necessitatibus maxime assumenda voluptates.
          </Box>
        </TabPanel>
        <TabPanel value='2'>
          {' '}
          아이템 : 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Consectetur aut cumque, voluptatum sequi rerum dolorum corrupti dolor
          quo incidunt eius quibusdam, voluptatibus, sapiente placeat tempora
          cupiditate necessitatibus maxime assumenda voluptates. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Consectetur aut cumque,
          voluptatum sequi rerum dolorum corrupti dolor quo incidunt eius
          quibusdam, voluptatibus, sapiente placeat tempora cupiditate
          necessitatibus maxime assumenda voluptates. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Consectetur aut cumque, voluptatum
          sequi rerum dolorum corrupti dolor quo incidunt eius quibusdam,
          voluptatibus, sapiente placeat tempora cupiditate necessitatibus
          maxime assumenda voluptates. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Consectetur aut cumque, voluptatum sequi rerum
          dolorum corrupti dolor quo incidunt eius quibusdam, voluptatibus,
          sapiente placeat tempora cupiditate necessitatibus maxime assumenda
          voluptates.
        </TabPanel>
        <TabPanel value='3'>
          {' '}
          아이템 : 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Consectetur aut cumque, voluptatum sequi rerum dolorum corrupti dolor
          quo incidunt eius quibusdam, voluptatibus, sapiente placeat tempora
          cupiditate necessitatibus maxime assumenda voluptates. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Consectetur aut cumque,
          voluptatum sequi rerum dolorum corrupti dolor quo incidunt eius
          quibusdam, voluptatibus, sapiente placeat tempora cupiditate
          necessitatibus maxime assumenda voluptates. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Consectetur aut cumque, voluptatum
          sequi rerum dolorum corrupti dolor quo incidunt eius quibusdam,
          voluptatibus, sapiente placeat tempora cupiditate necessitatibus
          maxime assumenda voluptates. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Consectetur aut cumque, voluptatum sequi rerum
          dolorum corrupti dolor quo incidunt eius quibusdam, voluptatibus,
          sapiente placeat tempora cupiditate necessitatibus maxime assumenda
          voluptates.
        </TabPanel>
      </TabContext>
    </Box>
  );
}
