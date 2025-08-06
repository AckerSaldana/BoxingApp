import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-900 border border-gray-800',
    gradient: 'bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800',
    boxing: 'boxing-border bg-gray-900',
  };

  return (
    <motion.div
      className={`
        rounded-xl 
        shadow-2xl 
        p-6 
        ${variants[variant]}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;