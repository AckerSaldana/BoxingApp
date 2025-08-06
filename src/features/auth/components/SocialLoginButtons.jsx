import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const SocialLoginButtons = () => {
  const socialProviders = [
    { name: 'Google', icon: FaGoogle, color: 'hover:bg-red-600' },
    { name: 'Facebook', icon: FaFacebook, color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: FaTwitter, color: 'hover:bg-blue-400' },
  ];

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-boxing-darker text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {socialProviders.map((provider, index) => (
          <motion.button
            key={provider.name}
            onClick={() => handleSocialLogin(provider.name)}
            className={`
              flex items-center justify-center
              px-4 py-3
              bg-gray-800
              border border-gray-700
              rounded-lg
              text-gray-300
              transition-all duration-200
              ${provider.color}
              hover:text-white
              hover:border-transparent
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <provider.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;