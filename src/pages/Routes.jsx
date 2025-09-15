import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Routes = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const routes = [
    { from: 'DAR ES SALAAM', to: 'DODOMA', price: 'TSh 25,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'dodoma' },
    { from: 'DODOMA', to: 'DAR ES SALAAM', price: 'TSh 25,000', duration: t('sixHours'), fromValue: 'dodoma', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MBEYA', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'dar-es-salaam', toValue: 'mbeya' },
    { from: 'MBEYA', to: 'DAR ES SALAAM', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'mbeya', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'SONGEA', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'dar-es-salaam', toValue: 'songea' },
    { from: 'SONGEA', to: 'DAR ES SALAAM', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'songea', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'NJOMBE', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'dar-es-salaam', toValue: 'njombe' },
    { from: 'NJOMBE', to: 'DAR ES SALAAM', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'njombe', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MAKAMBAKO', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'makambako' },
    { from: 'MAKAMBAKO', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'makambako', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'IRINGA', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'dar-es-salaam', toValue: 'iringa' },
    { from: 'IRINGA', to: 'DAR ES SALAAM', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'iringa', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'TUNDUMA', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'dar-es-salaam', toValue: 'tunduma' },
    { from: 'TUNDUMA', to: 'DAR ES SALAAM', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'tunduma', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MAFINGA', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'mafinga' },
    { from: 'MAFINGA', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'mafinga', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'NAMTUMBO', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'dar-es-salaam', toValue: 'namtumbo' },
    { from: 'NAMTUMBO', to: 'DAR ES SALAAM', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'namtumbo', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MASASI', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'dar-es-salaam', toValue: 'masasi' },
    { from: 'MASASI', to: 'DAR ES SALAAM', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'masasi', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'TUNDURU', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'tunduru' },
    { from: 'TUNDURU', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'tunduru', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MTWARA', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'dar-es-salaam', toValue: 'mtwara' },
    { from: 'MTWARA', to: 'DAR ES SALAAM', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'mtwara', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'LINDI', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'lindi' },
    { from: 'LINDI', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'lindi', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'NYASA', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'dar-es-salaam', toValue: 'nyasa' },
    { from: 'NYASA', to: 'DAR ES SALAAM', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'nyasa', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MBINGA', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'dar-es-salaam', toValue: 'mbinga' },
    { from: 'MBINGA', to: 'DAR ES SALAAM', price: 'TSh 45,000', duration: t('tenHours'), fromValue: 'mbinga', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'PERAMIHO', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'dar-es-salaam', toValue: 'peramiho' },
    { from: 'PERAMIHO', to: 'DAR ES SALAAM', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'peramiho', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'KILIMANJARO', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'kilimanjaro' },
    { from: 'KILIMANJARO', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'kilimanjaro', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'ARUSHA', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'dar-es-salaam', toValue: 'arusha' },
    { from: 'ARUSHA', to: 'DAR ES SALAAM', price: 'TSh 30,000', duration: t('fiveHours'), fromValue: 'arusha', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MOSHI', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'dar-es-salaam', toValue: 'moshi' },
    { from: 'MOSHI', to: 'DAR ES SALAAM', price: 'TSh 35,000', duration: t('sixHours'), fromValue: 'moshi', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'MWANZA', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'dar-es-salaam', toValue: 'mwanza' },
    { from: 'MWANZA', to: 'DAR ES SALAAM', price: 'TSh 50,000', duration: t('twelveHours'), fromValue: 'mwanza', toValue: 'dar-es-salaam' },
    { from: 'DAR ES SALAAM', to: 'TABORA', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'dar-es-salaam', toValue: 'tabora' },
    { from: 'TABORA', to: 'DAR ES SALAAM', price: 'TSh 40,000', duration: t('eightHours'), fromValue: 'tabora', toValue: 'dar-es-salaam' },
  ];

  const handleBookRoute = (route) => {
    // Navigate to home page with route parameters
    navigate(`/?from=${route.fromValue}&to=${route.toValue}`);
  };

  return (
    <div className="min-h-screen bg-kisesa-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-kisesa-blue mb-4 tracking-wide">
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
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-kisesa-orange rounded-full"></div>
                  <span className="font-body font-semibold text-gray-800">{route.from}</span>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                <div className="flex items-center space-x-2">
                  <span className="font-body font-semibold text-gray-800">{route.to}</span>
                  <div className="w-3 h-3 bg-kisesa-orange rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-gray-600">{t('price')}</span>
                  <span className="text-lg font-heading font-bold text-kisesa-orange">{route.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-gray-600">{t('duration')}</span>
                  <span className="text-sm font-body font-semibold text-gray-800">{route.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => handleBookRoute(route)}
                className="w-full mt-4 bg-kisesa-yellow hover:bg-yellow-500 text-kisesa-blue font-body font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {t('bookThisRoute')}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-heading font-bold text-kisesa-navy mb-6 tracking-wide text-center">
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