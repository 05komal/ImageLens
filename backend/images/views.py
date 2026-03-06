import concurrent.futures
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import unsplash, pixabay, pexels

SOURCE_MAP = {
    "unsplash": unsplash.search_images,
    "pixabay":  pixabay.search_images,
    "pexels":   pexels.search_images,
}

VALID_SOURCES = set(SOURCE_MAP.keys())


class ImageSearchView(APIView):
    def get(self, request):
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response(
                {"error": "Query parameter 'q' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        raw_sources = request.query_params.get("sources", "")
        if raw_sources:
            requested = {s.strip().lower() for s in raw_sources.split(",")}
            sources = list(requested & VALID_SOURCES)
        else:
            sources = list(VALID_SOURCES)

        if not sources:
            return Response(
                {"error": f"No valid sources. Choose from: {', '.join(VALID_SOURCES)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            page     = max(1, int(request.query_params.get("page", 1)))
            per_page = min(40, max(1, int(request.query_params.get("per_page", 20))))
        except ValueError:
            page, per_page = 1, 20

        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(sources)) as executor:
            futures = {
                executor.submit(SOURCE_MAP[src], query, page, per_page): src
                for src in sources
            }
            for future in concurrent.futures.as_completed(futures):
                try:
                    results.extend(future.result())
                except Exception as e:
                    print(f"[{futures[future]}] Exception: {e}")

        return Response({
            "query":   query,
            "page":    page,
            "sources": sources,
            "count":   len(results),
            "results": results,
        })


class SourceStatusView(APIView):
    def get(self, request):
        from django.conf import settings
        return Response({
            "unsplash": bool(settings.UNSPLASH_ACCESS_KEY),
            "pixabay":  bool(settings.PIXABAY_API_KEY),
            "pexels":   bool(settings.PEXELS_API_KEY),
        })