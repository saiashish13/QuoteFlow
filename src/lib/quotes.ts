export type Category = "Motivation" | "Success" | "Life" | "Wisdom" | "Creativity" | "Mindfulness";

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category;
}

export const QUOTES: Quote[] = [
  { id: "1", text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
  { id: "2", text: "Stay hungry. Stay foolish.", author: "Steve Jobs", category: "Motivation" },
  { id: "3", text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "Creativity" },
  { id: "4", text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs", category: "Creativity" },
  { id: "5", text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Success" },
  { id: "6", text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Motivation" },
  { id: "7", text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Wisdom" },
  { id: "8", text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
  { id: "9", text: "The mind is everything. What you think you become.", author: "Buddha", category: "Mindfulness" },
  { id: "10", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Wisdom" },
  { id: "11", text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "Motivation" },
  { id: "12", text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "Success" },
  { id: "13", text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "Wisdom" },
  { id: "14", text: "What we think, we become.", author: "Buddha", category: "Mindfulness" },
  { id: "15", text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", category: "Life" },
  { id: "16", text: "Creativity is intelligence having fun.", author: "Albert Einstein", category: "Creativity" },
  { id: "17", text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "Life" },
  { id: "18", text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Motivation" },
  { id: "19", text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "Wisdom" },
  { id: "20", text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "Mindfulness" },
];

export const CATEGORIES: ("All" | Category)[] = [
  "All", "Motivation", "Success", "Life", "Wisdom", "Creativity", "Mindfulness",
];