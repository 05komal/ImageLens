import requests
from django.conf import settings


def search_images(query: str, page: int = 1, per_page: int = 20) -> list[dict]:
    if not settings.UNSPLASH_ACCESS_KEY:
        return []

    url = "https://api.unsplash.com/search/photos"
    params = {
        "query":    query,
        "page":     page,
        "per_page": per_page,
    }
    headers = {
        "Authorization": f"Client-ID {settings.UNSPLASH_ACCESS_KEY}",
        "Accept-Version": "v1",
    }

    try:
        resp = requests.get(url, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        return [
            {
                "id":           f"unsplash_{photo['id']}",
                "source":       "Unsplash",
                "title":        photo.get("alt_description") or photo.get("description") or query,
                "thumb":        photo["urls"]["small"],
                "regular":      photo["urls"]["regular"],
                "full":         photo["urls"]["full"],
                "download_url": photo["links"]["download"],
                "page_url":     photo["links"]["html"],
                "author":       photo["user"]["name"],
                "author_url":   photo["user"]["links"]["html"],
                "width":        photo["width"],
                "height":       photo["height"],
                "color":        photo.get("color", "#000000"),
                "likes":        photo.get("likes", 0),
                "tags":         [t["title"] for t in photo.get("tags", [])],
            }
            for photo in data.get("results", [])
        ]
    except requests.RequestException as e:
        print(f"[Unsplash] Error: {e}")
        return []