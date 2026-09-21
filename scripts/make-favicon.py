from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "assets/images/ameritalk-logo.png"
out = root / "site"
logo = Image.open(source).convert("RGBA")

# Conserver tout le logo dans un carré sans le déformer.
canvas = Image.new("RGBA", (512, 512), (15, 26, 34, 255))
logo.thumbnail((470, 470), Image.Resampling.LANCZOS)
canvas.alpha_composite(logo, ((512 - logo.width) // 2, (512 - logo.height) // 2))

canvas.save(out / "favicon-512.png", optimize=True)
canvas.resize((180, 180), Image.Resampling.LANCZOS).save(out / "apple-touch-icon.png", optimize=True)
canvas.resize((32, 32), Image.Resampling.LANCZOS).save(out / "favicon-32.png", optimize=True)
canvas.resize((16, 16), Image.Resampling.LANCZOS).save(out / "favicon-16.png", optimize=True)
canvas.save(out / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Favicons generated from", source)
