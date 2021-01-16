import React from 'react'
import {Field, Form, Formik} from 'formik'

function SignUpForm() {
    const handleSubmit = ({ email, password }) => console.log(email, password)
    return (
        <div>
            <h3>Sign Up Form</h3>

            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        email: <Field type="email" name="email" />
                    </div>
                    <Field
                        type="password"
                        name="password"
                        validate={(password) =>
                            password && password.length >= 8 ? undefined : "password is to short"
                        }
                    >
                        {
                            ({ field, meta }) => (
                                <div>
                                    password: <input {...field} type="password"/>
                                    {meta.error && meta.touched && (
                                        <div style={{color: 'red'}}>{meta.error}</div>
                                    )}
                                </div>
                            )
                        }
                    </Field>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
