import type { NextPage } from 'next'
import { useContext, useEffect } from 'react';
import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';

const Home: NextPage = () => {
  const { setSelectedPage } = useContext(NavigateContext);

  useEffect(() => {
    setSelectedPage({ key: 'home', title: 'Home' });
  }, [setSelectedPage]);

  return (
    <MenuSidebar>
      Home Works
    </MenuSidebar>
  )
}

export default Home
