import { createI18n } from "vue-i18n";
import uz from "@/i18n/uz.json";
import oz from "@/i18n/oz.json";
import ru from "@/i18n/ru.json";

const messages = {
  uz,
  oz,
  ru,
};
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "uz",
    fallbackLocale: "uz",
    messages,
  });
  vueApp.use(i18n);
});
