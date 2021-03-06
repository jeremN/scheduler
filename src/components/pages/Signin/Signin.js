import React from 'react';

import Loader from '../../atoms/Loader/Loader';
import Button from '../../atoms/Buttons/Buttons';
import ButtonLink from '../../atoms/Link/Link';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';

import { useAuth } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import '../../atoms/Input/Input.scss';
import './Signin.scss';

const Signin = () => {
  const { isLoading, isError, error, run } = useAsync();
  const { login } = useAuth();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = evt.target.elements;
    run(
      login({
        email: email.value,
        password: password.value,
      })
    );
  };

  return (
    <main>
      <section className="signin">
        <h2>Se connecter</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <FormGroup
            labelId="user-email"
            wording="Email"
            isRequired={true}
            modifiers={['column']}>
            <input
              id="user-email"
              className="form__field"
              type="email"
              name="email"
            />
          </FormGroup>
          <FormGroup
            labelId="userPassword"
            wording="Mot de passe"
            isRequired={true}
            modifiers={['column']}>
            <input
              id="userPassword"
              className="form__field"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </FormGroup>
          <div className="form__inline">
            <ButtonLink
              linkTo="/passwordforgotten"
              linkId="signupLink"
              modifiers={['simple']}>
              Mot de passe oublié
            </ButtonLink>
            <Button modifiers={['primary']} type="submit">
              Se connecter
            </Button>
          </div>
        </form>
        {isLoading ? <Loader /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
        <ButtonLink linkTo="/signup" linkId="signupLink" modifiers={['simple']}>
          Vous n'avez pas de compte ? Créer un compte
        </ButtonLink>
      </section>
      <div className="signin__illustration"></div>
    </main>
  );
};

export default Signin;
