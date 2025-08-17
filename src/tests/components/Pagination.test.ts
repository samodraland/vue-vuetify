import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import Pagination from "@/components/Pagination.vue"
import { nextTick } from "vue"

const stubs: Array<string> = ["VPagination"]

function wrapperSetup(){
  const wrapper = mount(Pagination, {
    global:{stubs},
    props:{
      page: 1,
      totalPages: 3
    }
  })
  return wrapper
}

describe("Pagination component", ()=>{

  it("Checks pagination",()=>{
    const wrapper = wrapperSetup()
    expect(wrapper.props("page")).toBe(1)
    expect(wrapper.props("totalPages")).toBe(3)
  })

  it("Emits page change", async ()=>{
    const wrapper = wrapperSetup()
    const pagination = wrapper.findComponent({name: "v-pagination"})
    await pagination.vm.$emit("update:modelValue",3)
    await nextTick()
    expect(wrapper.emitted("update:page")).toBeTruthy()
    expect(wrapper.emitted("update:page")![0]).toEqual([3])
  })

})
