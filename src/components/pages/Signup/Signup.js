import React from 'react';

import Loader from '../../atoms/Loader/Loader';
import Button from '../../atoms/Buttons/Buttons';
import ButtonLink from '../../atoms/Link/Link';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';

import { useAuth } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import './Signup.scss';

const Signup = () => {
  const { register } = useAuth();
  const { isLoading, isError, error, run } = useAsync();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, firstname, lastname, password } = evt.target.elements;

    run(
      register({
        email: email.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
      })
    );
  };

  return (
    <main>
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
        {isLoading ? <Loader /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
        <ButtonLink linkTo="/signup" linkId="signupLink" modifiers={['simple']}>
          Vous avez déjà un compte ? Se connecter
        </ButtonLink>
      </section>
      <div className="signup__illustration"></div>
    </main>
  );
};

export default Signup;
