import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({ 
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={type}
          className={`
            w-full px-3 py-3 
            ${Icon ? 'pl-10' : ''}
            bg-gray-900 
            border border-gray-700 
            rounded-lg 
            text-white 
            placeholder-gray-500
            focus:outline-none 
            focus:ring-2 
            focus:ring-boxing-red 
            focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;