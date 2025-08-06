import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import SocialLoginButtons from './SocialLoginButtons';
import useAuthStore from '../../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await login(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card variant="gradient" className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-boxing-red bg-gray-800 border-gray-700 rounded focus:ring-boxing-red focus:ring-2"
              {...register('remember')}
            />
            <span className="ml-2 text-sm text-gray-400">Remember me</span>
          </label>
          
          <a href="#" className="text-sm text-boxing-red hover:text-red-400 transition-colors">
            Forgot password?
          </a>
        </div>
        
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
          Sign In
        </Button>
        
        <div className="text-center">
          <p className="text-gray-400">
            Demo credentials: <span className="text-boxing-red">demo@boxing.com</span> / <span className="text-boxing-red">password123</span>
          </p>
        </div>
      </form>
      
      <div className="mt-8">
        <SocialLoginButtons />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/auth?mode=register')}
            className="text-boxing-red hover:text-red-400 font-semibold transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;