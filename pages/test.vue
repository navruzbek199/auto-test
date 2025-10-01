<template>
  <section class="max-w-5xl mx-auto p-6">
    <!-- Variantlar ro'yxati -->
    <div v-if="!currentVariant">
      <h2 class="text-2xl font-bold mb-4 text-white">Variantlar</h2>
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="variant in mockVariants"
          :key="variant.id"
          @click="selectVariant(variant)"
          class="py-3 rounded-xl shadow text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Variant {{ variant.id }}
        </button>
      </div>
    </div>

    <!-- Test boshlanganda -->
    <div v-else>
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <div class="text-sm bg-white p-2 rounded">
          Variant <span class="font-semibold">{{ currentVariant.id }}</span> —
          Savol <span class="font-semibold">{{ currentQuestionIndex + 1 }}</span
          >/<span class="font-semibold">{{ totalQuestions }}</span>
        </div>

        <div class="flex gap-4 items-center">
          <div
            class="text-sm font-mono bg-gray-100 px-3 py-1 rounded border border-blue-400"
          >
            {{ formattedTime }}
          </div>
          <button
            @click="finishTest()"
            class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Test tugatish
          </button>
        </div>
      </div>

      <!-- Savol -->
      <div v-if="currentQuestion" class="p-6 bg-white rounded-2xl shadow mb-6">
        <h2 class="mb-6 font-semibold">{{ currentQuestion.question }}</h2>
        <ul class="space-y-3">
          <li
            v-for="(opt, i) in currentQuestion.options"
            :key="i"
            role="button"
            @click="chooseAnswer(currentQuestion.id, i)"
            class="p-3 border rounded cursor-pointer transition select-none"
            :class="optionClass(currentQuestion, i)"
          >
            <span class="font-bold mr-3">F{{ i + 1 }}.</span>
            {{ opt }}
          </li>
        </ul>
      </div>

      <!-- Pagination (1..25 savollar) -->
      <div class="grid grid-cols-10 gap-2">
        <button
          v-for="(q, idx) in currentVariant.questions"
          :key="q.id"
          @click="goToQuestion(idx)"
          class="py-2 rounded border text-sm font-semibold"
          :class="paginationClass(q, idx)"
        >
          {{ idx + 1 }}
        </button>
      </div>
    </div>

    <!-- Natija modal -->
    <div
      v-if="showResult"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-2xl font-bold mb-2">Natija</h3>
        <p class="mb-2">To‘g‘ri javoblar: {{ score }} / {{ totalQuestions }}</p>
        <p class="mb-6">Foiz: {{ percentage }}%</p>

        <div class="flex justify-end gap-3">
          <button
            @click="backToVariants"
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Ortga
          </button>
          <button
            @click="restartSameVariant"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Qayta boshlash
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="timeUpModal"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg w-[400px] p-6 text-center">
        <h2 class="text-xl font-bold mb-4">⏰ Vaqtingiz tugadi!</h2>

        <p class="mb-4 text-lg">
          Sizning natijangiz:
          <span class="font-bold">{{ score }} / {{ totalQuestions }}</span>
          ({{ percentage }}%)
        </p>

        <button
          @click="backToVariants"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Variantlarga qaytish
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

type Variant = {
  id: number;
  questions: Question[];
};

const sampleQuestions = [
  {
    q: "Qaysi belgida to‘xtash taqiqlanadi?",
    opts: [
      "To‘xtash va turish taqiqlangan",
      "Piyodalar o‘tish joyi",
      "Parkovka joyi",
      "Yonilg‘i quyish shoxobchasi",
    ],
    correct: 0,
  },
  {
    q: "Svetofor qizil yonib turganda haydovchi nima qilishi kerak?",
    opts: [
      "To‘xtashi kerak",
      "Tezlikni oshirib o‘tib ketishi kerak",
      "Sariq signalni kutishi kerak",
      "Yo‘lning holatiga qarab harakatlanishi mumkin",
    ],
    correct: 0,
  },
  {
    q: "Qaysi holatda chapga burilish mumkin?",
    opts: [
      "Faqat yashil chiroqda",
      "Yashil yoki chapga burilish strelkasi yoqqanda",
      "Har doim to‘xtamasdan",
      "Svetofor ishlamaganida",
    ],
    correct: 1,
  },
  {
    q: "Haydovchi svetofor ishlamagan joyda qanday harakatlanishi kerak?",
    opts: [
      "Yo‘l belgilariga amal qilish",
      "Harakatlanmasligi kerak",
      "O‘z xohishiga ko‘ra yurishi mumkin",
      "Tezlikni oshirish kerak",
    ],
    correct: 0,
  },
  {
    q: "Agar oldindan «To‘xtash taqiqlangan» belgisi bo‘lsa, qayerda to‘xtash mumkin?",
    opts: [
      "Belgidan keyin 15 metr uzoqlikda",
      "Belgidan oldin 15 metr uzoqlikda",
      "Istalgan joyda",
      "Faqat chorrahada",
    ],
    correct: 1,
  },
];

