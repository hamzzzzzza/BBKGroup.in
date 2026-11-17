import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronRight, Leaf, Droplets, Zap, ShieldCheck, ArrowRight, Menu, X,
  Globe, Award, FlaskConical, Settings, Package, Cpu, Mail, Phone,
  MapPin, Send, Users, Layers, Wind, MousePointer2, Box, Scissors,
  Building2, Factory, Warehouse, Compass
} from 'lucide-react';

const COLORS = {
  beige: '#F5F1E8',
  dark: '#1A1A1A', 
  leather: '#8B6F47'
};

const LEATHER_TYPES = [
  {
    name: "Full Grain Leather",
    category: "Luxury",
    shortDesc: "Highest quality, most durable, develops patina",
    desc: "Full-grain leather is the highest quality leather available. It comes from the top layer of the hide and includes all of the natural grain. It is extremely durable and, instead of wearing out, it develops a beautiful patina over time.",
    texture: "Natural, slight grain variations, breathable",
    durability: "Exceptional (lasts a lifetime)",
    useCases: "High-end shoes, luxury bags, premium furniture",
    price: "Premium",
    characteristics: "Water-resistant, develops patina, highly breathable",
    img: "/full_grain_leather_1776011761161.png"
  },
  {
    name: "Top Grain Leather",
    category: "Durable",
    shortDesc: "High-quality, refined appearance, strong",
    desc: "Top-grain leather is the second-highest quality. It has the top layer of the hide removed (sanded) to reveal a more uniform and refined appearance. It is thinner and more pliable than full-grain but still very strong.",
    texture: "Uniform, smooth, refined finish",
    durability: "High",
    useCases: "Designer handbags, wallets, fashion jackets",
    price: "Premium",
    characteristics: "Stain-resistant, flexible, very consistent surface",
    img: "/top_grain_leather_1776011776544.png"
  },
  {
    name: "Nubuck Leather",
    category: "Soft",
    shortDesc: "Sanded full-grain for a velvety feel",
    desc: "Nubuck is top-grain cattle hide leather that has been sanded or buffed on the grain side, or outside, to give a slight nap of short protein fibers, producing a velvet-like surface. It is more durable than suede.",
    texture: "Velvety, soft nap, fine protein fibers",
    durability: "Medium-High",
    useCases: "Premium boots, luxury upholstery, travel bags",
    price: "Premium",
    characteristics: "Soft touch, luxurious appearance, requires care",
    img: "/nubuck_leather_1776011794190.png"
  },
  {
    name: "Suede Leather",
    category: "Soft",
    shortDesc: "Soft underside split with fuzzy finish",
    desc: "Suede is made from the underside of the animal skin, which is softer and more flexible than the outer layer. It has a characteristic fuzzy nap and is widely prized for its delicate texture.",
    texture: "Fuzzy, fibrous, very soft",
    durability: "Medium",
    useCases: "Casual footwear, soft jackets, inner linings",
    price: "Medium",
    characteristics: "Highly flexible, lightweight, absorbs moisture",
    img: "/suede_leather_1776011816383.png"
  },
  {
    name: "Patent Leather",
    category: "Luxury",
    shortDesc: "High-gloss, formal finish",
    desc: "Patent leather is a type of coated leather that has a high-gloss, mirror-like finish. The coating process was originally developed in the early 19th century and today usually involves a plastic or lacquer finish.",
    texture: "Mirror-like, smooth, non-porous",
    durability: "Medium",
    useCases: "Formal dress shoes, luxury clutches, belts",
    price: "Medium-High",
    characteristics: "Waterproof surface, ultra-reflective, easy to clean",
    img: "/patent_leather_1776011834587.png"
  },
  {
    name: "Nappa Leather",
    category: "Soft",
    shortDesc: "Soft, supple, full-grain sheep or goat skin",
    desc: "Nappa leather is noted for its soft feel. It is a general term for particularly soft, chrome-tanned smooth leather of all skin types. It's often full-grain and highly prized in the luxury automotive and fashion industries.",
    texture: "Extremely soft, smooth, fine grain",
    durability: "Medium-High",
    useCases: "Luxury car interiors, high-end gloves, premium apparel",
    price: "Premium",
    characteristics: "Supple, dyed with water-soluble pigments, breathable",
    img: "/nappa_leather_1776011851854.png"
  },
  {
    name: "Calfskin Leather",
    category: "Luxury",
    shortDesc: "Soft, durable, high-end",
    desc: "Calfskin is a high-quality leather produced from the hide of young domestic cattle. Because of its small size and fine grain, it is one of the most valuable leathers in the fashion world, combining softness with durability.",
    texture: "Fine, tight grain, very smooth",
    durability: "High",
    useCases: "Luxury dress shoes, high-end bookbinding, wallets",
    price: "Premium",
    characteristics: "Thin yet strong, highly polished finish, elegant",
    img: "/calfskin_leather_1776011865924.png"
  },
  {
    name: "Vegetable-Tanned Leather",
    category: "Durable",
    shortDesc: "Eco-friendly, classic curing",
    desc: "Vegetable tanning is an ancient craft that uses natural tannins found in bark, leaves, and fruits. It is an eco-friendly process that results in a leather that is firm, durable, and smells distinctively 'woody'.",
    texture: "Firm, traditional, natural feel",
    durability: "Very High",
    useCases: "Artisanal bags, saddles, heavy-duty belts",
    price: "Premium",
    characteristics: "Environmentally friendly, develops deep patina, firm",
    img: "/vegetable_tanned_leather_1776011889098.png"
  },
  {
    name: "Goat Leather",
    category: "Durable",
    shortDesc: "Lightweight, durable, pebbled texture",
    desc: "Goatskin (also known as Morocco leather) is particularly strong and durable while remaining thin and lightweight. It has a characteristic pebbly or 'grainy' look and is naturally water-resistant.",
    texture: "Pebbled, tight grain, distinct ridges",
    durability: "High",
    useCases: "Bookbinding, high-quality gloves, small bags",
    price: "Medium",
    characteristics: "Naturally water-resistant, flexible, lightweight",
    img: "/goat_leather_texture_1776011908545.png"
  },
  {
    name: "Buffalo Leather",
    category: "Durable",
    shortDesc: "Thick, rugged, durable",
    desc: "Buffalo leather is much thicker and stronger than cowhide. It has a wider and deeper grain, which gives it a more rugged and rustic appearance. It is incredibly durable and resistant to punctures.",
    texture: "Coarse, deep grain, rugged pores",
    durability: "Extreme",
    useCases: "Work boots, heavy-duty upholstery, rugged luggage",
    price: "Medium-High",
    characteristics: "Incredibly strong, rustic look, gains character",
    img: "/buffalo_leather_texture_1776011925108.png"
  },
  {
    name: "Sheep Leather",
    category: "Soft",
    shortDesc: "Soft, thin, luxurious",
    desc: "Sheepskin is thin and light. It is one of the softest leathers available and is often used where extreme comfort and a delicate touch are required. It is less durable than cow or buffalo but unmatched in softness.",
    texture: "Silky, smooth, ultra-fine",
    durability: "Medium-Low",
    useCases: "Luxury fashion garments, soft slippers, glove linings",
    price: "Medium-High",
    characteristics: "Velvety feel, excellent insulation, lightweight",
    img: "/sheep_leather_texture_1776011942113.png"
  },
  {
    name: "Split Grain Leather",
    category: "Durable",
    shortDesc: "Functional, lower-cost layer",
    desc: "Split leather is created from the fibrous part of the hide left once the top-grain has been separated. It is often coated with an artificial layer (like PU) to mimic the look of more expensive leathers.",
    texture: "Embossed, prototype, slightly stiff",
    durability: "Medium",
    useCases: "Work gloves, affordable footwear, industrial covers",
    price: "Low-Medium",
    characteristics: "Cost-effective, uniform color, functional",
    img: "/split_grain_leather_texture_1776011965687.png"
  },
  {
    name: "Exotic Leather",
    category: "Exotic",
    shortDesc: "Crocodile, Snake, Ostrich",
    desc: "Exotic leathers come from non-cattle sources like reptiles or birds. Crocodile leather is prized for its high value and distinct scale patterns. Each skin is unique and requires highly specialized tanning processes.",
    texture: "Scaled, textured, non-uniform",
    durability: "High (variable)",
    useCases: "Ultra-luxury accessories, statement shoes, watches",
    price: "Very High",
    characteristics: "Unique patterns, status symbol, highly artisanal",
    img: "/exotic_crocodile_leather_1776011983222.png"
  },
  {
    name: "Corrected-Grain Leather",
    category: "Durable",
    shortDesc: "Uniform, affordable, buffed",
    desc: "Corrected-grain leather is any top-grain leather that has had its surfaces buffed to remove imperfections like scars or bug bites, then embossed with a grain pattern and finished with pigments.",
    texture: "Man-made grain, very consistent",
    durability: "High",
    useCases: "School shoes, office furniture, automotive seating",
    price: "Medium",
    characteristics: "Stain-resistant, very uniform, easy maintenance",
    img: "/corrected_grain_leather_texture_1776012000395.png"
  },
  {
    name: "Genuine Leather",
    category: "Durable",
    shortDesc: "Moderate quality, practical",
    desc: "In the leather industry, 'genuine' often describes leather made from multiple layers of low-quality leather bonded together with glue and then painted. It is functional and affordable but lacks the longevity of full-grain.",
    texture: "Embossed, painted finish",
    durability: "Low-Medium",
    useCases: "Budget-friendly belts, wallets, promotional items",
    price: "Low",
    characteristics: "Affordable, versatile coloring, practical",
    img: "/genuine_leather_texture_1776012018819.png"
  }
];

