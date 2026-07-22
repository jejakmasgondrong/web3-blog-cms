// Server-only database utilities
// This file should only be imported in server components or API routes

import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'articles.json')

export interface Article {
  id: string
  title: string
  content: string
  // add other fields as needed
}

export function readArticles(): Article[] {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

export function writeArticles(articles: Article[]): void {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2))
  } catch (error) {
    console.error('Error writing articles:', error)
  }
}
