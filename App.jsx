import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Shield,
  Sparkles,
  Zap,
  Star,
  Check,
  ChevronDown,
  Menu,
  X,
  Github,
  Send,
  Globe,
  ArrowRight,
  Download,
  Smartphone,
} from 'lucide-react';

// ============ ANIMATED COUNTERS (single effect for all) ============
function useCountUpMultiple(targets, duration, start) {
  const [counts, setCounts] = useState(targets.map(() => 0));
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCounts(targets.map((end) => Math.floor(progress * end)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, duration]);
  return counts;
}

// ============ MAIN APP ============
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const statsRef = useRef(null);
  const sectionRefs = useRef({});

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Stats visibility for counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setStatsVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5, suffix: 'K+', label: 'Читателей' },
    { value: 1, suffix: 'K+', label: 'Тайтлов' },
    { value: 99, suffix: '%', label: 'Довольных' },
    { value: 24, suffix: '/7', label: 'Поддержка' },
  ];

  const counters = useCountUpMultiple(stats.map((s) => s.value), 2000, statsVisible);

  const features = [
    { icon: BookOpen, title: 'Огромная библиотека', desc: 'Сотни манги 18+ в одном месте с ежемесячными обновлениями.' },
    { icon: Shield, title: 'Приватность', desc: 'Шифрование и анонимный доступ. Ваши данные под защитой.' },
    { icon: Sparkles, title: 'HD качество', desc: 'Читайте в максимальном разрешении на любом устройстве.' },
    { icon: Zap, title: 'Мгновенная загрузка', desc: 'Быстрый CDN и оптимизация — без лагов и ожидания.' },
  ];

  const steps = [
    { icon: Download, title: 'Скачайте приложение', desc: 'Установите из RuStore или загрузите APK-файл на устройство.' },
    { icon: Sparkles, title: 'Откройте и войдите', desc: 'Запустите приложение и при необходимости подтвердите возраст.' },
    { icon: Zap, title: 'Читайте', desc: 'Полный доступ к библиотеке на всех устройствах.' },
  ];

  const testimonials = [
    { quote: 'Cпасибо, только админ понимает что я хочу после 12 часовой смены на заводе.', name: 'Sandal', role: 'Пивной скуф', initials: 'ПВ', color: 'from-violet-500 to-purple-600' },
    { quote: 'Немного надо поработать над интерфейсом. У этого приложения есть будущее, удачи в развитии! Разработчику здоровья!', name: 'Fiki', role: 'Читатель RuStor', initials: 'Fi', color: 'from-pink-500 to-rose-600' },
    { quote: 'Само приложение конечное кривое, не всё манги показывает, но это только начальная версия.', name: 'Магомед', role: 'Читатель RuStor', initials: 'МД', color: 'from-fuchsia-500 to-pink-600' },
  ];

  const RUSTORE_APP_URL = 'https://www.rustore.ru/catalog/app/com.example.anp';
  const APK_DOWNLOAD_URL = '/Shotacon1.5.apk';

  const faqs = [
    { q: 'Безопасно ли приложение?', a: 'Да, приложение не собирает ваших данных и не просит сомнительных разрешений.' },
    { q: 'Платное ли приложение?', a: 'Нет, приложение полностью бесплатное.' },
    { q: 'Какие устройства поддерживаются?', a: 'На данный момент идет проддержка только устройств Android.' },
    { q: 'Как часто добавляется контент?', a: 'Ежемесячно. Новые главы и тайтлы появляются по мере выхода и перевода.' },
    { q: 'Безопасны ли мои данные?', a: 'Да, ваши данные защищены шифрованием совместно с FireBase и Cloudflare.' },
    { q: 'Работает ли в других странах?', a: 'Сервис доступен глобально. Контент может отличаться по регионам согласно лицензиям.' },
  ];

  const navLinks = [
    { label: 'Возможности', href: '#features' },
    { label: 'Как начать', href: '#how' },
    { label: 'Скачать', href: '#download' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-up-1 { animation: fadeInUp 0.8s ease-out 0.1s forwards; opacity: 0; }
        .animate-fade-in-up-2 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up-3 { animation: fadeInUp 0.8s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-up-4 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .blob-float { animation: float 12s ease-in-out infinite; }
        .blob-float-2 { animation: float 15s ease-in-out infinite reverse; }
        .blob-pulse { animation: pulse-glow 6s ease-in-out infinite; }
        .grid-bg { animation: grid-pulse 8s ease-in-out infinite; }
        .section-enter { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .section-enter.visible { opacity: 1; transform: translateY(0); }
        .btn-glow:hover { box-shadow: 0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(236, 72, 153, 0.3); }
        .card-hover:hover { transform: scale(1.03) translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(168, 85, 247, 0.2); }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .accordion-content.open { max-height: 500px; }
        .chevron-open { transform: rotate(180deg); }
      `}</style>

      {/* ============ NAVBAR ============ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? 'bg-[#08080f]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              MangaVerse
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-6 pt-2 border-t border-white/10 bg-[#08080f]/95 backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-white/90 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold"
            >
              Скачать
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 grid-bg opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/20 blob-float blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/20 blob-float-2 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-fuchsia-500/10 blob-pulse blur-3xl" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Манга 18+
              </span>
              <br />
              <span className="text-white">без границ</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up-2">
              Премиум библиотека взрослой манги. Тысячи тайтлов, HD качество, офлайн и полная приватность.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-3">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-transform btn-glow min-h-[48px]"
              >
                Скачать приложение
                <Download className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors min-h-[48px]"
              >
                Узнать больше
              </a>
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" className="py-24 px-4 sm:px-6" ref={(el) => (sectionRefs.current['features'] = el)}>
          <div className={`section-enter ${visibleSections['features'] ? 'visible' : ''} max-w-6xl mx-auto`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
              Всё для комфортного чтения
            </h2>
            <p className="mt-4 text-center text-white/60 max-w-2xl mx-auto">
              Современная платформа с фокусом на приватность и качество.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-hover transition-all duration-300 rounded-2xl p-6 border border-white/10 bg-[rgba(20,15,35,0.6)] backdrop-blur-sm"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
                    <feature.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="py-24 px-4 sm:px-6 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div ref={statsRef} className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {counters[i]}
                  {stat.suffix}
                </div>
                <div className="mt-2 text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="py-24 px-4 sm:px-6" ref={(el) => (sectionRefs.current['how'] = el)}>
          <div className={`section-enter ${visibleSections['how'] ? 'visible' : ''} max-w-4xl mx-auto`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">Как это работает</h2>
            <p className="mt-4 text-center text-white/60">Три простых шага до первой главы</p>
            <div className="mt-16 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-4">
              {steps.map((step, i) => (
                <div key={step.title} className="flex-1 flex flex-col items-center text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30 relative z-10">
                    {i + 1}
                  </div>
                  {i > 0 && (
                    <div className="hidden lg:block absolute top-7 left-0 w-[50%] h-0.5 bg-gradient-to-r from-transparent to-violet-500/50 -z-[1]" />
                  )}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-1/2 w-[50%] h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -z-[1]" />
                  )}
                  <div className="mt-6 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto">
                    <step.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-white/60 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section id="testimonials" className="py-24 px-4 sm:px-6 overflow-hidden" ref={(el) => (sectionRefs.current['testimonials'] = el)}>
          <div className={`section-enter ${visibleSections['testimonials'] ? 'visible' : ''} max-w-6xl mx-auto`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">Отзывы читателей</h2>
            <p className="mt-4 text-center text-white/60">Присоединяйтесь к тысячам довольных пользователей</p>
            <div className="mt-16 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-shrink-0 w-[320px] sm:w-[360px] snap-center rounded-2xl p-6 border border-white/10 bg-[rgba(20,15,35,0.6)] backdrop-blur-sm card-hover"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((_) => (
                      <Star key={_} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/90 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-white/60">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DOWNLOAD ============ */}
        <section id="download" className="py-24 px-4 sm:px-6" ref={(el) => (sectionRefs.current['download'] = el)}>
          <div className={`section-enter ${visibleSections['download'] ? 'visible' : ''} max-w-2xl mx-auto text-center`}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center mx-auto">
              <Smartphone className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">Скачать приложение</h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Установите MangaVerse на Android: через официальный магазин RuStore — удобно и с автообновлениями, или скачайте APK-файл и установите вручную.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={RUSTORE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-transform btn-glow min-h-[48px] w-full sm:w-auto"
              >
                Скачать в RuStore
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={APK_DOWNLOAD_URL}
                download="Shotacon1.5.apk"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/90 font-semibold hover:bg-white/5 hover:border-white/30 transition-all min-h-[48px] w-full sm:w-auto"
              >
                Скачать APK
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="py-24 px-4 sm:px-6" ref={(el) => (sectionRefs.current['faq'] = el)}>
          <div className={`section-enter ${visibleSections['faq'] ? 'visible' : ''} max-w-4xl mx-auto`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">Частые вопросы</h2>
            <p className="mt-4 text-center text-white/60">Ответы на популярные вопросы</p>
            <div className="mt-16 grid md:grid-cols-2 gap-4 items-start">
              {faqs.map((item, i) => {
                const isOpen = faqOpen === i;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-[rgba(20,15,35,0.5)] overflow-hidden flex flex-col"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFaqOpen(isOpen ? null : i);
                      }}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors min-h-[56px]"
                    >
                      {item.q}
                      <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${isOpen ? 'chevron-open' : ''}`} />
                    </button>
                    <div className={`accordion-content ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                      <p className="px-5 pb-4 text-white/60 text-sm">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section id="cta" className="py-24 px-4 sm:px-6" ref={(el) => (sectionRefs.current['cta'] = el)}>
          <div className={`section-enter ${visibleSections['cta'] ? 'visible' : ''} max-w-4xl mx-auto relative rounded-3xl overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="relative z-10 py-16 px-6 sm:px-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Готовы начать?</h2>
              <p className="mt-4 text-white/90 max-w-xl mx-auto">Подпишитесь на новостной Telegram-канал — анонсы обновлений, новости приложения и полезные материалы.</p>
              <a
                href="https://t.me/ShotaconApp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-600 font-bold hover:scale-105 transition-transform min-h-[48px]"
              >
                Подписаться в Telegram
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="py-16 px-4 sm:px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
              <div className="max-w-xs">
                <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  MangaVerse
                </a>
                <p className="mt-4 text-white/60 text-sm">
                  Премиум платформа для взрослой манги. Приватность, качество и огромная библиотека.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="https://github.com/igroman33igrok" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                  <a href="https://t.me/shotacon228" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Telegram"><Send className="w-5 h-5" /></a>
                  <a href="https://xn--d1ah4a.com/@shotacon" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Итд.com"><Globe className="w-5 h-5" /></a>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-white mb-4">Продукт</h4>
                  <ul className="space-y-3">
                    <li><a href="#features" className="text-white/60 hover:text-white text-sm">Возможности</a></li>
                    <li><a href="#download" className="text-white/60 hover:text-white text-sm">Скачать</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">Приложение</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Поддержка</h4>
                  <ul className="space-y-3">
                    <li><a href="#faq" className="text-white/60 hover:text-white text-sm">FAQ</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">Контакты</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">Помощь</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Правовое</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">Конфиденциальность</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">Условия</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-sm">18+</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
              © {new Date().getFullYear()} MangaVerse. Только для лиц старше 18 лет.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
