import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function search() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            query: "",
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isHighlight: false,
            isOnView: false
        }
    })

    const submitForm = (data) => {
        let query = "/artwork?"
        query += `${data?.searchBy}=true`
        query += data.geoLocation ? `&geoLocation=${data.geoLocation}` : ""
        query += data.medium ? `&medium=${data.medium}` : ""
        query += `&isOnView=${data?.isOnView}`
        query += `&isHighlight=${data?.isHighlight}`
        query += `&q=${data?.query}`
        router.push(query)
    }
  return (
    <>
        <Form onSubmit={handleSubmit(submitForm)}> 
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control type="text" placeholder="" name="q" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3">
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation" />
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium"/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
    </>
  )
}
