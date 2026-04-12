from pathlib import Path

path = Path(r'c:\Users\Vanshika\ScholarChain\frontend\app\page.js')
text = path.read_text(encoding='utf-8')
start = text.find('<Link href="/dashboard" className="inline-flex">')
if start == -1:
    print('not found')
    raise SystemExit(0)
end = text.find('</Link>', start)
if end == -1:
    print('end not found')
    raise SystemExit(0)
end = text.find('\n', end)
if end == -1:
    end = len(text)
else:
    end += 1
path.write_text(text[:start] + text[end:], encoding='utf-8')
print('removed block')