const mockVariants: Variant[] = Array.from({ length: 20 }, (_, vIndex) => ({
  id: vIndex + 1,
  questions: Array.from({ length: 25 }, (_, qIndex) => {
    // sampleQuestions ichidan aylantirib olish
    const template = sampleQuestions[qIndex % sampleQuestions.length];
    return {
      id: (vIndex + 1) * 1000 + qIndex + 1,
      question: `Savol ${qIndex + 1}: ${template.q}`,
      options: template.opts,
      correct: template.correct,
    };
  }),
}));

/* State */
const currentVariant = ref<Variant | null>(null);
const currentQuestionIndex = ref(0);
const selectedAnswers = ref<Record<number, number | null>>({});
const showResult = ref(false);
const timeUpModal = ref(false);

/* Timer (25 min) */
const TOTAL_SECONDS = 25 * 60;
const timeLeft = ref(TOTAL_SECONDS);
let timerId: number | null = null;

function startTimer() {
  stopTimer();
  timeLeft.value = TOTAL_SECONDS;
  timerId = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      finishTest();
    }
  }, 1000);
}
function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}
onBeforeUnmount(() => stopTimer());

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
});

/* Computeds */
const totalQuestions = computed(() =>
  currentVariant.value ? currentVariant.value.questions.length : 25
);
const currentQuestion = computed(
  () => currentVariant.value?.questions[currentQuestionIndex.value] ?? null
);

const score = computed(() => {
  if (!currentVariant.value) return 0;
  let s = 0;
  for (const q of currentVariant.value.questions) {
    if (selectedAnswers.value[q.id] === q.correct) s++;
  }
  return s;
});
const percentage = computed(() =>
  Math.round((score.value / totalQuestions.value) * 100)
);

/* Actions */
function selectVariant(variant: Variant) {
  currentVariant.value = variant;
  currentQuestionIndex.value = 0;
  selectedAnswers.value = {};
  showResult.value = false;
  startTimer();
}

function restartSameVariant() {
  if (!currentVariant.value) return;
  selectedAnswers.value = {};
  currentQuestionIndex.value = 0;
  showResult.value = false;
  timeLeft.value = TOTAL_SECONDS;
  startTimer();
}

function chooseAnswer(questionId: number, optionIndex: number) {
  if (showResult.value) return;

  if (selectedAnswers.value[questionId] !== undefined) return;

  selectedAnswers.value = {
    ...selectedAnswers.value,
    [questionId]: optionIndex,
  };
}
function optionClass(q: Question, i: number) {
  const sel = selectedAnswers.value[q.id];
  if (sel == null) return "hover:bg-gray-50 border-gray-200";
  if (sel === i) {
    if (i === q.correct) return "bg-green-100 border-green-400 border";
    else return "bg-red-100 border-red-400 border";
  }
  return "border-gray-200 bg-white opacity-80";
}
function goToQuestion(idx: number) {
  currentQuestionIndex.value = idx;
}
function paginationClass(q: Question, idx: number) {
  const sel = selectedAnswers.value[q.id];
  if (idx === currentQuestionIndex.value) {
    return "bg-blue-500 text-white border-blue-600";
  }
  if (sel != null) {
    return "bg-gray-300 border-gray-400";
  }
  return "bg-white border-gray-200 hover:bg-gray-50";
}
function finishTest(timeUp = false) {
  if (showResult.value) return;
  stopTimer();
  if (timeUp) {
    timeUpModal.value = true;
  } else {
    showResult.value = true;
  }
}
function backToVariants() {
  stopTimer();
  currentVariant.value = null;
  currentQuestionIndex.value = 0;
  selectedAnswers.value = {};
  showResult.value = false;
  timeUpModal.value = false;
}
// startTimer();
</script>
