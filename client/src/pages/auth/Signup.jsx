import CommonForm from '@/components/common/CommonForm';
import { registerFormControls } from '@/config';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const initialState ={
  username : '',
  email: '',
  password: ''
}
function Signup() {

  const [formData, setFormData ] = useState(initialState);

  const onSubmit = () => {

  }
  return (
    <div className=' mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Create new account</h1>
      </div>
      <CommonForm 
      formControls={registerFormControls} 
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />

      <div className='text-center'>
        <p className='text-sm'>Aready have account?
          <Link className='uppercase text-sm hover:underline' to='/auth/signin'> Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
