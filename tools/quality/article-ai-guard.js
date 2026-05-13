'use strict';

const path = require('path');

function assertArticleAiDisabled(scriptPath) {
  const scriptName = scriptPath ? path.basename(scriptPath) : 'unknown-script';
  throw new Error(
    [
      `OpenAI article generation is disabled for ${scriptName}.`,
      'Article writing and translation must not call OpenAI.',
      'Use the source-backed write-* scripts or manually curated content instead.',
    ].join(' '),
  );
}

module.exports = {
  assertArticleAiDisabled,
};
