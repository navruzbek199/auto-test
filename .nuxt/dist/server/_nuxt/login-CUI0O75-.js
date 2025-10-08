import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel } from "vue/server-renderer";
import { useRouter } from "vue-router";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    useRouter();
    const showPassword = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex items-center justify-center" }, _attrs))}><form class="rounded-xl px-8 pt-6 pb-8 min-w-[400px]"><h2 class="text-2xl font-semibold mb-6 text-center text-[#27366E]"> Login </h2><div class="mb-4"><label class="block text-[#27366E] text-sm font-bold mb-2" for="username"> Username </label><input id="username"${ssrRenderAttr("value", username.value)} type="text" placeholder="Enter your username" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#27366E] focus:ring-2 focus:ring-[#27366E] focus:border-[#27366E] outline-none transition duration-200"></div><div class="mb-6 relative"><label class="block text-[#27366E] text-sm font-bold mb-2" for="password"> Password </label><input${ssrRenderAttr("type", showPassword.value ? "text" : "password")} id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)} placeholder="Enter your password" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#27366E] mb-3 leading-tight focus:ring-2 focus:ring-[#27366E] focus:border-[#27366E] outline-none transition duration-200"><button type="button" class="absolute right-3 top-9 text-gray-500 hover:text-[#27366E]">`);
      if (showPassword.value) {
        _push(`<span>🙈</span>`);
      } else {
        _push(`<span>👁️</span>`);
      }
      _push(`</button></div><div class="flex items-center justify-between"><button type="submit" class="bg-[#27366E] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Sign In </button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-CUI0O75-.js.map
