import { describe, it, expect, vi } from "vitest"
import { getMovies } from "@/services/movie" // adjust path
import api from "@/plugins/axios"
import type { MovieInterface } from "@/types/movie"

vi.mock("@/plugins/axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

describe("getMovies in movie service", () => {
  it("Calls API with default params", async () => {
    const mockData: MovieInterface = { data: [], total: 0 } as any
    (api.get as any).mockResolvedValueOnce({ data: mockData })

    const result = await getMovies()

    expect(api.get).toHaveBeenCalledWith("/search", { params: { page: 1 } })
    expect(result).toEqual(mockData)
  })

  it("Calls API with searchBy and keyword", async () => {
    const mockData: MovieInterface = { results: [], total: 10 } as any;
    (api.get as any).mockResolvedValueOnce({ data: mockData })

    const result = await getMovies("Title", "The Avengers", 2)

    expect(api.get).toHaveBeenCalledWith("/search", {
      params: { page: 2, Title: "The Avengers" },
    })
    expect(result).toEqual(mockData)
  })

  it("Throws with error message on failure", async () => {
    (api.get as any).mockRejectedValueOnce(new Error("Unknown error"))
    await expect(getMovies()).rejects.toThrow("Unknown error")
  })

})
