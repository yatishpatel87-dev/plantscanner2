# 🌱 AI Plant Doctor – સ્માર્ટ પાક અને છોડ સહાયક (Smart Crop & Plant Assistant)

A modern, mobile-first, and highly intuitive agricultural diagnosis web app designed for Gujarati farmers, students, and agronomists: "ફોટો લો – પાક ઓળખો – સમસ્યા જાણો – યોગ્ય સંભાળ મેળવો" (Snap a photo – Identify crop – Diagnose issue – Receive safe care recommendations).

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1:
> - **Weather Data Source**: Real-time GPS location coupled with an instant 33-district Gujarat agricultural weather selector (powered by Open-Meteo live API, no API key required).
> - **Scanner Priority**: Live Gemini Vision AI scanner prioritized on first launch, with client-side image capture (camera + gallery upload + multi-angle leaf/crop shots) and robust fallback handling.
> - **Voice Interaction**: Speech-to-text voice microphone input ("બોલીને પૂછો") with clear Gujarati captions and structured cards (no audio speech synthesis engine required).
> - **ML Model & Database Architecture**: Detailed machine learning pipeline design (fine-tuning vision models for Indian/Gujarat agro-climatic conditions) and production-grade database schema (PostgreSQL + IndexedDB offline cache).

---

## 1. Overview & Core Concept

- **What It Does**: Allows farmers to take pictures of leaves, crops, flowers, or diseased plant parts using their phone camera or gallery. The app sends the image to a secure server-side Gemini Vision API (`gemini-flash-latest`) that returns a structured, verified diagnosis in natural Gujarati with strict uncertainty thresholds and safety rules.
- **Target Audience / Persona**: Smallholder and commercial farmers in Gujarat, agriculture university students, rural Krishi Vigyan Kendra (KVK) advisors, and home gardeners.
- **Key Value**: Delivers instant, field-ready diagnosis with Integrated Pest Management (IPM), non-chemical remedies, balanced fertilizer advice, water management, weather-sensitive warnings, and clear safety precautions—avoiding reckless pesticide overdose.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Scan & Diagnose Flow**:
   - Farmer taps large **"📷 છોડ સ્કેન કરો"** button from bottom tab bar or home banner.
   - Smart Scan Guide displayed: "૧. પૂરતો પ્રકાશ રાખો | ૨. પાનનો Close-up લો | ૩. આગળ-પાછળ બંને બાજુ | ૪. આખો છોડ".
   - Farmer captures or uploads one or more photos (leaf close-up, full plant).
   - Real-time animated crop scanning visualizer (scanning laser line + pulsing leaf nodes).
   - Structured Gujarati Report generated:
     - 🌱 પાક/છોડ (Gujarati, English & Botanical names + Growth stage)
     - 🟢/🟡/🔴 Health Status badge & Confidence level (High / Medium / Low)
     - 🐛 સંભવિત સમસ્યા (Pest/Disease symptoms, what to do, what NOT to do)
     - 🧪 પોષક તત્વોની ઉણપ (Nitrogen, P, K, Micronutrients & soil test advisory)
     - 💧 સિંચાઈ અને પાણી માર્ગદર્શન (Moisture check & weather sync)
     - 🛡️ સંભાળ અને આઈ.પી.એમ. ઉપાયો (Organic & IPM first, PPE warnings, no hazardous tank mixing)
     - 👨‍🌾 નિષ્ણાતનો સંપર્ક ક્યારે કરવો
2. **Gujarati AI Chat Assistant Flow ("કૃષિ મિત્ર")**:
   - Interactive chat interface with voice speech-to-text mic input ("🎤 બોલીને પૂછો") or quick tap suggestion chips ("કપાસના પાન પીળા કેમ પડે છે?", "મગફળીમાં ઉધઈ નિયંત્રણ").
   - Instant response in easy-to-understand Gujarati with safety disclaimers.
3. **Real-time Gujarat Agro-Weather Flow**:
   - Automatic GPS or 33 Gujarat district dropdown selector (Rajkot, Junagadh, Amreli, Banaskantha, Surat, etc.).
   - Live temperature, rainfall probability, humidity, wind speed, and agricultural advisory (e.g., "આવતા ૨૪ કલાકમાં વરસાદની શક્યતા હોવાથી દવાનો છંટકાવ કે પિયત આપવું મુલતવી રાખો").
4. **Scan History & Offline Farm Diary**:
   - Saves all scans locally (IndexedDB/localStorage) with high-res thumbnails, diagnosis summaries, and date stamps.
