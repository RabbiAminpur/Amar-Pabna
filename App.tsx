
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Phone, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, Bookmark, WifiOff,
  User, ShieldCheck, HelpCircle, Code, GraduationCap, Globe, Facebook, MessageCircle, Edit3, Clock, Link as LinkIcon,
  Filter, MousePointer2, Save, Smartphone, Map, ChevronDown, Building2, Layers
} from 'lucide-react';
import { AreaInfo, Category, SocialLink } from './types.ts';

// পাবনার উপজেলা ও এলাকার ম্যাপিং
const PABNA_MAP: Record<string, string[]> = {
  'পাবনা সদর': ['পাবনা শহর', 'লস্করপুর', 'হেমায়েতপুর', 'টেবুনিয়া'],
  'ঈশ্বরদী': ['ঈশ্বরদী শহর', 'দাশুড়িয়া', 'রূপপুর', 'পাকশী'],
  'বেড়া': ['বেড়া বাজার', 'কাশিনাথপুর', 'চিনাখড়া'],
  'সাঁথিয়া': ['সাঁথিয়া শহর', 'কাশিনাথপুর', 'আতাইকুলা'],
  'আমিনপুর (থানা এলাকা)': ['আমিনপুর', 'কাশিনাথপুর', 'পুরান ভারেঙ্গা'],
  'সুজানগর': ['সুজানগর শহর', 'নাজিরগঞ্জ', 'সাগরকান্দি'],
  'চাটমোহর': ['চাটমোহর শহর', 'হরিপুর'],
  'ভাঙ্গুড়া': ['ভাঙ্গুড়া বাজার'],
  'ফরিদপুর': ['বনওয়ারীনগর'],
  'আটঘরিয়া': ['দেবত্তোর']
};

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
    area: 'পাবনা শহর',
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

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUpazila: string;
  setSelectedUpazila: (val: string) => void;
  selectedArea: string;
  setSelectedArea: (val: string) => void;
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
  searchTerm, setSearchTerm, selectedUpazila, setSelectedUpazila,
  selectedArea, setSelectedArea, selectedCategory, setSelectedCategory,
  showSavedOnly, setShowSavedOnly, visibleData, loadMore, hasMore,
  navigateToAreaItem, toggleSave, savedIds, isOffline, openAbout 
}) => {
  
  const upazilas = Object.keys(PABNA_MAP);
  const areas = selectedUpazila !== 'সব' ? PABNA_MAP[selectedUpazila] || [] : [];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 shadow-sm safe-top">
        <div className="max-w-md mx-auto">
          {isOffline && (
            <div className="flex items-center justify-center gap-2 mb-3 bg-amber-50 py-1.5 rounded-lg border border-amber-100">
              <WifiOff className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-bold text-amber-600">অফলাইন মোড</span>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <MapPin className="w-6 h-6 fill-indigo-100" />
              আমার পাবনা
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`p-2 rounded-xl transition-all border ${showSavedOnly ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${showSavedOnly ? 'fill-rose-500' : ''}`} />
              </button>
              <button 
                onClick={openAbout}
                className="p-2 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* অ্যাডভান্সড ফিল্টার বক্স */}
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-900">দ্রুত ফিল্টার করুন</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {/* উপজেলা সিলেকশন */}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <select 
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-indigo-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 appearance-none"
                  value={selectedUpazila}
                  onChange={(e) => { setSelectedUpazila(e.target.value); setSelectedArea('সব'); }}
                >
                  <option value="সব">সব উপজেলা</option>
                  {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 pointer-events-none" />
              </div>

              {/* এলাকা সিলেকশন */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <select 
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-indigo-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 appearance-none disabled:opacity-50"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={selectedUpazila === 'সব'}
                >
                  <option value="সব">সব এলাকা</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 pointer-events-none" />
              </div>
            </div>

            {/* ক্যাটাগরি সিলেকশন ড্রপডাউন */}
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
              <select 
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-indigo-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'সব')}
              >
                <option value="সব">সব ক্যাটাগরি</option>
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 pointer-events-none" />
            </div>
          </div>
          
          {/* সার্চ বক্স */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="নাম বা কন্টেন্ট লিখে খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 pb-6">
          {visibleData.length > 0 ? visibleData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigateToAreaItem(item)} 
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer active:scale-[0.98] relative"
            >
              <button 
                onClick={(e) => toggleSave(e, item.id)}
                className="absolute top-2 right-2 z-10 p-1.5 bg-white/60 backdrop-blur-md rounded-lg shadow-sm border border-white/40"
              >
                <Heart className={`w-3.5 h-3.5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
              </button>
              
              {item.imageUrl && (
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                   <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[7px] font-bold rounded uppercase">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem]">{item.title}</h3>
                <div className="flex items-start gap-1 text-[9px] text-gray-500 mt-2 pt-2 border-t border-gray-50">
                  <MapPin className="w-2.5 h-2.5 text-indigo-400 shrink-0 mt-0.5" /> 
                  <span className="truncate">{item.area}, {item.upazila}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400 font-medium">দুঃখিত, কোনো তথ্য পাওয়া যায়নি</p>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="pb-24">
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
  const getSocialIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'whatsapp': return <MessageCircle className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  const getRelativeTime = (ts: number) => {
    const diff = Date.now() - ts;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const toBn = (num: number) => num.toLocaleString('bn-BD');

    if (seconds < 60) return 'এইমাত্র';
    if (minutes < 60) return `${toBn(minutes)} মিনিট আগে`;
    if (hours < 24) return `${toBn(hours)} ঘণ্টা আগে`;
    if (days < 30) return `${toBn(days)} দিন আগে`;
    
    return new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(ts));
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top safe-bottom">
      <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-100 shadow-lg">
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
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg uppercase">{item.category}</span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg">{item.area}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{item.title}</h2>
        
        <div className="flex items-center gap-1.5 mb-6 opacity-60">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[11px] text-gray-500 font-bold">সর্বশেষ আপডেট: {getRelativeTime(item.timestamp)}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-10 whitespace-pre-wrap">{item.description}</p>
        
        <div className="space-y-8 pb-10">
          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">যোগাযোগ নম্বর</h4>
            {item.contacts.map((num, idx) => (
              <div key={idx} className="flex flex-col gap-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-800 font-bold">{num.toLocaleString('bn-BD')}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(num)} className={`p-3 rounded-2xl transition-all ${copiedText === num ? 'bg-green-600 text-white' : 'bg-white text-gray-400 shadow-sm'}`}>
                      {copiedText === num ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a href={`tel:${num}`} className="p-3 bg-green-600 text-white rounded-2xl shadow-md"><PhoneCall className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">ঠিকানা</h4>
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
      <button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-xl">
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <h2 className="text-lg font-bold text-gray-800">অ্যাপ সম্পর্কিত</h2>
    </header>
    <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
      <div className="text-center py-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">আমার পাবনা</h3>
        <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">ভার্সন: ১.১.০ (অ্যাডভান্সড ফিল্টার)</p>
      </div>
      <section className="space-y-4">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ডেভেলপার</h4>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
            <img src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" className="w-full h-full object-cover" />
          </div>
          <div>
            <h5 className="font-bold text-gray-800">মীর রাব্বি হোসেন</h5>
            <p className="text-xs text-indigo-600 font-bold">বিবিএ (অনার্স), মালয়েশিয়া প্রবাসী</p>
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
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সব');
  const [selectedArea, setSelectedArea] = useState<string>('সব');
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

  useEffect(() => {
    localStorage.setItem('amar_pabna_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredData = useMemo(() => {
    const searchStr = searchTerm.toLowerCase();
    return DATA.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchStr) || 
                           item.description.toLowerCase().includes(searchStr) ||
                           item.addresses.some(a => a.toLowerCase().includes(searchStr)) ||
                           item.contacts.some(c => c.toLowerCase().includes(searchStr));
                           
      const matchesUpazila = selectedUpazila === 'সব' || item.upazila === selectedUpazila;
      const matchesArea = selectedArea === 'সব' || item.area === selectedArea;
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      
      return matchesSearch && matchesUpazila && matchesArea && matchesCategory && matchesSaved;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [searchTerm, selectedUpazila, selectedArea, selectedCategory, showSavedOnly, savedIds]);

  const visibleData = useMemo(() => filteredData.slice(0, visibleCount), [filteredData, visibleCount]);

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [searchTerm, selectedUpazila, selectedArea, selectedCategory, showSavedOnly]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const openInMaps = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">
      {currentView === 'home' && (
        <HomeView 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedUpazila={selectedUpazila} setSelectedUpazila={setSelectedUpazila}
          selectedArea={selectedArea} setSelectedArea={setSelectedArea}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly}
          visibleData={visibleData} loadMore={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
          hasMore={visibleCount < filteredData.length}
          navigateToAreaItem={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); window.scrollTo({ top: 0 }); }}
          toggleSave={toggleSave} savedIds={savedIds} isOffline={isOffline}
          openAbout={() => setCurrentView('about')}
        />
      )}
      {currentView === 'area-detail' && selectedAreaItem && (
        <DetailView 
          item={selectedAreaItem} goBack={() => setCurrentView('home')} toggleSave={toggleSave}
          savedIds={savedIds} handleCopy={handleCopy} copiedText={copiedText} openInMaps={openInMaps}
        />
      )}
      {currentView === 'about' && <AboutView goBack={() => setCurrentView('home')} />}
    </div>
  );
};

export default App;
