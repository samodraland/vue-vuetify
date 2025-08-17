import { mount, flushPromises } from "@vue/test-utils"
import { createRouter, createMemoryHistory } from "vue-router"
import { createPinia } from "pinia"
import { describe, it, expect } from "vitest"
import DefaultLayout from "@/layouts/default.vue"
import Home from "@/components/Home.vue"

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: Home }],
  })
}

describe("Default layout component", () => {
  it("renders <v-main> and Home inside <router-view>", async () => {
    const router = makeRouter()
    const pinia = createPinia()

    router.push("/")
    await router.isReady()

    const wrapper = mount(DefaultLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          "v-main": { template: "<main><slot /></main>" },
        },
      },
    })

    await flushPromises()
    expect(wrapper.find("main").exists()).toBe(true)
    expect(wrapper.findComponent(Home).exists()).toBe(true)
  })
})
