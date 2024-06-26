import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
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

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    const { username, name } = data;

    console.log({ username, name });
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
