import { faker } from "@faker-js/faker";
import { GetContactsApiResponse } from "./getContactsApi.types";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function makeData(lens: number[], names: string[]) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]!;
    return range(len).map((d) => {
      const user = faker.helpers.shuffle(names)[0]!;
      return {
        id: d + 1,
        name: user,
        message: faker.lorem.text(),
        avatar: `/${user}.jpg`,
      };
    });
  };

  return makeDataLevel();
}

// ===> Method: GET
export const messagesMockGet: GetContactsApiResponse = {
  data: [
    {
      id: 1,
      avatar: "/Saman.jpg",
      name: "Saman",
      messages: makeData([2000], ["Amirhossein", "Saman"]),
    },
    {
      id: 2,
      avatar: "/Mohammadreza.jpg",
      name: "Mohammadreza",
      messages: makeData([2000], ["Amirhossein", "Mohammadreza"]),
    },
    {
      id: 3,
      avatar: "/Babak.jpg",
      name: "Babak",
      messages: makeData([2000], ["Amirhossein", "Babak"]),
    },
  ],
  error: null,
};

export const myData = {
  id: 4,
  avatar: "/Amirhossein.jpg",
  name: "Amirhossein",
};
