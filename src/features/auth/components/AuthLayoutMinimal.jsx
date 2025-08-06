import boxingImage from '../../../assets/boxing-fighters.png';

const AuthLayoutMinimal = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Background Image - Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden opacity-10">
        <img
          src={boxingImage}
          alt=""
          className="w-full h-full object-cover filter grayscale contrast-150"
        />
      </div>
      
      {/* Corner Post Graphics */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-4 left-4 w-24 h-24 border-l-4 border-t-4 border-red-900" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-4 right-4 w-24 h-24 border-r-4 border-b-4 border-red-900" />
      </div>
      
      {/* Main Content - Centered in left half */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-8 lg:pl-16">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
      
      {/* Minimal Boxing Text - Centered at bottom */}
      <div className="absolute bottom-8 left-0 w-full lg:w-1/2 text-center">
        <p className="text-zinc-800 text-xs tracking-widest uppercase">Gloves Off</p>
      </div>
    </div>
  );
};

export default AuthLayoutMinimal;