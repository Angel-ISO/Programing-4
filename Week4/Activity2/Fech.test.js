const axios = require("axios");
const { getShowMoreButton } = require("./Fetch.js");

jest.mock("axios");

describe("getShowMoreButton con axios", () => {
  it("lo devuelve todo si es corta", async () => {
    const shortFact = "In the 1750s, Europeans introduced cats into the Americas to control pests.";
    axios.get.mockResolvedValueOnce({
      data: { fact: shortFact, length: shortFact.length },
    });

    const result = await getShowMoreButton();
    expect(result).toBe(shortFact);
  });

  it("si agrega el botón Show more", async () => {
    const longFact =
      "The average lifespan of an outdoor-only (feral and non-feral) is about 3 years; an indoor-only cat can live 16 years and longer. Some cats have been documented to have a longevity of 34 years.";
    axios.get.mockResolvedValueOnce({
      data: { fact: longFact, length: longFact.length },
    });

    const result = await getShowMoreButton();
    expect(result).toBe(longFact.slice(0, 100) + "...Show more");
  });
});