
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Phone, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, Bookmark, WifiOff,
  User, ShieldCheck, HelpCircle, Code, GraduationCap, Globe, Facebook, MessageCircle, Edit3, Clock, Link as LinkIcon,
  Filter, MousePointer2, Save, Smartphone, Map
} from 'lucide-react';
import { AreaInfo, Category, SocialLink } from './types.ts';

const DATA: AreaInfo[] = [
  {
    id: '1',
    title: '২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, পাবনা',
    category: Category.HEALTH,
    description: 'পাবনা জেলার প্রধান সরকারি চিকিৎসা কেন্দ্র। এখানে ২৫০ শয্যার আধুনিক চিকিৎসা সুবিধা রয়েছে। ২৪ ঘণ্টা জরুরি বিভাগ, প্যাথলজি, এক্স-রে এবং অপারেশন থিয়েটার সেবা চালু থাকে। বিশেষজ্ঞ ডাক্তারদের তত্ত্বাবধানে মেডিসিন, সার্জারি, গাইনি, শিশু রোগ এবং কার্ডিওলজি ইউনিট পরিচালিত হয়। সরকারি সাশ্রয়ী মূল্যে আধুনিক স্বাস্থ্যসেবা নিশ্চিত করাই এই হাসপাতালের মূল লক্ষ্য।',
    addresses: ['268V+MQ Pabna, Bangladesh', 'হাসপাতাল রোড, পাবনা সদর'],
    contacts: ['01730324813', '01733077774', '02588843333'],
    imageUrl: 'https://i.ibb.co/0yPD7HCp/598424785-1267135282105126-1687972329689254049-n.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(), 
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/250ghppabna/' },
      { platform: 'website', url: 'https://hospital.pabna.gov.bd/bn' }
    ]
  },
  {
    id: '4',
    title: 'পাবনা এক্সপ্রেস কাউন্টার (পাবনা জেলা)',
    category: Category.BUS_COUNTER,
    description: 'পাবনা এক্সপ্রেস পাবনা জেলার অন্যতম জনপ্রিয় এবং নির্ভরযোগ্য বাস সার্ভিস। আরামদায়ক যাত্রা এবং সঠিক সময়ে গন্তব্যে পৌঁছানোর জন্য এটি পাবনাবাসীর প্রথম পছন্দ। পাবনা শহর থেকে ঢাকা, কুষ্টিয়া এবং অন্যান্য রুটে নিয়মিত বাস চলাচল করে। নিচে পাবনা জেলার বিভিন্ন স্থানে থাকা পাবনা এক্সপ্রেসের কাউন্টার নম্বরগুলো দেওয়া হলো।',
    addresses: ['পাবনা নতুন বাস টার্মিনাল', 'আঃ হামিদ রোড, পাবনা', 'ঈশ্বরদী বাস স্ট্যান্ড'],
    contacts: [
      '01750143092', '02588843310', '01725442643', '01725442645', '01725442646', 
      '01714690527', '01753121580', '01714904389', '01724544605', '01750364118', 
      '01740937388', '01750143090', '01718694878'
    ],
    imageUrl: 'https://i.ibb.co/rRSZ4F4Q/images.jpg',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/PabnaExpress/' }
    ]
  },
  {
    id: '2',
    title: 'মায়ের দোয়া রেস্টুরেন্ট',
    category: Category.FOOD,
    description: 'সেরা বিরিয়ানি এবং ঘরোয়া খাবার পাওয়া যায়। পরিচ্ছন্ন পরিবেশ এবং উন্নত মানের সার্ভিস।',
    addresses: ['আব্দুল হামিদ রোড, পাবনা', 'শাখা ২: ট্রাফিক মোড়'],
    contacts: ['01822334455', '01311223344'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, 
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/mayerdoa.pabna' }
    ]
  },
  {
    id: '3',
    title: 'পাবনা এক্সপ্রেস (কাউন্টার)',
    category: Category.BUS_COUNTER,
    description: 'এখান থেকে ঢাকা ও চট্টগ্রামের বাস নিয়মিত ছেড়ে যায়। টিকেট কাউন্টার সকাল ৬টা থেকে রাত ১০টা পর্যন্ত খোলা থাকে।',
    addresses: ['লস্করপুর টার্মিনাল, পাবনা', 'কাউন্টার ২, লাইব্রেরি বাজার'],
    contacts: ['01555555555', '01444444444'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2 
  }
];

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: Category | 'সব';
  setSelectedCategory: (cat: Category | 'সব') => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
  filteredData: AreaInfo[];
  navigateToAreaItem: (item: AreaInfo) => void;
  toggleSave: (e: React.MouseEvent, id: string) => void;
  savedIds: string[];
  isOffline: boolean;
  openAbout: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, 
  showSavedOnly, setShowSavedOnly, filteredData, navigateToAreaItem, 
  toggleSave, savedIds, isOffline, openAbout 
}) => (
  <>
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 shadow-sm safe-top">
      <div className="max-w-md mx-auto">
        {isOffline && (
          <div className="flex items-center justify-center gap-2 mb-3 bg-amber-50 py-1.5 rounded-lg border border-amber-100 animate-pulse">
            <WifiOff className="w-3 h-3 text-amber-600" />
            <span className="text-[10px] font-bold text-amber-600">আপনি বর্তমানে অফলাইনে আছেন</span>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <MapPin className="w-6 h-6 fill-indigo-100" />
            আমার পাবনা
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${showSavedOnly ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
            >
              <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-rose-500' : ''}`} />
            </button>
            <button 
              onClick={openAbout}
              className="p-1.5 bg-gray-50 border border-gray-100 text-gray-400 rounded-full hover:bg-white transition-all shadow-sm"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="পাবনার তথ্য খুঁজুন..."
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

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button onClick={() => setSelectedCategory('সব')} className={`px-4 py-1.5 rounded-xl whitespace-nowrap text-[13px] font-medium transition-all ${selectedCategory === 'সব' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white border border-gray-100 text-gray-500'}`}>সব</button>
          {Object.values(Category).map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-xl whitespace-nowrap text-[13px] font-medium transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white border border-gray-100 text-gray-500'}`}>{cat}</button>
          ))}
        </div>
      </div>
    </header>

    <main className="max-w-md mx-auto px-4 mt-6">
      <div className="grid grid-cols-2 gap-3 pb-20">
        {filteredData.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigateToAreaItem(item)} 
            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer active:scale-[0.98] relative"
          >
            <button 
              onClick={(e) => toggleSave(e, item.id)}
              className="absolute top-2 right-2 z-10 p-1.5 bg-white/60 backdrop-blur-md rounded-lg shadow-sm border border-white/40 transition-all hover:bg-white"
            >
              <Heart className={`w-3.5 h-3.5 ${savedIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
            </button>
            
            {item.imageUrl && (
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" loading="lazy" />
              </div>
            )}
            <div className="p-3">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-bold rounded uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-gray-800 mt-1.5 mb-1 leading-tight line-clamp-2 min-h-[2.5rem]">{item.title}</h3>
              <div className="flex items-start gap-1.5 text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-50">
                <MapPin className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" /> 
                <span className="truncate">{item.addresses[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  </>
);

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

  const getContactLabel = (num: string, itemId: string) => {
    if (itemId === '1') {
      if (num === '01730324813') return 'মোবাইল সার্ভিস';
      if (num === '01733077774') return 'এসএমএস অভিযোগ';
      if (num === '02588843333') return 'এ্যাম্বুলেন্স সার্ভিস';
    }
    if (itemId === '4') {
      const labels: Record<string, string> = {
        '01750143092': 'পাবনা শহর',
        '02588843310': 'পাবনা বাইপাস',
        '01725442643': 'আঃ হামিদ রোড (কাউন্টার ১)',
        '01725442645': 'আঃ হামিদ রোড (কাউন্টার ২)',
        '01725442646': 'নতুন বাস টার্মিনাল',
        '01714690527': 'চিনাখড়া',
        '01753121580': 'ঈশ্বরদী/দাশুড়িয়া',
        '01714904389': 'কাশিনাথপুর',
        '01724544605': 'বেড়া',
        '01750364118': 'বাঁশ বাড়ি',
        '01740937388': 'উল্লাপাড়া',
        '01750143090': 'কুষ্টিয়া',
        '01718694878': 'ভেড়ামারা'
      };
      return labels[num] || 'কাউন্টার নম্বর';
    }
    return 'যোগাযোগ নম্বর';
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top safe-bottom">
      <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-100 shadow-lg">
        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-4 left-4 flex gap-2">
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
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight leading-tight">{item.title}</h2>
        
        <div className="flex items-center gap-1.5 mb-6 opacity-60">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[11px] text-gray-500 font-bold">সর্বশেষ আপডেট: {getRelativeTime(item.timestamp)}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-10 whitespace-pre-wrap">{item.description}</p>
        
        <div className="space-y-8 pb-10">
          {item.socialLinks && item.socialLinks.length > 0 && (
            <section className="space-y-4">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">সামাজিক মাধ্যম</h4>
              <div className="flex flex-wrap gap-3">
                {item.socialLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-xs transition-all active:scale-95 border border-indigo-100 shadow-sm"
                  >
                    {getSocialIcon(link.platform)}
                    <span className="capitalize">{link.platform}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">যোগাযোগ নম্বর</h4>
            {item.contacts.map((num, idx) => (
              <div key={idx} className="flex flex-col gap-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">{getContactLabel(num, item.id)}</span>
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
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">বিস্তারিত ঠিকানা</h4>
            {item.addresses.map((addr, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 bg-indigo-50/20 p-4 rounded-3xl border border-indigo-50">
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{addr}</p>
                <button onClick={() => openInMaps(addr)} className="shrink-0 p-3 bg-white text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm"><ExternalLink className="w-4 h-4" /></button>
              </div>
            ))}
          </section>

          <section className="mt-12 pt-8 border-t border-dashed border-gray-200">
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-white shrink-0">
                  <img 
                    src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" 
                    alt="Mir Rabbi Hossain" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">তথ্য সংগ্রহকারী</p>
                  <p className="text-sm font-bold text-gray-700">মীর রাব্বি হোসেন</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutView: React.FC<{ goBack: () => void }> = ({ goBack }) => {
  const guideSteps = [
    {
      icon: <Search className="w-5 h-5" />,
      title: "তথ্য অনুসন্ধান ও ফিল্টার",
      desc: "হোমপেজের সার্চ বক্সে নাম বা ঠিকানা লিখে খুঁজুন। অথবা ক্যাটাগরি বাটন থেকে নির্দিষ্ট সেবা নির্বাচন করুন।"
    },
    {
      icon: <MousePointer2 className="w-5 h-5" />,
      title: "বিস্তারিত দেখা",
      desc: "যেকোনো তথ্যের উপর ক্লিক করলে তার বিবরণ, একাধিক ফোন নম্বর এবং ম্যাপ লোকেশন দেখতে পাবেন।"
    },
    {
      icon: <PhoneCall className="w-5 h-5" />,
      title: "জরুরি যোগাযোগ",
      desc: "ফোন নম্বরের পাশে কল বাটনে ক্লিক করে সরাসরি কল দিন বা কপি বাটনে নম্বরটি সেভ করে রাখুন।"
    },
    {
      icon: <Save className="w-5 h-5" />,
      title: "প্রিয় তালিকা (Saved Items)",
      desc: "হার্ট আইকনে ক্লিক করে তথ্য সেভ করুন। পরে হোমপেজের উপরের হার্ট বাটনে ক্লিক করে সব সেভ করা তথ্য একসাথে দেখুন।"
    },
    {
      icon: <Map className="w-5 h-5" />,
      title: "ম্যাপ নেভিগেশন",
      desc: "ঠিকানার পাশে থাকা লোকেশন আইকনে ক্লিক করে সরাসরি গুগল ম্যাপে সেই জায়গার অবস্থান দেখে নিন।"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "অফলাইন সুবিধা",
      desc: "একবার ব্যবহারের পর ইন্টারনেট ছাড়াও অ্যাপটির অধিকাংশ লোড হওয়া তথ্য আপনি পুনরায় দেখতে পারবেন।"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto animate-in slide-in-from-right duration-300 safe-top safe-bottom">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4">
        <button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">অ্যাপ সম্পর্কিত</h2>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
        <div className="text-center py-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-100 mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">আমার পাবনা</h3>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">ভার্সন: ১.০.০ (বেটা)</p>
        </div>

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
            <HelpCircle className="w-4 h-4 text-indigo-500" /> পূর্ণাঙ্গ ব্যবহার বিধি
          </h4>
          <div className="grid gap-4">
            {guideSteps.map((step, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 transition-all hover:border-indigo-100">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-gray-800">{step.title}</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
            <Code className="w-4 h-4 text-indigo-500" /> ডেভেলপার প্রোফাইল
          </h4>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-50/50 overflow-hidden">
            <div className="relative h-32 bg-indigo-600 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Code className="w-32 h-32 -rotate-12 -ml-8 -mt-4" />
              </div>
            </div>
            <div className="px-6 pb-8 -mt-16 relative">
              <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-lg bg-gray-100 mx-auto mb-4">
                <img 
                  src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" 
                  alt="Mir Rabbi Hossain" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mb-6">
                <h5 className="text-xl font-bold text-gray-800">মীর রাব্বি হোসেন</h5>
                <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mt-1">পূর্ণ স্ট্যাক ডেভেলপার</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">শিক্ষাগত যোগ্যতা</p>
                    <p className="text-sm font-bold text-gray-700">বিবিএ (অনার্স)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Globe className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">বর্তমান অবস্থান</p>
                    <p className="text-sm font-bold text-gray-700">কুয়ালালামপুর, মালয়েশিয়া</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <a href="https://facebook.com/rabbi.aminpur" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-xs transition-all active:scale-95 border border-indigo-100">
                  <Facebook className="w-4 h-4" /> ফেসবুক
                </a>
                <a href="https://wa.me/60187698459" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 rounded-2xl font-bold text-xs transition-all active:scale-95 border border-green-100">
                  <MessageCircle className="w-4 h-4" /> হোয়াটসঅ্যাপ
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
            <ShieldCheck className="w-4 h-4 text-indigo-500" /> অ্যাপের উদ্দেশ্য
          </h4>
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm leading-relaxed text-gray-600 text-sm italic">
            "আমার পাবনা" একটি অলাভজনক উদ্যোগ। পাবনা জেলার সকল প্রয়োজনীয় এবং জরুরি তথ্য (যেমন: হাসপাতাল, ফায়ার সার্ভিস, অ্যাম্বুলেন্স) খুব সহজে এক জায়গায় মানুষের কাছে পৌঁছে দেওয়াই এই অ্যাপের মূল লক্ষ্য।
          </div>
        </section>

        <p className="text-center text-[10px] text-gray-300 pt-10">
          © ২০২৪ আমার পাবনা। তথ্য সংগ্রহ ও ডেভেলপমেন্ট মীর রাব্বি হোসেন।
        </p>
      </main>
    </div>
  );
};

type ViewState = 'home' | 'area-detail' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'সব'>('সব');
  const [selectedAreaItem, setSelectedAreaItem] = useState<AreaInfo | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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
                           item.addresses.some(a => a.toLowerCase().includes(searchStr));
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      return matchesSearch && matchesCategory && matchesSaved;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [searchTerm, selectedCategory, showSavedOnly, savedIds]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const openInMaps = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const goBack = () => {
    setCurrentView('home');
    setSelectedAreaItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">
      {currentView === 'home' && (
        <HomeView 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly}
          filteredData={filteredData} 
          navigateToAreaItem={(item) => { setSelectedAreaItem(item); setCurrentView('area-detail'); window.scrollTo({ top: 0 }); }}
          toggleSave={toggleSave} savedIds={savedIds} isOffline={isOffline}
          openAbout={() => setCurrentView('about')}
        />
      )}
      {currentView === 'area-detail' && selectedAreaItem && (
        <DetailView 
          item={selectedAreaItem} goBack={goBack} toggleSave={toggleSave}
          savedIds={savedIds} handleCopy={handleCopy} copiedText={copiedText} openInMaps={openInMaps}
        />
      )}
      {currentView === 'about' && (
        <AboutView goBack={goBack} />
      )}
    </div>
  );
};

export default App;
