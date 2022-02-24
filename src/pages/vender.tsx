import type { NextPage } from 'next'
import { useContext, useEffect } from 'react';
import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';

const Vender: NextPage = () => {
  const { setSelectedPage } = useContext(NavigateContext);

  useEffect(() => {
    setSelectedPage({ key: 'vender', title: 'Vender' });
  }, [setSelectedPage]);

  return (
    <MenuSidebar>
      Vender Works
    </MenuSidebar>
  )
}

export default Vender
