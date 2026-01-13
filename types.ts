
export enum Category {
  BUS_COUNTER = 'বাস কাউন্টার',
  HEALTH = 'হাসপাতাল ও ক্লিনিক',
  COURIER = 'কুরিয়ার সার্ভিস',
  POLICE = 'থানা',
  EDUCATION = 'শিক্ষা প্রতিষ্ঠান',
  UNION = 'ইউনিয়ন পরিষদ',
  NEWS = 'সংবাদ মাধ্যম',
  HOTEL = 'হোটেল সার্ভিস',
  FOOD = 'খাবার',
  AMBULANCE = 'অ্যাম্বুলেন্স সার্ভিস',
  FIRE_SERVICE = 'ফায়ার সার্ভিস',
  BLOOD_BANK = 'ব্লাড ব্যাংক',
  TOURIST_SPOT = 'দর্শনীয় স্থান',
  ANCIENT_ARCH = 'প্রাচীন স্থাপত্য',
  PERSONALITY = 'ব্যক্তিত্ব',
  GOVT_OFFICE = 'সরকারি অফিস',
  FINANCIAL_INSTITUTION = 'আর্থিক প্রতিষ্ঠান',
  MARKET = 'হাট বাজার',
  TRANSPORT_ROUTE = 'পরিবহন ও রুট',
  OTHER = 'অন্যান্য'
}

export enum UpazilaName {
  SADAR = 'পাবনা সদর',
  ISHWARDI = 'ঈশ্বরদী',
  CHATMOHAR = 'চাটমোহর',
  BERA = 'বেড়া',
  SANTHIA = 'সাঁথিয়া',
  FARIDPUR = 'ফরিদপুর',
  SUJANAGAR = 'সুজানগর',
  ATGHARIA = 'আটঘরিয়া',
  BHANGURA = 'ভাঙ্গুড়া'
}

export interface UpazilaInfo {
  id: string;
  name: UpazilaName;
  imageUrl: string;
  area: string;
  population: string;
  unions: string;
  villages: string;
  description: string;
  notablePlaces: string[];
}

export interface SocialLink {
  platform: 'facebook' | 'whatsapp' | 'website' | 'other';
  url: string;
}

export interface AreaInfo {
  id: string;
  title: string;
  category: Category;
  description: string;
  upazila: string;
  area: string;
  addresses: string[];
  contacts: string[];
  imageUrl?: string;
  galleryImages?: string[];
  howToGo?: string;
  dob?: string;
  dod?: string;
  pob?: string;
  profession?: string;
  objective?: string;
  workDetails?: string;
  openingDays?: string;
  officeHours?: string;
  swiftCode?: string;
  managerName?: string;
  ocName?: string;
  dutyOfficerNumber?: string;
  serviceType?: string;
  stationLocation?: string;
  marketDays?: string;
  marketStartTime?: string;
  marketItems?: string;
  transportRoute?: string;
  transportTime?: string;
  departurePoint?: string;
  addedBy: string;
  timestamp: number;
  socialLinks?: SocialLink[];
}
