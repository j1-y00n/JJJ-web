// 변지윤
// 내 중고상품 목록
import React, { useEffect, useState } from 'react'
import styles from '../styles/pages/MyUsedProduct.module.css'
import { Box, Button, Tab, Tabs } from '@mui/material';
import { wrap } from 'module';
import { useOpenModal } from '../hooks/useOpenModal';
import ModalIsDelete from '../components/ModalIsDelete';
import { UsedProduct } from '../types/type';
import { getUsedProducts } from '../services/usedProductServices';


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

interface usedProductsProps {
  usedProducts : UsedProduct;
}

const CustomMyUsedItem = ({usedProducts}: usedProductsProps) => {
  const isDelete = useOpenModal();

  return (
    <div className={styles.myused__container}>
    <div>
      <img src={usedProducts.usedProductThumbnail} alt={usedProducts.usedProductTitle} className={styles.myused__img} />
    </div>
    <div className={styles.myused__desc}>
      <div className={styles.myused__desc__title}>{usedProducts.usedProductTitle}</div>
      <div>{usedProducts.usedProductPrice} 원</div>
      <div>{usedProducts.usedProductQuantity} 개</div>
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

  const [usedProducts, setUsedProducts] = useState<UsedProduct[]>([]);

  useEffect(() => {
    const fetchUsedProducts = async () => {
      const fetchedUsedProducts = await getUsedProducts();
      const filterUser = fetchedUsedProducts.filter(i => i.userId === 1);
      setUsedProducts(filterUser);
    };
    fetchUsedProducts();
  },[]);

  // 판매완료 중고상품 IsSold=true
  const soldProducts = usedProducts.filter(product => product.usedProductIsSold);

  // 판매중 중고상품
  const unsoldProducts = usedProducts.filter(product => !product.usedProductIsSold);

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

        {unsoldProducts.map(product => 
          <div key={product.id}>
            <CustomMyUsedItem usedProducts={product}/>
          </div>
        )}

      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* 판매완료 내용 */}

        {soldProducts.map(product => 
          <div key={product.id}>
            <CustomMyUsedItem usedProducts={product}/>
          </div>
        )}

      </CustomTabPanel>
    </Box>
  );
}