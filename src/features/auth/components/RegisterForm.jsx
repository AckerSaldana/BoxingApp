import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';
import { GiBoxingGlove } from 'react-icons/gi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import SocialLoginButtons from './SocialLoginButtons';
import useAuthStore from '../../../store/authStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  favoriteBoxer: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const popularBoxers = [
  'Canelo Alvarez',
  'Tyson Fury',
  'Oleksandr Usyk',
  'Terence Crawford',
  'Errol Spence Jr.',
  'Gervonta Davis',
  'Ryan Garcia',
  'Deontay Wilder',
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      favoriteBoxer: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      favoriteBoxers: data.favoriteBoxer ? [data.favoriteBoxer] : [],
    });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card variant="gradient" className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          icon={HiUser}
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        
        <Input
          label="Email"
          type="email"
          icon={HiMail}
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            icon={HiLockClosed}
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            icon={HiLockClosed}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Favorite Boxer (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GiBoxingGlove className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="w-full px-3 py-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-boxing-red focus:border-transparent transition-all duration-200"
              {...register('favoriteBoxer')}
            >
              <option value="">Select a boxer</option>
              {popularBoxers.map((boxer) => (
                <option key={boxer} value={boxer}>
                  {boxer}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 text-boxing-red bg-gray-800 border-gray-700 rounded focus:ring-boxing-red focus:ring-2"
            {...register('agreeToTerms')}
          />
          <label className="ml-2 text-sm text-gray-400">
            I agree to the{' '}
            <a href="#" className="text-boxing-red hover:text-red-400">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-boxing-red hover:text-red-400">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg"
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6">
        <SocialLoginButtons />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="text-boxing-red hover:text-red-400 font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;