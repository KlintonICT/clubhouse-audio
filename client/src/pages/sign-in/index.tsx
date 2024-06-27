import { yupResolver } from '@hookform/resolvers/yup';
import { StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as yup from 'yup';

import { PEOPLES_IMAGES } from '@/constants';
import { useUserContext } from '@/contexts/user';

interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
  const cookies = new Cookies();
  const { setClient, setUser } = useUserContext();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is Required')
      .matches(/^[a-zA-Z0-9_.@$]+$/, 'Invalid Username'),
    name: yup.string().required('Name is Required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { username, name } = data;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/create-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          name,
          image:
            PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
        }),
      }
    );

    if (!response.ok) {
      alert('Some error occurred while signing in');
      return;
    }

    const responseData = await response.json();
    console.log(responseData);

    const user: User = {
      id: username,
      name,
    };
    const myClient = new StreamVideoClient({
      apiKey: import.meta.env.VITE_STREAM_API_KEY,
      user,
      token: responseData.token,
    });
    setClient(myClient);
    setUser({ username, name });

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set('token', responseData.token, { expires });
    cookies.set('username', responseData.username, { expires });
    cookies.set('name', responseData.name, { expires });

    navigate('/');
  };

  return (
    <div className='home'>
      <h1>Welcome to Clubhouse Audio</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input type='text' {...register('username')} />
          {errors.username && (
            <p style={{ color: 'red' }}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor='name'>Name: </label>
          <input type='text' {...register('name')} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};
