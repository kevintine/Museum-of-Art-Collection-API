import { useRouter } from "next/router"
import { Row, Col } from "react-bootstrap"
import ArtworkCardDetail from "../../components/ArtworkCardDetail"

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <>
        { objectID ?
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
        : <h4>Nothing Found</h4>}
    </>
  )
}