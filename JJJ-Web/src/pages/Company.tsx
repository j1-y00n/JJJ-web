// 박용재
// 변지윤

import React, { useEffect } from 'react'
import styles from '../styles/pages/Company.module.css'
import Header from '../components/Header'

// kakao 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

export function Kakao() {
  
  useEffect(() => {
    const { kakao } = window;

    // 지도를 담을 영역의 DOM레퍼런스
    const container = document.getElementById('map');
    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      // 지도의 중심좌표
      center: new kakao.maps.LatLng(35.1524174833396, 129.059590929327),
      level: 3
    };

    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치
    const markerPosition = new kakao.maps.LatLng(35.1524174833396, 129.059590929327); 

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });

    marker.setMap(map);

    const iwContent = '<div style="padding:8px; font-size:14px">제이스 장난감 백화점</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(35.1524174833396, 129.059590929327); //인포윈도우 표시 위치입

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
      position : iwPosition, 
      content : iwContent 
    })

    // 마커 위에 인포윈도우를 표시. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker); 


  }, [])

  return (
    <div id="map" style={{width: '100%', height: '500px'}}></div>
  )
}


export default function Company() {
  return (

    <div  className='flex__container'>
      <Header />
      <div className={styles.company__title}>찾아오시는 길</div>
      <Kakao />
      <div className={styles.company__des}>
        <div>
          <p className={styles.company__des__title}>주소</p>
          <p>부산광역시 부산진구 중앙대로 668, 에이원프라자 4층</p>
        </div>
        <div>
          <p className={styles.company__des__title}>연락처</p>
          <p>대표연락처 : 000-0000-0000</p>
          <p>이메일 : JJJ@DepartmentStore.com</p>
        </div>
      </div>

      <div className={styles.company__diraction}>
        <div>
          <p className={styles.company__diraction__title}>지하철 이용 시</p>
          <p>
            부산 지하철 서면역 하차(10번 출구) &rarr; 도보 약 10분
          </p>
        </div>
        <div>
          <p className={styles.company__diraction__title}>버스 이용 시</p>
          <p>
            서면역 인근 버스 정류장 하차(29, 43, 52, 62, 80, 86, 103, 108, 133, 1004, 1001, 1002) &rarr; 도보 이동
          </p>
        </div>
        <div>
          <p className={styles.company__diraction__title}>자가용 이용 시</p>
          <p>
            중앙대로를 따라 서면역 방향으로 직진
          </p>
        </div>
      </div>
    </div>
  )
}