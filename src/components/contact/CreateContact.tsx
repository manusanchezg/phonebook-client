import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ErrorsInterface } from "../../interface";

function CreateContact() {
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nickname: "",
    photo: "",
  };
  return (
    <>
      <div>
        <figure>
          <img src="" alt="" />
          <figure>Profile picture</figure>
        </figure>
        <input type="file" />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        validate={(values) => {
          const errors: ErrorsInterface = {};
          if (
            !values.firstName ||
            !values.lastName ||
            !values.phoneNumber ||
            !values.photo
          ) {
            errors.firstName = "Field required";
            errors.lastName = "Field required";
            errors.nickname = "Field required";
            errors.phoneNumber = "Field required";
          } else if (
            !/^[a-zA-Z]+$/g.test(values.firstName) ||
            !/^[a-zA-Z]+$/g.test(values.lastName) ||
            !/^[a-zA-Z]+$/g.test(values.nickname)
          ) {
            errors.firstName = "First name should be only letters";
            errors.lastName = "Last name should be only letters";
            errors.nickname = "Nickname should be only letters";
          } else if (
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/.test(
              values.phoneNumber
            )
          ) {
            errors.phoneNumber = "Incorrect phone number";
          }
          return errors;
        }}
      >
        <Form>
          <Field type="text" name="firstName" />
          <ErrorMessage name="firstName" component="small" />
          <Field type="text" name="lastName" />
          <ErrorMessage name="lastName" component="small" />
          <Field type="text" name="Nickname" />
          <ErrorMessage name="Nickname" component="small" />
          <Field type="text" name="phoneNumber" />
          <ErrorMessage name="phoneNumber" component="small" />
        </Form>
      </Formik>
    </>
  );
}

export default CreateContact;
