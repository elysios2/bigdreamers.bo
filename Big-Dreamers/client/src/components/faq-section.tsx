import { faqs } from "@/mockdata/advice-mentoring";
import { ChevronDown } from "lucide-react";
import { AdviceMentoringSection } from "@/types/advice-mentoring-section";

export default function FaqSection({
  openFaq,
  setOpenFaq,
}: AdviceMentoringSection) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <button
                onClick={() =>
                  setOpenFaq(`faq-${index}` === openFaq ? null : `faq-${index}`)
                }
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform flex-shrink-0 ml-4 ${openFaq === `faq-${index}` ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openFaq === `faq-${index}` && (
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
