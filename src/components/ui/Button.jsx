import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'relative font-semibold transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden';
  
  const variants = {
    primary: 'bg-boxing-red hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-boxing-red text-boxing-red hover:bg-boxing-red hover:text-white',
    gold: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
    xl: 'px-10 py-5 text-xl rounded-xl',
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      {...props}
    >
      {isLoading && (
        <motion.div
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
      
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default Button;