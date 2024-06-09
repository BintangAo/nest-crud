import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const tasksTable = pgTable('tasks_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertTasks = typeof tasksTable.$inferInsert;
export type SelectTasks = typeof tasksTable.$inferSelect;
