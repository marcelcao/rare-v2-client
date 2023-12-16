/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function CategoryCard({ categoryObj }) {
  return (
    <Card className="categoryCard">
      <Card.Body>
        <div id="categoryBody">
          <Card.Title className="cardTitle">{categoryObj.label}</Card.Title>
        </div>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
