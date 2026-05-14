import { useCallback, useMemo, useState } from 'react';

import {
  ALL_PROPERTIES,
  PROPERTY_CATEGORIES,
  PROPERTIES_SCREEN_DATA,
  type Property,
  type PropertyCategory,
} from '../data/mockData';

const PAGE_SIZE = PROPERTIES_SCREEN_DATA.pageSize;

export function usePropertiesState() {
  
  const [selectedCategory, setSelectedCategory] = useState<string>('inmuebles');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const toggleCategoryDropdown = useCallback(() => {
    setCategoryDropdownOpen((prev) => !prev);
    
    setToolsMenuOpen(false);
  }, []);

  const selectCategory = useCallback((key: string) => {
    setSelectedCategory(key);
    setCategoryDropdownOpen(false);
    setCurrentPage(1); 
  }, []);

  const activeCategoryLabel =
    PROPERTY_CATEGORIES.find((c) => c.key === selectedCategory)?.label ?? 'Inmuebles';

  
  const [searchQuery, setSearchQuery] = useState('');

  
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);

  const toggleToolsMenu = useCallback(() => {
    setToolsMenuOpen((prev) => !prev);
    
    setCategoryDropdownOpen(false);
  }, []);

  const handleToolAction = useCallback((toolKey: string) => {
    setToolsMenuOpen(false);
    
    
    console.log(`Tool action: ${toolKey}`);
  }, []);

  
  const filteredProperties = useMemo(() => {
    let result = ALL_PROPERTIES.filter((p) => p.category === selectedCategory);

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.code.toLowerCase().includes(q) ||
          p.propietario.toLowerCase().includes(q) ||
          p.direccionCompleta.toLowerCase().includes(q) ||
          p.estadoInmueble.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  
  const safePage = Math.min(currentPage, totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }

  const paginatedProperties = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProperties.slice(start, start + PAGE_SIZE);
  }, [filteredProperties, safePage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const goToFirstPage = useCallback(() => goToPage(1), [goToPage]);
  const goToPrevPage = useCallback(() => goToPage(safePage - 1), [goToPage, safePage]);
  const goToNextPage = useCallback(() => goToPage(safePage + 1), [goToPage, safePage]);
  const goToLastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);

  const paginationInfo = {
    currentPage: safePage,
    totalPages,
    totalItems,
    pageSize: PAGE_SIZE,
    from: totalItems === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1,
    to: Math.min(safePage * PAGE_SIZE, totalItems),
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };

  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const openDetail = useCallback((property: Property) => {
    setSelectedProperty(property);
    setDetailModalVisible(true);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailModalVisible(false);
    
  }, []);

  
  return {
    
    categories: PROPERTY_CATEGORIES,
    selectedCategory,
    activeCategoryLabel,
    categoryDropdownOpen,
    toggleCategoryDropdown,
    selectCategory,

    
    searchQuery,
    setSearchQuery,

    
    toolsMenuOpen,
    toggleToolsMenu,
    handleToolAction,
    toolsMenuItems: PROPERTIES_SCREEN_DATA.toolsMenu,

    
    filteredProperties,
    paginatedProperties,

    
    pagination: paginationInfo,
    goToPage,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,

    
    selectedProperty,
    detailModalVisible,
    openDetail,
    closeDetail,
  };
}
