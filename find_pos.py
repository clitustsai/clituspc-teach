c = open('index.html','r',encoding='utf-8',errors='replace').read()
# Find all section tags
import re
for m in re.finditer(r'<section [^>]+>', c):
    print(m.start(), repr(m.group()[:80]))
print('\n--- script src main.js ---')
idx = c.find('script src="main.js"')
print(idx, repr(c[idx-10:idx+40]))
