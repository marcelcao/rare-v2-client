import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryCard from '../../components/cards/CategoryCard';

function CategoryPage() {
  const categories = [
    { id: 1, label: 'Category 1' }, // default example category placeholder
    { id: 2, label: 'Category 2' }, // default example category placeholder
  ];

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
