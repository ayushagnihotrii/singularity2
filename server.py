"""
Simple Python HTTP server to serve the tracking page locally for testing.
Run: python server.py
Then open http://localhost:8080 in your browser.

NOTE: For the geolocation API to work, you need HTTPS in production.
      Localhost is an exception — browsers allow geolocation on localhost.
      For sharing with others, deploy to a hosting service (see README).
"""

import http.server
import socketserver
import os
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"[Server] {args[0]}")


def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════════════════╗
║        🌐 Location Tracker — Local Server        ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║   Server running at:                             ║
║   → http://localhost:{PORT}                       ║
║                                                  ║
║   Press Ctrl+C to stop the server                ║
║                                                  ║
║   🎓 Educational Project — Tech Lab Demo         ║
╚══════════════════════════════════════════════════╝
        """)

        # Auto-open in browser
        webbrowser.open(f"http://localhost:{PORT}")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[Server] Shutting down...")
            httpd.shutdown()


if __name__ == "__main__":
    main()
