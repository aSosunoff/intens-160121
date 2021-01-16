import React from 'react'
import {Field, Form, Formik} from 'formik'
import firebase from "firebase/app";

function SignUpForm() {
    const handleSubmit = async ({ email, password }) => {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    }

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
                    <button type="submit">submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
