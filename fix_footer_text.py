# -*- coding: utf-8 -*-
import os

files = [f for f in os.listdir('.') if f.endswith('.html')]

replacements = [
    # footer brand text
    ('Nhà phát triển phần mềm Clitus PC<br />Technology · Innovation · Excellence', 
     'Nhà phát triển phần mềm Clitus PC<br/>Software Development & Solutions'),
    ('Nhà phát triển phần mềm Clitus PC<br/>Technology · Innovation · Excellence',
     'Nhà phát triển phần mềm Clitus PC<br/>Software Development & Solutions'),
    # about card
    ('<small>Technology · Innovation · Excellence</small>',
     '<small>Software Development & Solutions</small>'),
    # title/meta con sot
    ('Clitus PC Technology</title>', 'Clitus PC – Software Development & Solutions</title>'),
    ('Clitus PC Technology —', 'Clitus PC –'),
    # footer brand p tag kieu khac
    ('>Nhà phát triển phần mềm Clitus PC\nSoftware Development & Solutions<',
     '>Nhà phát triển phần mềm Clitus PC<br/>Software Development & Solutions<'),
]

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    changed = False
    for old, new in replacements:
        if old in c:
            c = c.replace(old, new)
            changed = True
    if changed:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Done {fname}")
