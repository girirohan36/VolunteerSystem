from supabase import create_client

SUPABASE_URL = "https://wdxdumzjyvgytfdotjsa.supabase.co"  # replace with your Supabase URL
SUPABASE_KEY = "yeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeGR1bXpqeXZneXRmZG90anNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDk0MzMsImV4cCI6MjA3OTU4NTQzM30.RpFQp3UNmuy8f3pqPjIzCRe-rTB7wbIaJfg58rmy2vIy"  # replace with anon key or service key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
