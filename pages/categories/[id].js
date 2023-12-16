import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getSingleCategory } from '../../utils/data/categoryData';

function CategoryDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const fetchedCategory = await getSingleCategory(id);
        setCategory(fetchedCategory);
      } catch (error) {
        // Handle error
      }
    };

    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  if (!category) {
    return <div>Loading...no category selected or presently exists.</div>;
  }

  return (
    <Container>
      <h1>Category Details</h1>
      <p>Category ID: {id}</p>
      <p>Category Label: {category.label}</p>
      {/* Any other detailed information for category details lists here */}
    </Container>
  );
}

export default CategoryDetailsPage;