const SHOE_COLLECTION = [
  { brand: "Gabor", name: "Heritage Pump", category: "Formal", img: "/shoes/alonzo_shoe_1775729871505.png" },
  { brand: "ECCO", name: "Soft 7 Sneaker", category: "Casual", img: "/shoes/cole_haan_sneaker.png" },
  { brand: "Cole Haan", name: "OriginalGrand", category: "Hybrid", img: "/shoes/clarks_shoe_1775729800677.png" },
  { brand: "elefanten", name: "Free Step", category: "Kids", img: "/shoes/elefanten_baby_shoe.png" },
  { brand: "Woodland", name: "Terra Rover", category: "Outdoor", img: "/shoes/woodland_shoe_1775729814040.png" },
  { brand: "Hotter", name: "Comfort Plus", category: "Casual", img: "/shoes/bata_shoe_1775729772042.png" },
  { brand: "Kate Spade", name: "Aria Heel", category: "Luxury", img: "/shoes/kate_spade_heel.png" },
  { brand: "Maje", name: "Platform Boot", category: "Casual", img: "/shoes/maje_platform_boot.png" },
  { brand: "Vanessa Bruno", name: "Studio Slipper", category: "Casual", img: "/shoes/gh_bass_loafer.png" },
  { brand: "tbs", name: "Globe Sailor", category: "Performance", img: "/shoes/signature_chelsea.png" },
  { brand: "superfit", name: "Safe Steps", category: "Kids", img: "/shoes/john_lobb_monk.jpg" },
  { brand: "Wolverine", name: "1000 Mile Solo", category: "Outdoor", img: "/shoes/allen_edmonds_brogue.png" },
  { brand: "ara", name: "Pure Flow", category: "Performance", img: "/shoes/bridlen_shoe_1775729829533.png" },
  { brand: "Fossil", name: "Heritage Loafer", category: "Formal", img: "/shoes/piel_cuero_shoe_1775729889844.png" }
];

