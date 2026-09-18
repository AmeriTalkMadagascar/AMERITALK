from pathlib import Path

path = Path('/home/ubuntu/ameritalk/app/(tabs)/practice.tsx')
text = path.read_text()
needle = 'micButtonText: { color: "#101821", fontSize: 12, fontWeight: "900" }'
replacement = needle + ', recordingButton: { backgroundColor: "#F28C7D" }, recordingError: { color: "#F28C7D", fontSize: 10, marginTop: 10, textAlign: "center" }'
if needle not in text:
    raise SystemExit('style anchor not found')
path.write_text(text.replace(needle, replacement, 1))
