import { faker } from "@faker-js/faker";

export default function getWords(count = 10) {
  return faker.lorem.words(count);
}
