import { CategoryContainer, Title } from './category.styles';

import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>

      <CategoryContainer>
        {/* guard if products is undef */}
        {products &&
          products.map((product) => <ProductCard key={product.id} product={product} />)}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
