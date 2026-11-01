import json
import os
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("resume_xpert.resume_store")

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
STORAGE_FILE = os.path.join(DATA_DIR, "saved_profile.json")

class ResumeStore:
    def __init__(self):
        self._cached_profile: Optional[Dict[str, Any]] = None
        self._ensure_storage_dir()
        self._load_from_disk()

    def _ensure_storage_dir(self):
        if not os.path.exists(DATA_DIR):
            try:
                os.makedirs(DATA_DIR, exist_ok=True)
            except Exception as e:
                logger.warning(f"Could not create storage dir {DATA_DIR}: {e}")

    def _load_from_disk(self):
        if os.path.exists(STORAGE_FILE):
            try:
                with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                    self._cached_profile = json.load(f)
                    logger.info(f"Loaded persistent resume profile for: {self._cached_profile.get('name', 'Unknown')}")
            except Exception as e:
                logger.warning(f"Could not load saved profile from {STORAGE_FILE}: {e}")

    def save_profile(self, profile: Dict[str, Any]) -> bool:
        """Saves candidate profile in-memory and persistently to disk"""
        self._cached_profile = profile
        try:
            self._ensure_storage_dir()
            with open(STORAGE_FILE, "w", encoding="utf-8") as f:
                json.dump(profile, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved resume profile to disk: {profile.get('name', 'Candidate')}")
            return True
        except Exception as e:
            logger.error(f"Failed to persist resume profile to disk: {e}")
            return False

    def get_current_profile(self) -> Optional[Dict[str, Any]]:
        """Retrieves currently saved candidate profile"""
        return self._cached_profile

    def has_saved_profile(self) -> bool:
        return self._cached_profile is not None


resume_store = ResumeStore()
