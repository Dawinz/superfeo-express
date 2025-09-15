import React, { useState, useEffect, useRef } from 'react';
import SafariYetuScrollManager from '../utils/safariYetuScrollManager';
import { useLanguage } from '../contexts/LanguageContext';

const SearchForm = ({ setIsBookingDialogOpen }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollManagerRef = useRef(null);

  // Read URL parameters and pre-fill form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    const toParam = urlParams.get('to');
    
    if (fromParam || toParam) {
      setFormData(prev => ({
        ...prev,
        from: fromParam || '',
        to: toParam || '',
        date: new Date().toISOString().split('T')[0] // Set today's date
      }));
      
      // Clear URL parameters after reading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Cleanup scroll manager on component unmount
  useEffect(() => {
    return () => {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.from) {
      setError(t('selectDepartureError'));
      return false;
    }
    if (!formData.to) {
      setError(t('selectDestinationError'));
      return false;
    }
    if (formData.from === formData.to) {
      setError(t('differentCitiesError'));
      return false;
    }
    if (!formData.date) {
      setError(t('selectDateError'));
      return false;
    }
    if (!formData.passengers) {
      setError(t('selectPassengersError'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form data
    if (!validateForm()) {
      return;
    }

    // Clean up any existing scroll manager
    if (scrollManagerRef.current) {
      scrollManagerRef.current.cleanup();
    }

    try {
      // Prepare booking data
      const bookingData = {
        operatorId: '2496230038',
        origin: formData.from,
        destination: formData.to,
        departureDate: formData.date,
        passengersCount: parseInt(formData.passengers),
        onClose: () => {
          // This callback might not be called by SafariYetu, 
          // so we rely on our monitoring system
          console.log('SafariYetu dialog closed via callback');
          setIsBookingDialogOpen(false);
          setIsLoading(false);
          setError(''); // Suppress any error when closing the panel
        }
      };

      // Create new scroll manager instance and set states
      scrollManagerRef.current = SafariYetuScrollManager.createInstance();
      setIsLoading(true);
      setIsBookingDialogOpen(true); // <-- show blur on app

      // Check if SafariPlus is loaded, handle development vs production
      if (typeof window.safariplus === 'undefined') {
        if (process.env.NODE_ENV === 'development') {
          // Development mock - still use scroll manager for testing
          scrollManagerRef.current.disableScroll();
          
          setTimeout(() => {
            alert(`Mock Booking Dialog:\nFrom: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}\nPassengers: ${formData.passengers}\n\nIn production, this would open SafariYetu booking system.`);
            
            // Simulate dialog closing
            if (scrollManagerRef.current) {
              scrollManagerRef.current.enableScroll();
              scrollManagerRef.current.cleanup();
            }
            setIsLoading(false);
            setIsBookingDialogOpen(false); // <-- remove blur on app
          }, 1500);
          return;
        } else {
          throw new Error('SafariYetu booking system is loading. Please try again in a moment.');
        }
      }

      // Use scroll manager to open SafariYetu dialog
      await scrollManagerRef.current.openBookingDialog(bookingData);

    } catch (error) {
      console.error('SafariYetu booking error:', error);
      // Only show error if booking system failed to load, not if user closed the panel
      if (error.message && error.message.includes('loading')) {
        setError(error.message || 'Unable to load booking system. Please try again.');
      } else {
        setError(''); // Suppress other errors
      }
      
      // Clean up on error
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
      setIsLoading(false);
      setIsBookingDialogOpen(false); // <-- remove blur on app
    }
  };

  // Super Feo Express destinations
  const popularRoutes = [
    { value: 'dar-es-salaam', label: 'DAR ES SALAAM' },
    { value: 'dodoma', label: 'DODOMA' },
    { value: 'mbeya', label: 'MBEYA' },
    { value: 'songea', label: 'SONGEA' },
    { value: 'njombe', label: 'NJOMBE' },
    { value: 'makambako', label: 'MAKAMBAKO' },
    { value: 'iringa', label: 'IRINGA' },
    { value: 'tunduma', label: 'TUNDUMA' },
    { value: 'mafinga', label: 'MAFINGA' },
    { value: 'namtumbo', label: 'NAMTUMBO' },
    { value: 'masasi', label: 'MASASI' },
    { value: 'tunduru', label: 'TUNDURU' },
    { value: 'mtwara', label: 'MTWARA' },
    { value: 'lindi', label: 'LINDI' },
    { value: 'nyasa', label: 'NYASA' },
    { value: 'mbinga', label: 'MBINGA' },
    { value: 'peramiho', label: 'PERAMIHO' },
    { value: 'kilimanjaro', label: 'KILIMANJARO' },
    { value: 'arusha', label: 'ARUSHA' },
    { value: 'moshi', label: 'MOSHI' },
    { value: 'mwanza', label: 'MWANZA' },
    { value: 'tabora', label: 'TABORA' }
  ];


  return (
    <div>
      <div>
          <div id="search-form" className="bg-gradient-to-br from-superfeo-pink via-superfeo-gold to-superfeo-white rounded-xl shadow-2xl shadow-superfeo-pink/40 p-2 sm:p-3 md:p-4 mx-1 md:-mt-16 relative z-20 md:mx-2 sm:mx-4">
            <div className="max-w-6xl mx-auto w-full max-w-xs sm:max-w-lg md:max-w-4xl">
              {/* Form Header */}
              <div className="text-center mb-1 sm:mb-2">
                <h3 className="text-xs sm:text-lg md:text-xl font-heading font-bold text-white mb-0.5 sm:mb-1 tracking-wide">
                  {t('findYourJourney')}
                </h3>
                <p className="text-superfeo-white font-body text-2xs sm:text-xs md:text-sm hidden sm:block">
                  {t('searchBookPremium')}
                </p>
                {/* Error Message */}
                {error && (
                  <div className="mt-1 sm:mt-2 p-1 sm:p-2 bg-red-100 border-2 border-superfeo-gold text-superfeo-red rounded-lg font-body text-2xs sm:text-xs font-semibold">
                    ⚠️ {error}
                  </div>
                )}
              </div>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2 md:space-y-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-2">
                  {/* From */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-2xs sm:text-xs font-body font-semibold text-kisesa-white mb-1">
                      {t('from')}
                    </label>
                    <select
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-2.5 border-2 border-superfeo-gray rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-superfeo-darkgray bg-superfeo-white text-xs sm:text-sm"
                      required
                    >
                      <option value="">{t('selectDeparture')}</option>
                      {popularRoutes.map(city => (
                        <option key={city.value} value={city.value}>{city.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* To */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-2xs sm:text-xs font-body font-semibold text-kisesa-white mb-1">
                      {t('to')}
                    </label>
                    <select
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-2.5 border-2 border-superfeo-gray rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-superfeo-darkgray bg-superfeo-white text-xs sm:text-sm"
                      required
                    >
                      <option value="">{t('selectDestination')}</option>
                      {popularRoutes.map(city => (
                        <option key={city.value} value={city.value}>{city.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-2xs sm:text-xs font-body font-semibold text-kisesa-white mb-1">
                      {t('travelDate')}
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 sm:p-2.5 border-2 border-superfeo-gray rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-superfeo-darkgray text-xs sm:text-sm bg-superfeo-white"
                      required
                    />
                  </div>

                  {/* Passengers */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-2xs sm:text-xs font-body font-semibold text-kisesa-white mb-1">
                      {t('passengers')}
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-2.5 border-2 border-superfeo-gray rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-superfeo-darkgray bg-superfeo-white text-xs sm:text-sm"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num > 1 ? t('passengers') : t('passenger')}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="space-y-1 sm:space-y-1.5 sm:col-span-2 md:col-span-1">
                    <label className="text-2xs sm:text-xs font-body font-semibold text-transparent">
                      SEARCH
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full text-white font-body font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 shadow-lg text-2xs sm:text-xs ${
                        isLoading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-superfeo-gold hover:bg-yellow-600 transform hover:scale-105'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('searchSafari')}...
                        </div>
                      ) : (
                        t('searchSafari')
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Popular Routes Quick Links */}
              <div className="mt-1 sm:mt-2 text-center hidden sm:block">
                <p className="text-2xs sm:text-xs font-body text-white mb-1 sm:mb-1.5">{t('popularRoutes')}</p>
                <div className="flex flex-wrap justify-center items-center gap-0.5 sm:gap-1 mx-auto w-fit">
                  {[
                    { route: 'Dar es Salaam - Dodoma', from: 'dar-es-salaam', to: 'dodoma' },
                    { route: 'Dar es Salaam - Mbeya', from: 'dar-es-salaam', to: 'mbeya' },
                    { route: 'Dar es Salaam - Arusha', from: 'dar-es-salaam', to: 'arusha' }
                  ].map(({ route, from, to }) => (
                    <button
                      key={route}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          from: from,
                          to: to,
                          date: new Date().toISOString().split('T')[0] // Today's date
                        }));
                        setError('');
                      }}
                      disabled={isLoading}
                      className="text-2xs sm:text-xs bg-gray-100 hover:bg-superfeo-pink hover:text-white text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-body transition-colors duration-200 disabled:opacity-50"
                    >
                      {route}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SearchForm;