
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, WifiOff,
  Clock, ChevronDown, LayoutGrid, List,
  Stethoscope, Bus, Siren, Hotel, ChevronRight,
  Flame, ShieldAlert, Phone, Map, Landmark, 
  Navigation, ImageIcon, User, Calendar, Briefcase
} from 'lucide-react';
import { AreaInfo, Category } from './types.ts';

// হিরো সেকশনের প্রধান ক্যাটাগরি কনফিগ
const HERO_CATEGORIES = [
  { 
    name: Category.HEALTH, 
    label: 'হাসপাতাল ও ক্লিনিক', 
    icon: Stethoscope, 
    color: 'bg-blue-500', 
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    anim: 'animate-soft-pulse'
  },
  { 
    name: Category.BUS_COUNTER, 
    label: 'বাস কাউন্টার', 
    icon: Bus, 
    color: 'bg-indigo-500', 
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    anim: 'animate-float'
  },
  { 
    name: 'EMERGENCY_HUB', 
    label: 'ইমার্জেন্সি সার্ভিস', 
    icon: Siren, 
    color: 'bg-rose-500', 
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    anim: 'animate-bounce-custom'
  },
  { 
    name: Category.HOTEL, 
    label: 'হোটেল সার্ভিস', 
    icon: Hotel, 
    color: 'bg-amber-500', 
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    anim: 'animate-wobble'
  },
  { 
    name: Category.TOURIST_SPOT, 
    label: 'দর্শনীয় স্থান', 
    icon: Map, 
    color: 'bg-teal-500', 
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    anim: 'animate-soft-pulse'
  },
  { 
    name: Category.ANCIENT_ARCH, 
    label: 'প্রাচীন স্থাপত্য', 
    icon: Landmark, 
    color: 'bg-orange-500', 
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    anim: 'animate-float'
  },
  { 
    name: Category.PERSONALITY, 
    label: 'ব্যক্তিত্ব', 
    icon: User, 
    color: 'bg-purple-500', 
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    anim: 'animate-soft-pulse'
  },
];

