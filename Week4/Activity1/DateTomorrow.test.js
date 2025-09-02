const { isDateTomorrowYesterdayFutureOrPast } = require("./DateTomorrow");

describe("isDateTomorrowYesterdayFutureOrPast - laboratorio", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 3, 12));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Prueba 1: new Date(2022, 3, 11) → 'Yesterday'", () => {
    const date = new Date(2022, 3, 11);
    expect(isDateTomorrowYesterdayFutureOrPast(date)).toBe("Yesterday");
  });

  it("Prueba 2: new Date(2022, 3, 13) → 'Tomorrow'", () => {
    const date = new Date(2022, 3, 13);
    expect(isDateTomorrowYesterdayFutureOrPast(date)).toBe("Tomorrow");
  });

  it("Prueba 3: new Date(2024, 3, 17) → 'Future'", () => {
    const date = new Date(2024, 3, 17);
    expect(isDateTomorrowYesterdayFutureOrPast(date)).toBe("Future");
  });

  it("Prueba 4: new Date(2020, 3, 10) → 'Past'", () => {
    const date = new Date(2020, 3, 10);
    expect(isDateTomorrowYesterdayFutureOrPast(date)).toBe("Past");
  });
});