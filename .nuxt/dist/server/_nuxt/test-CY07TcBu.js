import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
const TOTAL_SECONDS = 25 * 60;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    const sampleQuestions = [
      {
        q: "Qaysi belgida to‘xtash taqiqlanadi?",
        opts: [
          "To‘xtash va turish taqiqlangan",
          "Piyodalar o‘tish joyi",
          "Parkovka joyi",
          "Yonilg‘i quyish shoxobchasi"
        ],
        correct: 0
      },
      {
        q: "Svetofor qizil yonib turganda haydovchi nima qilishi kerak?",
        opts: [
          "To‘xtashi kerak",
          "Tezlikni oshirib o‘tib ketishi kerak",
          "Sariq signalni kutishi kerak",
          "Yo‘lning holatiga qarab harakatlanishi mumkin"
        ],
        correct: 0
      },
      {
        q: "Qaysi holatda chapga burilish mumkin?",
        opts: [
          "Faqat yashil chiroqda",
          "Yashil yoki chapga burilish strelkasi yoqqanda",
          "Har doim to‘xtamasdan",
          "Svetofor ishlamaganida"
        ],
        correct: 1
      },
      {
        q: "Haydovchi svetofor ishlamagan joyda qanday harakatlanishi kerak?",
        opts: [
          "Yo‘l belgilariga amal qilish",
          "Harakatlanmasligi kerak",
          "O‘z xohishiga ko‘ra yurishi mumkin",
          "Tezlikni oshirish kerak"
        ],
        correct: 0
      },
      {
        q: "Agar oldindan «To‘xtash taqiqlangan» belgisi bo‘lsa, qayerda to‘xtash mumkin?",
        opts: [
          "Belgidan keyin 15 metr uzoqlikda",
          "Belgidan oldin 15 metr uzoqlikda",
          "Istalgan joyda",
          "Faqat chorrahada"
        ],
        correct: 1
      }
    ];
    const mockVariants = Array.from({ length: 20 }, (_, vIndex) => ({
      id: vIndex + 1,
      questions: Array.from({ length: 25 }, (_2, qIndex) => {
        const template = sampleQuestions[qIndex % sampleQuestions.length];
        return {
          id: (vIndex + 1) * 1e3 + qIndex + 1,
          question: `Savol ${qIndex + 1}: ${template.q}`,
          options: template.opts,
          correct: template.correct
        };
      })
    }));
    const currentVariant = ref(null);
    const currentQuestionIndex = ref(0);
    const selectedAnswers = ref({});
    const showResult = ref(false);
    const timeUpModal = ref(false);
    const timeLeft = ref(TOTAL_SECONDS);
    const formattedTime = computed(() => {
      const m = Math.floor(timeLeft.value / 60);
      const s = timeLeft.value % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    });
    const totalQuestions = computed(
      () => currentVariant.value ? currentVariant.value.questions.length : 25
    );
    const currentQuestion = computed(
      () => {
        var _a;
        return ((_a = currentVariant.value) == null ? void 0 : _a.questions[currentQuestionIndex.value]) ?? null;
      }
    );
    const score = computed(() => {
      if (!currentVariant.value) return 0;
      let s = 0;
      for (const q of currentVariant.value.questions) {
        if (selectedAnswers.value[q.id] === q.correct) s++;
      }
      return s;
    });
    const percentage = computed(
      () => Math.round(score.value / totalQuestions.value * 100)
    );
    function optionClass(q, i) {
      const sel = selectedAnswers.value[q.id];
      if (sel == null) return "hover:bg-gray-50 border-gray-200";
      if (sel === i) {
        if (i === q.correct) return "bg-green-100 border-green-400 border";
        else return "bg-red-100 border-red-400 border";
      }
      return "border-gray-200 bg-white opacity-80";
    }
    function paginationClass(q, idx) {
      const sel = selectedAnswers.value[q.id];
      if (idx === currentQuestionIndex.value) {
        return "bg-blue-500 text-white border-blue-600";
      }
      if (sel != null) {
        return "bg-gray-300 border-gray-400";
      }
      return "bg-white border-gray-200 hover:bg-gray-50";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto p-6" }, _attrs))}>`);
      if (!currentVariant.value) {
        _push(`<div><h2 class="text-2xl font-bold mb-4 text-white">Variantlar</h2><div class="grid grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(unref(mockVariants), (variant) => {
          _push(`<button class="py-3 rounded-xl shadow text-white bg-blue-600 hover:bg-blue-700 transition"> Variant ${ssrInterpolate(variant.id)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div><div class="flex justify-between items-center mb-4"><div class="text-sm bg-white p-2 rounded"> Variant <span class="font-semibold">${ssrInterpolate(currentVariant.value.id)}</span> — Savol <span class="font-semibold">${ssrInterpolate(currentQuestionIndex.value + 1)}</span>/<span class="font-semibold">${ssrInterpolate(totalQuestions.value)}</span></div><div class="flex gap-4 items-center"><div class="text-sm font-mono bg-gray-100 px-3 py-1 rounded border border-blue-400">${ssrInterpolate(formattedTime.value)}</div><button class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"> Test tugatish </button></div></div>`);
        if (currentQuestion.value) {
          _push(`<div class="p-6 bg-white rounded-2xl shadow mb-6"><h2 class="mb-6 font-semibold">${ssrInterpolate(currentQuestion.value.question)}</h2><ul class="space-y-3"><!--[-->`);
          ssrRenderList(currentQuestion.value.options, (opt, i) => {
            _push(`<li role="button" class="${ssrRenderClass([optionClass(currentQuestion.value, i), "p-3 border rounded cursor-pointer transition select-none"])}"><span class="font-bold mr-3">F${ssrInterpolate(i + 1)}.</span> ${ssrInterpolate(opt)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-10 gap-2"><!--[-->`);
        ssrRenderList(currentVariant.value.questions, (q, idx) => {
          _push(`<button class="${ssrRenderClass([paginationClass(q, idx), "py-2 rounded border text-sm font-semibold"])}">${ssrInterpolate(idx + 1)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      }
      if (showResult.value) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-2xl font-bold mb-2">Natija</h3><p class="mb-2">To‘g‘ri javoblar: ${ssrInterpolate(score.value)} / ${ssrInterpolate(totalQuestions.value)}</p><p class="mb-6">Foiz: ${ssrInterpolate(percentage.value)}%</p><div class="flex justify-end gap-3"><button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"> Ortga </button><button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"> Qayta boshlash </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (timeUpModal.value) {
        _push(`<div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"><div class="bg-white rounded-2xl shadow-lg w-[400px] p-6 text-center"><h2 class="text-xl font-bold mb-4">⏰ Vaqtingiz tugadi!</h2><p class="mb-4 text-lg"> Sizning natijangiz: <span class="font-bold">${ssrInterpolate(score.value)} / ${ssrInterpolate(totalQuestions.value)}</span> (${ssrInterpolate(percentage.value)}%) </p><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"> Variantlarga qaytish </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=test-CY07TcBu.js.map
