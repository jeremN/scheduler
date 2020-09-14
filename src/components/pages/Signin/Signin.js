import React, {
  Fragment,
  useReducer,
  useContext,
} from 'react';

import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ButtonLink from '../../atoms/Link/Link';

import { AuthContext } from '../../../App';
import clientWrapper from '../../../utilities/fetchWrapper';

import './Signin.scss';

const Signin = props => {
  const { login } = useContext(AuthContext);
  const signinState = {
    email: '',
    password: ''
  }

  const signinReducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value
    }
  }

  const [state, setState] = useReducer(signinReducer, signinState);

  const handleChange = (e, field = null, val = null) => {
    setState({
      field: field ? field : e.target.name,
      value: val ? val : e.target.value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    clientWrapper('auth/login', { body: { ...state } })
      .then(async (result) => {
        const datas = await result;
        if (datas.status && datas.status === 422) {
          throw new Error('Validation failed');
        }

        if (datas.status && datas.status !== 201) {
          throw new Error('Could not authenticate you');
        }
        
        if (datas.userID) {
          const remainingMs = 120 * 60 * 1000;
          const expireDate = new Date(new Date().getTime() + remainingMs);
          localStorage.setItem('_scheduler_user_id', datas.userID);
          localStorage.setItem('_scheduler_token', datas.token);
          localStorage.setItem('_scheduler_expire_date', expireDate);

          await login({
            userId: datas.userID,
            token: datas.token,
            remainingTime: remainingMs
          });
          props.history.push('/home');
        }
      });
  }

  const {
    email, 
    password
  } = state;

  return (
    <Fragment>
      <section className="signin">
        <h2>Se connecter</h2>
        <form className="signup__form" onSubmit={ handleSubmit }>
          <FormGroup 
            labelId="userEmail"
            wording="Email"
            isRequired={ true }
            modifiers={ ['column'] }>          
            <Input
              id="userEmail"
              type="email"
              name="email"
              value={ email }
              onChangeFn={ handleChange } />
          </FormGroup>
          <FormGroup 
            labelId="userPassword"
            wording="Mot de passe"
            isRequired={ true }
            modifiers={ ['column'] }>          
            <Input
              id="userPassword"
              type="password"
              name="password"
              autocomplete="current-password"
              value={ password }
              onChangeFn={ handleChange } />
          </FormGroup>
          <div className="form__inline">
            <ButtonLink 
              linkTo="/passwordforgotten" 
              linkId="signupLink"
              modifiers={ ['simple'] }>
              Mot de passe oublié
            </ButtonLink>
            <Button modifiers={ ['primary'] } type="submit" >
              Se connecter
            </Button>
          </div>
        </form>
        <ButtonLink 
          linkTo="/signup" 
          linkId="signupLink"
          modifiers={ ['simple'] }>
          Vous n'avez pas de compte ? Créer un compte
        </ButtonLink>
      </section>
      <div className="signin__illustration"></div>
    </Fragment>
  );
};

export default Signin;