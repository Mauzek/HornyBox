const BASE_URL = "https://683af66643bb370a8674494c.mockapi.io";
const API_URL = "https://hornybox.ru/api";

const endpoints = {
  getAssets: `${BASE_URL}/assets`,
  getCurrency: (amount: number, rate: number = 0.115) =>
    `${API_URL}/currency?amount=${amount}&rate=${rate}`,
};

export { endpoints };
