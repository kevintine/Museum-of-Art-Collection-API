import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import useSWR from 'swr'

// We are using swr in this component to fetch data from the API
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
  const { data, error } = useSWR(url, fetcher);
  if (error) return <Error statusCode={404}/>;
  if (!data) return null;
  return (
    <>
        <Card style={{ width: '18rem' }}>
        {data.primaryImage ? <Card.Img variant="top" src={data.primaryImage} /> : null}
        <Card.Body>
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text>
                Date: {data.objectDate ? data.objectDate : "N/A"}
            </Card.Text>
            <Card.Text>
                Classification: {data.classification ? data.classification : "N/A"}
            </Card.Text>
            <Card.Text>
                Medium: {data.medium ? data.medium : "N/A"}
            </Card.Text>
            <Link href={`/artwork/${objectID}`}>
                <Button variant="primary">ID: {objectID}</Button>
            </Link>
        </Card.Body>
        </Card>
    </>
  )
}
