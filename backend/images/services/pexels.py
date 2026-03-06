import requests
from django.conf import settings


def search_images(query: str, page: int = 1, per_page: int = 20) -> list[dict]:
    if not settings.PEXELS_API_KEY:
        return []

    url = "https://api.pexels.com/v1/search"
    params = {
        "query":    query,
        "page":     page,
        "per_page": per_page,
    }
    headers = {
        "Authorization": settings.PEXELS_API_KEY,
    }

    try:
        resp = requests.get(url, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        return [
            {
                "id":           f"pexels_{photo['id']}",
                "source":       "Pexels",
                "title":        photo.get("alt") or query,
                "thumb":        photo["src"]["medium"],
                "regular":      photo["src"]["large"],
                "full":         photo["src"]["original"],
                "download_url": photo["src"]["original"],
                "page_url":     photo["url"],
                "author":       photo["photographer"],
                "author_url":   photo["photographer_url"],
                "width":        photo["width"],
                "height":       photo["height"],
                "color":        photo.get("avg_color", "#000000"),
                "likes":        0,
                "tags":         [],
            }
            for photo in data.get("photos", [])
        ]
    except requests.RequestException as e:
        print(f"[Pexels] Error: {e}")
        return []