```python
import os
import requests
from typing import Optional

TWILIO_BASE = "https://api.twilio.com/2010-04-01"
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER")


def send_sms(to_number: str, message: str) -> bool:
    """Send SMS via Twilio REST API. Returns True if sent, False otherwise."""
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_FROM_NUMBER):
        print("[send_sms] Twilio credentials not set. Skipping actual send.")
        return False

    url = f"{TWILIO_BASE}/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json"
    data = {"From": TWILIO_FROM_NUMBER, "To": to_number, "Body": message}
    resp = requests.post(url, data=data, auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN), timeout=10)
    return resp.status_code in (200, 201)
```