const BAGS_COLLECTION = [
  { brand: "Hermès", name: "Birkin 30", category: "Luxury", img: "/bags/hermes_birkin.png" },
  { brand: "Chanel", name: "Classic Flap", category: "Iconic", img: "/bags/chanel_flap.png" },
  { brand: "Dior", name: "Lady Dior", category: "Luxury", img: "/bags/dior_lady.png" },
  { brand: "Balenciaga", name: "City Bag", category: "Contemporary", img: "/bags/balenciaga_city.png" },
  { brand: "Gucci", name: "Jackie 1961", category: "Iconic", img: "/bags/gucci_jackie.png" },
  { brand: "Fendi", name: "Baguette", category: "Iconic", img: "/bags/fendi_baguette.png" },
  { brand: "Celine", name: "Triomphe", category: "Minimalist", img: "/bags/celine_triomphe.png" },
  { brand: "Bottega Veneta", name: "Cassette", category: "Luxury", img: "/bags/bottega_cassette.png" },
  { brand: "Alexander McQueen", name: "Knuckle Bag", category: "Contemporary", img: "/bags/mcqueen_knuckle.png" },
  { brand: "Burberry", name: "Lola Bag", category: "Heritage", img: "/bags/burberry_lola.png" },
  { brand: "Chloe", name: "Marcie Satchel", category: "Bohemian", img: "/bags/chloe_marcie.png" },
  { brand: "Delvaux", name: "Brillant", category: "Heritage", img: "/bags/delvaux_brillant.png" },
  { brand: "Goyard", name: "Saint Louis", category: "Exotic", img: "/bags/goyard_st_louis.png" }
];

const LOCATIONS = [
  {
    name: "Ranipet (Headquarters)",
    unit: "Unit I - Tanning Division",
    address: "Plot No. 15, Phase II, Ranipet, Tamil Nadu 632401",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.263884844627!2d79.3175841!3d12.9238803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad36034033b000%3A0x7d0a202476b7e67!2sRanipet%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1712900000000!5m2!1sen!2sin"
  },
  {
    name: "SIPCOT Unit",
    unit: "Unit II - Footwear Division",
    address: "Survey No. 24, Sipcot Industrial Complex, Ranipet 632403",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750438153448!2d79.3175841!3d12.9238803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad36034033b000%3A0x7d0a202476b7e67!2sSipcot%20Ranipet!5e0!3m2!1sen!2sin!4v1712900000001!5m2!1sen!2sin"
  },
  {
    name: "Kanchipuram Unit",
    unit: "Unit III - Leather Goods",
    address: "No. 7, Orikkai Industrial Area, Kanchipuram 631502",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3117467657155!2d79.6946!3d12.8342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzAzLjEiTiA3OcKwNDEnNDAuNiJF!5e0!3m2!1sen!2sin!4v1712900000002!5m2!1sen!2sin"
  }
];

