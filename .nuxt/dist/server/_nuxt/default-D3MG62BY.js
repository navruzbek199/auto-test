import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as __nuxt_component_0 } from "./nuxt-link-BXxPlIRz.js";
import { useI18n } from "vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "ufo";
import "hookable";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@vue/devtools-api";
import "axios";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "userHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 shadow" }, _attrs))}><div class="container mx-auto flex justify-between items-center"><h1 class="text-lg font-bold">My App</h1><nav class="flex gap-4"><select${ssrRenderAttr("value", unref(locale))} class="bg-blue-500 text-white rounded px-2 py-1 cursor-pointer focus:outline-none"><option value="uz">Uzb</option><option value="ru">Рус</option><option value="oz">Ўзб</option></select>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "bg-white text-blue-600 font-semibold px-4 py-1 rounded-lg shadow hover:bg-gray-100 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("app.login"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("app.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/userHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)} data-v-02bb0c76><div class="min-h-screen user-layout" data-v-02bb0c76>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex-1 mx-auto p-6 pt-20 content" data-v-02bb0c76>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-02bb0c76"]]);
export {
  _default as default
};
//# sourceMappingURL=default-D3MG62BY.js.map
