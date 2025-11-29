```python
import os
import requests
from typing import Optional


SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")


def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """Send email via SendGrid. Returns True if sent, False otherwise (safe fallback)."""
    if not SENDGRID_API_KEY:
        # fallback: log and return False so tests don't rely on external network
        print("[send_email] SENDGRID_API_KEY not set. Skipping actual send.")
        return False

    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": "no-reply@example.com"},
        "subject": subject,
        "content": [{"type": "text/html", "value": html_content}],
    }

    headers = {"Authorization": f"Bearer {SENDGRID_API_KEY}", "Content-Type": "application/json"}

    resp = requests.post(SENDGRID_API_URL, json=payload, headers=headers, timeout=10)
    return resp.status_code in (200, 202)
```