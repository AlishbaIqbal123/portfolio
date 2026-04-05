-- Create Coding Tips table (for Heartbeat mechanism)
CREATE TABLE IF NOT EXISTS coding_tips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    author TEXT DEFAULT 'Admin',
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Projects table (Enhanced)
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    images TEXT[] DEFAULT '{}', -- Supports multiple images
    image TEXT, -- Legacy support for primary image
    video_url TEXT,
    github_link TEXT,
    deployed_link TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    category TEXT CHECK (category IN ('mobile', 'web', 'desktop')),
    is_video_primary BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Education table
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    location TEXT,
    date TEXT,
    status TEXT CHECK (status IN ('ongoing', 'completed')),
    details TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    cgpa TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Experience table
CREATE TABLE IF NOT EXISTS experience (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    date TEXT,
    type TEXT CHECK (type IN ('work', 'internship', 'simulation')),
    description TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    link TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Skills table
CREATE TABLE IF NOT EXISTS skill_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT, -- Lucide icon name
    skills TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT,
    published_at DATE,
    excerpt TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Admin Settings table (for profile personal data)
CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE coding_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow public READ, but only authenticated WRITE)
CREATE POLICY "Public Read Access" ON coding_tips FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON coding_tips FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON education FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON education FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON experience FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON experience FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON articles FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON articles FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Access" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "Auth Full Access" ON admin_settings FOR ALL USING (auth.role() = 'authenticated');
