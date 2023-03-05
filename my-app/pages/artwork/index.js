import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Row, Col, Pagination, Card } from 'react-bootstrap'
import useSWR from 'swr'
import ArtworkCard from '../../components/ArtworkCard';

const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function index() {
    // Ensure that the following values are in the state: "artworkList" (no default value) and "page" (default value of 1)
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1)
    // Use the "useRouter" hook to get the full value of the query string.  This can be accomplished using the following code:
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    // o	Use SWR to make a request to: 
    // https://collectionapi.metmuseum.org/public/collection/v1/search?finalQuery
    // where finalQuery is the value containing the full query string (from above)
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`;
    const { data, error } = useSWR(url, fetcher);
    // if (error) return <Error statusCode={404}/>;
    // if (!data) return null;
    // Make use of the "useEffect" hook such that
    // The data value (from SWR) is included in the dependency array (ie: [data])
    // Finally set the page value in the state to 1
    useEffect(() => {
        if (data) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
              
            setArtworkList(results); 
        }   
        setPage(1);
    }, (data));
    // Declare two functions: previousPage() and nextPage() with logic to either decrease the value of page by 1 (if page > 1) 
    // or increase the value of page by 1 (if page < artworkList.length)
    function previousPage() {
        if (page > 1) {
        setPage(page - 1);
        }
    }
    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    }

  return (
    <>
        {artworkList ? <Row className="gy-4">
            {artworkList.length > 0 ? artworkList[page - 1].map((objectID) => (
                <Col key={objectID} md={3}>
                    <ArtworkCard objectID={objectID} />
                </Col>
            )) : <h4>Nothing Here</h4>}
            </Row>:
            null
        }
        <Pagination>
            <Pagination.Prev onClick={previousPage}/>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
        </Pagination>
    </>
  )
}

