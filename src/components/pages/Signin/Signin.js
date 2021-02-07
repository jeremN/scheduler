import React, { Fragment } from 'react';

import Button from '../../atoms/Buttons/Buttons';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ButtonLink from '../../atoms/Link/Link';

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
    <Fragment>
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
        {isLoading ? <div>Loading...</div> : null}
        {isError ? <div>An error occurred: {error}</div> : null}
        <ButtonLink linkTo="/signup" linkId="signupLink" modifiers={['simple']}>
          Vous n'avez pas de compte ? Créer un compte
        </ButtonLink>
      </section>
      <div className="signin__illustration"></div>
    </Fragment>
  );
};

export default Signin;
