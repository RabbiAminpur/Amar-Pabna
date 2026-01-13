import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, WifiOff,
  Clock, ChevronDown, LayoutGrid, List,
  Stethoscope, Bus, Siren, Hotel, ChevronRight,
  Flame, ShieldAlert, Phone
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
];

const DATA: AreaInfo[] = [
  {
    id: '6',
    title: 'হোটেল নুর, কাশিনাথপুর',
    category: Category.HOTEL,
    upazila: 'আমিনপুর (থানা এলাকা)',
    area: 'কাশিনাথপুর',
    description: 'কাশিনাথপুর এলাকার একটি আধুনিক আবাসিক হোটেল। এখানে উন্নত মানের এসি (AC) এবং নন-এসি রুমের ব্যবস্থা রয়েছে। ভ্রমণকারী বা ব্যবসায়িক প্রয়োজনে আসা মেহমানদের জন্য এটি একটি নিরাপদ ও আরামদায়ক আবাসন। হোটেলের নিচেই প্রয়োজনীয় বাজার ও যাতায়াতের সুব্যবস্থা রয়েছে।',
    addresses: ['নুর প্লাজা, কাশিনাথপুর ফুলবাগান ট্রাফিক মোড়, aminpur, Pabna', 'XJ54+CR Kashinathpur, Bangladesh'],
    contacts: ['01775142831'],
    imageUrl: 'https://i.ibb.co/1Gy7sVSb/IMG-20260113-222912.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
    socialLinks: []
  },
  {
    id: '1',
    title: '২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, পাবনা',
    category: Category.HEALTH,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    description: 'পাবনা জেলার প্রধান সরকারি চিকিৎসা কেন্দ্র। এখানে ২৫০ শয্যার আধুনিক চিকিৎসা সুবিধা রয়েছে। ২৪ ঘণ্টা জরুরি বিভাগ, প্যাথলজি, এক্স-রে এবং অপারেশন থিয়েটার সেবা চালু থাকে। বিশেষজ্ঞ ডাক্তারদের তত্ত্বাবধানে মেডিসিন, সার্জারি, গাইনি, শিশু রোগ এবং কার্ডিওলজি ইউনিট পরিচালিত হয়। সরকারি সাশ্রয়ী মূল্যে আধুনিক স্বাস্থ্যসেবা নিশ্চিত করাই এই হাসপাতালের মূল লক্ষ্য।',
    addresses: ['268V+MQ Pabna, Bangladesh', 'হাসপাতাল রোড, পাবনা সদর'],
    contacts: ['01730324813', '01733077774', '02588843333'],
    imageUrl: 'https://i.ibb.co/0yPD7HCp/598424785-1267135282105126-1687972329689254049-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1714000000000, 
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/250ghppabna/' },
      { platform: 'website', url: 'https://hospital.pabna.gov.bd/bn' }
    ]
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
    id: '5.1',
    title: 'পাবনা এক্সপ্রেস',
    category: Category.BUS_COUNTER,
    upazila: 'ঢাকা',
    area: 'সায়েদাবাদ',
    description: 'পাবনা এক্সপ্রেস সায়েদাবাদ কাউন্টার।',
    addresses: ['সায়েদাবাদ, ঢাকা'],
    contacts: ['01799624848'],
    imageUrl: 'https://i.ibb.co/b5XrFJxp/266762814-208341711466108-9127291067624475523-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1713000000001,
  },
  {
    id: '4',
    title: 'সি-লাইন পরিবহন',
    category: Category.BUS_COUNTER,
    upazila: 'পাবনা সদর',
    area: 'পাবনা সদর',
    description: 'পাবনা জেলার অন্যতম জনপ্রিয় বাস সার্ভিস।',
    addresses: ['পাবনা নতুন বাস টার্মিনাল'],
    contacts: ['01750143092'],
    imageUrl: 'https://i.ibb.co/rRSZ4F4Q/images.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1712000000000,
  },
  {
    id: 'e1',
    title: 'ফায়ার সার্ভিস পাবনা',
    category: Category.FIRE_SERVICE,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    description: 'যেকোনো অগ্নিকাণ্ড বা দুর্ঘটনায় দ্রুত সেবার জন্য।',
    addresses: ['পাবনা সদর'],
    contacts: ['01730336644'],
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3662/3662829.png',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  },
  {
    id: 'e2',
    title: 'পাবনা জেলা অ্যাম্বুলেন্স সার্ভিস',
    category: Category.AMBULANCE,
    upazila: 'পাবনা সদর',
    area: 'পাবনা সদর',
    description: 'জরুরি রোগী পরিবহনের জন্য অ্যাম্বুলেন্স।',
    addresses: ['পাবনা জেনারেল হাসপাতাল সংলগ্ন'],
    contacts: ['01711223344'],
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448341.png',
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
            {/* Left side: Location */}
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="text-[10px] text-gray-500 truncate font-medium">{item.area}</span>
            </div>
            
            {/* Right side: Phone actions in one line */}
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

// ক্যাটাগরি ভিউ কম্পোনেন্ট উইথ সাব-ক্যাটাগরি
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

  // সাব-ক্যাটাগরি লজিক
  const subCategories = useMemo(() => {
    if (category === Category.BUS_COUNTER) {
      // বাস কাউন্টার এর জন্য ডুপ্লিকেট নামগুলো গ্রুপ করা
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
    
    if (category === Category.BUS_COUNTER) {
      return data.filter(item => item.title === selectedSub);
    }
    
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
            
            {/* যদি আরও আইটেম থাকে যেগুলো সাবক্যাটেগরির বাইরে */}
            {category === Category.BUS_COUNTER && data.filter(item => !subCategories.includes(item.title)).map(item => (
               <ItemCard 
                key={item.id} 
                item={item} 
                onDetail={() => onItemDetail(item)} 
                onCopy={handleCopy}
                isCopied={copiedNum === item.contacts[0]}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onDetail={() => onItemDetail(item)} 
                onCopy={handleCopy}
                isCopied={copiedNum === item.contacts[0]}
              />
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
              <button 
                onClick={() => setIsSearchVisible(!isSearchVisible)} 
                className={`p-1.5 rounded transition-all border ${isSearchVisible ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`p-1.5 rounded transition-all border ${showSavedOnly ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
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
              <input 
                type="text" 
                placeholder="যেকোনো সেবা খুঁজুন..." 
                className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:bg-white transition-all text-[11px] font-medium shadow-inner" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                autoFocus={isSearchVisible}
              />
              {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400"><X className="w-2.5 h-2.5" /></button>}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        <ImageSlider />

        <div className="max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3">
              {HERO_CATEGORIES.map((cat) => (
                <button 
                  key={cat.name} 
                  onClick={() => onCategoryClick(cat.name)} 
                  className={`group flex flex-col items-center justify-center p-4 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 active:scale-[0.97] text-center space-y-2.5 ${cat.lightColor}`}
                >
                  <div className={`p-2.5 ${cat.color} text-white shadow-md shadow-black/5 transition-all duration-300 ${cat.anim}`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-[12px] font-bold ${cat.textColor} leading-tight`}>{cat.label}</p>
                    <div className="flex items-center justify-center mt-1 text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                      তথ্য <ChevronRight className="w-2 h-2 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">সাম্প্রতিক আপডেট</h2>
            <span className="text-[9px] font-bold text-gray-400 bg-white/80 border border-gray-100 px-2 py-0.5 rounded-none">{visibleData.length} টি তথ্য</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-8">
            {visibleData.length > 0 ? visibleData.map((item) => (
              <div key={item.id} onClick={() => navigateToAreaItem(item)} className="group bg-white overflow-hidden shadow-sm border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer active:scale-[0.98] relative">
                <button onClick={(e) => toggleSave(e, item.id)} className="absolute top-2 right-2 z-10 p-2 bg-white/60 backdrop-blur-md rounded-none shadow-sm border border-white/40">
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
              <button onClick={loadMore} className="w-full py-3.5 bg-white border border-gray-100 rounded-none text-indigo-600 text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.98]">
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
    <div className="fixed inset-0 z-50 bg-[#f0f2f5] overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top">
      <div className="relative aspect-[4/3] w-full max-w-md mx-auto bg-gray-100">
        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-4 left-4"><button onClick={goBack} className="p-2.5 bg-black/40 backdrop-blur-md text-white rounded-none border border-white/20"><ArrowLeft className="w-5 h-5" /></button></div>
        <div className="absolute top-4 right-4"><button onClick={(e) => toggleSave(e, item.id)} className="p-2.5 bg-black/40 backdrop-blur-md text-white rounded-none border border-white/20"><Heart className={`w-5 h-5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} /></button></div>
      </div>
      <div className="p-6 max-w-md mx-auto bg-white min-h-screen -mt-4 rounded-t-3xl shadow-xl relative z-10">
        <div className="flex items-center gap-2 mb-3"><span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-none uppercase">{item.category}</span><span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-none">{item.area}</span></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight tracking-tight">{item.title}</h2>
        <div className="flex items-center gap-1.5 mb-6 opacity-60"><Clock className="w-3 h-3 text-indigo-500" /><span className="text-[10px] text-gray-500 font-bold">আপডেট: {getRelativeTime(item.timestamp)}</span></div>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 whitespace-pre-wrap">{item.description}</p>
        <div className="space-y-6 pb-12">
          <section className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">যোগাযোগের নম্বর</h4>
            {item.contacts.map((num, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-none border border-gray-100">
                <p className="text-sm text-gray-800 font-bold">{num.toLocaleString('bn-BD')}</p>
                <div className="flex gap-1.5">
                  <button onClick={() => handleCopy(num)} className={`p-2.5 rounded-none transition-all ${copiedText === num ? 'bg-green-600 text-white' : 'bg-white text-gray-400 shadow-sm'}`}>{copiedText === num ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}</button>
                  <a href={`tel:${num}`} className="p-2.5 bg-green-600 text-white rounded-none shadow-md"><PhoneCall className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            ))}
          </section>
          <section className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ঠিকানা</h4>
            {item.addresses.map((addr, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 bg-indigo-50/20 p-3.5 rounded-none border border-indigo-50">
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{addr}</p>
                <button onClick={() => openInMaps(addr)} className="shrink-0 p-2.5 bg-white text-indigo-600 rounded-none border border-indigo-100 shadow-sm"><ExternalLink className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutView: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="fixed inset-0 z-50 bg-[#f0f2f5] overflow-y-auto animate-in slide-in-from-right duration-300 safe-top">
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-4"><button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-none transition-all"><ArrowLeft className="w-5 h-5 text-gray-600" /></button><h2 className="text-base font-bold text-gray-800">অ্যাপ তথ্য</h2></header>
    <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
      <div className="text-center py-10 bg-white rounded-none border border-gray-100 shadow-sm"><div className="w-16 h-16 bg-indigo-600 rounded-none mx-auto flex items-center justify-center shadow-lg mb-4"><MapPin className="w-8 h-8 text-white" /></div><h3 className="text-xl font-bold text-gray-800">আমার পাবনা</h3><p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-widest">ভার্সন: ৪.৩.০ (সাব-ক্যাটাগরি আপডেট)</p></div>
      <section className="space-y-4"><h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ডেভেলপার প্রোফাইল</h4><div className="bg-white p-5 border border-gray-100 shadow-sm flex items-center gap-4"><div className="w-14 h-14 overflow-hidden shadow-sm border border-gray-50"><img src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" className="w-full h-full object-cover" /></div><div><h5 className="font-bold text-gray-800 text-sm">মীর রাব্বি হোসেন</h5><p className="text-[10px] text-indigo-600 font-bold">পাবনা জেলা, বাংলাদেশ</p></div></div></section>
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
      // ইমার্জেন্সি হাব এর স্পেশাল ফিল্টার
      const isEmergency = selectedCategory === 'EMERGENCY_HUB' && [Category.AMBULANCE, Category.FIRE_SERVICE, Category.POLICE].includes(item.category);
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      return (matchesSearch && (matchesCategory || isEmergency)) && matchesSaved;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [searchTerm, selectedCategory, showSavedOnly, savedIds]);

  const visibleData = useMemo(() => filteredData.slice(0, visibleCount), [filteredData, visibleCount]);
  
  const categorySpecificData = useMemo(() => {
    if (selectedCategory === 'সব') return [];
    if (selectedCategory === 'EMERGENCY_HUB') {
       return DATA.filter(item => [Category.AMBULANCE, Category.FIRE_SERVICE, Category.POLICE].includes(item.category));
    }
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
        <CategoryListView 
          category={selectedCategory} 
          data={categorySpecificData} 
          goBack={() => { setCurrentView('home'); setSelectedCategory('সব'); }} 
          onItemDetail={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); }}
        />
      )}
      {currentView === 'area-detail' && selectedAreaItem && (
        <DetailView item={selectedAreaItem} goBack={() => setCurrentView('home')} toggleSave={(e, id) => { e.stopPropagation(); setSavedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]); }} savedIds={savedIds} handleCopy={(t) => { navigator.clipboard.writeText(t); setCopiedText(t); setTimeout(() => setCopiedText(null), 2000); }} copiedText={copiedText} openInMaps={(a) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`, '_blank')} />
      )}
      {currentView === 'about' && <AboutView goBack={() => setCurrentView('home')} />}
    </div>
  );
};

export default App;