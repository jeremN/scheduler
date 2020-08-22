import React, {
  Fragment,
  useReducer,
  useContext,
  useCallback,
} from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import { AuthContext } from '../../../App';
import clientWrapper from '../../../utilities/fetchWrapper';

import './Signin.scss';

const Signin = props => {
  const { login, isAuthenticated } = useContext(AuthContext);
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
          await login({
            userID: datas.userID,
            token: datas.token
          });
          return isAuthenticated;
        }
      })
      .then((authDone = false) => {
        if (authDone) {
          props.history.push('/home');
        }
      })
  }

  const {
    email, 
    password
  } = state;

  return (
    <Fragment>
      <div className="signin">
        <h2>Signin</h2>
        <Card modifiers={ ['primary'] } classes={ ['card__signin'] }>
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
            <Button type="submit" >
              Se connecter
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default Signin;