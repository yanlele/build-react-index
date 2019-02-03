import React from 'react';
import {Field, Form, Formik} from 'formik';

const EditUserDialog = ({user, updateUser, onClose}) => {
    return (
        <div onClose={onClose}>
            <h1>Edit User</h1>
            <Formik
                initialValues={user /** { email, social } */}
                onSubmit={(values, actions) => {
                    console.log(values);
                    setTimeout(()=> actions.setSubmitting(false), 2000);
                    /*CallMyApi(user.id, values).then(
                        updatedUser => {
                            actions.setSubmitting(false);
                            updateUser(updatedUser), onClose();
                        },
                        error => {
                            actions.setSubmitting(false);
                            actions.setErrors(transformMyAPIErrorToAnObject(error));
                        }
                    );*/
                }}
                render={({errors, touched, isSubmitting}) => (
                    <Form>
                        <Field type="id" name="id"/>
                        {errors.id && <div>{errors.id}</div>} <br/>
                        <Field type="text" name="email"/>
                        {errors.email && touched.email && <div>{errors.email}</div>} <br/>
                        <Field type="text" name="social.facebook"/>
                        {errors.social && errors.social.facebook &&
                        touched.facebook && <div>{errors.social.facebook}</div>} <br/>
                        <Field type="text" name="social.twitter"/>
                        {errors.social && errors.social.twitter &&
                        touched.social.twitter && <div>{errors.social.twitter}</div>} <br/>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            />
        </div>
    );
};


class Test extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                email: '',
                social: {
                    facebook: '',
                    twitter: '',
                }
            }
        }
    };

    handleUpdateUser = (user) => {
        this.setState({
            user
        })
    };

    render() {
        console.log(this.state.user);
        return (
            <div>
                {EditUserDialog({
                    user: this.state.user,
                    updateUser: this.handleUpdateUser
                })}
            </div>
        )
    }
}

export default Test;