5. **Farmer Profile ("મારી ખેતી")**:
   - Stores farmer name, village, taluka, district, primary crops, sowing dates, soil type (કાળી, ગોરાડુ, રેતાળ), and irrigation type (ટપક, ફુવારા, ધોરિયા).

### Visual Identity & Theme

- **Aesthetic Direction**: Nature-grounded, ergonomic agricultural utility app. Deep emerald greens (`#14532d`), rich sage (`#15803d`), warm earthy tones (`#78350f` / `#fef3c7`), crisp high-contrast cards for direct sunlight visibility in fields.
- **Typography**: Clean Gujarati Unicode font stack (`system-ui`, `Shruti`, `Gujarati Sangam MN`, `Noto Sans Gujarati`) with large readable touch-friendly text (`text-base`, `text-lg`, `font-semibold`).
- **Touch-First Ergonomics**:
  - $48\text{px}$ minimum tap targets, thumb-friendly fixed bottom navigation with 5 primary destinations (Home, Scan, Weather, AI Chat, Profile/History).
  - No decorative AI slop: metadata rendered cleanly with typographic separators without static pill spam.

---

## 3. Key Product Decisions & Trade-Offs

- **Server-Side Vision AI**:
  - *Chosen Approach*: Node.js server route `/api/analyze-plant` invoking `@google/genai` with `gemini-flash-latest` using server-side API key.
  - *Why*: Protects API credentials, ensures strict JSON validation and safety filtering before reaching the client.
- **Strict Uncertainty & IPM Safety Framing**:
  - *Chosen Approach*: Prominently label all recommendations as preliminary advisory. Never recommend toxic chemical cocktails or exact milliliter dosages without label and local agricultural extension (KVK) verification. Prioritize biological/IPM controls first.
- **Weather Integration via Open-Meteo**:
  - *Chosen Approach*: Real-time GPS and 33 Gujarat district geocoordinates queried directly via Open-Meteo free agro-weather API.
  - *Why*: Fast, zero API key requirement, highly accurate for rural Gujarat coordinates.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / MOBILE BROWSER                         │
│  ┌───────────────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │ Camera / Photo Upload │  │ Gujarati Voice  │  │ Gujarat District │  │
│  │ (Leaf & Plant Shots)  │  │ StT Mic Input   │  │ GPS / Selector   │  │
│  └───────────┬───────────┘  └────────┬────────┘  └────────┬─────────┘  │
│              │                       │                    │            │
│              ▼                       ▼                    ▼            │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     REACT 19 MOBILE SHELL UI                     │  │
│  │  - Navigation Tabs (Home / Scan / Weather / Chat / History)      │  │
│  │  - Smart Scan Guide & Animated Laser Scan Canvas                 │  │
│  │  - Comprehensive Gujarati Crop Diagnostic Card Renderers         │  │
│  │  - Local Offline Storage Engine (IndexedDB + localStorage)       │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │ HTTP POST / GET
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     VITE / NODE SERVER PROXY API                       │
│  ┌─────────────────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │ /api/analyze-plant      │  │ /api/chat     │  │ /api/weather     │  │
│  │ Multimodal Gemini Vision│  │ Gujarati Farm │  │ Open-Meteo Agro  │  │
│  │ Model (gemini-flash)    │  │ Advisory      │  │ Live Forecast    │  │
│  └───────────┬─────────────┘  └───────┬───────┘  └──────────────────┘  │
│              │                        │                                │
│              ▼                        ▼                                │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                 GOOGLE GEMINI API (@google/genai)                │  │
│  │                 Model: models/gemini-flash-latest                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Machine Learning Model Architecture Design

For a production-scale agricultural vision system serving Gujarat and Indian agriculture:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HYBRID AGRI-VISION ML PIPELINE                           │
│                                                                             │
│  [ Input Image: 512x512 RGB Leaf / Plant Photo ]                            │
│                         │                                                   │
│                         ▼                                                   │
│  [ Stage 1: Crop & Organ Classifier (Edge / MobileNetV4 / ConvNeXt-Nano) ] │
│  ├── Crop Identification: Cotton, Groundnut, Wheat, Onion, Tomato, etc.     │
│  └── Organ Segmentation: Leaf, Fruit, Stem, Root, Flower (YOLOv8-Seg)       │
│                         │                                                   │
│                         ▼                                                   │
│  [ Stage 2: Disease & Pest Pathology Feature Extractor ]                    │
│  ├── Swin-Transformer / ViT fine-tuned on ICAR + PlantVillage India        │
│  ├── Anomaly & Lesion Heatmap (Grad-CAM localization of leaf spots/curls)   │
│  └── Symptom Feature Embedding Vector (512-dim)                             │
│                         │                                                   │
│                         ▼                                                   │
│  [ Stage 3: Multimodal Reasoning & Calibrated Expert Classifier ]           │
│  ├── Multimodal Foundation Model: Gemini Vision + Domain Prompt Grounding   │
│  ├── Temperature Scaling & Confidence Calibration (ECE < 0.05)              │
│  └── Uncertainty Gate: If Confidence < 70%, trigger "Unclear photo" guide   │
│                         │                                                   │
│                         ▼                                                   │
│  [ Structured JSON Output in Gujarati (Safety-screened IPM Advisory) ]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dataset & Training Strategy
1. **Target Datasets**:
   - Indian Council of Agricultural Research (ICAR) Crop Pest & Disease Database.
   - Gujarat Agricultural University (AAU, JAU, NAU, SDAU) field pathology datasets.
   - PlantVillage benchmark enriched with outdoor field conditions (shadows, soil background, varying sunlight).
