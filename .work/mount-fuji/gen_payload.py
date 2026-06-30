#!/usr/bin/env python3
import json, os

DIR = '/Users/hansol/workspace/momentbook-guide/.work/mount-fuji'

with open(os.path.join(DIR, 'payload.json')) as f:
    existing = json.load(f)

ko_article = next(a for a in existing['articles'] if a['language'] == 'ko')

with open(os.path.join(DIR, 'en-master.md')) as f:
    en_body = f.read()

en_title = "Mount Fuji Climbing Guide 2026 — Fees, Trail Choice, and Reservation Rules"

# Read all translation bodies from separate files
translations = {}
for lang in ['ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi']:
    with open(os.path.join(DIR, f'{lang}.md')) as f:
        content = f.read()
    parts = content.split('\n', 1)
    translations[lang] = {'title': parts[0].lstrip('# ').strip(), 'body': content}

articles = [
    {
        "language": "ko",
        "category": "travel-guide",
        "slug": "mount-fuji-climbing-fee-trail-hut-guide-2026-06-24",
        "title": ko_article['title'],
        "body": ko_article['body']
    },
    {
        "language": "en",
        "category": "travel-guide",
        "slug": "mount-fuji-climbing-fee-trail-hut-guide-2026-06-24",
        "title": en_title,
        "body": en_body
    }
]

for lang in ['ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi']:
    articles.append({
        "language": lang,
        "category": "travel-guide",
        "slug": "mount-fuji-climbing-fee-trail-hut-guide-2026-06-24",
        "title": translations[lang]['title'],
        "body": translations[lang]['body']
    })

payload = {
    "translationGroupId": "artgrp_mount_fuji_climbing_20260624",
    "sourceCheckedDate": "2026-06-24",
    "articles": articles
}

with open(os.path.join(DIR, 'payload.json'), 'w', encoding='utf-8') as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print("Done! Articles:")
for a in articles:
    print(f"  {a['language']}: title={len(a['title'])} chars, body={len(a['body'])} chars")
