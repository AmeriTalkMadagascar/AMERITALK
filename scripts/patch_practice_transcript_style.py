from pathlib import Path

path = Path('/home/ubuntu/ameritalk/app/(tabs)/practice.tsx')
text = path.read_text()
needle = 'scoreDetail: { color: "#B8C0C9", fontSize: 10, lineHeight: 15, marginTop: 3, maxWidth: 220 }'
replacement = needle + ', transcript: { color: "#D4DCE2", fontSize: 10, lineHeight: 15, marginTop: 6, maxWidth: 220 }'
if needle not in text:
    raise SystemExit('score style anchor not found')
path.write_text(text.replace(needle, replacement, 1))
