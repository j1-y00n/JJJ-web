// 변지윤
// 내 중고상품 목록
import React from 'react'
import styles from '../styles/pages/MyUsedProduct.module.css'
import { Box, Button, Tab, Tabs } from '@mui/material';
import exampleImg from '../assets/images/cars.jpg';
import { wrap } from 'module';
import { useOpenModal } from '../hooks/useOpenModal';
import ModalIsDelete from '../components/ModalIsDelete';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, display: 'flex', flexWrap: 'wrap' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomMyUsedItem = () => {
  const isDelete = useOpenModal();

  return (
    <div className={styles.myused__container}>
    <div>
      <img src={exampleImg} alt="장난감이미지" className={styles.myused__img} />
    </div>
    <div className={styles.myused__desc}>
      <div className={styles.myused__desc__title}>0000장난감</div>
      <div>00000원</div>
      <div>1개</div>
    </div>
    <div>
      <Button 
        className={styles.myused__button}
        onClick={isDelete.handleOpenModal}
      >
        게시글 삭제
      </Button>
      <ModalIsDelete
        isOpen={isDelete.isOpen}
        handleCloseModal={isDelete.handleCloseModal}
      />
    </div>
  </div>
  )
}


export default function MyUsedProduct() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '40px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs" 
          textColor="primary" 
          centered
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              '&:hover': {
                color: 'var(--color-blue)',
              },
            },
          }}
        >
          <Tab label="판매중" {...a11yProps(0)} />
          <Tab label="판매완료" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* 판매중 내용 */}
        <CustomMyUsedItem />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* 판매완료 내용 */}
        <CustomMyUsedItem />
        <CustomMyUsedItem />
        <CustomMyUsedItem />
        <CustomMyUsedItem />
        <CustomMyUsedItem />
      </CustomTabPanel>
    </Box>
  );
}