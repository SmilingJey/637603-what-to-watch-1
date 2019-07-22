import * as React from 'react';

import PromoCard from '../../components/promo-movie/promo-movie';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';

const MainPage = () => {
  return <>
    <PromoCard />
    <div className="page-content">
      <Catalog />
      <Footer />
    </div>
  </>;
};

export default MainPage;
