import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import img01 from '../../assets/images/exam01.jpg';
import img02 from '../../assets/images/exam02.jpg';
import img03 from '../../assets/images/exam03.jpg';

const bigImg = {
  width: '400px',
};
const smallImgs = {
  width: '100px',
};
export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <TabPanel value='1'>
          <img src={img01} alt='' style={bigImg} />
        </TabPanel>
        <TabPanel value='2'>
          <img src={img02} alt='' style={bigImg} />
        </TabPanel>
        <TabPanel value='3'>
          <img src={img03} alt='' style={bigImg} />
        </TabPanel>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab
              label={<img src={img01} alt='' style={smallImgs} />}
              value='1'
            />
            <Tab
              label={<img src={img02} alt='' style={smallImgs} />}
              value='2'
            />
            <Tab
              label={<img src={img03} alt='' style={smallImgs} />}
              value='3'
            />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
