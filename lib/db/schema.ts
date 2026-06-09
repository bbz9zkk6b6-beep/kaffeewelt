import {
  pgTable,
  bigint,
  text,
  smallint,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core'

export const recipeRatings = pgTable(
  'recipe_ratings',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    recipeSlug: text('recipe_slug').notNull(),
    stars: smallint('stars').notNull(),
    voterKey: text('voter_key').notNull(),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    slugVoterUnique: uniqueIndex('recipe_ratings_slug_voter_uidx').on(
      table.recipeSlug,
      table.voterKey,
    ),
    slugIdx: index('recipe_ratings_slug_idx').on(table.recipeSlug),
    ipCreatedIdx: index('recipe_ratings_ip_created_idx').on(
      table.ipHash,
      table.createdAt,
    ),
  }),
)

export type RecipeRating = typeof recipeRatings.$inferSelect

export const comments = pgTable(
  'comments',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    contentType: text('content_type').notNull(),
    contentSlug: text('content_slug').notNull(),
    authorName: text('author_name').notNull(),
    body: text('body').notNull(),
    status: text('status').notNull().default('pending'),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    contentIdx: index('comments_content_idx').on(
      table.contentType,
      table.contentSlug,
      table.status,
    ),
    statusIdx: index('comments_status_idx').on(table.status, table.createdAt),
    ipCreatedIdx: index('comments_ip_created_idx').on(
      table.ipHash,
      table.createdAt,
    ),
  }),
)

export type Comment = typeof comments.$inferSelect
