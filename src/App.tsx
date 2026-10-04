import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { ScannerView } from './components/ScannerView';
import { ReportCard } from './components/ReportCard';
import { ChatAssistant } from './components/ChatAssistant';
import { WeatherView } from './components/WeatherView';
import { HistoryView } from './components/HistoryView';
import { FarmerProfileView } from './components/FarmerProfileView';
import { SampleCasesView } from './components/SampleCasesView';
import { ScanGuideModal } from './components/ScanGuideModal';
import { MLArchitectureModal } from './components/MLArchitectureModal';

import { PlantDiagnosisResult, WeatherData, FarmerProfile } from './types/plant';
import { storageService } from './services/storageService';
import { apiService } from './services/apiService';
import { GUJARAT_DISTRICTS } from './data/gujaratDistricts';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedReport, setSelectedReport] = useState<PlantDiagnosisResult | null>(null);

  // Storage states
  const [scans, setScans] = useState<PlantDiagnosisResult[]>([]);
  const [profile, setProfile] = useState<FarmerProfile>(storageService.getProfile());
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(storageService.getSelectedDistrictId());

  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  // Modals
  const [isScanGuideOpen, setIsScanGuideOpen] = useState<boolean>(false);
  const [isMLDocsOpen, setIsMLDocsOpen] = useState<boolean>(false);

  // Chat trigger context
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadedScans = storageService.getScans();
    setScans(loadedScans);
    loadWeatherForDistrict(selectedDistrictId);
  }, []);

  const loadWeatherForDistrict = async (districtId: string) => {
    const districtObj = GUJARAT_DISTRICTS.find(d => d.id === districtId) || GUJARAT_DISTRICTS[0];
    setIsLoadingWeather(true);
    try {
      const data = await apiService.fetchWeather(districtObj.lat, districtObj.lon, districtObj.name_en);
      setWeather(data);
    } catch (err) {
      console.error('Weather load error:', err);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    storageService.saveSelectedDistrictId(districtId);
    loadWeatherForDistrict(districtId);
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('આપના બ્રાઉઝરમાં જીપીએસ ઉપલબ્ધ નથી.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Find nearest Gujarat district by Euclidean distance
        let closest = GUJARAT_DISTRICTS[0];
        let minDist = Infinity;
        for (const dist of GUJARAT_DISTRICTS) {
          const d = Math.hypot(dist.lat - latitude, dist.lon - longitude);
          if (d < minDist) {
            minDist = d;
            closest = dist;
          }
        }
        handleSelectDistrict(closest.id);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        alert('જીપીએસ લોકેશન મેળવવામાં સમસ્યા આવી. કૃપા કરીને ઉપરથી જિલ્લો પસંદ કરો.');
      },
      { timeout: 10000 }
    );
  };

  const handleScanComplete = (result: PlantDiagnosisResult) => {
    storageService.saveScan(result);
    setScans(storageService.getScans());
    setSelectedReport(result);
  };

  const handleSelectSample = (sample: PlantDiagnosisResult) => {
    setSelectedReport(sample);
  };

  const handleDeleteScan = (scanId: string) => {
    const updated = storageService.deleteScan(scanId);
    setScans(updated);
    if (selectedReport?.id === scanId) {
      setSelectedReport(null);
    }
  };

  const handleSaveProfile = (newProfile: FarmerProfile) => {
    storageService.saveProfile(newProfile);
    setProfile(newProfile);
  };

  const handleAskChatAboutPlant = (plantName: string, issue: string) => {
    setInitialChatPrompt(`મારા ${plantName} પાકમાં "${issue}" ની સમસ્યા છે. આનાથી બચવા અને સારવાર માટે મારે શું કરવું જોઈએ?`);
    setSelectedReport(null);
    setActiveTab('chat');
  };

  const handleUpdateSowingDate = (newDate: string) => {
    const updated = { ...profile, sowing_date: newDate };
    handleSaveProfile(updated);
  };

  const handleUpdateCropName = (newCrop: string) => {
    const updated = { ...profile, crop_name: newCrop };
    handleSaveProfile(updated);
  };

  const handleAskChatAboutFertilizer = (crop: string, doseTitle: string, fertilizerList: string[]) => {
    setInitialChatPrompt(`મારા ${crop} પાકમાં "${doseTitle}" (${fertilizerList.join(', ')}) આપવાનો સમય થયો છે. આ ખાતર આપતી વખતે શું સાવચેતી રાખવી અને કઈ રીતે આપવું જેથી શ્રેષ્ઠ પરિણામ મળે?`);
    setSelectedReport(null);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col font-sans text-slate-800 selection:bg-emerald-200">
      {/* Top Header */}
      <Header
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={handleSelectDistrict}
        weather={weather}
        onOpenScanGuide={() => setIsScanGuideOpen(true)}
        onOpenMLDocs={() => setIsMLDocsOpen(true)}
        onOpenWeatherTab={() => {
          setSelectedReport(null);
          setActiveTab('weather');
        }}
      />

      {/* Navigation (Desktop Top Tabs + Mobile Bottom Bar) */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setSelectedReport(null);
          setActiveTab(tab);
        }}
        scansCount={scans.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedReport ? (
          /* Detailed Diagnosis Report Card */
          <ReportCard
            report={selectedReport}
            onBackToScan={() => setSelectedReport(null)}
            onAskChatAboutPlant={handleAskChatAboutPlant}
          />
        ) : (
          /* Tab Contents */
          <>
            {activeTab === 'home' && (
              <HomeView
                onStartScan={() => setActiveTab('scan')}
                onOpenWeather={() => setActiveTab('weather')}
                onOpenChat={() => setActiveTab('chat')}
                onOpenSamples={() => setActiveTab('samples')}
                onSelectSample={handleSelectSample}
                onOpenScanGuide={() => setIsScanGuideOpen(true)}
                recentScans={scans}
                onSelectScan={(s) => setSelectedReport(s)}
                weather={weather}
                selectedDistrictId={selectedDistrictId}
                farmerCropName={profile.crop_name}
                farmerSowingDate={profile.sowing_date}
                onUpdateSowingDate={handleUpdateSowingDate}
                onUpdateCropName={handleUpdateCropName}
                onAskChatAboutFertilizer={handleAskChatAboutFertilizer}
              />
            )}

            {activeTab === 'scan' && (
              <ScannerView
                onScanComplete={handleScanComplete}
                onOpenScanGuide={() => setIsScanGuideOpen(true)}
                onSelectSample={handleSelectSample}
              />
            )}

            {activeTab === 'samples' && (
              <SampleCasesView onSelectSample={handleSelectSample} />
            )}

            {activeTab === 'weather' && (
              <WeatherView
                weather={weather}
                selectedDistrictId={selectedDistrictId}
                onSelectDistrict={handleSelectDistrict}
                onRefreshWeather={() => loadWeatherForDistrict(selectedDistrictId)}
                isLoading={isLoadingWeather}
                onDetectGPS={handleDetectGPS}
              />
            )}

            {activeTab === 'chat' && (
              <ChatAssistant
                initialPrompt={initialChatPrompt}
                onClearInitialPrompt={() => setInitialChatPrompt(null)}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                scans={scans}
                onSelectScan={(s) => setSelectedReport(s)}
                onDeleteScan={handleDeleteScan}
                onStartNewScan={() => setActiveTab('scan')}
              />
            )}

            {activeTab === 'profile' && (
              <FarmerProfileView
                profile={profile}
                onSaveProfile={handleSaveProfile}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <ScanGuideModal
        isOpen={isScanGuideOpen}
        onClose={() => setIsScanGuideOpen(false)}
        onStartScan={() => {
          setSelectedReport(null);
          setActiveTab('scan');
        }}
      />

      <MLArchitectureModal
        isOpen={isMLDocsOpen}
        onClose={() => setIsMLDocsOpen(false)}
      />
    </div>
  );
}
