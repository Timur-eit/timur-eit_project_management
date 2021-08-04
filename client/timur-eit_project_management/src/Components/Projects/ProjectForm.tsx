import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import {IProject} from '../../ducks/project'


export const ProjectForm = ({title, handleSubmit, values} : {title : string, handleSubmit: any, values?: IProject}) => {

    return (
        <div>
            <h2>{title}</h2>
            <Formik
                initialValues={values ? values : {
                    name: '',
                    code: '',
                }}
                onSubmit={(values: IProject, {setSubmitting}: FormikHelpers<IProject>) => {
                    handleSubmit(values)
                    setSubmitting(false)
                }}
            >
                <Form>
                    <label htmlFor="name">Name</label>
                    <Field id="name" name="name" placeholder="pass name" />

                    <label htmlFor="code">Code</label>
                    <Field id="code" name="code" placeholder="pass code" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}