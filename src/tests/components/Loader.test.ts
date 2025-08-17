import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import Loader from "@/components/Loader.vue"

describe("Skeleton loader component",()=>{

  it("Renders 10 skeleton loaders", () => {
    const wrapper = mount(Loader, {
      global: { stubs: ["v-skeleton-loader"] }
    })
    const loaders = wrapper.findAllComponents("v-skeleton-loader-stub")
    expect(loaders.length).toBe(10)
  })

})
