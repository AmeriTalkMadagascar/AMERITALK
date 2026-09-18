from PIL import Image

source = Image.open('/home/ubuntu/ameritalk/assets/images/logo-source.png').convert('RGB')
# Keep the central artwork and remove the large black phone-capture margins.
crop = source.crop((0, 420, 828, 1185))
crop.thumbnail((640, 640), Image.Resampling.LANCZOS)
crop.save('/home/ubuntu/ameritalk/assets/images/ameritalk-logo.png', optimize=True)
