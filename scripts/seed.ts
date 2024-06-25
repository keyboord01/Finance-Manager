import { config } from "dotenv";
import { subDays, eachDayOfInterval, format } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema";
import { convertAmmountToMiliunits } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2iGkzAIdZ3IvauMNlFLspn5V0rn";
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: null },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID, plaidId: null },
  { id: "category_4", name: "Income", userId: SEED_USER_ID, plaidId: null },
  { id: "category_5", name: "Savings", userId: SEED_USER_ID, plaidId: null },
  {
    id: "category_6",
    name: "Investments",
    userId: SEED_USER_ID,
    plaidId: null,
  },
  { id: "category_7", name: "Other", userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferSelect) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Utilities":
      return Math.random() * 200 + 30;
    case "Food":
      return Math.random() * 100 + 10;
    case "Income":
      return Math.random() * 500 + 100;
    case "Savings":
      return Math.random() * 500 + 100;
    case "Investments":
      return Math.random() * 500 + 100;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = Math.round(
      convertAmmountToMiliunits(isExpense ? -amount : amount)
    );

    console.log(`Generated transaction: 
      id: transaction_${format(day, "yyyy-MM-dd")}_${i}, 
      accountId: ${SEED_ACCOUNTS[0].id}, 
      categoryId: ${category.id}, 
      date: ${day}, 
      amount: ${formattedAmount}, 
      payee: Random Payee, 
      notes: Random Notes`);

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Random Payee",
      notes: "Random Notes",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });

  days.forEach((day) => {
    generateTransactionsForDay(day);
  });
};

generateTransactions();

const main = async () => {
  try {
    console.log("Deleting existing transactions...");
    await db.delete(transactions).execute();
    console.log("Deleting existing accounts...");
    await db.delete(accounts).execute();
    console.log("Deleting existing categories...");
    await db.delete(categories).execute();

    console.log("Seeding categories...");
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    console.log("Categories seeded successfully!");

    console.log("Seeding accounts...");
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    console.log("Accounts seeded successfully!");

    console.log("Seeding transactions...");
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
    console.log("Transactions seeded successfully!");
  } catch (error) {
    console.error("Error during seed", error);
    process.exit(1);
  }
};

main();
