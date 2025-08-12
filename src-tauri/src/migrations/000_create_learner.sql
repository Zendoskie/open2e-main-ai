-- Create CONVERSATION table
CREATE TABLE IF NOT EXISTS conversation (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create MESSAGE table
CREATE TABLE IF NOT EXISTS message (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE
);

-- Create question table
CREATE TABLE IF NOT EXISTS question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL
);

-- Create evaluation table
CREATE TABLE IF NOT EXISTS evaluation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  score INTEGER NOT NULL,
  justification TEXT,
  detected_ai INTEGER,
  llm_model TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);