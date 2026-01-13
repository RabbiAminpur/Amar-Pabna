import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Search, MapPin, Info, X, Copy, PhoneCall, 
  ExternalLink, Check, ArrowLeft, Heart, WifiOff,
  Clock, ChevronDown, LayoutGrid, List,
  Stethoscope, Bus, Siren, Hotel, ChevronRight,
  Flame, ShieldAlert, Phone, Map, Landmark, 
  Navigation, ImageIcon, User, Calendar, Briefcase,
  Building2, ClipboardList, CreditCard, Building,
  Contact2, Hash, ShieldCheck, Droplets, Store, ShoppingBasket,
  Tags, Ship, Train, Waves, Anchor, Compass, Route as RouteIcon,
  Home, BookOpen, UserCircle, Facebook, Mail, Globe, Code, Github,
  CalendarDays, Moon, Sunrise, Sun, Sunset, Quote, Book, Eye,
  ChevronLeft
} from 'lucide-react';
import { AreaInfo, Category, UpazilaName, UpazilaInfo } from './types.ts';

// হিরো সেকশনের প্রধান ক্যাটাগরি কনফিগ
const HERO_CATEGORIES = [
  { name: Category.HEALTH, label: 'হাসপাতাল ও ক্লিনিক', icon: Stethoscope, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600', anim: 'animate-soft-pulse' },
  { name: Category.BUS_COUNTER, label: 'বাস কাউন্টার', icon: Bus, color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600', anim: 'animate-float' },
  { name: 'EMERGENCY_HUB', label: 'ইমার্জেন্সি সার্ভিস', icon: Siren, color: 'bg-rose-500', lightColor: 'bg-rose-50', textColor: 'text-rose-600', anim: 'animate-bounce-custom' },
  { name: Category.HOTEL, label: 'হোটেল সার্ভিস', icon: Hotel, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600', anim: 'animate-wobble' },
  { name: Category.TOURIST_SPOT, label: 'দর্শনীয় স্থান', icon: Map, color: 'bg-teal-500', lightColor: 'bg-teal-50', textColor: 'text-teal-600', anim: 'animate-soft-pulse' },
  { name: Category.ANCIENT_ARCH, label: 'প্রাচীন স্থাপত্য', icon: Landmark, color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-600', anim: 'animate-float' },
  { name: Category.PERSONALITY, label: 'ব্যক্তিত্ব', icon: User, color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-600', anim: 'animate-soft-pulse' },
  { name: Category.GOVT_OFFICE, label: 'সরকারি অফিস', icon: Building2, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600', anim: 'animate-float' },
  { name: Category.FINANCIAL_INSTITUTION, label: 'আর্থিক প্রতিষ্ঠান', icon: CreditCard, color: 'bg-cyan-500', lightColor: 'bg-cyan-50', textColor: 'text-cyan-600', anim: 'animate-soft-pulse' },
  { name: Category.POLICE, label: 'থানা', icon: ShieldCheck, color: 'bg-slate-700', lightColor: 'bg-slate-50', textColor: 'text-slate-700', anim: 'animate-float' },
  { name: Category.MARKET, label: 'হাট বাজার', icon: Store, color: 'bg-lime-600', lightColor: 'bg-lime-50', textColor: 'text-lime-700', anim: 'animate-soft-pulse' },
  { name: Category.TRANSPORT_ROUTE, label: 'পরিবহন ও রুট', icon: RouteIcon, color: 'bg-violet-600', lightColor: 'bg-violet-50', textColor: 'text-violet-700', anim: 'animate-float' },
];

const SLIDER_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&w=1000&q=80',
    title: 'হার্ডিঞ্জ ব্রিজ ও লালন শাহ সেতু',
    subtitle: 'ঈশ্বরদী, পাবনা'
  },
  {
    url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
    title: 'পাবনা শহর ও প্রশাসনিক এলাকা',
    subtitle: 'পাবনা সদর'
  },
  {
    url: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=1000&q=80',
    title: 'ঐতিহাসিক স্থাপত্য ও মন্দির',
    subtitle: 'পাবনার গৌরবময় অতীত'
  }
];

const UPAZILA_DATA: UpazilaInfo[] = [
  {
    id: 'u-1',
    name: UpazilaName.SADAR,
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    area: '৪৪৩.৯০ বর্গ কি:মি:',
    population: '৫,৯৬,৯২৪ জন (প্রায়)',
    unions: '১০টি',
    villages: '২৯১টি',
    description: 'পাবনা সদর উপজেলা বাংলাদেশের পাবনা জেলার একটি প্রশাসনিক এলাকা। এটি জেলা শহরকে কেন্দ্র করে গঠিত। এখানকার প্রধান আকর্ষণ মানসিক হাসপাতাল, জোড় বাংলা মন্দির এবং অনুকূলচন্দ্রের আশ্রম। জেলা প্রশাসনের সকল প্রধান কার্যালয় এখানেই অবস্থিত।',
    notablePlaces: ['মানসিক হাসপাতাল', 'জোড় বাংলা মন্দির', 'অনুকূলচন্দ্রের আশ্রম', 'পাবনা সুগার মিল']
  },
  {
    id: 'u-2',
    name: UpazilaName.ISHWARDI,
    imageUrl: 'https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&w=800&q=80',
    area: '২৫০.৯০ বর্গ কি:মি:',
    population: '৩,১৩,৯৩২ জন (প্রায়)',
    unions: '৭টি',
    villages: '১১০টি',
    description: 'ঈশ্বরদী উত্তরবঙ্গের অন্যতম প্রধান বাণিজ্যিক ও যোগাযোগ কেন্দ্র। এখানে বাংলাদেশের বৃহত্তম রেলওয়ে জংশন এবং ঈশ্বরদী বিমানবন্দর অবস্থিত। এছাড়া হার্ডিঞ্জ ব্রিজ ও লালন শাহ সেতু পর্যটকদের প্রধান আকর্ষণ। দেশের একমাত্র পারমাণবিক বিদ্যুৎ কেন্দ্র রূপপুরে নির্মাণাধীন।',
    notablePlaces: ['হার্ডিঞ্জ ব্রিজ', 'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র', 'ঈশ্বরদী রেলওয়ে জংশন', 'লালন শাহ সেতু']
  }
];

const DATA: AreaInfo[] = [
  {
    id: 'police-1',
    title: 'পাবনা সদর থানা',
    category: Category.POLICE,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    ocName: 'মোঃ রওশন আলী',
    dutyOfficerNumber: '01320-123456',
    serviceType: 'আইন-শৃঙ্খলা রক্ষা, জিডি, মামলা গ্রহণ ও টহল সেবা।',
    stationLocation: 'থানা রোড, পাবনা সদর, পাবনা।',
    description: 'পাবনা সদর এলাকার প্রধান পুলিশ স্টেশন। নাগরিকদের নিরাপত্তা নিশ্চিত করতে এই থানা ২৪ ঘণ্টা নিয়োজিত থাকে। যেকোনো জরুরি অবস্থায় ডিউটি অফিসারের নাম্বারে যোগাযোগ করুন।',
    addresses: ['থানা রোড, পাবনা সদর'],
    contacts: ['01320-123456'],
    imageUrl: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=800&q=80',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  },
  {
    id: 'govt-1',
    title: 'জেলা প্রশাসকের কার্যালয়, পাবনা',
    category: Category.GOVT_OFFICE,
    upazila: 'পাবনা সদর',
    area: 'পাবনা শহর',
    objective: 'জেলা পর্যায়ের প্রশাসনিক কার্যাবলী ও নাগরিক সেবা নিশ্চিতকরণ।',
    workDetails: 'ভূমি ব্যবস্থাপনা, আইনশৃঙ্খলা রক্ষা, ট্রেড লাইসেন্স ইস্যু, সার্টিফাইড কপি প্রদান এবং সরকারের বিভিন্ন উন্নয়নমূলক প্রকল্পের তদারকি।',
    openingDays: 'রবিবার হতে বৃহস্পতিবার',
    officeHours: 'সকাল ৯:০০ - বিকাল ৪:০০',
    description: 'পাবনা জেলা প্রশাসনের প্রধান প্রশাসনিক ভবন। এখান থেকে জেলার সকল সরকারি কার্যক্রম পরিচালিত হয়। নাগরিকরা এখানে বিভিন্ন আইনি ও প্রশাসনিক সেবার জন্য যোগাযোগ করতে পারেন।',
    howToGo: 'পাবনা শহরের কেন্দ্রীয় আব্দুল হামিদ রোড সংলগ্ন ডিসি অফিস হিসেবে পরিচিত। রিকশা বা অটোতে সহজে যাওয়া যায়।',
    addresses: ['ডিসি রোড, পাবনা সদর'],
    contacts: ['0731-66001'],
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    addedBy: 'মীর রাব্বি হোসেন',
    timestamp: Date.now(),
  }
];

// --- Utilities ---

const toBengaliNumber = (num: number | string) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

const getBengaliDate = () => {
  const date = new Date();
  const months = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ন", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
  const seasons = ["বসন্ত", "গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শীত"];
  
  const day = date.getDate();
  const month = date.getMonth(); 
  
  let bMonthIndex = 0;
  let bDay = 0;
  let bYear = date.getFullYear() - 593;

  const monthStarts = [14, 15, 15, 16, 16, 16, 17, 16, 16, 15, 14, 16]; 
  
  if (month < 3 || (month === 3 && day < 14)) {
    bYear -= 1;
  }

  let offsetMonth = (month - 3 + 12) % 12;
  if (day < monthStarts[month]) {
    bMonthIndex = (offsetMonth - 1 + 12) % 12;
    bDay = day + 15; 
  } else {
    bMonthIndex = offsetMonth;
    bDay = day - monthStarts[month] + 1;
  }

  if (bMonthIndex < 6 && bDay > 31) bDay = 31;
  else if (bMonthIndex >= 6 && bDay > 30) bDay = 30;

  const seasonIndex = Math.floor(bMonthIndex / 2);

  return {
    day: toBengaliNumber(bDay),
    month: months[bMonthIndex],
    year: toBengaliNumber(bYear),
    season: seasons[seasonIndex],
    englishDate: date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

const getPrayerTimes = () => {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const shift = Math.sin((dayOfYear - 80) * 2 * Math.PI / 365) * 30; 
  
  const formatTime = (h: number, m: number) => {
    const d = new Date();
    d.setHours(h, m + Math.round(shift), 0);
    return toBengaliNumber(d.getHours() % 12 || 12) + ":" + toBengaliNumber(d.getMinutes().toString().padStart(2, '0'));
  };

  return {
    sehri: formatTime(4, 15),
    fajr: formatTime(4, 30),
    dhuhr: formatTime(12, 10),
    asr: formatTime(15, 45),
    iftar: formatTime(18, 25),
    maghrib: formatTime(18, 25),
    isha: formatTime(19, 45)
  };
};

const HADITH_LIST = [
  "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি, যে তার পরিবারের নিকট উত্তম।",
  "পবিত্রতা ঈমানের অর্ধেক।",
  "প্রকৃত মুসলিম সেই ব্যক্তি, যার জিহ্বা ও হাত থেকে অন্য মুসলিম নিরাপদ থাকে।",
  "দোয়া ইবাদতের মূল।",
  "যে ব্যক্তি মানুষের প্রতি দয়া করে না, আল্লাহ তার প্রতি দয়া করেন না।",
  "তোমরা জ্ঞান অর্জন করো দোলনা থেকে কবর পর্যন্ত।",
  "লজ্জাশীলতা ঈমানের অঙ্গ।",
  "সব কাজের ফলাফল নিয়তের ওপর নির্ভরশীল।",
  "পরনিন্দাকারী জান্নাতে প্রবেশ করবে না।",
  "মুমিন এক গর্তে দুইবার দংশিত হয় না।"
];

const getDailyHadiths = () => {
  const day = new Date().getDate();
  const index1 = day % HADITH_LIST.length;
  const index2 = (day + 1) % HADITH_LIST.length;
  return [HADITH_LIST[index1], HADITH_LIST[index2]];
};

// --- Components ---

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[32px] mb-8 bg-gray-100 shadow-xl shadow-black/5 group">
      {SLIDER_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-xl font-black mb-1 leading-tight">{img.title}</h2>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{img.subtitle}</p>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-indigo-500 w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RemembranceCard: React.FC = () => (
  <div className="bg-white border border-indigo-100 rounded-[24px] p-6 shadow-sm shadow-indigo-50/50 mb-8 text-center relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
      <Eye className="w-40 h-40 text-indigo-900" />
    </div>
    <p className="text-gray-800 text-lg font-black tracking-tight relative z-10 transition-transform group-hover:scale-105 duration-500">
      "আল্লাহ সবকিছু দেখছেন!"
    </p>
  </div>
);

const DailyHadithCard: React.FC = () => {
  const hadiths = useMemo(() => getDailyHadiths(), []);

  return (
    <div className="bg-white border border-emerald-100 rounded-[24px] p-5 shadow-sm shadow-emerald-50/50 mb-5 relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
        <Book className="w-32 h-32 text-emerald-900" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-emerald-200 shadow-md">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-black text-gray-800 tracking-tight">আজকের হাদিস</h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-emerald-100/50">প্রতিদিনের শিক্ষা</span>
      </div>

      <div className="space-y-4">
        {hadiths.map((h, i) => (
          <div key={i} className="flex gap-3 items-start bg-emerald-50/30 p-4 rounded-2xl border border-emerald-50/50 transition-all hover:bg-emerald-50/50">
            <span className="text-emerald-400 font-black text-lg leading-none shrink-0">“</span>
            <p className="text-[13px] text-gray-700 font-medium leading-relaxed italic">{h}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrayerScheduleCard: React.FC = () => {
  const times = useMemo(() => getPrayerTimes(), []);
  
  return (
    <div className="bg-white border border-rose-100 rounded-[24px] p-5 shadow-sm shadow-rose-50/50 mb-5 relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
        <Moon className="w-32 h-32 text-rose-900" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center shadow-rose-200 shadow-md">
            <Moon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-black text-gray-800 tracking-tight">নামাজ ও রোজার সময়সূচি</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-50 border border-rose-100 rounded-md">
          <MapPin className="w-2.5 h-2.5 text-rose-500" />
          <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest">পাবনা</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
             <Sunrise className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-rose-400 uppercase leading-none mb-1">সাহরি (শেষ)</p>
            <p className="text-base font-black text-rose-700 leading-none">{times.sehri}</p>
          </div>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
             <Sunset className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-amber-400 uppercase leading-none mb-1">ইফতার (শুরু)</p>
            <p className="text-base font-black text-amber-700 leading-none">{times.iftar}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4">
        <div className="grid grid-cols-5 gap-1">
          {[
            { label: 'ফজর', time: times.fajr },
            { label: 'যোহর', time: times.dhuhr },
            { label: 'আসর', time: times.asr },
            { label: 'মাগরিব', time: times.maghrib },
            { label: 'এশা', time: times.isha },
          ].map((p, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-gray-400 mb-1">{p.label}</span>
              <span className="text-[11px] font-black text-gray-700 bg-white px-1.5 py-1 rounded-lg border border-gray-100 shadow-sm w-full">
                {p.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BengaliCalendarCard: React.FC = () => {
  const bDate = useMemo(() => getBengaliDate(), []);
  
  return (
    <div className="bg-white border border-indigo-100 rounded-[24px] p-5 shadow-sm shadow-indigo-50/50 mb-5 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
        <CalendarDays className="w-32 h-32 text-indigo-900" />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-md">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-black text-gray-800 tracking-tight">বাংলা ক্যালেন্ডার</h3>
        </div>
        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-indigo-100/50">আজকের তারিখ</span>
      </div>

      <div className="flex items-end gap-5">
        <div className="flex flex-col items-center justify-center bg-indigo-50/50 border border-indigo-100 w-20 h-20 rounded-2xl shadow-inner">
          <span className="text-3xl font-black text-indigo-600 leading-none">{bDate.day}</span>
          <span className="text-[10px] font-bold text-indigo-400 mt-1 uppercase">তারিখ</span>
        </div>
        
        <div className="flex-1 pb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-800">{bDate.month}</span>
            <span className="text-xs font-bold text-gray-400 tracking-tighter">{bDate.year} বঙ্গাব্দ</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              <span className="text-[11px] font-bold text-gray-500">ঋতু: {bDate.season}</span>
            </div>
            <span className="text-[11px] text-gray-300">|</span>
            <span className="text-[11px] font-medium text-gray-400 italic">{bDate.englishDate} (ইংরেজি)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomNav: React.FC<{ activeTab: string; onTabChange: (tab: ViewState) => void }> = ({ activeTab, onTabChange }) => (
  <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-50 flex items-center justify-around h-16 safe-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
    <button onClick={() => onTabChange('home')} className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-indigo-50' : ''}`} />
      <span className="text-[10px] font-bold">হোম</span>
    </button>
    <button onClick={() => onTabChange('upazila-list')} className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'upazila-list' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <BookOpen className={`w-5 h-5 ${activeTab === 'upazila-list' ? 'fill-indigo-50' : ''}`} />
      <span className="text-[10px] font-bold">একনজরে</span>
    </button>
    <button onClick={() => onTabChange('dev-info')} className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'dev-info' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <UserCircle className={`w-5 h-5 ${activeTab === 'dev-info' ? 'fill-indigo-50' : ''}`} />
      <span className="text-[10px] font-bold">ডেভেলপার</span>
    </button>
  </nav>
);

const UpazilaDetailView: React.FC<{ upazila: UpazilaInfo; goBack: () => void }> = ({ upazila, goBack }) => (
  <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-right duration-300 safe-top">
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4">
      <button onClick={goBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <h2 className="text-base font-bold text-gray-800">{upazila.name}</h2>
    </header>
    <main className="max-w-md mx-auto p-0 pb-20">
      <div className="aspect-[16/9] w-full">
        <img src={upazila.imageUrl} className="w-full h-full object-cover" alt={upazila.name} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" /> একনজরে তথ্য
        </h3>
        
        <div className="border border-gray-100 rounded-2xl overflow-hidden mb-6 shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <td className="p-3 font-bold text-gray-400 uppercase text-[10px] w-1/3">আয়তন</td>
                <td className="p-3 text-gray-700 font-bold">{upazila.area}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 font-bold text-gray-400 uppercase text-[10px]">জনসংখ্যা</td>
                <td className="p-3 text-gray-700 font-bold">{upazila.population}</td>
              </tr>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <td className="p-3 font-bold text-gray-400 uppercase text-[10px]">ইউনিয়ন</td>
                <td className="p-3 text-gray-700 font-bold">{upazila.unions}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-400 uppercase text-[10px]">গ্রাম</td>
                <td className="p-3 text-gray-700 font-bold">{upazila.villages}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">বিস্তারিত তথ্য</h4>
          <p className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-wrap">{upazila.description}</p>
        </section>

        {upazila.notablePlaces.length > 0 && (
          <section>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">দর্শনীয় স্থানসমূহ</h4>
            <div className="flex flex-wrap gap-2">
              {upazila.notablePlaces.map((place, i) => (
                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
                  {place}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  </div>
);

const DeveloperPortfolio: React.FC = () => (
  <div className="min-h-screen bg-slate-50 pb-24">
    <div className="h-48 bg-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Code className="w-64 h-64 absolute -top-10 -right-10 rotate-12" />
      </div>
    </div>
    <div className="max-w-md mx-auto px-6 -mt-20 relative z-10">
      <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-white/60">
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-lg mb-4">
            <img src="https://i.ibb.co/Fkj5KSYt/20250424-095936-pica-1-png.jpg" className="w-full h-full object-cover" alt="Developer" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">মীর রাব্বি হোসেন</h2>
          <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mt-1">Full Stack Developer</p>
          
          <div className="flex gap-3 mt-6">
            <a href="https://facebook.com" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"><Facebook className="w-5 h-5" /></a>
            <a href="mailto:mirrabbi@example.com" className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all"><Mail className="w-5 h-5" /></a>
            <a href="https://github.com" className="p-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all"><Globe className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <section>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">সম্পর্কে</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              আমি একজন প্যাশনেট ওয়েব এবং মোবাইল অ্যাপ্লিকেশন ডেভেলপার। পাবনা জেলার স্থানীয় তথ্যের সহজলভ্যতা নিশ্চিত করতে এই প্রোজেক্টটি ডেভেলপ করেছি। আধুনিক প্রযুক্তি ব্যবহার করে ইউজার ফ্রেন্ডলি ইন্টারফেস তৈরিতে আমার বিশেষ আগ্রহ।
            </p>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">দক্ষতা</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Firebase', 'Next.js', 'Mobile UI'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-[11px] font-bold border border-gray-100">{skill}</span>
              ))}
            </div>
          </section>

          <section className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">ঠিকানা</h4>
            <p className="text-gray-700 text-sm font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> পাবনা জেলা, বাংলাদেশ
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

type ViewState = 'home' | 'area-detail' | 'category-list' | 'upazila-list' | 'upazila-detail' | 'dev-info';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [selectedAreaItem, setSelectedAreaItem] = useState<AreaInfo | null>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<UpazilaInfo | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* Home View */}
      {currentView === 'home' && (
        <>
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md pt-3 pb-2 safe-top border-b border-gray-100 shadow-sm">
            <div className="max-w-md mx-auto px-4 flex justify-between items-center h-10">
              <h1 className="text-lg font-bold text-indigo-700 flex items-center gap-1.5 tracking-tight">
                <MapPin className="w-4 h-4 fill-indigo-200" /> আমার পাবনা
              </h1>
              <div className="flex gap-2">
                <button className="p-1.5 rounded bg-gray-50 border border-gray-100 text-gray-400"><Search className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded bg-gray-50 border border-gray-100 text-gray-400"><Heart className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </header>
          <main className="pb-24">
            <div className="max-w-md mx-auto px-4 mt-6">
              
              {/* Image Slider Component */}
              <HeroSlider />

              <div className="grid grid-cols-2 gap-3 mb-8">
                {HERO_CATEGORIES.map((cat) => (
                  <button key={cat.name} onClick={() => { setSelectedCategory(cat.name); setCurrentView('category-list'); }} className={`group flex flex-col items-center justify-center p-4 border border-gray-100 shadow-sm rounded-2xl transition-all hover:shadow-md hover:border-indigo-100 active:scale-[0.97] text-center space-y-2.5 ${cat.lightColor}`}>
                    <div className={`p-2.5 ${cat.color} text-white shadow-md shadow-black/5 rounded-xl ${cat.anim}`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <p className={`text-[12px] font-bold ${cat.textColor} leading-tight`}>{cat.label}</p>
                  </button>
                ))}
              </div>

              {/* Bengali Calendar Component */}
              <BengaliCalendarCard />

              {/* Prayer Schedule Component */}
              <PrayerScheduleCard />

              {/* Daily Hadith Component */}
              <DailyHadithCard />

              {/* Spiritual Reflection Card */}
              <RemembranceCard />

            </div>
          </main>
        </>
      )}

      {/* Upazila List (At a Glance) */}
      {currentView === 'upazila-list' && (
        <div className="pb-24 animate-in slide-in-from-right duration-300">
          <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 safe-top">
            <h2 className="text-lg font-black text-gray-800">পাবনা একনজরে</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">সকল উপজেলা সমূহ</p>
          </header>
          <main className="max-w-md mx-auto p-4 space-y-3">
            {UPAZILA_DATA.map(u => (
              <button key={u.id} onClick={() => { setSelectedUpazila(u); setCurrentView('upazila-detail'); }} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-2xl active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner bg-gray-50 border border-gray-100">
                    <img src={u.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-gray-800">{u.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">বিস্তারিত দেখুন <ChevronRight className="w-2.5 h-2.5 inline" /></p>
                  </div>
                </div>
                <div className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-bold border border-indigo-100 uppercase">তথ্য ছক</div>
              </button>
            ))}
            {UPAZILA_DATA.length === 0 && (
              <div className="py-20 text-center"><p className="text-sm text-gray-400">তথ্য যুক্ত হচ্ছে...</p></div>
            )}
          </main>
        </div>
      )}

      {/* Developer Info View */}
      {currentView === 'dev-info' && <DeveloperPortfolio />}

      {/* Detail Views */}
      {currentView === 'upazila-detail' && selectedUpazila && (
        <UpazilaDetailView upazila={selectedUpazila} goBack={() => setCurrentView('upazila-list')} />
      )}

      {currentView === 'category-list' && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
            <h2 className="text-base font-bold text-gray-800">{selectedCategory}</h2>
          </header>
          <main className="max-w-md mx-auto p-4 pb-24 space-y-4">
            {DATA.filter(item => item.category === selectedCategory || selectedCategory === 'EMERGENCY_HUB').map(item => (
              <div key={item.id} onClick={() => { setSelectedAreaItem(item); setCurrentView('area-detail'); }} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-800 truncate">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tight">{item.area}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            ))}
            {DATA.filter(item => item.category === selectedCategory).length === 0 && (
               <div className="py-20 text-center"><p className="text-sm text-gray-400">এই ক্যাটাগরিতে কোনো তথ্য পাওয়া যায়নি</p></div>
            )}
          </main>
        </div>
      )}

      {currentView === 'area-detail' && selectedAreaItem && (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300 safe-top">
          <div className="relative aspect-[16/10] w-full max-w-md mx-auto">
            <img src={selectedAreaItem.imageUrl} className="w-full h-full object-cover" alt="" />
            <div className="absolute top-4 left-4"><button onClick={() => setCurrentView('home')} className="p-2.5 bg-black/40 backdrop-blur-md text-white border border-white/20 rounded-xl"><ArrowLeft className="w-5 h-5" /></button></div>
          </div>
          <div className="p-6 max-w-md mx-auto bg-white min-h-screen -mt-6 rounded-t-[32px] relative z-10 border-t border-gray-100">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">{selectedAreaItem.category}</span>
            <h2 className="text-2xl font-black text-gray-800 mb-4 leading-tight">{selectedAreaItem.title}</h2>
            <div className="flex items-center gap-1.5 mb-6 text-gray-400">
              <MapPin className="w-3.5 h-3.5" /> <span className="text-[11px] font-bold uppercase">{selectedAreaItem.area}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-10">{selectedAreaItem.description}</p>
          </div>
        </div>
      )}

      {/* Global Bottom Navigation */}
      <BottomNav activeTab={currentView.includes('upazila') ? 'upazila-list' : currentView.includes('dev') ? 'dev-info' : 'home'} onTabChange={(tab) => { setCurrentView(tab); window.scrollTo({ top: 0 }); }} />

    </div>
  );
};

export default App;