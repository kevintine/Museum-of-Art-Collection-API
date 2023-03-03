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
                Medium: {data.medium ? data.medium : "N/A"}
            </Card.Text>
            <br></br>
            <br></br>
            {data.artistDisplayName ? <Card.Text>Artist: {data.artistDisplayName}</Card.Text> : "N/A"}
            {data.creditLine ? <Card.Text>Credit Line: {data.creditLine}</Card.Text> : "N/A"}
            {data.dimensions ? <Card.Text>Dimensions: {data.dimensions}</Card.Text> : "N/A"}
            <Link href={`/artwork/${objectID}`}>
                <Button variant="primary">ID: {objectID}</Button>
            </Link>
        </Card.Body>
        </Card>
    </>
  )
}
