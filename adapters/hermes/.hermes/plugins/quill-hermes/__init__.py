from __future__ import annotations

import sys
from pathlib import Path


ADAPTER_ROOT = Path(__file__).resolve().parents[3]
if str(ADAPTER_ROOT) not in sys.path:
    sys.path.insert(0, str(ADAPTER_ROOT))

from quill_hermes import register  # noqa: E402

__all__ = ["register"]
