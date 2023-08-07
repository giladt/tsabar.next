import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const ICONS = [
  "MdPeople",
  "MdBed",
  "MdBalcony",
  "MdSmokeFree",
  "MdWifi",
  "MdDesk",
  "MdSoupKitchen",
  "MdBathtub",
  "MdLocalLaundryService"];

function createSeed() {
  return {
    "id": faker.number.int(),
    "url": faker.lorem.slug(2),
    "name": faker.location.street(),
    "info": faker.lorem.text(),
    "images": Array.from({
      length: faker.number.int(10),
    }).map((idx) => {
      return {
        "id": faker.image.urlLoremFlickr({width: 320, height: 320}),
        "description": faker.lorem.text(),
        "priority": idx === 0,
      }
    }),
    "bookings": {},
    "tags": Array.from({
      length: faker.number.int(8),
    }).map((idx) => {
      return {
        "icon": ICONS[Math.floor(Math.random() * ICONS.length)],
        "text": faker.lorem.words({min: 2,max: 5}),
      }
    }),
  }
}

function createSeeds() {
  const seeds = [];
  for (let count = 0; count <= 50; count++) {
    seeds.push(createSeed());
  }
  return seeds;
}

async function createSeedsFile() {
  await fs.writeFile("./src/assets/apartments.json", JSON.stringify(createSeeds()), "utf-8");
}

await createSeedsFile();