2. **Data Augmentations**:
   - Random solar glare, dust particle simulation, slight motion blur, color jitter (simulating varied field daylight conditions).

---

## 6. Database Schema Design (PostgreSQL / Relational & Firestore)

### Relational Schema (PostgreSQL / Drizzle ORM)

```sql
-- Farmers Profile
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(15),
    village VARCHAR(100) NOT NULL,
    taluka VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    soil_type VARCHAR(50) DEFAULT 'black', -- કાળી, ગોરાડુ, રેતાળ
    irrigation_type VARCHAR(50) DEFAULT 'drip', -- ટપક, ફુવારા, ધોરિયા
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Farm Plots & Crops
CREATE TABLE farm_crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    crop_name_gu VARCHAR(100) NOT NULL,
    crop_name_en VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    sowing_date DATE NOT NULL,
    acreage NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plant Scans & Vision Analysis Records
CREATE TABLE plant_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES farmers(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES farm_crops(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    plant_name_gu VARCHAR(100),
    plant_name_en VARCHAR(100),
    scientific_name VARCHAR(150),
    growth_stage VARCHAR(50),
    health_status VARCHAR(20) NOT NULL, -- 'healthy', 'attention', 'critical'
    confidence_level VARCHAR(20) NOT NULL, -- 'high', 'medium', 'low'
    confidence_score NUMERIC(4,3),
    possible_disease TEXT,
    possible_pest TEXT,
    possible_deficiency TEXT,
    water_guidance TEXT,
    care_recommendation TEXT,
    treatment_guidance TEXT,
    safety_warning TEXT,
    scan_meta JSONB, -- device info, coordinates, lighting
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_scans_farmer ON plant_scans(farmer_id);
CREATE INDEX idx_scans_date ON plant_scans(created_at DESC);

-- Weather Forecast Advisory Logs
CREATE TABLE weather_advisories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district VARCHAR(100) NOT NULL,
    temperature_c NUMERIC(4,1),
    humidity_percent NUMERIC(4,1),
    rainfall_prob_percent NUMERIC(4,1),
    wind_speed_kmh NUMERIC(4,1),
    agri_advisory_gu TEXT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 7. Step-by-Step Implementation Strategy

1. **Metadata & HTML Setup**: Set app name to `AI Plant Doctor – સ્માર્ટ પાક અને છોડ સહાયક` in `metadata.json` and `index.html`.
2. **Server-Side API Implementation (`server.ts` & Vite dev integration)**:
   - `/api/analyze-plant`: Accepts base64 images, prepares strict system prompt for agricultural safety, queries `@google/genai` with `gemini-flash-latest`, validates and returns JSON.
   - `/api/chat`: Contextual agriculture chat assistant in Gujarati.
   - `/api/weather`: Real-time weather proxy and district coordinates for all 33 districts of Gujarat.
3. **Frontend UI Components**:
   - `Navbar & Header`: Clean title with Gujarat district quick-badge.
   - `ScanModule`: Camera capture, gallery file picker, multi-photo preview (close-up leaf + whole plant), scan guide modal.
   - `ReportView`: Complete Gujarati diagnostic report with color-coded health status, IPM solutions, fertilizer advice, and expert consultation prompts.
   - `ChatAssistant`: Voice-dictated (Web Speech Recognition) and text chat with agricultural quick suggestions.
   - `WeatherCard`: Live temperature, rain forecast, and farming advisory.
   - `History & Profile`: Local storage sync for offline review and profile customization.
   - `SampleLibrary`: Instant demo cases (Cotton, Groundnut, Wheat, Onion, Tomato, Chilli, Rose, Tulsi) for seamless testing.
4. **Verification**: Run `compile_applet` and test all responsive views.
