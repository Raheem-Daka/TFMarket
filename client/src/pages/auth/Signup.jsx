import CommonForm from '@/components/common/CommonForm';
import { SignupFormControls } from '@/config';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '@/store/authSlice';
import { useToast } from "@/hooks/use-toast"

const initialState ={
  username : '',
  email: '',
  password: ''
}

function Signup() {

  const [formData, setFormData ] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
    .then((data) => {
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
      navigate('/auth/signin') 
    } else {
      toast({
        title: 'Signup failed', 
        description: data.payload.message,
        variant: 'destructive'
      });
    }
    })
    .catch(()=>{
      toast({
        title: 'Something went wrong',
        variant: 'destructive'
      });
    })
  }

  console.log(formData)
  return (
    <div className=' mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Create new account</h1>
      </div>
      <CommonForm 
      formControls={SignupFormControls} 
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
