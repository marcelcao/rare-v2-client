import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import CategoryCard from '../../components/cards/CategoryCard';
import { getCategories } from '../../utils/data/categoryData';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  // const router = useRouter();
  // const { user } = useAuth();

  const showCategories = () => {
    getCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    showCategories();
  }, []);

  // const categories = [
  //   { id: 1, label: 'Category 1' }, // default example category placeholder
  //   { id: 2, label: 'Category 2' }, // default example category placeholder
  // ];

  return (
    <Container>
      <h1>Categories</h1>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={6} lg={4}>
            <CategoryCard categoryObj={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryPage;
