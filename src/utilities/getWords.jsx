import { faker } from '@faker-js/faker';

export default function getWords(count = 10) {
  return Array.from({ length: count }, () => faker.word.sample()).join(" ");
}
