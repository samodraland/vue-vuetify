import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import ErrorHandler from "@/components/ErrorHandler.vue"
import networkErrorIcon from "@/assets/network-error.svg"

const assetUrl = (assetFile: string) => new URL(`../../assets/${assetFile}`, import.meta.url).href

function wrapperSetup(message: string, icon: string){
  const wrapper = mount(ErrorHandler, {
      props: {
        message: message,
        icon: icon
      },
      global: {
        stubs: {
          VImg: {
            template: "<img :src='src' />",
            props: ["src"],
          },
        },
      },
    })
  return wrapper
}

describe("ErrorHandler component", ()=>{

  it("Renders network error icon when error message is 'Network Error'", ()=>{
    const wrapper = wrapperSetup("Network Error","network-error.svg")

    const img = wrapper.find("img")
    expect(img.exists()).toBe(true)
    expect(img.attributes("src")).toBe(networkErrorIcon)
    expect(wrapper.text()).toContain("Network Error")
  })

  it("Renders other error when error message is not 'Network Error'", ()=>{
    const wrapper = wrapperSetup("Other error","error.svg")

    const img = wrapper.find("img")
    expect(img.exists()).toBe(true)
    expect(img.attributes("src")).toBe(assetUrl("error.svg"))
    expect(wrapper.text()).toContain("Other error")
  })
})
