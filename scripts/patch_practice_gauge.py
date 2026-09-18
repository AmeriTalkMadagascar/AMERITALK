from pathlib import Path
path = Path('/home/ubuntu/ameritalk/app/(tabs)/practice.tsx')
text = path.read_text()
needle = 'recordingButton: { backgroundColor: "#F28C7D" }, recordingError:'
replacement = 'recordingButton: { backgroundColor: "#F28C7D" }, vadHint: { color: "#F0A04B", fontSize: 10, textAlign: "center", marginTop: 8 }, gaugeWrap: { width: 118, height: 118, alignItems: "center", justifyContent: "center" }, gaugeCenter: { position: "absolute", alignItems: "center", justifyContent: "center" }, gaugeScore: { color: "#FFFDF7", fontSize: 25, fontWeight: "900" }, gaugeLabel: { color: "#B8C0C9", fontSize: 9, marginTop: -2 }, scoreCopy: { flex: 1 }, recordingError:'
if needle not in text:
    raise SystemExit("style anchor not found")
path.write_text(text.replace(needle, replacement, 1))
