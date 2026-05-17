'use strict';

const path = require('path');

function assertArticleAiDisabled(scriptPath) {
  const scriptName = scriptPath ? path.basename(scriptPath) : 'unknown-script';
  throw new Error(
    [
      `OpenAI article generation is disabled for ${scriptName}.`,
      'Article writing and translation must not call OpenAI.',
      'Use the current source pack, fact parity map, and manual article workflow instead.',
    ].join(' '),
  );
}

module.exports = {
  assertArticleAiDisabled,
};
