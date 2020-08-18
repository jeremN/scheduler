import React, {
  Fragment,
  useReducer
} from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import clientWrapper from '../../../utilities/fetchWrapper';

import './Signup.scss';

const Signup = props => {
  const signupState = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  }

  const signupReducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value
    }
  }

  const [state, setState] = useReducer(signupReducer, signupState);

  const handleChange = (e, field = null, val = null) => {
    setState({
      field: field ? field : e.target.name,
      value: val ? val : e.target.value
    });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    await clientWrapper('auth/signup', { body: { ...state } })
      .then((result) => {
        console.debug(result)
        if (result.status && result.status === 422) {
          throw new Error('Validation failed');
        }

        if (result.status && result.status !== 201) {
          throw new Error('Could not authenticate you');
        }

        if (!!result.userID) {
          props.history.push('/signin');
        }
      })
  }

  const {
    email, 
    firstname,
    lastname, 
    password
  } = state;

  return (
    <Fragment>
      <div className="signup">
        <h2>Signup</h2>
        <Card modifiers={ ['primary'] } classes={ ['card__signup'] }>
          <form className="signup__form" onSubmit={ handleSubmit }>
            <div className="form_inline">
              <FormGroup 
                labelId="userFirstname"
                wording="Prénom"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <Input
                  id="userFirstname"
                  type="text"
                  name="firstname"
                  value={ firstname }
                  onChangeFn={ handleChange } />
              </FormGroup>
              <FormGroup 
                labelId="userLastname"
                wording="Nom"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <Input
                  id="planningName"
                  type="text"
                  name="lastname"
                  value={ lastname }
                  onChangeFn={ handleChange } />
              </FormGroup>
            </div>
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
              S'inscrire
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default Signup;