'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Xlinic nasıl çalışır?",
    answer: "Xlinic, yapay zeka teknolojisini kullanarak sağlık verilerinizi analiz eder. Test sonuçlarınızın fotoğrafını çekerek veya yükleyerek anında analiz alabilir, semptomlarınızı takip edebilir ve kişiselleştirilmiş sağlık önerileri alabilirsiniz."
  },
  {
    question: "Test sonuçlarımı nasıl analiz edebilirim?",
    answer: "Test sonuçlarınızın fotoğrafını çekmeniz veya PDF dosyasını yüklemeniz yeterli. Yapay zeka teknolojimiz sonuçları otomatik olarak analiz eder ve anlaşılır bir rapor hazırlar."
  },
  {
    question: "Verilerim güvende mi?",
    answer: "Evet, verilerinizin güvenliği bizim için çok önemli. En yüksek güvenlik standartlarını kullanıyor ve verilerinizi şifreleyerek saklıyoruz. Verileriniz sadece sizin izin verdiğiniz ölçüde kullanılır."
  },
  {
    question: "Cilt analizi nasıl yapılıyor?",
    answer: "Cilt analizini yapmak için cildinizin fotoğrafını çekmeniz yeterli. Yapay zeka teknolojimiz, cildinizin durumunu analiz eder ve kişiselleştirilmiş bakım önerileri sunar."
  },
  {
    question: "Kalori takibini nasıl yapabilirim?",
    answer: "Yemeklerinizin fotoğrafını çekerek kolayca kalori takibi yapabilirsiniz. Yapay zeka teknolojimiz yemeğinizi tanır ve besin değerlerini otomatik olarak hesaplar."
  },
  {
    question: "Uygulama ücretli mi?",
    answer: "Uygulamanın temel özellikleri ücretsizdir. Premium özellikler için aylık veya yıllık abonelik planlarımız bulunmaktadır."
  },
  {
    question: "Doktorumla sonuçları paylaşabilir miyim?",
    answer: "Evet, analiz sonuçlarınızı ve sağlık verilerinizi doktorunuzla kolayca paylaşabilirsiniz. PDF formatında detaylı raporlar oluşturabilir ve bunları istediğiniz kişilerle paylaşabilirsiniz."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Sıkça Sorulan Sorular
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Xlinic hakkında merak ettiğiniz her şey
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300">
            Başka sorularınız mı var?{' '}
            <a href="mailto:support@xlinic.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              Bize ulaşın
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 