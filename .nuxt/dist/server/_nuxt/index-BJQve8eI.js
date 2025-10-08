import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { u as useRouter } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@vue/devtools-api";
import "axios";
import "vue-i18n";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container h-screen mx-auto flex flex-col items-center justify-center overflow-hidden w-full" }, _attrs))}><div class="flex flex-col justify-center gap-4 w-full max-w-sm"><button class="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition cursor-pointer">${ssrInterpolate(_ctx.$t("app.test"))}</button><button class="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition cursor-pointer">${ssrInterpolate(_ctx.$t("app.exam"))}</button></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BJQve8eI.js.map
