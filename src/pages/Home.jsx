import React from 'react';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Gallery from '../components/Gallery';
import { useLanguage } from '../contexts/LanguageContext';

const Home = ({ setIsBookingDialogOpen }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-superfeo-pink">
      {/* Hero Section with Overlay Form on Mobile */}
      <section className="relative">
        <Hero />
        {/* Mobile Form Overlay */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden pt-0 -mt-24">
          <div className="w-full max-w-xs mx-3 mx-auto">
            {/* Simple Header */}
            <div className="text-center mb-4">
              <h1 className="text-white text-xl font-heading font-bold tracking-wide drop-shadow-lg">
                {t('bookYourJourney')}
              </h1>
            </div>
            <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
          </div>
        </div>
      </section>
      {/* Search Form Section - Hidden on Mobile, Visible on Desktop */}
      <section className="hidden md:block pt-0 pb-16 px-4 sm:px-6 lg:px-8 -mt-72 relative z-30">
        <div className="max-w-4xl mx-auto">
          <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-superfeo-gray via-white to-superfeo-lightpink/30 mt-8 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E0218A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
              {t('whyChoose')}
            </h2>
            <p className="text-lg text-superfeo-darkgray font-body max-w-2xl mx-auto">
              {t('experienceDifference')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-superfeo-lightpink hover:shadow-2xl hover:border-superfeo-pink hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-superfeo-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-3 tracking-wide">
                {t('premiumComfort')}
              </h3>
              <p className="text-superfeo-darkgray font-body leading-relaxed">
                {t('comfortDesc')}
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-superfeo-lightpink hover:shadow-2xl hover:border-superfeo-pink hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-superfeo-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-3 tracking-wide">
                {t('onTimeDeparture')}
              </h3>
              <p className="text-superfeo-darkgray font-body leading-relaxed">
                {t('onTimeDesc')}
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-superfeo-lightpink hover:shadow-2xl hover:border-superfeo-pink hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-superfeo-darkpink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-3 tracking-wide">
                {t('safeTravel')}
              </h3>
              <p className="text-superfeo-darkgray font-body leading-relaxed">
                {t('safeTravelDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <Gallery />
    </div>
  );
};

export default Home;