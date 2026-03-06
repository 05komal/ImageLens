import requests
from django.conf import settings


def search_images(query: str, page: int = 1, per_page: int = 20) -> list[dict]:
    if not settings.PIXABAY_API_KEY:
        return []

    url = "https://pixabay.com/api/"
    params = {
        "key":        settings.PIXABAY_API_KEY,
        "q":          query,
        "page":       page,
        "per_page":   per_page,
        "image_type": "photo",
        "safesearch": "true",
    }

    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        return [
            {
                "id":           f"pixabay_{hit['id']}",
                "source":       "Pixabay",
                "title":        " ".join(hit.get("tags", "").split(",")[:3]).strip() or query,
                "thumb":        hit["previewURL"],
                "regular":      hit["webformatURL"],
                "full":         hit["largeImageURL"],
                "download_url": hit["largeImageURL"],
                "page_url":     hit["pageURL"],
                "author":       hit["user"],
                "author_url":   f"https://pixabay.com/users/{hit['user']}-{hit['user_id']}/",
                "width":        hit["imageWidth"],
                "height":       hit["imageHeight"],
                "color":        "#4a90d9",
                "likes":        hit.get("likes", 0),
                "tags":         [t.strip() for t in hit.get("tags", "").split(",") if t.strip()],
            }
            for hit in data.get("hits", [])
        ]
    except requests.RequestException as e:
        print(f"[Pixabay] Error: {e}")
        return []