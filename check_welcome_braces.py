from pathlib import Path
p = Path('src/styles/Welcome.css')
text = p.read_text(encoding='utf-8')
lines = text.splitlines()
open_count = 0
for i, line in enumerate(lines, 1):
    open_count += line.count('{') - line.count('}')
    if i >= len(lines) - 30 or line.strip().startswith('/*') or '{' in line or '}' in line:
        print(f'{i:04}: {open_count:03} | {line}')
print('FINAL open_count:', open_count)
