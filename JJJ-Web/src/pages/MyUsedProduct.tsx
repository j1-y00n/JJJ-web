// 변지윤
// 내 중고상품 목록
import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/MyUsedProduct.module.css';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { wrap } from 'module';
import { useOpenModal } from '../hooks/useOpenModal';
import ModalIsDelete from '../components/ModalIsDelete';
import { UsedProduct } from '../types/type';
import {
  deleteUsedProduct,
  getUsedProducts,
} from '../services/usedProductServices';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../stores/User.store';

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
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, display: 'flex', flexWrap: 'wrap' }}>{children}</Box>
      )}
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
  usedProducts: UsedProduct;
  handleDeleteMyUsedProduct: () => void;
}

const CustomMyUsedItem = ({
  usedProducts,
  handleDeleteMyUsedProduct,
}: usedProductsProps) => {
  const isDelete = useOpenModal();

  return (
    <div className={styles.myused__container}>
      <div>
        <img
          src={usedProducts.usedProductThumbnail}
          alt={usedProducts.usedProductTitle}
          className={styles.myused__img}
        />
      </div>
      <div className={styles.myused__desc}>
        <div className={styles.myused__desc__title}>
          {usedProducts.usedProductTitle}
        </div>
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
          handleDeleteContent={handleDeleteMyUsedProduct}
        />
      </div>
    </div>
  );
};

export default function MyUsedProduct() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { user } = UserStore();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [usedProducts, setUsedProducts] = useState<UsedProduct[]>([]);

  useEffect(() => {
    const fetchUsedProducts = async () => {
      const fetchedUsedProducts = await getUsedProducts();
      const filterUser = fetchedUsedProducts.filter(
        (i) => Number(i.userId) === Number(user?.id)
      );
      setUsedProducts([...filterUser].reverse());
    };
    fetchUsedProducts();
  }, []);

  // 판매완료 중고상품 IsSold=true
  const soldProducts = usedProducts.filter(
    (product) => product.usedProductIsSold
  );

  // 판매중 중고상품
  const unsoldProducts = usedProducts.filter(
    (product) => !product.usedProductIsSold
  );

  // 중고상품 삭제
  const handleDeleteMyUsedProduct = async (id: number) => {
    try {
      await deleteUsedProduct(id);
      setUsedProducts(usedProducts.filter((item) => item.id != id));
      alert('SUCCESS MyUsedProduct delete');
    } catch (error) {
      console.log(error);
      alert('FAIL MyUsedProduct delete');
    }
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '40px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs'
          textColor='primary'
          centered
          variant='fullWidth'
          sx={{
            '& .MuiTab-root': {
              '&:hover': {
                color: 'var(--color-blue)',
              },
            },
          }}
        >
          <Tab label='판매중' {...a11yProps(0)} />
          <Tab label='판매완료' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* 판매중 내용 */}

        {unsoldProducts.length > 0 ? (
          unsoldProducts.map((product) => (
            <div key={product.id}>
              <CustomMyUsedItem
                usedProducts={product}
                handleDeleteMyUsedProduct={() =>
                  handleDeleteMyUsedProduct(product.id)
                }
              />
            </div>
          ))
        ) : (
          <div className={styles.no__usedProduct}>
            <h3>판매 중인 상품이 없습니다</h3>
            <Button
              onClick={() => navigate('/createUsedProduct')}
              sx={{ mt: 3 }}
            >
              중고 상품 등록 +
            </Button>
          </div>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* 판매완료 내용 */}

        {soldProducts.length > 0 ? (
          soldProducts.map((product) => (
            <div key={product.id}>
              <CustomMyUsedItem
                usedProducts={product}
                handleDeleteMyUsedProduct={() =>
                  handleDeleteMyUsedProduct(product.id)
                }
              />
            </div>
          ))
        ) : (
          <div className={styles.no__usedProduct}>
            <h3>판매 완료된 상품이 없습니다</h3>
            <Button
              onClick={() => navigate('/createUsedProduct')}
              sx={{ mt: 3 }}
            >
              중고 상품 등록 +
            </Button>
          </div>
        )}
      </CustomTabPanel>
    </Box>
  );
}