const HERITAGE_ITEMS = [
  { 
    year: 1991, 
    title: "The Foundation", 
    desc: "Mr. N. Baskaran establishes the enterprise in Ranipet, embarking on a journey to define excellence in leather craftsmanship." 
  },
  { 
    year: 1994, 
    title: "Ram Leathers", 
    desc: "Founding of our first tannery, Ram Leathers, which continues to serve as the group's technical epicenter." 
  },
  { 
    year: 1998, 
    title: "Industrial Expansion", 
    desc: "Strategic expansion into shoe-upper manufacturing with the establishment of two dedicated production facilities." 
  },
  { 
    year: 2002, 
    title: "Footwear Innovation", 
    desc: "Vertical integration as we began full shoe manufacturing, merging traditional skill with industrial scale." 
  },
  { 
    year: 2014, 
    title: "Bharath Enterprises", 
    desc: "Establishment of Bharath Enterprises, our second major tannery, scaling sustainable production capacities." 
  },
  { 
    year: 2016, 
    title: "Technical Advancement", 
    desc: "Launch of our PU Transfer Coating plant, representing one of the most advanced material finishing facilities in the region." 
  },
  { 
    year: 2018, 
    title: "Global Luxury Division", 
    desc: "Official launch of our high-end Leather Goods division, bringing BBK quality to the world's finest luxury houses." 
  },
  { 
    year: 2024, 
    title: "Sustainability 2.0", 
    desc: "Embracing complete traceability and LWG Gold standards as we lead the future of sustainable leather innovation." 
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id) => {
    setActiveTab(id);
    setSelectedProduct(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-leather/30" style={{ backgroundColor: COLORS.beige, color: COLORS.dark }}>
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
          scrollY > 50 || activeTab !== 'home' 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-[#1A1A1A]' 
          : 'bg-transparent text-white'
        }`}
      >
        <div className="flex flex-col cursor-pointer" onClick={() => handleNav('home')}>
          <span className="text-2xl font-black tracking-tighter uppercase leading-none">BBK Group</span>
          <span className={`text-[10px] tracking-[0.4em] uppercase opacity-70 ${scrollY > 50 || activeTab !== 'home' ? 'text-leather' : 'text-white/80'}`}>
            Heritage & Innovation
          </span>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          {['home', 'heritage', 'leather', 'shoes', 'bags'].map((link) => (
            <button 
              key={link}
              onClick={() => handleNav(link)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors hover:text-leather ${
                activeTab === link 
                ? 'text-leather' 
                : (scrollY > 50 || activeTab !== 'home' ? 'text-dark/70' : 'text-white/70')
              }`}
            >
              {link}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className={`text-[10px] font-bold uppercase tracking-[0.3em] hover:text-leather transition-colors ${
              scrollY > 50 || activeTab !== 'home' ? 'text-dark/70' : 'text-white/70'
            }`}
          >
            Contact
          </button>
        </div>

        <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {['home', 'heritage', 'leather', 'shoes', 'bags'].map((link) => (
              <button key={link} onClick={() => handleNav(link)} className="text-xl uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">{link}</button>
            ))}
            <button onClick={() => handleNav('contact')} className="text-xl uppercase tracking-[0.3em] font-bold text-leather">Contact</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <ProductDetailView 
              product={selectedProduct} 
              onBack={() => {
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onHome={() => handleNav('home')}
            />
          ) : (
            <div className="flex flex-col">
              {activeTab === 'home' && <HomeView onNavigate={handleNav} />}
              {activeTab === 'heritage' && <HeritageView />}
              {activeTab === 'leather' && <LeatherShowcase onSelect={setSelectedProduct} />}
              {activeTab === 'shoes' && <ListView items={SHOE_COLLECTION} sectionId="shoes" onSelect={setSelectedProduct} />}
              {activeTab === 'bags' && <ListView items={BAGS_COLLECTION} sectionId="bags" onSelect={setSelectedProduct} />}
              {activeTab === 'contact' && <ContactView />}
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white py-24 border-t border-dark/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-24">
           <div className="space-y-10">
              <div className="flex flex-col">
                <span className="text-[33px] font-black tracking-tighter uppercase leading-none">BBK Group</span>
                <span className="text-xs tracking-[0.4em] uppercase opacity-40 text-leather font-bold">Heritage & Innovation</span>
              </div>
              <p className="text-sm text-dark/60 max-w-sm leading-relaxed font-medium">
                Pioneering the future of leather manufacturing since 1991. Combining heritage craftsmanship with sustainable industrial technology for the world's most iconic brands.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-12 text-xs font-bold uppercase tracking-widest text-dark/60">
              <div>
                <h4 className="text-leather mb-8 text-[11px] font-black">Explore</h4>
                <ul className="space-y-6">
                  <li><button onClick={() => handleNav('home')} className="hover:text-leather transition-colors">Entry</button></li>
                  <li><button onClick={() => handleNav('leather')} className="hover:text-leather transition-colors">Leathers</button></li>
                  <li><button onClick={() => handleNav('shoes')} className="hover:text-leather transition-colors">Shoes</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-leather mb-8 text-[11px] font-black">Company</h4>
                <ul className="space-y-6">
                  <li><button onClick={() => handleNav('heritage')} className="hover:text-leather transition-colors">Heritage</button></li>
                  <li><button onClick={() => handleNav('contact')} className="hover:text-leather transition-colors">Contact</button></li>
                  <li><button className="hover:text-leather transition-colors">Privacy</button></li>
                </ul>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-widest text-leather font-black">Location</h4>
              <div className="space-y-3">
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-medium">Ranipet | Kanchipuram | Chennai</p>
                <p className="text-sm text-[#1A1A1A] font-bold underline underline-offset-8 cursor-pointer hover:text-leather transition-colors">contact@bbkgroup.in</p>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-dark/5 px-6 md:px-12 flex justify-between text-xs uppercase tracking-widest text-dark/30 font-bold">
           <span>© 2024 BBK Group</span>
           <span>Crafted in India</span>
        </div>
      </footer>
    </div>
  );
};const HomeView = ({ onNavigate }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src="/hero_leather.png" className="w-full h-full object-cover opacity-60" alt="Hero Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 uppercase tracking-[0.4em] text-[10px] mb-8 font-bold">Established 1991</motion.p>
          <h1 className="text-4xl md:text-[64px] text-white font-serif mb-12 leading-tight tracking-tight">
            Inspired by age-old tradition {"\n"} & modern technology
          </h1>
          <button 
            onClick={() => {
              const el = document.getElementById('categories');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-white/30 text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all font-bold"
          >
            Explore Portfolio
          </button>
        </div>
      </section>

      {/* Main Categories Section */}
      <section id="categories" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-48">
          {/* Leathers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-video overflow-hidden rounded-[32px] group">
              <img src="/leathers_new.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Leathers" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="space-y-10">
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-leather font-black">Leathers</h2>
              <h3 className="text-5xl font-serif text-dark leading-tight">Inspired by age-old tradition and modern technology</h3>
              <div className="space-y-6 text-dark/60 text-lg leading-relaxed font-medium">
                <p>Our strength lies in our ability to produce a variety of articles that adhere to high standards of quality.</p>
                <p className="text-sm border-l-2 border-leather pl-6 italic">Our tanneries have LWG Gold certification and are ISO 9001:2015, ISO 14001:2015, and SA 8000 compliant.</p>
              </div>
              <button onClick={() => onNavigate('leather')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-dark hover:text-leather transition-colors">
                Discover More <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Shoes Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="lg:order-2 relative aspect-video overflow-hidden rounded-[32px] group">
              <img src="/shoes_new.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Shoes" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="space-y-10">
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-leather font-black">Shoes</h2>
              <h3 className="text-5xl font-serif text-dark leading-tight">Powered by curiosity</h3>
              <p className="text-dark/60 text-lg leading-relaxed font-medium">
                What started out as an upper manufacturing unit, soon became a full-fledged shoe manufacturing unit.
              </p>
              <button onClick={() => onNavigate('shoes')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-dark hover:text-leather transition-colors">
                Discover More <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Leather Goods Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-video overflow-hidden rounded-[32px] group">
              <img src="/bags_new.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Leather Goods" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="space-y-10">
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-leather font-black">Leather Goods</h2>
              <h3 className="text-5xl font-serif text-dark leading-tight">Driven by innovation</h3>
              <p className="text-dark/60 text-lg leading-relaxed font-medium">
                A strong foundation of leather combined with the most modern technologies, a skilled and professional workforce, cutting-edge techniques and machinery, and attention to detail are the ingredients for the production of high-quality bags.
              </p>
              <button onClick={() => onNavigate('bags')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-dark hover:text-leather transition-colors">
                Discover More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto min-h-[500px] relative rounded-[48px] overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 z-0">
            <img src="/responsibility.png" className="w-full h-full object-cover" alt="Responsibility Background" />
            <div className="absolute inset-0 bg-black/50" />
         </div>
         <div className="max-w-4xl mx-auto text-center relative z-10 px-6 py-24">
            <h4 className="text-[10px] uppercase tracking-[0.8em] text-leather/80 mb-12 font-bold">Responsibility</h4>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-16 leading-[1.1] tracking-tighter">
              Sustainability is the way towards the future.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-16 font-medium">
              We wholeheartedly believe that sustainability is a balance between the environment, economy and ethics. We have ensured our sustainable practices permeate through all levels of production.
            </p>
            <button onClick={() => onNavigate('heritage')} className="text-[10px] uppercase tracking-[0.4em] font-black border-b-2 border-leather pb-2 text-leather">Know More</button>
         </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-20 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-video overflow-hidden rounded-[32px] group order-2 lg:order-1">
            <img src="/tech_rd.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="R&D Technology" />
            <div className="absolute inset-0 bg-leather/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.8em] text-leather font-bold">R&D Heritage</h4>
              <h2 className="text-4xl md:text-6xl font-serif text-dark leading-tight">Tech behind the magic</h2>
            </div>
            <div className="space-y-8 text-dark/60 text-lg leading-relaxed font-medium">
              <p>Our R&D department is a team of dedicated professionals who are keen on exploring and discovering new ways to improve our means of production and development. Our R&D department has designed a multitude of products to meet current trends and specific client requirements.</p>
              <p>Our team works hand in hand with leading brands to develop specific solutions which ensure the integration of products with the latest designs. All this is made possible through our constant upgradation of technology.</p>
              <p className="text-dark font-serif italic text-xl">We continue to work on alternative tanning methods such as tanning using olive leaves and seeds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-video overflow-hidden rounded-[32px] group">
            <img src="/about_heritage.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="BBK Heritage" />
            <div className="absolute inset-0 bg-leather/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.8em] text-leather font-bold">Our Story</h4>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight text-dark">About us</h2>
            </div>
            <div className="space-y-10">
              <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-light italic border-l border-leather/30 pl-8">
                "The journey of discovery started in the late 1970s in South India when Mr. Baskaran began working as a technician at leather factories. His passion and curiosity for leather manufacturing and aesthetic designs led him to start his own company in 1991, and the rest, as they say, is history."
              </p>
              <button onClick={() => onNavigate('heritage')} className="text-[10px] uppercase tracking-[0.4em] font-black border-b-2 border-leather pb-2 text-dark hover:text-leather transition-all group">Know More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Contact Experience */}
      <section className="py-32 px-6 bg-[#F5F1E8]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <span className="h-px w-12 bg-leather" />
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] text-leather">Collaboration</span>
                </motion.div>
                <h2 className="text-6xl md:text-8xl font-serif text-dark leading-[0.9] tracking-tighter">
                  Let's create the <br/>
                  <span className="text-leather italic relative inline-block">
                    future of leather
                    <motion.span 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute -bottom-2 left-0 w-full h-px bg-leather/30 origin-left"
                    />
                  </span>.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-leather group-hover:bg-leather group-hover:text-white transition-all duration-500">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Direct Line</h4>
                    <p className="text-xl font-medium text-dark tracking-tight">+91 (44) 6745 8000</p>
                  </div>
                </div>
                <div className="space-y-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-leather group-hover:bg-leather group-hover:text-white transition-all duration-500">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Global Inquiries</h4>
                    <p className="text-xl font-medium text-dark tracking-tight underline underline-offset-8 decoration-leather/30">contact@bbkgroup.in</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-dark/5 space-y-8">
                <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Connect with us</h4>
                <div className="flex gap-6">
                  {['LinkedIn', 'Instagram', 'WhatsApp'].map(social => (
                    <button key={social} className="text-[10px] uppercase tracking-widest font-black text-dark/60 hover:text-leather transition-colors pb-1 border-b border-transparent hover:border-leather">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-12 md:p-20 rounded-[64px] shadow-2xl shadow-dark/5 border border-dark/[0.03] space-y-12 relative"
            >
              <div className="space-y-2">
                <h3 className="text-3xl font-serif text-leather">Send an Inquiry</h3>
                <p className="text-sm text-dark/40 font-medium">Our team typically responds within 24 business hours.</p>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-8"
                >
                  <div className="w-20 h-20 bg-leather/10 rounded-full flex items-center justify-center mx-auto text-leather">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif text-dark leading-tight">Your application is <br/><span className="text-leather italic">submitted successfully</span></h3>
                    <p className="text-sm text-dark/40 font-medium max-w-xs mx-auto">Thank you for reaching out. Our partnerships team will contact you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-leather border-b border-leather pb-1"
                  >
                    Send Another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3 pt-4 border-t border-dark/20">
                      <label className="text-[9px] uppercase tracking-widest text-leather font-black block">First Name</label>
                      <input type="text" placeholder="John" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                    </div>
                    <div className="space-y-3 pt-4 border-t border-dark/20">
                      <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Work Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20 relative">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Department</label>
                    <select className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark bg-transparent appearance-none cursor-pointer text-lg">
                      <option>Sales & Partnerships</option>
                      <option>Production Division</option>
                      <option>Careers</option>
                      <option>General Support</option>
                    </select>
                    <ChevronRight size={16} className="absolute right-0 bottom-4 rotate-90 text-dark/20 pointer-events-none" />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Your Inquiry</label>
                    <textarea rows={4} placeholder="How can we help your brand?" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent resize-none text-lg" required></textarea>
                  </div>

                  <button type="submit" className="w-full bg-dark text-white py-8 rounded-3xl text-[11px] uppercase tracking-[0.5em] font-black hover:bg-leather transition-all shadow-xl shadow-dark/10 flex items-center justify-center gap-4 group">
                    Initiate Discussion
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Location Hub */}
          <div className="mt-48 pt-32 border-t border-dark/5">
            <div className="text-center mb-24 space-y-4">
              <h3 className="text-5xl font-serif text-dark">Manufacturing Hubs</h3>
              <p className="text-[10px] uppercase tracking-[0.8em] text-leather font-black">Centers of Global Excellence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {LOCATIONS.map((loc, idx) => (
                <div key={idx} className="bg-white rounded-[48px] overflow-hidden border border-dark/[0.03] shadow-sm hover:shadow-2xl transition-all duration-700 group">
                  <div className="h-72 relative transition-all duration-1000">
                    <iframe 
                      title={loc.unit}
                      src={loc.map}
                      className="w-full h-full border-0"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-serif text-dark group-hover:text-leather transition-colors">{loc.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest font-black text-leather">{loc.unit}</p>
                    </div>
                    <p className="text-sm text-dark/60 leading-relaxed font-medium min-h-[3rem]">{loc.address}</p>
                    <div className="pt-6 border-t border-dark/5 flex items-center justify-between">
                       <button className="text-[9px] uppercase tracking-widest font-black text-dark hover:text-leather transition-colors flex items-center gap-2">
                         Interactive Map <ArrowRight size={12} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full mb-16 md:mb-24 last:mb-0 group">
      {/* Central Marker Dot */}
      <div className={`
        absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-10 w-5 h-5 rounded-full border-[3px] border-beige z-30 transition-all duration-700
        ${isVisible ? 'bg-leather shadow-[0_0_25px_#8B6F47] scale-110' : 'bg-dark/10 scale-50 opacity-0'}
      `} />
      
      {/* Grid Layout for True Alternation */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Side Content */}
        <div className={`flex ${isLeft ? 'justify-end pr-12 md:pr-24' : 'hidden md:block'} pl-12 md:pl-0`}>
          {isLeft && (
            <div 
              className={`
                relative p-10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[32px] max-w-lg w-full
                border border-dark/[0.03] transition-all duration-1000 transform-gpu
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'}
                hover:shadow-[0_20px_60px_rgba(139,111,71,0.12)] hover:-translate-y-2 hover:border-leather/30
              `}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-leather opacity-30" />
                <span className="text-leather text-[10px] uppercase tracking-[0.6em] font-black">{item.year}</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-serif text-dark mb-6 group-hover:text-leather transition-colors duration-500">{item.title}</h4>
              <p className="text-dark/50 text-base leading-relaxed font-medium">{item.desc}</p>
              <div className="absolute bottom-8 right-10 text-dark/[0.03] text-6xl font-serif font-black select-none">
                {index + 1}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Content */}
        <div className={`flex ${!isLeft ? 'justify-start pl-12 md:pl-24' : 'hidden md:block'}`}>
          {!isLeft && (
            <div 
              className={`
                relative p-10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[32px] max-w-lg w-full
                border border-dark/[0.03] transition-all duration-1000 transform-gpu
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}
                hover:shadow-[0_20px_60px_rgba(139,111,71,0.12)] hover:-translate-y-2 hover:border-leather/30
              `}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-leather opacity-30" />
                <span className="text-leather text-[10px] uppercase tracking-[0.6em] font-black">{item.year}</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-serif text-dark mb-6 group-hover:text-leather transition-colors duration-500">{item.title}</h4>
              <p className="text-dark/50 text-base leading-relaxed font-medium">{item.desc}</p>
              <div className="absolute bottom-8 right-10 text-dark/[0.03] text-6xl font-serif font-black select-none">
                {index + 1}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LeatherCard = ({ item, onClick }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -10 }}
    onClick={() => onClick(item)}
    className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-dark/[0.03] shadow-sm hover:shadow-2xl transition-all duration-500"
  >
    <div className="aspect-square overflow-hidden relative">
      <img 
        src={item.img} 
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
        alt={item.name} 
      />
      <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute top-6 left-6">
        <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#8B6F47] shadow-sm">
          {item.category}
        </span>
      </div>
    </div>
    <div className="p-8 space-y-3">
      <h3 className="text-xl font-serif text-dark group-hover:text-leather transition-colors">{item.name}</h3>
      <p className="text-xs text-dark/50 leading-relaxed font-medium line-clamp-2">{item.shortDesc}</p>
      <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-leather pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Detail <ArrowRight size={10} />
      </div>
    </div>
  </motion.div>
);



const LeatherShowcase = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Luxury', 'Durable', 'Soft', 'Exotic'];

  const filtered = LEATHER_TYPES.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-48 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-24">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-leather" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-leather leading-none">Catalog</h4>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-dark tracking-tighter leading-[1.1]">Types of Leather</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search Article..."
              className="bg-white border border-dark/5 px-8 pl-14 py-4 rounded-full text-xs font-bold focus:outline-none focus:border-leather focus:ring-4 focus:ring-leather/5 transition-all w-full md:w-[300px] shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Compass className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-leather transition-colors" size={16} />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
                  category === cat 
                  ? 'bg-leather text-white border-leather shadow-leather/20' 
                  : 'bg-white text-dark/40 border-dark/5 hover:border-leather/30 hover:text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <LeatherCard key={item.name} item={item} onClick={onSelect} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-48 text-center space-y-6">
          <div className="w-24 h-24 bg-dark/5 rounded-full flex items-center justify-center mx-auto">
            <Box className="text-dark/20" size={40} />
          </div>
          <h3 className="text-2xl font-serif text-dark/40">No articles match your selection</h3>
          <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-leather text-[10px] font-black uppercase tracking-widest underline underline-offset-8">Clear filters</button>
        </div>
      )}
    </div>
  );
};
const HeritageView = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-64 bg-[#F5F1E8] overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-56 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[10px] uppercase tracking-[1.2em] text-leather mb-8 font-black">Timeline</h4>
            <h2 className="text-6xl md:text-8xl font-serif text-dark mb-12 tracking-tighter">Our Journey</h2>
            <div className="w-16 h-[2px] bg-leather/40 mx-auto" />
          </motion.div>
        </div>

        <div ref={targetRef} className="relative">
          {/* Fixed Center Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-dark/[0.08] md:-translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-leather shadow-[0_0_15px_#8B6F47]"
            />
          </div>

          {/* Grid Container */}
          <div className="relative">
            {HERITAGE_ITEMS.map((item, idx) => (
              <TimelineItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>

        {/* Global Reach / Closing */}
        <div className="mt-64 max-w-4xl mx-auto text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative p-16 md:p-24 bg-white border border-dark/[0.04] shadow-2xl rounded-[60px] overflow-hidden group"
           >
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-transparent via-leather to-transparent opacity-50" />
              <Compass className="text-leather mx-auto mb-10 transition-transform duration-1000 group-hover:rotate-180" size={48} />
              <h3 className="text-4xl font-serif text-dark mb-8">Pioneering the Future</h3>
              <p className="text-dark/60 text-lg leading-relaxed font-medium max-w-2xl mx-auto">
                With a footprint across global leather markets and a commitment to carbon-neutral manufacturing, BBK Group remains at the forefront of industrial legacy.
              </p>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};const ListView = ({ items, sectionId, onSelect }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filtered = items.filter(item => {
    const searchLower = search.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchLower) || (item.brand && item.brand.toLowerCase().includes(searchLower));
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-48 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
       <div className="space-y-12 mb-24">
         <div className="space-y-4">
           <div className="flex items-center gap-4">
             <span className="h-px w-12 bg-leather" />
             <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-leather leading-none">{sectionId} Catalog</h4>
           </div>
           <h2 className="text-5xl md:text-8xl font-serif text-dark tracking-tighter leading-[1.1]">Curated Excellence</h2>
         </div>

         <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-between">
           <div className="relative group w-full md:w-auto">
             <input 
               type="text" 
               placeholder="Search Articles..."
               className="bg-white border border-dark/5 px-8 pl-14 py-4 rounded-full text-xs font-bold focus:outline-none focus:border-leather focus:ring-4 focus:ring-leather/5 transition-all w-full md:w-[400px] shadow-sm"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
             <Compass className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-leather transition-colors" size={16} />
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setCategory(cat)}
                 className={`px-8 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
                   category === cat 
                   ? 'bg-leather text-white border-leather shadow-leather/20' 
                   : 'bg-white text-dark/40 border-dark/5 hover:border-leather/30 hover:text-dark'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
         </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         <AnimatePresence mode="popLayout">
           {filtered.map((item, idx) => (
             <motion.div 
               layout
               key={item.name} 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               whileHover={{ y: -10 }}
               onClick={() => onSelect(item)} 
               className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-dark/[0.03] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-stretch"
             >
               <div className="aspect-square overflow-hidden relative">
                  <img src={item.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={item.name} />
                  <div className="absolute top-6 left-6">
                     <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#8B6F47] shadow-sm">
                       {item.category}
                     </span>
                  </div>
               </div>
               <div className="p-8 space-y-4 text-left">
                  <div className="space-y-1">
                    <h4 className="text-xl font-serif text-dark group-hover:text-leather transition-colors">{item.brand}</h4>
                    <p className="text-[10px] text-dark/40 font-bold uppercase tracking-[0.2em] leading-relaxed line-clamp-1">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-leather pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    Explore Detail <ArrowRight size={10} />
                  </div>
               </div>
             </motion.div>
           ))}
         </AnimatePresence>
       </div>

       {filtered.length === 0 && (
         <div className="py-48 text-center space-y-6">
           <div className="w-24 h-24 bg-dark/5 rounded-full flex items-center justify-center mx-auto">
             <Box className="text-dark/20" size={40} />
           </div>
           <h3 className="text-2xl font-serif text-dark/40">No articles match your selection</h3>
           <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-leather text-[10px] font-black uppercase tracking-widest underline underline-offset-8">Clear filters</button>
         </div>
       )}
    </div>
  );
};

const ContactView = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16 pb-48">
    {/* Re-using the Advanced Contact Experience locally */}
    <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <span className="h-px w-12 bg-leather" />
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] text-leather">Collaboration</span>
                </motion.div>
                <h2 className="text-6xl md:text-8xl font-serif text-dark leading-[0.9] tracking-tighter">
                  Let's create the <br/>
                  <span className="text-leather italic relative inline-block">
                    future of leather
                  </span>.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F1E8] shadow-sm flex items-center justify-center text-leather group-hover:bg-leather group-hover:text-white transition-all duration-500">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Direct Line</h4>
                    <p className="text-xl font-medium text-dark tracking-tight">+91 (44) 6745 8000</p>
                  </div>
                </div>
                <div className="space-y-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F1E8] shadow-sm flex items-center justify-center text-leather group-hover:bg-leather group-hover:text-white transition-all duration-500">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Global Inquiries</h4>
                    <p className="text-xl font-medium text-dark tracking-tight underline underline-offset-8 decoration-leather/30">contact@bbkgroup.in</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-dark/5 space-y-8">
                <h4 className="text-[10px] uppercase tracking-widest text-dark/30 font-bold">Connect with us</h4>
                <div className="flex gap-6">
                  {['LinkedIn', 'Instagram', 'WhatsApp'].map(social => (
                    <button key={social} className="text-[10px] uppercase tracking-widest font-black text-dark/60 hover:text-leather transition-colors pb-1 border-b border-transparent hover:border-leather">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#F5F1E8]/30 p-12 md:p-20 rounded-[64px] border border-dark/[0.03] space-y-12 relative"
            >
              <div className="space-y-2">
                <h3 className="text-3xl font-serif text-leather">Send an Inquiry</h3>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-8"
                >
                  <div className="w-20 h-20 bg-leather/10 rounded-full flex items-center justify-center mx-auto text-leather">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif text-dark leading-tight">Your application is <br/><span className="text-leather italic">submitted successfully</span></h3>
                    <p className="text-sm text-dark/40 font-medium max-w-xs mx-auto">Thank you for reaching out. Our partnerships team will contact you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-leather border-b border-leather pb-1"
                  >
                    Send Another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3 pt-4 border-t border-dark/20">
                      <label className="text-[9px] uppercase tracking-widest text-leather font-black block">First Name</label>
                      <input type="text" placeholder="First Name" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                    </div>
                    <div className="space-y-3 pt-4 border-t border-dark/20">
                      <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Last Name</label>
                      <input type="text" placeholder="Last Name" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Work Email</label>
                    <input type="email" placeholder="email@address.com" className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent text-lg" required />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20 relative">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Department</label>
                    <select className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark bg-transparent appearance-none cursor-pointer text-lg">
                      <option>Sales & Partnerships</option>
                      <option>Production Division</option>
                      <option>Careers</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dark/20">
                    <label className="text-[9px] uppercase tracking-widest text-leather font-black block">Your Inquiry</label>
                    <textarea rows={4} placeholder="Your message..." className="w-full py-3 focus:outline-none focus:border-leather font-semibold text-dark placeholder:text-dark/60 bg-transparent resize-none text-lg" required></textarea>
                  </div>

                  <button type="submit" className="w-full bg-dark text-white py-8 rounded-3xl text-[11px] uppercase tracking-[0.5em] font-black hover:bg-leather transition-all shadow-xl shadow-dark/10">
                    Initiate Discussion
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
    </section>

    {/* Location Section */}
    <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center space-y-4">
          <h3 className="text-5xl font-serif text-dark tracking-tighter">Global Hubs</h3>
          <p className="text-[10px] uppercase tracking-[1em] text-leather font-black">Centers of Manufacturing Excellence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {LOCATIONS.map((loc, idx) => (
            <div key={idx} className="flex flex-col group p-8 rounded-[48px] border border-dark/[0.03] hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
               <div className="h-64 bg-dark/5 mb-10 overflow-hidden rounded-[32px] border border-dark/5 transition-all duration-1000">
                  <iframe 
                    title={loc.unit}
                    src={loc.map}
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif text-dark group-hover:text-leather transition-colors">{loc.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-leather">{loc.unit}</p>
                  </div>
                  <p className="text-xs text-dark/60 leading-relaxed font-medium">{loc.address}</p>
                  <div className="pt-6 border-t border-dark/5">
                    <button className="text-[9px] uppercase tracking-widest font-black text-dark hover:text-leather transition-colors flex items-center gap-2">
                      Get Directions <ArrowRight size={10} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
    </div>
  </motion.div>
  );
};

const ProductDetailView = ({ product, onBack, onHome }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="min-h-screen relative flex flex-col px-6 md:px-12 py-32 max-w-7xl mx-auto"
  >
    <div className="flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
         <div className="space-y-12">
            <div className="flex items-center h-4">
              <button onClick={onBack} className="text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-3 hover:text-leather transition-all group">
                <ArrowRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
              </button>
            </div>
            <div className="max-w-xl w-full aspect-[3/4] lg:max-h-[70vh] bg-dark/5 overflow-hidden shadow-2xl border border-dark/5 rounded-3xl">
               <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
            </div>
         </div>
         <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-leather uppercase tracking-[0.6em] text-[10px] font-bold">{product.brand || product.category}</p>
              <h2 className="text-5xl md:text-7xl font-serif text-dark leading-tight">{product.name || product.brand}</h2>
            </div>
            
            <p className="text-xl text-dark/70 font-medium leading-relaxed border-l-2 border-leather pl-8">
              {product.desc || "A masterpiece of the BBK Group heritage. This item represents our dedication to precision crafting, using the finest raw materials and sustainable manufacturing techniques."}
            </p>

            {/* Technical Specs for Leather */}
            {product.durability && (
              <div className="grid grid-cols-2 gap-10 py-12 border-y border-dark/5">
                {[
                  { label: "Texture", value: product.texture, icon: <Layers size={14} /> },
                  { label: "Durability", value: product.durability, icon: <ShieldCheck size={14} /> },
                  { label: "Price Level", value: product.price, icon: <Package size={14} /> },
                  { label: "Characteristics", value: product.characteristics, icon: <Settings size={14} /> }
                ].map((spec, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2 text-leather">
                      {spec.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest">{spec.label}</span>
                    </div>
                    <p className="text-sm font-bold text-dark">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}

            <button className="w-full md:w-auto bg-black text-white px-24 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-leather transition-all shadow-xl shadow-black/10">
              Inquire Portfolio
            </button>
         </div>
      </div>
    </div>
  </motion.div>
);

export default App;
