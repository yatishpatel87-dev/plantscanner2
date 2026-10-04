import React, { useState } from 'react';
import { UserCheck, Save, Check, MapPin, Calendar, Sprout, Droplets, Layers } from 'lucide-react';
import { FarmerProfile } from '../types/plant';
import { GUJARAT_DISTRICTS } from '../data/gujaratDistricts';
import { CropGrowthTimeline } from './CropGrowthTimeline';
import { FertilizerReminderCard } from './FertilizerReminderCard';

interface FarmerProfileViewProps {
  profile: FarmerProfile;
  onSaveProfile: (profile: FarmerProfile) => void;
}

export const FarmerProfileView: React.FC<FarmerProfileViewProps> = ({
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<FarmerProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Title Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
              મારી ખેતી પ્રોફાઇલ (Farmer Profile)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              આપના ખેતરની વિગતો સાચવો જેથી AI આપના પાક અને જમીન મુજબ ચોક્કસ સલાહ આપી શકે
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 space-y-4">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ખેડૂતનું નામ (Full Name):
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              મોબાઇલ નંબર (Mobile No.):
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Location: Village, Taluka, District */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>ગામ (Village):</span>
            </label>
            <input
              type="text"
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              તાલુકો (Taluka):
            </label>
            <input
              type="text"
              value={formData.taluka}
              onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              જિલ્લો (District):
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            >
              {GUJARAT_DISTRICTS.map((d) => (
                <option key={d.id} value={`${d.name_gu} (${d.name_en})`}>
                  {d.name_gu} ({d.name_en})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Crop & Sowing Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>મુખ્ય વાવેતર પાક (Main Crop):</span>
            </label>
            <input
              type="text"
              value={formData.crop_name}
              onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
              placeholder="ઉદા. કપાસ, મગફળી, ઘઉં, ડુંગળી"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>વાવણી તારીખ (Sowing Date):</span>
            </label>
            <input
              type="date"
              value={formData.sowing_date}
              onChange={(e) => setFormData({ ...formData, sowing_date: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Soil Type, Irrigation, Acreage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>જમીનનો પ્રકાર:</span>
            </label>
            <select
              value={formData.soil_type}
              onChange={(e) => setFormData({ ...formData, soil_type: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="કાળી (Black Soil)">કાળી જમીન (Black Soil)</option>
              <option value="ગોરાડુ (Loamy Soil)">ગોરાડુ જમીન (Loamy Soil)</option>
              <option value="રેતાળ (Sandy Soil)">રેતાળ જમીન (Sandy Soil)</option>
              <option value="કાંપવાળી (Alluvial)">કાંપવાળી જમીન (Alluvial)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-700" />
              <span>સિંચાઈ પદ્ધતિ:</span>
            </label>
            <select
              value={formData.irrigation_type}
              onChange={(e) => setFormData({ ...formData, irrigation_type: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="ટપક પદ્ધતિ (Drip)">ટપક પદ્ધતિ (Drip)</option>
              <option value="ફુવારા પદ્ધતિ (Sprinkler)">ફુવારા પદ્ધતિ (Sprinkler)</option>
              <option value="ધોરિયા પદ્ધતિ (Flood)">ધોરિયા પદ્ધતિ (Flood)</option>
              <option value="વરસાદ આધારિત (Rainfed)">વરસાદ આધારિત (Rainfed)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              જમીન વિસ્તાર (Acreage):
            </label>
            <input
              type="text"
              value={formData.acreage}
              onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
              placeholder="ઉદા. ૪ એકર / ૮ વીઘા"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>માહિતી સફળતાપૂર્વક સાચવવામાં આવી!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-emerald-300" />
                <span>પ્રોફાઇલ સાચવો (Save Profile)</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Visual Crop Growth Timeline & Fertilizer Reminders */}
      <div className="mt-6 space-y-6">
        <CropGrowthTimeline
          cropName={formData.crop_name}
          sowingDate={formData.sowing_date}
          onUpdateSowingDate={(newDate) => {
            const updated = { ...formData, sowing_date: newDate };
            setFormData(updated);
            onSaveProfile(updated);
          }}
          onUpdateCropName={(newCrop) => {
            const updated = { ...formData, crop_name: newCrop };
            setFormData(updated);
            onSaveProfile(updated);
          }}
        />

        <FertilizerReminderCard
          cropName={formData.crop_name}
          sowingDate={formData.sowing_date}
        />
      </div>
    </div>
  );
};