const DATA: AreaInfo[] = [
  {
    id: 'per-1',
    title: 'অনুকূলচন্দ্র চক্রবর্তী',
    category: Category.PERSONALITY,
    upazila: 'পাবনা সদর',
    area: 'হিমায়েতপুর',
    description: 'শ্রীশ্রীঠাকুর অনুকূলচন্দ্র একজন হিন্দু ধর্মীয় সংস্কারক ছিলেন। তিনি সৎসঙ্গ নামক সংগঠনের প্রবর্তক। তার আদর্শ ও দর্শন লক্ষ লক্ষ মানুষের জীবনকে প্রভাবিত করেছে। হিমায়েতপুরে তার প্রতিষ্ঠিত সৎসঙ্গ আশ্রম পাবনার অন্যতম গর্ব।',
    dob: '১৪ সেপ্টেম্বর ১৮৮৮',
    dod: '২৬ জানুয়ারি ১৯৬৯',
    pob: 'হিমায়েতপুর, পাবনা',
    profession: 'ধর্মীয় সংস্কারক ও সাধক',
    addresses: ['সৎসঙ্গ আশ্রম, হিমায়েতপুর, পাবনা'],
    contacts: ['-'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sree_Sree_Thakur_Anukulchandra.jpg/800px-Sree_Sree_Thakur_Anukulchandra.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  },
  {
    id: 'ts-1',
    title: 'হার্ডিঞ্জ ব্রিজ',
    category: Category.TOURIST_SPOT,
    upazila: 'ঈশ্বরদী',
    area: 'পাকশী',
    description: 'হার্ডিঞ্জ ব্রিজ পাবনা জেলার ঈশ্বরদী উপজেলার পাকশীতে অবস্থিত একটি ঐতিহাসিক রেলসেতু। ১৯১২ সালে এর নির্মাণ কাজ শুরু হয় এবং ১৯১৫ সালে শেষ হয়। এটি বাংলাদেশের অন্যতম প্রধান পর্যটন কেন্দ্র। সূর্যাস্তের সময় এখান থেকে পদ্মার রূপ অসাধারণ দেখায়।',
    howToGo: 'পাবনা শহর থেকে সিএনজি বা বাসে করে ঈশ্বরদী হয়ে পাকশী যাওয়া যায়। এছাড়া ট্রেনে ঈশ্বরদী রেলওয়ে জংশন নেমে অটোতে যাওয়া সহজ।',
    addresses: ['পাকশী, ঈশ্বরদী, পাবনা'],
    contacts: ['-'],
    imageUrl: 'https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1623055964434-5853f65675e8?auto=format&fit=crop&w=800&q=80'
    ],
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  },
  {
    id: 'arch-1',
    title: 'জোড় বাংলা মন্দির',
    category: Category.ANCIENT_ARCH,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    description: 'জোড় বাংলা মন্দির পাবনা শহরের কালাচাঁদপাড়ায় অবস্থিত একটি অতি প্রাচীন মন্দির। অষ্টাদশ শতাব্দীর মাঝামাঝি সময়ে এটি নির্মিত হয়। মন্দিরের দেওয়ালে টেরাকোটার কারুকাজ অত্যন্ত চমৎকার। এটি পাবনা জেলার ঐতিহ্যের অন্যতম নিদর্শন।',
    howToGo: 'পাবনা শহরের কেন্দ্রীয় বাস টার্মিনাল বা আব্দুল হামিদ রোড থেকে রিকশা বা অটোতে কালাচাঁদপাড়া জোড় বাংলা মন্দির বললেই পৌঁছে যাওয়া যাবে।',
    addresses: ['কালাচাঁদপাড়া, পাবনা শহর'],
    contacts: ['-'],
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80'
    ],
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  },
  {
    id: '1',
    title: '২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, পাবনা',
    category: Category.HEALTH,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    description: 'পাবনা জেলার প্রধান সরকারি চিকিৎসা কেন্দ্র।',
    addresses: ['হাসপাতাল রোড, পাবনা সদর'],
    contacts: ['01730324813'],
    imageUrl: 'https://i.ibb.co/0yPD7HCp/598424785-1267135282105126-1687972329689254049-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1714000000000, 
  },
  {
    id: '5',
    title: 'পাবনা এক্সপ্রেস',
    category: Category.BUS_COUNTER,
    upazila: 'ঢাকা',
    area: 'গাবতলী',
    description: 'পাবনা এক্সপ্রেস গাবতলী কাউন্টার।',
    addresses: ['গাবতলী, ঢাকা'],
    contacts: ['01718507828'],
    imageUrl: 'https://i.ibb.co/b5XrFJxp/266762814-208341711466108-9127291067624475523-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1713000000000,
  },
  {
    id: '6',
    title: 'হোটেল নুর, কাশিনাথপুর',
    category: Category.HOTEL,
    upazila: 'আমিনপুর (থানা এলাকা)',
    area: 'কাশিনাথপুর',
    description: 'কাশিনাথপুর এলাকার একটি আধুনিক আবাসিক হোটেল।',
    addresses: ['নুর প্লাজা, কাশিনাথপুর'],
    contacts: ['01775142831'],
    imageUrl: 'https://i.ibb.co/1Gy7sVSb/IMG-20260113-222912.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  }
];

