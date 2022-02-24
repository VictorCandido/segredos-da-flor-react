import type { NextPage } from 'next'
import { useContext, useEffect } from 'react';
import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';

const Comprar: NextPage = () => {
  const { setSelectedPage } = useContext(NavigateContext);

  useEffect(() => {
    setSelectedPage({ key: 'comprar', title: 'Comprar' });
  }, [setSelectedPage]);

  return (
    <MenuSidebar>
      Comprar Works
    </MenuSidebar>
  )
}

export default Comprar
