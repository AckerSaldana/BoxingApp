import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Too short'),
});

const LoginFormMinimal = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, setTransitioning } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      setTransitioning(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 className="text-6xl font-black text-white mb-2" variants={itemVariants}>FIGHT</motion.h1>
      <motion.h2 className="text-6xl font-black text-red-900 mb-12" variants={itemVariants}>LOGIN</motion.h2>
      
      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div variants={itemVariants}>
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full bg-transparent border-0 border-b-2 border-zinc-800 text-white placeholder-zinc-600 px-0 py-3 focus:outline-none focus:border-red-900 transition-colors text-sm tracking-wider"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-900 text-xs mt-1">{errors.email.message}</p>
          )}
        </motion.div>
        
        <motion.div className="relative" variants={itemVariants}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="PASSWORD"
            className="w-full bg-transparent border-0 border-b-2 border-zinc-800 text-white placeholder-zinc-600 px-0 py-3 focus:outline-none focus:border-red-900 transition-colors text-sm tracking-wider"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-3 text-zinc-600 hover:text-zinc-400 text-xs"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
          {errors.password && (
            <p className="text-red-900 text-xs mt-1">{errors.password.message}</p>
          )}
        </motion.div>
        
        {error && (
          <motion.p className="text-red-900 text-xs" variants={itemVariants}>{error}</motion.p>
        )}
        
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-900 text-white py-4 font-bold tracking-wider hover:bg-red-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'LOADING...' : 'ENTER THE RING'}
        </motion.button>
      </motion.form>
      
      <motion.div className="mt-8 flex items-center justify-between text-xs text-zinc-600" variants={itemVariants}>
        <motion.a 
          href="#" 
          className="hover:text-zinc-400 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          FORGOT PASSWORD
        </motion.a>
        <motion.button
          onClick={() => navigate('/auth?mode=register')}
          className="hover:text-zinc-400 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          CREATE ACCOUNT
        </motion.button>
      </motion.div>
      
      <motion.div className="mt-12 text-xs text-zinc-700" variants={itemVariants}>
        <p>DEMO: demo@boxing.com / password123</p>
      </motion.div>
    </motion.div>
  );
};

export default LoginFormMinimal;