// আইটেম কার্ড কম্পোনেন্ট
const ItemCard: React.FC<{ 
  item: AreaInfo; 
  onDetail: () => void;
  onCopy: (num: string) => void;
  isCopied: boolean;
}> = ({ item, onDetail, onCopy, isCopied }) => {
  const isSpecial = item.category === Category.TOURIST_SPOT || item.category === Category.ANCIENT_ARCH || item.category === Category.PERSONALITY;
  const hasPhone = !isSpecial && item.contacts && item.contacts[0] !== '-';

  return (
    <div className="bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col active:scale-[0.99] transition-transform" onClick={onDetail}>
      <div className="flex p-3 gap-3">
        {item.imageUrl && (
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
            <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-tight">{item.category}</p>
          
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              {item.category === Category.PERSONALITY ? (
                <Briefcase className="w-3 h-3 text-purple-400 shrink-0" />
              ) : (
                <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
              )}
              <span className="text-[10px] text-gray-500 truncate font-medium">
                {item.category === Category.PERSONALITY ? (item.profession || item.area) : item.area}
              </span>
            </div>
            
            {hasPhone && (
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                  <Phone className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span className="text-[10px] text-gray-800 font-bold whitespace-nowrap">{item.contacts[0]}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onCopy(item.contacts[0]); }}
                    className={`p-1.5 rounded-lg transition-all ${isCopied ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:text-indigo-600'}`}
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a 
                    href={`tel:${item.contacts[0]}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 bg-indigo-600 text-white rounded-lg transition-all shadow-sm"
                  >
                    <PhoneCall className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderImages = useMemo(() => {
    return [...DATA]
      .filter(item => !!item.imageUrl)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(item => item.imageUrl);
  }, []);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  if (sliderImages.length === 0) return null;

  return (
    <div className="relative w-full aspect-[18/9] overflow-hidden mb-5 shadow-sm border-b border-gray-100 pointer-events-none">
      <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {sliderImages.map((img, idx) => (
          <img key={idx} src={img} className="w-full h-full object-cover shrink-0" alt="Slider" />
        ))}
      </div>
    </div>
  );
};

// ক্যাটাগরি ভিউ কম্পোনেন্ট
const CategoryListView: React.FC<{
  category: string;
  data: AreaInfo[];
  goBack: () => void;
  onItemDetail: (item: AreaInfo) => void;
}> = ({ category, data, goBack, onItemDetail }) => {
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [copiedNum, setCopiedNum] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNum(num);
    setTimeout(() => setCopiedNum(null), 2000);
  };

  const subCategories = useMemo(() => {
    if (category === Category.BUS_COUNTER) {
      const counts: Record<string, number> = {};
      data.forEach(item => counts[item.title] = (counts[item.title] || 0) + 1);
      return Object.entries(counts).filter(([_, count]) => count > 1).map(([name]) => name);
    }
    if (category === 'EMERGENCY_HUB') {
      return ['অ্যাম্বুলেন্স সার্ভিস', 'ফায়ার সার্ভিস', 'ডিউটি পুলিশ', 'ইমার্জেন্সি নাম্বার'];
    }
    return [];
  }, [category, data]);

  const filteredItems = useMemo(() => {
    if (!selectedSub) {
      if (subCategories.length > 0) return []; 
      return data;
    }
    
    if (category === Category.BUS_COUNTER) return data.filter(item => item.title === selectedSub);
    
    if (category === 'EMERGENCY_HUB') {
      const mapping: Record<string, Category> = {
        'অ্যাম্বুলেন্স সার্ভিস': Category.AMBULANCE,
        'ফায়ার সার্ভিস': Category.FIRE_SERVICE,
        'ডিউটি পুলিশ': Category.POLICE
      };
      if (selectedSub === 'ইমার্জেন্সি নাম্বার') {
        return [{
          id: 'hotline1',
          title: 'জাতীয় জরুরি সেবা',
          category: Category.OTHER,
          area: 'বাংলাদেশ',
          description: '৯৯৯ হেল্পলাইন',
          contacts: ['999'],
          addresses: ['সারাদেশ'],
          addedBy: 'সিস্টেম',
          timestamp: Date.now()
        }] as AreaInfo[];
      }
      return data.filter(item => item.category === mapping[selectedSub]);
    }
    return data;
  }, [selectedSub, data, subCategories, category]);

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto animate-in slide-in-from-right duration-300 safe-top">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-4">
        <button onClick={selectedSub ? () => setSelectedSub(null) : goBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-gray-800">{selectedSub || category.replace('EMERGENCY_HUB', 'ইমার্জেন্সি সার্ভিস')}</h2>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{selectedSub ? 'তথ্যসমূহ' : 'ক্যাটাগরি'}</p>
        </div>
      </header>
      
      <main className="max-w-md mx-auto p-4 space-y-4 pb-24">
        {!selectedSub && subCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {subCategories.map((sub) => (
              <button 
                key={sub}
                onClick={() => setSelectedSub(sub)}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-lg">
                    {category === 'EMERGENCY_HUB' ? (
                      sub.includes('অ্যাম্বুলেন্স') ? <Siren className="w-5 h-5" /> :
                      sub.includes('ফায়ার') ? <Flame className="w-5 h-5" /> :
                      sub.includes('পুলিশ') ? <ShieldAlert className="w-5 h-5" /> : <Phone className="w-5 h-5" />
                    ) : <Bus className="w-5 h-5" />}
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">{sub}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
            {category === Category.BUS_COUNTER && data.filter(item => !subCategories.includes(item.title)).map(item => (
               <ItemCard key={item.id} item={item} onDetail={() => onItemDetail(item)} onCopy={handleCopy} isCopied={copiedNum === item.contacts[0]} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onDetail={() => onItemDetail(item)} onCopy={handleCopy} isCopied={copiedNum === item.contacts[0]} />
            )) : (
              <div className="py-20 text-center">
                <LayoutGrid className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">কোনো তথ্য পাওয়া যায়নি</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
  visibleData: AreaInfo[];
  loadMore: () => void;
  hasMore: boolean;
  navigateToAreaItem: (item: AreaInfo) => void;
  onCategoryClick: (cat: string) => void;
  toggleSave: (e: React.MouseEvent, id: string) => void;
  savedIds: string[];
  isOffline: boolean;
  openAbout: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  searchTerm, setSearchTerm, showSavedOnly, setShowSavedOnly, visibleData, 
  loadMore, hasMore, navigateToAreaItem, onCategoryClick, toggleSave, savedIds, isOffline, openAbout 
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md pt-3 pb-2 safe-top border-b border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <h1 className="text-lg font-bold text-indigo-700 flex items-center gap-1.5 tracking-tight">
              <MapPin className="w-4 h-4 fill-indigo-200" />
              আমার পাবনা
            </h1>
            <div className="flex gap-1">
              <button onClick={() => setIsSearchVisible(!isSearchVisible)} className={`p-1.5 rounded border ${isSearchVisible ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                <Search className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`p-1.5 rounded border ${showSavedOnly ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                <Heart className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-rose-500' : ''}`} />
              </button>
              <button onClick={openAbout} className="p-1.5 bg-gray-50 border border-gray-100 text-gray-400 rounded">
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isSearchVisible ? 'max-h-12 mt-2 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input type="text" placeholder="যেকোনো সেবা খুঁজুন..." className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:bg-white transition-all text-[11px] font-medium shadow-inner" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus={isSearchVisible} />
              {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400"><X className="w-2.5 h-2.5" /></button>}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        <ImageSlider />

        <div className="max-w-md mx-auto px-4">
          <div className="mb-10">
            <div className="grid grid-cols-2 gap-3">
              {HERO_CATEGORIES.map((cat) => (
                <button key={cat.name} onClick={() => onCategoryClick(cat.name)} className={`group flex flex-col items-center justify-center p-4 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 active:scale-[0.97] text-center space-y-2.5 ${cat.lightColor}`}>
                  <div className={`p-2.5 ${cat.color} text-white shadow-md shadow-black/5 transition-all duration-300 ${cat.anim}`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-[12px] font-bold ${cat.textColor} leading-tight`}>{cat.label}</p>
                    <div className="flex items-center justify-center mt-1 text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                      তথ্য <ChevronRight className="w-2 h-2 ml-0.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">সাম্প্রতিক আপডেট</h2>
            <span className="text-[9px] font-bold text-gray-400 bg-white/80 border border-gray-100 px-2 py-0.5">{visibleData.length} টি তথ্য</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-8">
            {visibleData.length > 0 ? visibleData.map((item) => (
              <div key={item.id} onClick={() => navigateToAreaItem(item)} className="group bg-white overflow-hidden shadow-sm border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer active:scale-[0.98] relative">
                <button onClick={(e) => toggleSave(e, item.id)} className="absolute top-2 right-2 z-10 p-2 bg-white/60 backdrop-blur-md border border-white/40">
                  <Heart className={`w-3 h-3 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                </button>
                {item.imageUrl && (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
                  </div>
                )}
                <div className="p-3">
                  <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-[12px] font-bold text-gray-800 leading-tight line-clamp-2 mt-1 min-h-[2.2rem]">{item.title}</h3>
                  <div className="flex items-start gap-1 text-[9px] text-gray-400 mt-2.5 pt-2.5 border-t border-gray-50">
                    <MapPin className="w-2.5 h-2.5 text-indigo-400 shrink-0 mt-0.5" /> 
                    <span className="truncate">{item.area}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 py-20 text-center space-y-3">
                <Search className="w-8 h-8 text-gray-200 mx-auto" />
                <p className="text-xs text-gray-400 font-medium tracking-wide">তথ্য পাওয়া যায়নি</p>
              </div>
            )}
          </div>
          {hasMore && (
            <div className="pb-28">
              <button onClick={loadMore} className="w-full py-3.5 bg-white border border-gray-100 text-indigo-600 text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.98]">
                আরও দেখুন <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

const DetailView: React.FC<{ item: AreaInfo; goBack: () => void; toggleSave: (e: React.MouseEvent, id: string) => void; savedIds: string[]; handleCopy: (text: string) => void; copiedText: string | null; openInMaps: (addr: string) => void; }> = ({ item, goBack, toggleSave, savedIds, handleCopy, copiedText, openInMaps }) => {
  const isSpecial = item.category === Category.TOURIST_SPOT || item.category === Category.ANCIENT_ARCH;
  const isPersonality = item.category === Category.PERSONALITY;
  
  const getRelativeTime = (ts: number) => {
    const diff = Date.now() - ts;
    const toBn = (num: number) => num.toLocaleString('bn-BD');
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 60) return `${toBn(minutes)} মিনিট আগে`;
    if (hours < 24) return `${toBn(hours)} ঘণ্টা আগে`;
    return `${toBn(days)} দিন আগে`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full max-w-md mx-auto bg-gray-100">
        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-4 left-4"><button onClick={goBack} className="p-2.5 bg-black/40 backdrop-blur-md text-white border border-white/20"><ArrowLeft className="w-5 h-5" /></button></div>
        <div className="absolute top-4 right-4"><button onClick={(e) => toggleSave(e, item.id)} className="p-2.5 bg-black/40 backdrop-blur-md text-white border border-white/20"><Heart className={`w-5 h-5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} /></button></div>
      </div>
      
      <div className="p-6 max-w-md mx-auto bg-white min-h-screen -mt-6 rounded-t-[32px] shadow-2xl relative z-10 border-t border-gray-100">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
        
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
          {!isSpecial && !isPersonality && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-wider">{item.area}</span>}
        </div>
        
        <h2 className="text-2xl font-black text-gray-800 mb-2 leading-tight tracking-tight">{item.title}</h2>
        
        <div className="flex items-center gap-1.5 mb-6 opacity-60">
          {isPersonality ? null : isSpecial ? (
            <>
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{item.area}</span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">সর্বশেষ আপডেট: {getRelativeTime(item.timestamp)}</span>
            </>
          )}
        </div>

        {isPersonality && (
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3 text-indigo-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">জন্ম তারিখ</span>
                </div>
                <p className="text-[13px] text-gray-700 font-bold">{item.dob || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3 text-rose-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">মৃত্যু তারিখ</span>
                </div>
                <p className="text-[13px] text-gray-700 font-bold">{item.dod || 'বেঁচে আছেন'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">জন্ম স্থান</span>
                </div>
                <p className="text-[13px] text-gray-700 font-bold">{item.pob || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">পেশা</span>
                </div>
                <p className="text-[13px] text-gray-700 font-bold">{item.profession || '-'}</p>
              </div>
            </div>
          </div>
        )}

        <section className="mb-8">
          {!isSpecial && !isPersonality && <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">বিস্তারিত তথ্য</h4>}
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
        </section>

        {/* যাতায়াত ব্যবস্থা */}
        {item.howToGo && (
          <section className="mb-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <h4 className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
              <Navigation className="w-3 h-3" /> কিভাবে যাবেন
            </h4>
            <p className="text-gray-700 text-[13px] leading-relaxed italic">{item.howToGo}</p>
          </section>
        )}

        {/* ইমজ গ্যালারি - মেইন কন্টেন্টের শেষে */}
        {item.galleryImages && item.galleryImages.length > 0 && (
          <section className="mb-8">
            {!isSpecial && !isPersonality && (
              <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                <ImageIcon className="w-3 h-3" /> ছবি গ্যালারি
              </h4>
            )}
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {item.galleryImages.map((img, i) => (
                <div key={i} className="min-w-[140px] aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-8 pb-12">
          {!isSpecial && !isPersonality && item.contacts[0] !== '-' && (
            <section className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">যোগাযোগ</h4>
              {item.contacts.map((num, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-sm text-gray-800 font-bold tracking-wider">{num.toLocaleString('bn-BD')}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(num)} className={`p-3 rounded-xl transition-all ${copiedText === num ? 'bg-green-600 text-white' : 'bg-white text-gray-400 shadow-sm border border-gray-100'}`}>{copiedText === num ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
                    <a href={`tel:${num}`} className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200"><PhoneCall className="w-4 h-4" /></a>
                  </div>
                </div>
              ))}
            </section>
          )}
          {!isPersonality && (
            <section className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ঠিকানা ও ম্যাপ</h4>
              {item.addresses.map((addr, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[13px] text-gray-700 font-medium leading-relaxed">{addr}</p>
                  <button onClick={() => openInMaps(addr)} className="shrink-0 p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shadow-sm"><ExternalLink className="w-4 h-4" /></button>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutView: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto animate-in slide-in-from-right duration-300 safe-top">
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4"><button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ArrowLeft className="w-5 h-5 text-gray-600" /></button><h2 className="text-base font-bold text-gray-800">অ্যাপ তথ্য</h2></header>
    <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
      <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm"><div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6 shadow-indigo-200"><MapPin className="w-10 h-10 text-white" /></div><h3 className="text-2xl font-black text-gray-800">আমার পাবনা</h3><p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">ভার্সন: ৫.২.০ (ব্যক্তিত্ব ক্যাটাগরি আপডেট)</p></div>
      <section className="space-y-4"><h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">ডেভেলপার প্রোফাইল</h4><div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5"><div className="w-16 h-16 overflow-hidden rounded-2xl shadow-sm border-2 border-indigo-50"><img src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" className="w-full h-full object-cover" /></div><div><h5 className="font-bold text-gray-800 text-base">মীর রাব্বি হোসেন</h5><p className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">পাবনা জেলা, বাংলাদেশ</p></div></div></section>
    </main>
  </div>
);

type ViewState = 'home' | 'area-detail' | 'about' | 'category-list';
const ITEMS_PER_PAGE = 20;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [selectedAreaItem, setSelectedAreaItem] = useState<AreaInfo | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const stored = localStorage.getItem('amar_pabna_saved');
    if (stored) { try { setSavedIds(JSON.parse(stored)); } catch (e) {} }
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  useEffect(() => { localStorage.setItem('amar_pabna_saved', JSON.stringify(savedIds)); }, [savedIds]);

  const filteredData = useMemo(() => {
    const str = searchTerm.toLowerCase();
    return DATA.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(str) || item.description.toLowerCase().includes(str) || item.area.toLowerCase().includes(str) || item.upazila.toLowerCase().includes(str);
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const isEmergency = selectedCategory === 'EMERGENCY_HUB' && [Category.AMBULANCE, Category.FIRE_SERVICE, Category.POLICE].includes(item.category);
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      return (matchesSearch && (matchesCategory || isEmergency)) && matchesSaved;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [searchTerm, selectedCategory, showSavedOnly, savedIds]);

  const visibleData = useMemo(() => filteredData.slice(0, visibleCount), [filteredData, visibleCount]);
  
  const categorySpecificData = useMemo(() => {
    if (selectedCategory === 'সব') return [];
    if (selectedCategory === 'EMERGENCY_HUB') return DATA.filter(item => [Category.AMBULANCE, Category.FIRE_SERVICE, Category.POLICE].includes(item.category));
    return DATA.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [searchTerm, selectedCategory, showSavedOnly]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {currentView === 'home' && (
        <HomeView 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly}
          visibleData={visibleData} loadMore={() => setVisibleCount(v => v + ITEMS_PER_PAGE)} hasMore={visibleCount < filteredData.length}
          onCategoryClick={(cat) => { setSelectedCategory(cat); setCurrentView('category-list'); window.scrollTo({ top: 0 }); }}
          navigateToAreaItem={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); window.scrollTo({ top: 0 }); }}
          toggleSave={(e, id) => { e.stopPropagation(); setSavedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]); }}
          savedIds={savedIds} isOffline={isOffline} openAbout={() => setCurrentView('about')}
        />
      )}
      {currentView === 'category-list' && (
        <CategoryListView category={selectedCategory} data={categorySpecificData} goBack={() => { setCurrentView('home'); setSelectedCategory('সব'); }} onItemDetail={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); }} />
      )}
      {currentView === 'area-detail' && selectedAreaItem && (
        <DetailView item={selectedAreaItem} goBack={() => setCurrentView('home')} toggleSave={(e, id) => { e.stopPropagation(); setSavedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]); }} savedIds={savedIds} handleCopy={(t) => { navigator.clipboard.writeText(t); setCopiedText(t); setTimeout(() => setCopiedText(null), 2000); }} copiedText={copiedText} openInMaps={(a) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`, '_blank')} />
      )}
      {currentView === 'about' && <AboutView goBack={() => setCurrentView('home')} />}
    </div>
  );
};

export default App;
