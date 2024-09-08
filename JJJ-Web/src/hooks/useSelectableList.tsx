import { useState } from "react";

export function useSelectableList<T>(items: T[], getId: (item: T) => number) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 선택된 항목의 id를 상태로 관리
  const handleCheck = (id: number) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        // 선택 해제
        newSelected.delete(id);
      } else {
        // 선택
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // 전체선택 및 전체해제
  const handleSelectAll = () => {
    if (selectedIds.size === items.length) {
      // Set 초기화, 전체해제
      setSelectedIds(new Set());
    } else {
      // 전체선택
      setSelectedIds(new Set(items.map(item => getId(item))));
    }
  };

  //  선택된 항목 삭제 비동기
  const handleDeleteSelected = async (deleteFunction: (ids: number[])  => Promise<void>) => {
    try {
      const idsArray = Array.from(selectedIds);
      await deleteFunction(idsArray);
      setSelectedIds(new Set());
    } catch (error) {
      console.error('FAIL delete selected', error);
    }
  };

  return {
    // 선택된 항목들의 id 목록
    selectedIds,
    // 개별 항목 선택/해제 함수
    handleCheck,
    // 전체 선택/해제 함수
    handleSelectAll,
    // 선택항목 삭제 함수
    handleDeleteSelected
  };
}