import React, { Fragment } from 'react';

import Button from '../../atoms/Buttons/Buttons';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ButtonLink from '../../atoms/Link/Link';

import { useAuth } from '../../../context/authContext';

import './Signup.scss';

const Signup = () => {
  const { register } = useAuth();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, firstname, lastname, password } = evt.target.elements;

    await register({
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
    });
  };

  return (
    <Fragment>
      <section className="signup">
        <h2>Créer un compte</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="form__inline">
            <FormGroup
              labelId="userFirstname"
              wording="Prénom"
              isRequired={true}
              modifiers={['column']}>
              <input
                id="userFirstname"
                className="form__field"
                type="text"
                name="firstname"
              />
            </FormGroup>
            <FormGroup
              labelId="userLastname"
              wording="Nom"
              isRequired={true}
              modifiers={['column']}>
              <input
                id="userLastname"
                type="text"
                name="lastname"
                className="form__field"
              />
            </FormGroup>
          </div>
          <FormGroup
            labelId="userEmail"
            wording="Email"
            isRequired={true}
            modifiers={['column']}>
            <input
              id="userEmail"
              type="email"
              name="email"
              className="form__field"
            />
          </FormGroup>
          <FormGroup
            labelId="userPassword"
            wording="Mot de passe"
            isRequired={true}
            modifiers={['column']}>
            <input
              id="userPassword"
              type="password"
              name="password"
              className="form__field"
            />
          </FormGroup>
          <Button modifiers={['primary']} type="submit">
            S'inscrire
          </Button>
        </form>
        <ButtonLink linkTo="/signup" linkId="signupLink" modifiers={['simple']}>
          Vous avez déjà un compte ? Se connecter
        </ButtonLink>
      </section>
      <div className="signup__illustration"></div>
    </Fragment>
  );
};

export default Signup;
