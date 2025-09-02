const axios = require("axios");

async function getCatFacts() {
  const response = await axios.get("https://catfact.ninja/fact");
  return response.data;
}

async function getShowMoreButton() {
  const catFact = await getCatFacts();

  if (catFact.length > 100) {
    return catFact.fact.slice(0, 100).concat("...Show more");
  }

  return catFact.fact;
}

module.exports = { getShowMoreButton };
