import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import MovieListComponent from "@/components/MovieList.vue";
import Loader from "@/components/Loader.vue";
import ErrorHandler from "@/components/ErrorHandler.vue";
import { ref } from "vue";

const storeMock = {
  moviesData: ref(null),
  isLoading: ref(true),
  error: ref(false),
  errorMessage: ref(""),
  fetchData: vi.fn(),
  loadFavorites: vi.fn(),
};

vi.mock("@/stores/app", () => ({
  useAppStore: () => storeMock,
}));

function setupPinia(){
  const pinia = createPinia();
  setActivePinia(pinia);
  return pinia
}

describe("MovieList component", () => {
  beforeEach(()=>{
    storeMock.moviesData.value = null;
    storeMock.isLoading.value = false;
    storeMock.error.value = false;
    storeMock.errorMessage.value = "";
  })
  it("Shows Loader when loading", async () => {
    storeMock.isLoading.value = true;
    const pinia = setupPinia()
    const wrapper = mount(MovieListComponent, {
      global: {
        plugins: [pinia],
        components: { Loader }
      },
      props: {
        searchBy: "Title",
        keyword: "The Avengers"
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });

  it("Sets error to show ErrorHandler", ()=>{
    storeMock.error.value = true;
    storeMock.isLoading.value = false;
    storeMock.errorMessage.value = "Error fetching movies";
    const pinia = setupPinia()
    const wrapper = mount(MovieListComponent, {
      global: {
        plugins: [pinia],
        components: { ErrorHandler }
      }
    });
    const error = wrapper.findComponent(ErrorHandler);
    expect(error.exists()).toBe(true);
    expect(error.props("message")).toBe("Error fetching movies");
  })

  it("Shows No Data message when movies are not found", async () => {
    storeMock.moviesData.value = { data: [], total_pages: 0 };
    storeMock.error.value = false;
    storeMock.isLoading.value = false;

    const pinia = setupPinia()

    const wrapper = mount(MovieListComponent, {
      global: {
        plugins: [pinia],
        components: { ErrorHandler }
      }
    });

    const errorComp = wrapper.findComponent(ErrorHandler);
    expect(errorComp.exists()).toBe(true);
    expect(errorComp.props("message")).toBe("Can't find any data");
  });
});
