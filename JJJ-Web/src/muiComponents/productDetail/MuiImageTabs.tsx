import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import img01 from '../../assets/images/exam01.jpg';
import img02 from '../../assets/images/exam02.jpg';
import img03 from '../../assets/images/exam03.jpg';

interface Image {
  src: string;
  alt: string;
  value: string;
}

interface ImagePanelProps {
  src: string;
  alt: string;
}
const images: Image[] = [
  { src: img01, alt: 'Image 1', value: '1' },
  { src: img02, alt: 'Image 2', value: '2' },
  { src: img03, alt: 'Image 3', value: '3' },
];

const ImagePanel: React.FC<ImagePanelProps> = ({ src, alt }) => (
  <Box
    component='img'
    src={src}
    alt={alt}
    sx={{ width: '100%', height: '400px', objectFit: 'cover' }}
  />
);

const ImageTab: React.FC<Image> = ({ src, alt, value }) => (
  <Tab
    label={
      <Box
        component='img'
        src={src}
        alt={alt}
        sx={{ width: '100px', height: 'auto' }}
      />
    }
    value={value}
  />
);

export default function MuiImageTabs() {
  const [value, setValue] = React.useState('1');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '50%', typography: 'body1' }}>
      <TabContext value={value}>
        {images.map((image) => (
          <TabPanel key={image.value} value={image.value}>
            <ImagePanel src={image.src} alt={image.alt} />
          </TabPanel>
        ))}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            {/* {images.map((image) => (
              <ImageTab
                key={image.value}
                src={image.src}
                alt={image.alt}
                value={image.value}
              />
            ))} */}

            <Tab
              label={
                <Box
                  component='img'
                  src={img01}
                  alt=''
                  sx={{ width: '100px', height: 'auto' }}
                />
              }
              value='1'
            />
            <Tab
              label={
                <Box
                  component='img'
                  src={img02}
                  alt=''
                  sx={{ width: '100px', height: 'auto' }}
                />
              }
              value='2'
            />
            <Tab
              label={
                <Box
                  component='img'
                  src={img03}
                  alt=''
                  sx={{ width: '100px', height: 'auto' }}
                />
              }
              value='3'
            />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
