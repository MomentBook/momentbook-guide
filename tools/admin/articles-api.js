#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const DEFAULT_BASE_URL = 'https://api.momentbook.app';
const LOCAL_ENV_PATH = '.codex/automation/admin-api.env';

function usage() {
  return [
    'Usage:',
    '  node tools/admin/articles-api.js list [--page 1] [--limit 50] [--lang ko] [--category travel-guide] [--out file]',
    '  node tools/admin/articles-api.js get <articleId> [--out file]',
    '  node tools/admin/articles-api.js export-group <translationGroupId> [--out file]',
    '  node tools/admin/articles-api.js create <article.json> --confirm-production [--out file]',
    '  node tools/admin/articles-api.js create-group <articles.json> --confirm-production [--out file]',
    '  node tools/admin/articles-api.js patch <articleId> <patch.json> --confirm-production [--out file]',
    '  node tools/admin/articles-api.js patch-group <translationGroupId> <patches.json> --confirm-production [--out file]',
    '',
    'Credentials are read from environment variables or .codex/automation/admin-api.env:',
    '  MOMENTBOOK_ADMIN_API_BASE_URL=https://api.momentbook.app',
    '  MOMENTBOOK_ADMIN_EMAIL=...',
    '  MOMENTBOOK_ADMIN_PASSWORD=...',
    '  MOMENTBOOK_ADMIN_ACCESS_TOKEN=...',
  ].join('\n');
}

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), LOCAL_ENV_PATH);
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const index = trimmed.indexOf('=');
    if (index === -1) {
      continue;
    }
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith('--')) {
      args._.push(value);
      continue;
    }

    const key = value.slice(2);
    if (key === 'confirm-production') {
      args.confirmProduction = true;
      continue;
    }

    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

function requireWriteConfirmation(args) {
  if (!args.confirmProduction) {
    throw new Error('Refusing production write without --confirm-production.');
  }
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function recordsFromJson(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (Array.isArray(value.articles)) {
    return value.articles;
  }
  if (Array.isArray(value.records)) {
    return value.records;
  }
  if (Array.isArray(value.updates)) {
    return value.updates;
  }
  throw new Error('Expected an array, or an object with articles/records/updates.');
}

function writeOutput(value, outFile) {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  if (outFile) {
    fs.writeFileSync(outFile, text);
  } else {
    process.stdout.write(text);
  }
}

function compactArticleInput(record) {
  const body = {
    language: record.language,
    category: record.category,
    title: record.title,
    body: record.body,
  };
  if (record.slug) {
    body.slug = record.slug;
  }
  if (record.translationGroupId) {
    body.translationGroupId = record.translationGroupId;
  }
  return body;
}

function compactPatchInput(record) {
  const body = {};
  if (record.title !== undefined) {
    body.title = record.title;
  }
  if (record.body !== undefined) {
    body.body = record.body;
  }
  if (record.category !== undefined) {
    body.category = record.category;
  }
  if (Object.keys(body).length === 0) {
    throw new Error(`Patch for ${record.language || '<unknown>'} has no title/body/category.`);
  }
  return body;
}

async function requestJson(baseUrl, pathname, options = {}) {
  const url = new URL(pathname, baseUrl);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers = {
    Accept: 'application/json',
    ...(options.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
  };

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }
  }

  if (!response.ok) {
    const message = parsed?.message || parsed?.raw || response.statusText;
    throw new Error(`${options.method || 'GET'} ${url.pathname} failed: ${response.status} ${message}`);
  }

  return parsed;
}

async function resolveAccessToken(baseUrl) {
  if (process.env.MOMENTBOOK_ADMIN_ACCESS_TOKEN) {
    return process.env.MOMENTBOOK_ADMIN_ACCESS_TOKEN;
  }

  const email = process.env.MOMENTBOOK_ADMIN_EMAIL;
  const password = process.env.MOMENTBOOK_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(`Missing admin credentials. Set env vars or ${LOCAL_ENV_PATH}.`);
  }

  const response = await requestJson(baseUrl, '/v2/auth/email/login', {
    method: 'POST',
    body: { email, password },
  });
  const token = response?.data?.accessToken || response?.data?.token;
  if (!token) {
    throw new Error('Login response did not include an access token.');
  }
  return token;
}

async function listArticles(baseUrl, accessToken, args) {
  const response = await requestJson(baseUrl, '/v2/admin/articles', {
    accessToken,
    query: {
      page: args.page || 1,
      limit: args.limit || 50,
      lang: args.lang,
      category: args.category,
    },
  });
  return response.data;
}

async function getArticle(baseUrl, accessToken, articleId) {
  const response = await requestJson(baseUrl, `/v2/admin/articles/${encodeURIComponent(articleId)}`, {
    accessToken,
  });
  return response.data;
}

