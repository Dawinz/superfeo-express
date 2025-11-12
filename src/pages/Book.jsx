import React, { useState, useEffect, useRef } from 'react';
import SafariYetuScrollManager from '../utils/safariYetuScrollManager';

const Book = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupStation, setPickupStation] = useState('');
  const [dropOffStation, setDropOffStation] = useState('');
  const [, setIsBookingDialogOpen] = useState(false);
  const scrollManagerRef = useRef(null);

  // Cleanup scroll manager on component unmount
  useEffect(() => {
    return () => {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
    };
  }, []);

  // Station data for pickup and drop-off
  const darStations = ['Ubungo Terminal', 'Kariakoo Station', 'Magomeni Terminal'];
  const mwanzaStations = ['Mwanza Central Station', 'Nyegezi Terminal', 'Buzuruga Station'];

  // Mock seat data - in a real app this would come from the booking system
  const generateSeats = () => {
    const seats = [];
    const totalSeats = 40; // Typical luxury bus capacity
    const unavailableSeats = [5, 12, 18, 23, 27, 31]; // Mock unavailable seats

    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        number: i,
        isAvailable: !unavailableSeats.includes(i),
        isSelected: selectedSeats.includes(i)
      });
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatNumber) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (!seat.isAvailable) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleProceedToPayment = async () => {
    // Validation
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    if (!pickupStation) {
      alert('Please select a pickup station');
      return;
    }
    
    if (!dropOffStation) {
      alert('Please select a drop-off station');
      return;
    }

    // Clean up any existing scroll manager
    if (scrollManagerRef.current) {
      scrollManagerRef.current.cleanup();
    }

    try {
      // Prepare booking data for SafariYetu
      const bookingData = {
        operatorId: '2496230038',
        origin: pickupStation,
        destination: dropOffStation,
        departureDate: new Date().toISOString().split('T')[0], // Today's date as fallback
        passengersCount: selectedSeats.length,
        selectedSeats: selectedSeats,
        onClose: () => {
          console.log('SafariYetu payment dialog closed via callback');
          setIsLoading(false);
          setIsBookingDialogOpen(false);
        }
      };

      // Create new scroll manager instance and set states
      scrollManagerRef.current = SafariYetuScrollManager.createInstance();
      setIsLoading(true);
      setIsBookingDialogOpen(true);

      // Check if SafariPlus is loaded, handle development vs production
      if (typeof window.safariplus === 'undefined') {
        if (process.env.NODE_ENV === 'development') {
          // Development mock - use scroll manager for testing
          scrollManagerRef.current.disableScroll();
          
          setTimeout(() => {
            alert(`Mock SafariYetu Payment:\nSeats: ${selectedSeats.join(', ')}\nPickup: ${pickupStation}\nDrop-off: ${dropOffStation}\nPassengers: ${selectedSeats.length}`);
            
            // Simulate payment dialog closing
            if (scrollManagerRef.current) {
              scrollManagerRef.current.enableScroll();
              scrollManagerRef.current.cleanup();
            }
            setIsLoading(false);
            setIsBookingDialogOpen(false);
          }, 2000);
          return;
        } else {
          throw new Error('SafariYetu payment system is loading. Please try again in a moment.');
        }
      }

      // Use scroll manager to open SafariYetu payment dialog
      await scrollManagerRef.current.openBookingDialog(bookingData);

    } catch (error) {
      console.error('SafariYetu payment error:', error);
      alert(error.message || 'Unable to load payment system. Please try again.');
      
      // Clean up on error
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
      setIsLoading(false);
      setIsBookingDialogOpen(false);
    }
  };

  const getSeatClass = (seat) => {
    if (!seat.isAvailable) {
      return 'bg-gray-300 cursor-not-allowed';
    }
    if (seat.isSelected) {
      return 'bg-superfeo-gold text-white cursor-pointer';
    }
    return 'bg-white border-2 border-gray-300 hover:border-superfeo-gold cursor-pointer';
  };

  // Show overlay instead of completely replacing the UI

  return (
    <div className="min-h-screen bg-gradient-to-br from-superfeo-gray via-white to-superfeo-lightpink/30 py-8 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E0218A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
            SELECT YOUR SEATS
          </h1>
          <p className="text-lg text-superfeo-darkgray font-body">
            Choose your preferred seats for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-superfeo-lightpink">
              {/* Driver Section */}
              <div className="flex justify-center mb-6">
                <div className="bg-superfeo-pink text-white px-4 py-2 rounded-lg font-heading font-bold">
                  DRIVER
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mb-8 text-sm font-body">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-superfeo-gold rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Unavailable</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                {seats.map((seat) => (
                  <button
                    key={seat.number}
                    onClick={() => handleSeatClick(seat.number)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-heading font-bold text-xs sm:text-sm transition-all duration-200 ${getSeatClass(seat)}`}
                    disabled={!seat.isAvailable}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>

              {/* Aisle Indication */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500 font-body">
                  Seats 1-2 and 3-4 are separated by an aisle
                </p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Trip Details */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-superfeo-lightpink">
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
                TRIP DETAILS
              </h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-semibold">Dar es Salaam → Mwanza</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">Today, Dec 20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-semibold">8:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span className="font-semibold">6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Selected Seats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-superfeo-lightpink">
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
                SELECTED SEATS
              </h3>
              {selectedSeats.length === 0 ? (
                <p className="text-gray-500 font-body text-sm">No seats selected</p>
              ) : (
                <div className="space-y-2">
                  {selectedSeats.map(seatNumber => (
                    <div key={seatNumber} className="flex justify-between items-center">
                      <span className="font-body">Seat {seatNumber}</span>
                      <span className="font-heading font-bold text-superfeo-gold">TSh 45,000</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Station Selection */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-superfeo-lightpink">
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
                PICKUP & DROP-OFF
              </h3>
              <div className="space-y-4">
                {/* Pickup Station */}
                <div>
                  <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
                    📍 Pickup Station
                  </label>
                  <select
                    value={pickupStation}
                    onChange={(e) => setPickupStation(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-sm"
                    required
                  >
                    <option value="">Select pickup station</option>
                    {darStations.map(station => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                </div>

                {/* Drop-off Station */}
                <div>
                  <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
                    📍 Drop-off Station
                  </label>
                  <select
                    value={dropOffStation}
                    onChange={(e) => setDropOffStation(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-superfeo-gold focus:outline-none font-body text-sm"
                    required
                  >
                    <option value="">Select drop-off station</option>
                    {mwanzaStations.map(station => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-superfeo-lightpink">
              <h3 className="text-xl font-heading font-bold text-superfeo-pink mb-4 tracking-wide">
                PRICE SUMMARY
              </h3>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span>Seats ({selectedSeats.length}):</span>
                  <span>TSh {(selectedSeats.length * 45000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>TSh 2,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-superfeo-gold">
                    TSh {(selectedSeats.length * 45000 + 2000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length === 0 || !pickupStation || !dropOffStation || isLoading}
              className={`w-full text-white font-body font-bold py-4 px-6 rounded-lg transition-all duration-200 ${
                selectedSeats.length === 0 || !pickupStation || !dropOffStation || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-superfeo-gold hover:bg-yellow-600 transform hover:scale-105'
              } shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PROCESSING...
                </div>
              ) : (
                'PROCEED TO PAYMENT'
              )}
            </button>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="text-sm font-body font-semibold text-green-800">Secure Payment</p>
                  <p className="text-xs font-body text-green-700">
                    Your payment is processed securely with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SafariYetu Overlay */}
      {/* <SafariYetuOverlay 
        isOpen={isBookingDialogOpen} 
        bookingData={currentBookingData}
      /> */}
    </div>
  );
};

export default Book;