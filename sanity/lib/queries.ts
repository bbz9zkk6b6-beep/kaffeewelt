import {groq} from 'next-sanity'

// Artikel
export const ARTICLES_QUERY = groq`
  *[_type == "article"] | order(date desc) {
    slug, title, excerpt, date, readingTime, featured,
    "category": category->slug.current,
    "author": author->slug.current,
    "image": image.asset->url
  }
`

export const ARTICLE_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    slug, title, excerpt, date, readingTime, featured,
    "category": category->slug.current,
    "image": image.asset->url,
    content,
    "relatedArticles": *[_type == "article" && slug.current != $slug] | order(date desc)[0...3]{
      "slug": slug.current, title, excerpt, date, readingTime, featured,
      "category": category->slug.current,
      "image": image.asset->url
    },
    "relatedRecipes": *[_type == "recipe"] | order(date desc)[0...3]{
      "slug": slug.current, title, excerpt, type, difficulty, totalTime,
      "image": image.asset->url
    }
  }
`

// Rezepte
export const RECIPES_QUERY = groq`
  *[_type == "recipe"] | order(date desc) {
    slug, title, excerpt, type, difficulty, totalTime, baseServings, featured,
    "author": author->slug.current,
    "image": image.asset->url
  }
`

export const RECIPE_QUERY = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    slug, title, excerpt, type, difficulty, totalTime, baseServings,
    ingredients, steps, tips, nutrition,
    "author": author->{name, role, bio, "avatar": avatar.asset->url},
    "image": image.asset->url
  }
`

// News
export const NEWS_QUERY = groq`
  *[_type == "news"] | order(date desc) {
    slug, title, excerpt, date, readingTime,
    "category": category->slug.current,
    "author": author->slug.current,
    "image": image.asset->url
  }
`

export const NEWS_ITEM_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    slug, title, excerpt, date, readingTime,
    "category": category->slug.current,
    "author": author->slug.current,
    "image": image.asset->url,
    content,
    "relatedNews": *[_type == "news" && slug.current != $slug] | order(date desc)[0...3]{
      "slug": slug.current, title, excerpt, date, readingTime,
      "category": category->slug.current,
      "image": image.asset->url
    },
    "relatedArticles": *[_type == "article"] | order(date desc)[0...2]{
      "slug": slug.current, title, excerpt, date, readingTime,
      "category": category->slug.current,
      "image": image.asset->url
    }
  }
`

// Glossar
export const GLOSSARY_QUERY = groq`
  *[_type == "glossaryTerm"] | order(term asc) {
    "slug": slug.current, term, definition,
    "category": category->value.current,
    "categoryTitle": category->title
  }
`

export const GLOSSARY_TERM_QUERY = groq`
  *[_type == "glossaryTerm" && slug.current == $slug][0] {
    "slug": slug.current, term, definition, synonyms,
    "category": category->value.current,
    "categoryTitle": category->title,
    content,
    "faq": faq[]{question, answer},
    "relatedTerms": relatedTerms[]->{term, "slug": slug.current, definition},
    "relatedArticles": select(
      count(relatedArticles) > 0 => relatedArticles[0...3]->{
        "slug": slug.current, title, excerpt, date, readingTime, featured,
        "category": category->slug.current,
        "image": image.asset->url
      },
      *[_type == "article"] | order(date desc)[0...3]{
        "slug": slug.current, title, excerpt, date, readingTime, featured,
        "category": category->slug.current,
        "image": image.asset->url
      }
    ),
    "relatedRecipes": select(
      count(relatedRecipes) > 0 => relatedRecipes[0...3]->{
        "slug": slug.current, title, excerpt, type, difficulty, totalTime,
        "image": image.asset->url
      },
      *[_type == "recipe"] | order(date desc)[0...3]{
        "slug": slug.current, title, excerpt, type, difficulty, totalTime,
        "image": image.asset->url
      }
    )
  }
`

// Produkte
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(featured desc, title asc) {
    slug, title, excerpt, category, featured, priceHint, pros, cons,
    "affiliateSlug": affiliateSlug.current,
    "image": image.asset->url
  }
`

export const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    slug, title, excerpt, category, featured, priceHint, pros, cons,
    affiliateUrl,
    "affiliateSlug": affiliateSlug.current,
    "image": image.asset->url,
    "body": body[]{
      "type": _type,
      "id": _key,
      text
    }
  }
`

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category == $category] | order(featured desc, title asc) {
    slug, title, excerpt, category, featured, priceHint,
    "affiliateSlug": affiliateSlug.current,
    "image": image.asset->url
  }
`

// Kommentare (nur freigegebene)
export const COMMENTS_QUERY = groq`
  *[_type == "comment" && contentType == $contentType && contentSlug == $contentSlug && status == "approved"] | order(createdAt desc) {
    _id, authorName, body, createdAt
  }
`