async function exportGroup(baseUrl, accessToken, translationGroupId) {
  const first = await listArticles(baseUrl, accessToken, { page: 1, limit: 50 });
  const pages = first.pages || 1;
  const summaries = first.articles.slice();

  for (let page = 2; page <= pages; page += 1) {
    const next = await listArticles(baseUrl, accessToken, { page, limit: 50 });
    summaries.push(...next.articles);
  }

  const groupSummaries = summaries.filter(
    (article) => article.translationGroupId === translationGroupId,
  );
  const details = [];
  for (const summary of groupSummaries) {
    details.push(await getArticle(baseUrl, accessToken, summary.articleId));
  }

  details.sort((a, b) => LANGUAGES.indexOf(a.language) - LANGUAGES.indexOf(b.language));
  return { translationGroupId, articles: details };
}

async function createArticle(baseUrl, accessToken, record) {
  const response = await requestJson(baseUrl, '/v2/admin/articles', {
    method: 'POST',
    accessToken,
    body: compactArticleInput(record),
  });
  return response.data;
}

async function createGroup(baseUrl, accessToken, records) {
  const byLanguage = new Map(records.map((record) => [record.language, record]));
  const ordered = LANGUAGES.map((language) => byLanguage.get(language)).filter(Boolean);
  if (ordered.length !== LANGUAGES.length) {
    throw new Error(`Expected exactly 9 supported languages, found ${ordered.length}.`);
  }

  const created = [];
  let translationGroupId = null;
  for (const record of ordered) {
    const input = { ...record };
    if (translationGroupId) {
      input.translationGroupId = translationGroupId;
    }
    const result = await createArticle(baseUrl, accessToken, input);
    translationGroupId = result.translationGroupId;
    created.push(result);
  }

  return { translationGroupId, created };
}

async function patchArticle(baseUrl, accessToken, articleId, patch) {
  const response = await requestJson(baseUrl, `/v2/admin/articles/${encodeURIComponent(articleId)}`, {
    method: 'PATCH',
    accessToken,
    body: compactPatchInput(patch),
  });
  return response.data;
}

async function patchGroup(baseUrl, accessToken, translationGroupId, patches) {
  const current = await exportGroup(baseUrl, accessToken, translationGroupId);
  const byLanguage = new Map(current.articles.map((article) => [article.language, article]));
  const updated = [];

  for (const patch of patches) {
    const currentArticle = byLanguage.get(patch.language);
    if (!currentArticle) {
      throw new Error(`No current article found for ${translationGroupId}/${patch.language}.`);
    }
    updated.push(await patchArticle(baseUrl, accessToken, currentArticle.articleId, patch));
  }

  return { translationGroupId, updated };
}

async function main() {
  loadLocalEnv();
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  const baseUrl = (process.env.MOMENTBOOK_ADMIN_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');

  if (!command || command === 'help' || command === '--help') {
    console.log(usage());
    return;
  }

  const commands = new Set(['list', 'get', 'export-group', 'create', 'create-group', 'patch', 'patch-group']);
  if (!commands.has(command)) {
    throw new Error(`Unknown command: ${command}\n${usage()}`);
  }

  const writeCommands = new Set(['create', 'create-group', 'patch', 'patch-group']);
  if (writeCommands.has(command)) {
    requireWriteConfirmation(args);
  }

  const accessToken = await resolveAccessToken(baseUrl);
  let result;

  if (command === 'list') {
    result = await listArticles(baseUrl, accessToken, args);
  } else if (command === 'get') {
    const articleId = args._[1];
    if (!articleId) throw new Error('Missing articleId.');
    result = await getArticle(baseUrl, accessToken, articleId);
  } else if (command === 'export-group') {
    const translationGroupId = args._[1];
    if (!translationGroupId) throw new Error('Missing translationGroupId.');
    result = await exportGroup(baseUrl, accessToken, translationGroupId);
  } else if (command === 'create') {
    const file = args._[1];
    if (!file) throw new Error('Missing article JSON file.');
    result = await createArticle(baseUrl, accessToken, readJson(file));
  } else if (command === 'create-group') {
    const file = args._[1];
    if (!file) throw new Error('Missing articles JSON file.');
    result = await createGroup(baseUrl, accessToken, recordsFromJson(readJson(file)));
  } else if (command === 'patch') {
    const articleId = args._[1];
    const file = args._[2];
    if (!articleId || !file) throw new Error('Missing articleId or patch JSON file.');
    result = await patchArticle(baseUrl, accessToken, articleId, readJson(file));
  } else if (command === 'patch-group') {
    const translationGroupId = args._[1];
    const file = args._[2];
    if (!translationGroupId || !file) throw new Error('Missing translationGroupId or patches JSON file.');
    result = await patchGroup(baseUrl, accessToken, translationGroupId, recordsFromJson(readJson(file)));
  }

  writeOutput(result, args.out);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
