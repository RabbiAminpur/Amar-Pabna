
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, WifiOff,
  Clock, ChevronDown, LayoutGrid
} from 'lucide-react';
import { AreaInfo, Category } from './types.ts';

// প্রতিটি ক্যাটাগরির জন্য ইমেজ ম্যাপিং
const CATEGORY_DATA = [
  { name: Category.HEALTH, img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80' },
  { name: Category.BUS_COUNTER, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80' },
  { name: Category.FOOD, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { name: Category.HOTEL, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80' },
  { name: Category.EDUCATION, img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80' },
  { name: Category.AMBULANCE, img: 'https://images.unsplash.com/photo-1587744374828-3c483696a664?auto=format&fit=crop&w=400&q=80' },
  { name: Category.COURIER, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80' },
  { name: Category.OTHER, img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80' },
];

const DATA: AreaInfo[] = [
  {
    id: '6',
    title: 'হোটেল নুর, কাশিনাথপুর',
    category: Category.HOTEL,
    upazila: 'আমিনপুর (থানা এলাকা)',
    area: 'কাশিনাথপুর',
    description: 'কাশিনাথপুর এলাকার একটি আধুনিক আবাসিক হোটেল। এখানে উন্নত মানের এসি (AC) এবং নন-এসি রুমের ব্যবস্থা রয়েছে। ভ্রমণকারী বা ব্যবসায়িক প্রয়োজনে আসা মেহমানদের জন্য এটি একটি নিরাপদ ও আরামদায়ক আবাসন। হোটেলের নিচেই প্রয়োজনীয় বাজার ও যাতায়াতের সুব্যবস্থা রয়েছে।',
    addresses: ['নুর প্লাজা, কাশিনাথপুর ফুলবাগান ট্রাফিক মোড়, আমিনপুর, পাবনা', 'XJ54+CR Kashinathpur, Bangladesh'],
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
    title: 'পাবনা এক্সপ্রেস ঢাকা কাউন্টার',
    category: Category.BUS_COUNTER,
    upazila: 'ঢাকা',
    area: 'গাবতলী',
    description: 'পাবনা এক্সপ্রেসের ঢাকা অঞ্চলের সকল গুরুত্বপূর্ণ কাউন্টার নম্বরসমূহ। যাত্রী সাধারণের সুবিধার জন্য ঢাকা শহর এবং এর আশেপাশের এলাকার নম্বরগুলো এখানে দেওয়া হলো।',
    addresses: ['গাবতলী, ঢাকা', 'সায়েদাবাদ, ঢাকা', 'উত্তরা, ঢাকা'],
    contacts: ['01718507828', '01799624848'],
    imageUrl: 'https://i.ibb.co/b5XrFJxp/266762814-208341711466108-9127291067624475523-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1713000000000,
  },
  {
    id: '4',
    title: 'পাবনা এক্সপ্রেস পাবনা টার্মিনাল',
    category: Category.BUS_COUNTER,
    upazila: 'পাবনা সদর',
    area: 'পাবনা সদর',
    description: 'পাবনা জেলার অন্যতম জনপ্রিয় বাস সার্ভিস। পাবনা শহর থেকে ঢাকা এবং অন্যান্য রুটে নিয়মিত বাস চলাচল করে।',
    addresses: ['পাবনা নতুন বাস টার্মিনাল', 'আঃ হামিদ রোড, পাবনা'],
    contacts: ['01750143092', '01725442643'],
    imageUrl: 'https://i.ibb.co/rRSZ4F4Q/images.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1712000000000,
  },
  {
    id: '2',
    title: 'মায়ের দোয়া রেস্টুরেন্ট',
    category: Category.FOOD,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    description: 'সেরা বিরিয়ানি এবং ঘরোয়া খাবার পাওয়া যায়। পরিচ্ছন্ন পরিবেশ এবং উন্নত মানের সার্ভিস।',
    addresses: ['আব্দুল হামিদ রোড, পাবনা সদর', 'ট্রাফিক মোড়, পাবনা সদর'],
    contacts: ['01822334455'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&get=80&w=1000',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: 1711000000000, 
  }
];

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
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl mb-6 shadow-sm border border-gray-100 pointer-events-none">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImages.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            className="w-full h-full object-cover shrink-0" 
            alt="Slider" 
          />
        ))}
      </div>
      {/* স্লাইডার ইন্ডিকেটর (বিন্দুগুলো) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {sliderImages.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-white w-4' : 'bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: Category | 'সব';
  setSelectedCategory: (cat: Category | 'সব') => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
  visibleData: AreaInfo[];
  loadMore: () => void;
  hasMore: boolean;
  navigateToAreaItem: (item: AreaInfo) => void;
  toggleSave: (e: React.MouseEvent, id: string) => void;
  savedIds: string[];
  isOffline: boolean;
  openAbout: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  searchTerm, setSearchTerm, selectedCategory, setSelectedCategory,
  showSavedOnly, setShowSavedOnly, visibleData, loadMore, hasMore,
  navigateToAreaItem, toggleSave, savedIds, isOffline, openAbout 
}) => {
  return (
    <>
      <header className="bg-white px-4 pt-6 pb-2 safe-top border-b border-gray-50">
        <div className="max-w-md mx-auto">
          {isOffline && (
            <div className="flex items-center justify-center gap-2 mb-3 bg-amber-50 py-1.5 rounded-lg border border-amber-100">
              <WifiOff className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-bold text-amber-600">অফলাইন মোড</span>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <MapPin className="w-6 h-6 fill-indigo-100" />
              আমার পাবনা
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`p-2.5 rounded-xl transition-all border ${showSavedOnly ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${showSavedOnly ? 'fill-rose-500' : ''}`} />
              </button>
              <button 
                onClick={openAbout}
                className="p-2.5 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* অটো ইমেজ স্লাইডার (১৬:৯) */}
          <ImageSlider />

          {/* ক্যাটাগরি গ্রিড */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-indigo-500" />
                ক্যাটাগরি ভিত্তিক সেবা
              </h2>
              {selectedCategory !== 'সব' && (
                <button 
                  onClick={() => setSelectedCategory('সব')}
                  className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md"
                >
                  সব ক্যাটাগরি
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {CATEGORY_DATA.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`relative group h-24 rounded-2xl overflow-hidden cursor-pointer transition-all border-2 ${selectedCategory === cat.name ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-transparent shadow-sm'}`}
                >
                  <img 
                    src={cat.img} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                    alt={cat.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[11px] font-bold text-white text-center drop-shadow-md">{cat.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* সার্চ বক্স */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`${selectedCategory === 'সব' ? 'যেকোনো' : selectedCategory} সেবা খুঁজুন...`}
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {selectedCategory === 'সব' ? 'সাম্প্রতিক তথ্য' : `${selectedCategory} রেজাল্ট`}
          </h2>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {visibleData.length} টি তথ্য
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-8">
          {visibleData.length > 0 ? visibleData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigateToAreaItem(item)} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer active:scale-[0.98] relative"
            >
              <button 
                onClick={(e) => toggleSave(e, item.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/40"
              >
                <Heart className={`w-3.5 h-3.5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
              </button>
              
              {item.imageUrl && (
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
                </div>
              )}
              <div className="p-3.5">
                <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider">{item.category}</span>
                <h3 className="text-[13px] font-bold text-gray-800 leading-tight line-clamp-2 mt-1 min-h-[2.4rem]">{item.title}</h3>
                <div className="flex items-start gap-1 text-[10px] text-gray-400 mt-2.5 pt-2.5 border-t border-gray-50">
                  <MapPin className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" /> 
                  <span className="truncate">{item.area}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 py-24 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-sm text-gray-400 font-medium">এই ক্যাটাগরিতে কোনো তথ্য পাওয়া যায়নি</p>
              <button 
                onClick={() => setSelectedCategory('সব')}
                className="text-xs font-bold text-indigo-600 underline"
              >
                সব ক্যাটাগরি দেখুন
              </button>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="pb-28">
            <button 
              onClick={loadMore}
              className="w-full py-4 bg-white border border-indigo-100 rounded-2xl text-indigo-600 text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              আরও দেখুন <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </>
  );
};

const DetailView: React.FC<{ 
  item: AreaInfo; 
  goBack: () => void; 
  toggleSave: (e: React.MouseEvent, id: string) => void; 
  savedIds: string[]; 
  handleCopy: (text: string) => void; 
  copiedText: string | null; 
  openInMaps: (addr: string) => void; 
}> = ({ item, goBack, toggleSave, savedIds, handleCopy, copiedText, openInMaps }) => {
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
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top safe-bottom">
      <div className="relative aspect-[4/3] w-full max-w-md mx-auto bg-gray-100">
        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-4 left-4">
          <button onClick={goBack} className="p-3 bg-black/40 backdrop-blur-md text-white rounded-2xl border border-white/20">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={(e) => toggleSave(e, item.id)} className="p-3 bg-black/40 backdrop-blur-md text-white rounded-2xl border border-white/20">
            <Heart className={`w-5 h-5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="p-6 max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg uppercase">{item.category}</span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg">{item.area}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight tracking-tight">{item.title}</h2>
        
        <div className="flex items-center gap-1.5 mb-8 opacity-60">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[11px] text-gray-500 font-bold">আপডেট: {getRelativeTime(item.timestamp)}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-10 whitespace-pre-wrap">{item.description}</p>
        
        <div className="space-y-8 pb-12">
          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">যোগাযোগ</h4>
            {item.contacts.map((num, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <p className="text-sm text-gray-800 font-bold">{num.toLocaleString('bn-BD')}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleCopy(num)} className={`p-3 rounded-2xl transition-all ${copiedText === num ? 'bg-green-600 text-white' : 'bg-white text-gray-400 shadow-sm'}`}>
                    {copiedText === num ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a href={`tel:${num}`} className="p-3 bg-green-600 text-white rounded-2xl shadow-md"><PhoneCall className="w-4 h-4" /></a>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ঠিকানা</h4>
            {item.addresses.map((addr, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 bg-indigo-50/20 p-4 rounded-3xl border border-indigo-50">
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{addr}</p>
                <button onClick={() => openInMaps(addr)} className="shrink-0 p-3 bg-white text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm"><ExternalLink className="w-4 h-4" /></button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutView: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto animate-in slide-in-from-right duration-300 safe-top safe-bottom">
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4">
      <button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <h2 className="text-lg font-bold text-gray-800">অ্যাপ তথ্য</h2>
    </header>
    <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
      <div className="text-center py-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">আমার পাবনা</h3>
        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">ভার্সন: ৩.২ (স্লাইডার)</p>
      </div>
      <section className="space-y-4">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ডেভেলপার</h4>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-50">
            <img src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" className="w-full h-full object-cover" />
          </div>
          <div>
            <h5 className="font-bold text-gray-800">মীর রাব্বি হোসেন</h5>
            <p className="text-xs text-indigo-600 font-bold">পাবনা জেলা, বাংলাদেশ</p>
          </div>
        </div>
      </section>
    </main>
  </div>
);

type ViewState = 'home' | 'area-detail' | 'about';
const ITEMS_PER_PAGE = 20;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'সব'>('সব');
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
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => { localStorage.setItem('amar_pabna_saved', JSON.stringify(savedIds)); }, [savedIds]);

  const filteredData = useMemo(() => {
    const str = searchTerm.toLowerCase();
    return DATA.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(str) || 
                           item.description.toLowerCase().includes(str) ||
                           item.area.toLowerCase().includes(str) ||
                           item.upazila.toLowerCase().includes(str) ||
                           item.addresses.some(a => a.toLowerCase().includes(str)) ||
                           item.contacts.some(c => c.toLowerCase().includes(str));
                           
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      
      return matchesSearch && matchesCategory && matchesSaved;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [searchTerm, selectedCategory, showSavedOnly, savedIds]);

  const visibleData = useMemo(() => filteredData.slice(0, visibleCount), [filteredData, visibleCount]);

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [searchTerm, selectedCategory, showSavedOnly]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {currentView === 'home' && (
        <HomeView 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly}
          visibleData={visibleData} 
          loadMore={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
          hasMore={visibleCount < filteredData.length}
          navigateToAreaItem={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); window.scrollTo({ top: 0 }); }}
          toggleSave={(e, id) => { e.stopPropagation(); setSavedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]); }}
          savedIds={savedIds} isOffline={isOffline}
          openAbout={() => setCurrentView('about')}
        />
      )}
      {currentView === 'area-detail' && selectedAreaItem && (
        <DetailView 
          item={selectedAreaItem} goBack={() => setCurrentView('home')} toggleSave={(e, id) => { e.stopPropagation(); setSavedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]); }}
          savedIds={savedIds} handleCopy={(t) => { navigator.clipboard.writeText(t); setCopiedText(t); setTimeout(() => setCopiedText(null), 2000); }} 
          copiedText={copiedText} openInMaps={(a) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`, '_blank')}
        />
      )}
      {currentView === 'about' && <AboutView goBack={() => setCurrentView('home')} />}
    </div>
  );
};

export default App;
