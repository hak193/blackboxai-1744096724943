import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, setError } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

type LoginState = {
  email: string;
  password: string;
};

type FormEvent = {
  preventDefault: () => void;
};

type InputEvent = {
  target: {
    value: string;
  };
};

function LoginForm() {
  const [state, setState] = React.useState<LoginState>({
    email: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (state.email === 'admin@example.com' && state.password === 'password') {
        dispatch(setCredentials({
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin'
          },
          token: 'mock-jwt-token'
        }));
        navigate('/dashboard');
      } else {
        dispatch(setError('Invalid credentials'));
      }
    } catch (err) {
      dispatch(setError('Login failed'));
    }
  };

  const handleChange = (field: keyof LoginState) => (e: InputEvent) => {
    setState(prev => ({ ...prev, [field]: e.target.value }));
  };

  const emailInput = React.createElement('div', null, [
    React.createElement('label', { 
      htmlFor: 'email',
      className: 'block text-sm font-medium text-gray-700'
    }, 'Email'),
    React.createElement('input', {
      id: 'email',
      type: 'email',
      value: state.email,
      onChange: handleChange('email'),
      className: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm',
      required: true
    })
  ]);

  const passwordInput = React.createElement('div', null, [
    React.createElement('label', {
      htmlFor: 'password',
      className: 'block text-sm font-medium text-gray-700'
    }, 'Password'),
    React.createElement('input', {
      id: 'password',
      type: 'password',
      value: state.password,
      onChange: handleChange('password'),
      className: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm',
      required: true
    })
  ]);

  const errorMessage = error && React.createElement('div', {
    className: 'text-red-600 text-sm'
  }, error);

  const submitButton = React.createElement('button', {
    type: 'submit',
    disabled: loading,
    className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
      loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
  }, loading ? 'Signing in...' : 'Sign in');

  const form = React.createElement('form', { onSubmit: handleSubmit },
    React.createElement('div', { className: 'space-y-6' }, [
      emailInput,
      passwordInput,
      errorMessage,
      submitButton
    ])
  );

  const demoText = React.createElement('div', {
    className: 'mt-6 text-center text-sm text-gray-600'
  }, 'Demo: admin@example.com / password');

  return React.createElement('div', {
    className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'
  }, [
    React.createElement('div', {
      className: 'sm:mx-auto sm:w-full sm:max-w-md'
    }, [
      React.createElement('h2', {
        className: 'mt-6 text-center text-3xl font-extrabold text-gray-900'
      }, 'Sign in')
    ]),
    React.createElement('div', {
      className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md'
    }, [
      React.createElement('div', {
        className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'
      }, [form, demoText])
    ])
  ]);
}

export default LoginForm;
