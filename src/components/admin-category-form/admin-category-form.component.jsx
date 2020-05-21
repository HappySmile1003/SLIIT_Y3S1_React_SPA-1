import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaPlusCircle} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-category-form-styles.scss'

const schema = yup.object().shape({
  categoryTitle: yup
    .string()
    .min(2, 'Category title must be at least 2 characters long.')
    .required('Please enter the category title.'),
  categoryDescription: yup
    .string()
    .min(5, 'Category description must be at least 5 characters long.')
    .required('Please enter the category description.')
})

let errors_ = ''

const AddCategoryForm = () => {
  useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState({
    categoryTitle: '',
    categoryDescription: ''
  })

  const onSubmitHand = async (values) => {
    setLoading(true)
    setCategoryData(values)
    try {
      const response = await fetch('http://localhost:5000/admin/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      await response.json();
      setLoading(false)
    } catch (errors_) {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={categoryData}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              errors
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder='Title'
                    type='text'
                    name='categoryTitle'
                    value={values.categoryTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.categoryTitle && errors.categoryTitle}
                    isValid={touched.categoryTitle && !errors.categoryTitle}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.categoryTitle}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder='Description'
                    type='text'
                    name='categoryDescription'
                    value={values.categoryDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.categoryDescription && errors.categoryDescription}
                    isValid={touched.categoryDescription && !errors.categoryDescription}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.categoryDescription}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              {loading && (
                <Spinner
                  animation='border'
                  style={{textAlign: 'center', marginLeft: '48%'}}
                />
              )}
              <Button
                type='submit'
                disabled={isSubmitting}
                style={{
                  marginTop: '3%',
                  marginLeft: '40%',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
              >
                <FaPlusCircle
                  style={{
                    marginRight: '9px',
                    marginBottom: '6px'
                  }}
                />
                Add
              </Button>
              {errors_ && <div id='serverErrors'>{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default AddCategoryForm
