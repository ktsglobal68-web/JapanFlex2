
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TourGrid from './components/TourGrid';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import { REVIEWS } from './constants';

const App: React.FC = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const showMoreReviews = () => {
    setVisibleReviews(prev => Math.min(prev + 9, REVIEWS.length));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <WhyUs />
          <TourGrid />
          <Process />

          {/* Reviews Section */}
          <section id="reviews" className="py-24 bg-slate-50/50 backdrop-blur-sm border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 font-luxury">
                  Hơn 5,000 khách hàng đã tin tưởng
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                  Sự hài lòng của bạn là thước đo thành công lớn nhất của SigFlex Japan.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {REVIEWS.slice(0, visibleReviews).map((r, i) => (
                  <figure key={i} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-yellow-500/20 transition-all duration-500 group">
                    <div>
                      <div className="flex text-yellow-500 mb-4">
                        {[...Array(r.rating)].map((_, idx) => (
                          <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-slate-600 italic mb-8 leading-relaxed">
                        "{r.text}"
                      </blockquote>
                    </div>
                    <figcaption className="flex items-center space-x-4 border-t border-slate-50 pt-6">
                      <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-yellow-500/30 transition-all" />
                      <div>
                        <p className="font-bold text-slate-900">{r.name}</p>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{r.location}</p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {visibleReviews < REVIEWS.length && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={showMoreReviews}
                    className="bg-white border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-2xl font-bold hover:border-yellow-600 hover:text-yellow-700 transition-all shadow-sm"
                  >
                    Khám phá thêm {REVIEWS.length - visibleReviews} chia sẻ khác
                  </button>
                </div>
              )}
            </div>
          </section>

          <LeadForm />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </div>
  );
};

export default App;
