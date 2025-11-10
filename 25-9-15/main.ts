import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "https://opentdb.com/api.php?amount=50";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("----------- Beginne Seeden -----------");

  try {
    const tokenRes = await axios.get("https://opentdb.com/api_token.php?command=request");
    const token = tokenRes.data.token;
    console.log("Token:", token);

    let done = false;
    let total = 0;

    while (!done) {
      const res = await axios.get(`${BASE_URL}&token=${token}`);
      const data = res.data;

      if (data.response_code === 0 && data.results.length > 0) {
        for (const q of data.results) {
          const category = await prisma.category.upsert({
            where: { name: q.category },
            update: {},
            create: { name: q.category, opentdb_id: 0 },
          });

          const difficulty = await prisma.difficulty.upsert({
            where: { level: q.difficulty },
            update: {},
            create: { level: q.difficulty },
          });

          const type = await prisma.type.upsert({
            where: { type: q.type },
            update: {},
            create: { type: q.type },
          });

          const correct = await prisma.answer.create({
            data: { answer: q.correct_answer },
          });

          const incorrect = await Promise.all(
            q.incorrect_answers.map((a: string) =>
              prisma.answer.create({ data: { answer: a } })
            )
          );

          await prisma.question.create({
            data: {
              question: q.question,
              correct_answer: { connect: { id: correct.id } },
              incorrect_answers: { connect: incorrect.map((a) => ({ id: a.id })) },
              category: { connect: { id: category.id } },
              difficulty: { connect: { id: difficulty.id } },
              type: { connect: { id: type.id } },
            },
          });
        }

        total += data.results.length;
        console.log(`${data.results.length} Insgesamt ${total} Fragen`);
        console.log("5 Sekunden warten...");
        await wait(5000);
      } else if (data.response_code === 4) {
        console.log(`${data.results.length} ------------------------------------------\nAlles Fertig! \nInsgesamt ${total} Fragen`);
        done = true;
      } 
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
