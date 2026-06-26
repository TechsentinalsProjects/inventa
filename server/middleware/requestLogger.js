/** ANSI colour helpers */
const C = {
  reset: '\x1b[0m',
  dim:   '\x1b[2m',
  bold:  '\x1b[1m',
  cyan:  '\x1b[36m',
  green: '\x1b[32m',
  yellow:'\x1b[33m',
  red:   '\x1b[31m',
  blue:  '\x1b[34m',
  magenta:'\x1b[35m',
};

function ts() {
  return new Date().toLocaleTimeString('en-IN', { hour12: false });
}

function statusColor(code) {
  if (code >= 500) return C.red;
  if (code >= 400) return C.yellow;
  if (code >= 200) return C.green;
  return C.dim;
}

function methodColor(method) {
  const m = { GET: C.cyan, POST: C.green, PUT: C.yellow, DELETE: C.red, PATCH: C.magenta };
  return m[method] || C.dim;
}

/**
 * Compact request logger.
 *
 * Example output:
 *   [18:30:01] POST /api/contact           → 200 OK     (47ms)
 *   [18:30:03] POST /api/quote             → 500 Error  (12ms) ← Failed to send email
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  const method = req.method;
  const path = req.path;

  res.on('finish', () => {
    const ms = Date.now() - start;
    const sc = res.statusCode;
    const label = sc >= 500 ? 'Error  ' : sc >= 400 ? 'Bad Req' : sc >= 200 ? 'OK     ' : '       ';
    const arrow = sc >= 400 ? '✗' : '✓';
    const scColor = statusColor(sc);

    process.stdout.write(
      `${C.dim}[${ts()}]${C.reset} ` +
      `${methodColor(method)}${method.padEnd(6)}${C.reset} ` +
      `${C.cyan}${path.padEnd(30)}${C.reset} ` +
      `${C.dim}→${C.reset} ` +
      `${scColor}${C.bold}${sc}${C.reset} ${scColor}${label}${C.reset} ` +
      `${C.dim}(${ms}ms) ${arrow}${C.reset}\n`
    );
  });

  next();
}

/** Log a named event to the terminal (startup messages, DB events, etc.) */
function log(tag, ...args) {
  const tagStr = `[${tag}]`.padEnd(14);
  console.log(`${C.dim}[${ts()}]${C.reset} ${C.blue}${C.bold}${tagStr}${C.reset}`, ...args);
}

/** Log an error event */
function logError(tag, ...args) {
  const tagStr = `[${tag}]`.padEnd(14);
  console.error(`${C.dim}[${ts()}]${C.reset} ${C.red}${C.bold}${tagStr}${C.reset}`, ...args);
}

module.exports = { requestLogger, log, logError };
