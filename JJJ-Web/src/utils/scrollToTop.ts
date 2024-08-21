import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// 페이지 변환시 스크롤을 최상단에 두기 위한 기능
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
