import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Routes = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const routes = [
    { from: 'SONGEA', to: 'MOSHI', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'songea', toValue: 'moshi' },
    { from: 'SONGEA', to: 'DODOMA', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'songea', toValue: 'dodoma' },
    { from: 'SONGEA', to: 'MWANZA', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'songea', toValue: 'mwanza' },
    { from: 'SONGEA', to: 'DAR ES SALAAM', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'songea', toValue: 'dar-es-salaam' },
    { from: 'SONGEA', to: 'KYELA', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'songea', toValue: 'kyela' },
    { from: 'SONGEA', to: 'TUNDUMA', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'songea', toValue: 'tunduma' },
    { from: 'SONGEA', to: 'MBEYA', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'songea', toValue: 'mbeya' },
    { from: 'SONGEA', to: 'MAKAMBAKO', price: 'TSh 25,000', duration: t('fourHours'), fromValue: 'songea', toValue: 'makambako' },
    { from: 'SONGEA', to: 'IRINGA', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'songea', toValue: 'iringa' },
    { from: 'SONGEA', to: 'NJOMBE', price: 'TSh 20,000', duration: t('threeHours'), fromValue: 'songea', toValue: 'njombe' },
    { from: 'SONGEA', to: 'MTWARA', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'songea', toValue: 'mtwara' },
    { from: 'SONGEA', to: 'MASASI', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'songea', toValue: 'masasi' },
    { from: 'SONGEA', to: 'TUNDURU', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'songea', toValue: 'tunduru' },
    { from: 'SONGEA', to: 'MBINGA', price: 'TSh 25,000', duration: t('fourHours'), fromValue: 'songea', toValue: 'mbinga' },
    { from: 'SONGEA', to: 'MBAMBABAY', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'songea', toValue: 'mbambabay' },
  ];

  const handleBookRoute = (route) => {
    // Navigate to home page with route parameters
    navigate(`/?from=${route.fromValue}&to=${route.toValue}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-superfeo-gray via-white to-superfeo-lightpink/30 py-8 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E0218A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
            {t('ourRoutes')}
          </h1>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            {t('routesDesc')}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-superfeo-lightpink hover:shadow-xl hover:border-superfeo-pink transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-superfeo-gold rounded-full"></div>
                  <span className="font-body font-semibold text-gray-800">{route.from}</span>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                <div className="flex items-center space-x-2">
                  <span className="font-body font-semibold text-gray-800">{route.to}</span>
                  <div className="w-3 h-3 bg-superfeo-gold rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-gray-600">{t('price')}</span>
                  <span className="text-lg font-heading font-bold text-superfeo-gold">{route.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-gray-600">{t('duration')}</span>
                  <span className="text-sm font-body font-semibold text-gray-800">{route.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => handleBookRoute(route)}
                className="w-full mt-4 bg-superfeo-gold hover:bg-yellow-600 text-white font-body font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {t('bookThisRoute')}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-superfeo-lightpink">
          <h2 className="text-2xl font-heading font-bold text-superfeo-pink mb-6 tracking-wide text-center">
            ROUTE INFORMATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-3">{t('departureTimes')}</h3>
              <ul className="space-y-2 font-body text-gray-600">
                <li>• {t('morningTime')}</li>
                <li>• {t('afternoonTime')}</li>
                <li>• {t('eveningTime')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-3">{t('amenities')}</h3>
              <ul className="space-y-2 font-body text-gray-600">
                <li>• {t('airConditioning')}</li>
                <li>• {t('comfortableSeats')}</li>
                <li>• {t('freeWifi')}</li>
                <li>• {t('chargingPorts')}</li>
                <li>• {t('entertainmentSystem')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;