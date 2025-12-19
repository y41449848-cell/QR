import React, { useState } from 'react';
import { Camera, Lock, Unlock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const QRScannerApp = () => {
  const [mode, setMode] = useState('splash'); // splash, scanner, password, result
  const [scannedQR, setScannedQR] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [qrContent, setQrContent] = useState('');
  const [error, setError] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const CORRECT_PASSWORD = '1971@2011';

  // Show splash screen for 2.5 seconds
  React.useEffect(() => {
    if (mode === 'splash') {
      const timer = setTimeout(() => {
        setMode('scanner');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  const simulateScan = () => {
    // Simulate scanning a QR code
    const sampleQRData = "This is the content inside the QR code. It could be a URL, text, or any information.";
    setScannedQR(sampleQRData);
    setMode('password');
    setError('');
  };

  const handleUnlock = () => {
    if (password !== CORRECT_PASSWORD) {
      setError('Incorrect password! Access denied.');
      setAccessGranted(false);
      setQrContent('');
      return;
    }

    // Password is correct - grant access
    setAccessGranted(true);
    setQrContent(scannedQR);
    setError('');
    setMode('result');
  };

  const resetScanner = () => {
    setMode('scanner');
    setScannedQR('');
    setPassword('');
    setQrContent('');
    setError('');
    setAccessGranted(false);
    setShowPassword(false);
  };

  // Splash Screen
  if (mode === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-yellow-400 flex items-center justify-center p-4">
        <div className="text-center animate-pulse">
          <div className="bg-white rounded-full p-8 inline-block shadow-2xl mb-6">
            <Lock className="w-24 h-24 text-sky-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Al-Warka Private Schools
          </h1>
          <p className="text-2xl text-yellow-100 font-semibold">Secure QR Scanner</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-yellow-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-yellow-400 p-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <Lock className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Al-Warka Private Schools</h1>
          </div>
          <p className="text-center text-white text-sm mt-2 font-semibold">Secure QR Code Scanner</p>
        </div>

        {/* Content Area */}
        <div className="p-6">
          
          {/* Scanner Screen */}
          {mode === 'scanner' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan QR Code</h2>
                <p className="text-gray-600 text-sm">Position the QR code within the frame</p>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-yellow-50 border-4 border-dashed border-sky-400 rounded-2xl p-12 text-center relative">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-sky-500 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-sky-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-sky-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-sky-500 rounded-br-lg"></div>
                
                <Camera className="w-20 h-20 text-sky-500 mx-auto mb-4 animate-pulse" />
                
                <button
                  onClick={simulateScan}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all font-semibold shadow-lg text-lg"
                >
                  Scan QR Code
                </button>
              </div>

              <div className="bg-sky-50 border-2 border-sky-300 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sky-900 mb-1">Password Protected</h3>
                    <p className="text-sm text-sky-700">After scanning, you must enter the correct password to view the QR code content.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 text-sm text-yellow-800">
                <p className="font-semibold mb-1">Demo Mode</p>
                <p>In a real Android app, this would activate your device camera to scan physical QR codes.</p>
              </div>
            </div>
          )}

          {/* Password Entry Screen */}
          {mode === 'password' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-sky-100 rounded-full p-4 inline-block mb-4">
                  <CheckCircle className="w-12 h-12 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">QR Code Detected</h2>
                <p className="text-gray-600 text-sm">Enter password to view content</p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-center">
                <Lock className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800 font-semibold">Password Required</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to unlock"
                    className="w-full p-4 pr-12 border-2 border-sky-300 rounded-xl focus:border-sky-500 focus:outline-none text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                    autoFocus
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-800 px-4 py-3 rounded-xl flex items-center gap-3">
                  <XCircle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{error}</p>
                    <p className="text-sm">Please try again with the correct password.</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleUnlock}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg text-lg"
              >
                Unlock QR Code
              </button>

              <button
                onClick={resetScanner}
                className="w-full bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all"
              >
                Cancel & Scan Another
              </button>
            </div>
          )}

          {/* Result Screen */}
          {mode === 'result' && (
            <div className="space-y-6">
              {accessGranted ? (
                <>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                      <Unlock className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Access Granted!</h2>
                    <p className="text-gray-600 text-sm">Password accepted successfully</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-sky-50 border-2 border-green-400 rounded-xl p-6">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      QR Code Content:
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-green-300 min-h-24">
                      <p className="text-gray-800 whitespace-pre-wrap break-words">{qrContent}</p>
                    </div>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg text-lg"
                  >
                    Scan Another QR Code
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="bg-red-100 rounded-full p-4 inline-block mb-4">
                      <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 text-sm">Incorrect password entered</p>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default QRScannerApp;