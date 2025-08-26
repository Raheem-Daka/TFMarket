import CommonForm from '@/components/common/CommonForm';
import { SigninFormControls } from '@/config';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const initialState ={
  email: '',
  password: ''
}
function Signin() {

  const [formData, setFormData ] = useState(initialState);

  const onSubmit = () => {

  }
  return (
    <div className=' mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Sign In</h1>
      </div>
      <CommonForm 
      formControls={SigninFormControls} 
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />

      <div className='text-center'>
        <p className='text-sm'>Don't have account?
          <Link className='uppercase text-sm hover:underline' to='/auth/signup'> Sign UP</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;