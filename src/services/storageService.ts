import { PlantDiagnosisResult, FarmerProfile } from '../types/plant';
import { SAMPLE_CASES } from '../data/sampleCases';
import { DEFAULT_DISTRICT } from '../data/gujaratDistricts';

const SCANS_STORAGE_KEY = 'ai_plant_doctor_scans_v1';
const PROFILE_STORAGE_KEY = 'ai_plant_doctor_profile_v1';
const DISTRICT_STORAGE_KEY = 'ai_plant_doctor_district_v1';

export const storageService = {
  getScans(): PlantDiagnosisResult[] {
    try {
      const stored = localStorage.getItem(SCANS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initial state: seed with the first 2 sample cases for demonstration
      const initialScans = [SAMPLE_CASES[0], SAMPLE_CASES[1]];
      localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(initialScans));
      return initialScans;
    } catch {
      return [SAMPLE_CASES[0]];
    }
  },

  saveScan(scan: PlantDiagnosisResult): void {
    try {
      const scans = this.getScans();
      const existingIndex = scans.findIndex(s => s.id === scan.id);
      if (existingIndex >= 0) {
        scans[existingIndex] = scan;
      } else {
        scans.unshift(scan);
      }
      // Store up to 50 most recent scans
      const trimmed = scans.slice(0, 50);
      localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (err) {
      console.error('Error saving scan to local storage', err);
    }
  },

  deleteScan(scanId: string): PlantDiagnosisResult[] {
    try {
      const scans = this.getScans().filter(s => s.id !== scanId);
      localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(scans));
      return scans;
    } catch {
      return [];
    }
  },

  getProfile(): FarmerProfile {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    return {
      full_name: 'પટેલ રમેશભાઈ',
      phone: '98765 43210',
      village: 'ભીખાપુરા',
      taluka: 'હાલોલ',
      district: 'પંચમહાલ (Panchmahal)',
      crop_name: 'કપાસ (બીટી કપાસ)',
      sowing_date: '2026-06-15',
      soil_type: 'ગોરાડુ (Loamy Soil)',
      irrigation_type: 'ટપક પદ્ધતિ (Drip)',
      acreage: '૪ એકર'
    };
  },

  saveProfile(profile: FarmerProfile): void {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Error saving profile', err);
    }
  },

  getSelectedDistrictId(): string {
    try {
      return localStorage.getItem(DISTRICT_STORAGE_KEY) || DEFAULT_DISTRICT.id;
    } catch {
      return DEFAULT_DISTRICT.id;
    }
  },

  saveSelectedDistrictId(id: string): void {
    try {
      localStorage.setItem(DISTRICT_STORAGE_KEY, id);
    } catch {
      // ignore
    }
  },

  getAppliedFertilizerDoses(): Record<string, string> {
    try {
      const stored = localStorage.getItem('ai_plant_doctor_fertilizers_applied_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {};
  },

  toggleFertilizerDoseApplied(doseId: string, appliedDate?: string): Record<string, string> {
    try {
      const current = this.getAppliedFertilizerDoses();
      if (current[doseId]) {
        delete current[doseId];
      } else {
        current[doseId] = appliedDate || new Date().toISOString();
      }
      localStorage.setItem('ai_plant_doctor_fertilizers_applied_v1', JSON.stringify(current));
      return current;
    } catch (err) {
      console.error('Error toggling applied fertilizer dose', err);
      return {};
    }
  }
};
