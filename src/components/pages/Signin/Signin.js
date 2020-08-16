import React, {
  Fragment,
  useReducer
} from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import './Signin.scss';

const Signin = props => {
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    const dataToSend = { ...state }
    const url = `${process.env.REACT_APP_API_ENDPOINT}/auth/signin`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    await fetch(url, {
      method: 'POST', 
      headers: headers,
      body: JSON.stringify(dataToSend)
    })
      .then((response) => {
        if (response.status === 422) {
          throw new Error('Validation failed');
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Could not authenticate you');
        }

        return response.json();
      })
      .then((result) => {
        const remainingMs = 60 * 60 * 1000;
        const expireDate = new Date(new Date().getTime() + remainingMs);
        const userObj = {
          token: result.token,
          id: result.userID,
          expiryDate: expireDate
        }
        sessionStorage.setItem('scheduler_user', JSON.stringify(userObj));
      })
      .catch((error) => {
        console.error('signin error: ', error)
      })
  }

  const {
    email, 
    password
  } = state;

  return (
    <Fragment>
      <div className="signin">
        <h2>Signup</h2>
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