import CommonForm from '@/components/common/CommonForm';
import { SigninFormControls } from '@/config';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinUser } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';

const initialState ={
  email: '',
  password: ''
};

const Signin = () => {
  const [formData, setFormData] = useState(initialState);  
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit =  (e) => {
    e.preventDefault();

    dispatch(signinUser(formData)).then((data) => {
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500 text-white rounded"
        })
      } else {
        toast ({
          title: data?.payload?.message,
          variant: "destructive",
          className: 'bg-red-500 text-white rounded'
        })
      }
    })
  };  
  
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