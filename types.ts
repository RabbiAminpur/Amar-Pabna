
export enum Category {
  BUS_COUNTER = 'বাস কাউন্টার',
  HEALTH = 'হাসপাতাল ও ক্লিনিক',
  COURIER = 'কুরিয়ার সার্ভিস',
  POLICE = 'থানা ও উপজেলা',
  EDUCATION = 'শিক্ষা প্রতিষ্ঠান',
  UNION = 'ইউনিয়ন পরিষদ',
  NEWS = 'সংবাদ মাধ্যম',
  HOTEL = 'হোটেল সার্ভিস',
  FOOD = 'খাবার',
  AMBULANCE = 'অ্যাম্বুলেন্স সার্ভিস',
  FIRE_SERVICE = 'ফায়ার সার্ভিস',
  BLOOD_BANK = 'ব্লাড ব্যাংক',
  OTHER = 'অন্যান্য'
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
  addedBy: string;
  timestamp: number;
  socialLinks?: SocialLink[];
}
