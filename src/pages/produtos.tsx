import type { NextPage } from 'next'
import { useContext, useEffect } from 'react';
import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';

const Produtos: NextPage = () => {
  const { setSelectedPage } = useContext(NavigateContext);

  useEffect(() => {
    setSelectedPage({ key: 'produtos', title: 'Produtos' });
  }, [setSelectedPage]);

  return (
    <MenuSidebar>
      Produtos Works
    </MenuSidebar>
  )
}

export default Produtos
