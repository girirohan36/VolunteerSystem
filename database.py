from supabase import create_client
import os


DEFAULT_SUPABASE_URL = "https://wdxdumzjyvgytfdotjsa.supabase.co"
DEFAULT_SUPABASE_KEY = (
    "yeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeGR1bXpqeXZneXRmZG90anNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDk0MzMsImV4cCI6MjA3OTU4NTQzM30.RpFQp3UNmuy8f3pqPjIzCRe-rTB7wbIaJfg58rmy2vIy"
)

SUPABASE_URL = os.getenv("SUPABASE_URL", DEFAULT_SUPABASE_URL)
SUPABASE_KEY = os.getenv("SUPABASE_KEY", DEFAULT_SUPABASE_KEY)

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "Supabase configuration is missing. Set SUPABASE_URL and SUPABASE_KEY."
    )

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
