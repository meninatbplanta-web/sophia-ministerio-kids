import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-1 mb-2">
        <span>Feito com muito</span>
        <Heart className="w-4 h-4 text-red-500 fill-current" />
        <span>para os Pequeninos de Jesus</span>
      </div>
      <p>&copy; {new Date().getFullYear()} Escola Bíblica Digital. Deus abençoe!</p>
    </footer>
  );
};

export default Footer;