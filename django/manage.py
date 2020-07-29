#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import braintree

print("Loading environment variables from .env")
from dotenv import load_dotenv
load_dotenv()

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Monstera.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id = os.getenv('BT_MERCHANT_ID'),
        public_key = os.getenv('BT_PUBLIC_KEY'),
        private_key = os.getenv('BT_PRIVATE_KEY')
    )
)

if __name__ == '__main__':
    main()
