/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `budget` (numeric)
      - `duration` (integer)
      - `client_address` (text)
      - `freelancer_address` (text, nullable)
      - `status` (text)
      - `tags` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for:
      - Anyone can read projects
      - Authenticated users can create projects
      - Project owners can update their projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  budget numeric NOT NULL CHECK (budget > 0),
  duration integer NOT NULL CHECK (duration > 0),
  client_address text NOT NULL,
  freelancer_address text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed')),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read projects
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create projects
CREATE POLICY "Authenticated users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow project owners to update their projects
CREATE POLICY "Project owners can update their projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = client_address);