var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/sendEmail.js
var sendEmail_exports = {};
__export(sendEmail_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(sendEmail_exports);

// node_modules/resend/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var version = "6.1.2";
function buildPaginationQuery(options) {
  const searchParams = new URLSearchParams();
  if (options.limit !== void 0) {
    searchParams.set("limit", options.limit.toString());
  }
  if ("after" in options && options.after !== void 0) {
    searchParams.set("after", options.after);
  }
  if ("before" in options && options.before !== void 0) {
    searchParams.set("before", options.before);
  }
  return searchParams.toString();
}
var ApiKeys = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      const data = yield this.resend.post(
        "/api-keys",
        payload,
        options
      );
      return data;
    });
  }
  list() {
    return __async(this, arguments, function* (options = {}) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/api-keys?${queryString}` : "/api-keys";
      const data = yield this.resend.get(url);
      return data;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.delete(
        `/api-keys/${id}`
      );
      return data;
    });
  }
};
var Audiences = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      const data = yield this.resend.post(
        "/audiences",
        payload,
        options
      );
      return data;
    });
  }
  list() {
    return __async(this, arguments, function* (options = {}) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/audiences?${queryString}` : "/audiences";
      const data = yield this.resend.get(url);
      return data;
    });
  }
  get(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.get(
        `/audiences/${id}`
      );
      return data;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.delete(
        `/audiences/${id}`
      );
      return data;
    });
  }
};
function parseAttachments(attachments) {
  return attachments == null ? void 0 : attachments.map((attachment) => ({
    content: attachment.content,
    filename: attachment.filename,
    path: attachment.path,
    content_type: attachment.contentType,
    content_id: attachment.contentId
  }));
}
function parseEmailToApiOptions(email) {
  return {
    attachments: parseAttachments(email.attachments),
    bcc: email.bcc,
    cc: email.cc,
    from: email.from,
    headers: email.headers,
    html: email.html,
    reply_to: email.replyTo,
    scheduled_at: email.scheduledAt,
    subject: email.subject,
    tags: email.tags,
    text: email.text,
    to: email.to
  };
}
function render(node) {
  return new Promise((resolve, reject) => {
    import("@react-email/render").then(({ render: render2 }) => {
      resolve(render2(node));
    }).catch(() => {
      reject(
        Error(
          "Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`."
        )
      );
    });
  });
}
var Batch = class {
  constructor(resend) {
    this.resend = resend;
  }
  send(payload, options) {
    return __async(this, null, function* () {
      return this.create(payload, options);
    });
  }
  create(payload, options) {
    return __async(this, null, function* () {
      var _a;
      const emails = [];
      for (const email of payload) {
        if (email.react) {
          email.html = yield render(email.react);
          email.react = void 0;
        }
        emails.push(parseEmailToApiOptions(email));
      }
      const data = yield this.resend.post(
        "/emails/batch",
        emails,
        __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({
            "x-batch-validation": (_a = options == null ? void 0 : options.batchValidation) != null ? _a : "strict"
          }, options == null ? void 0 : options.headers)
        })
      );
      return data;
    });
  }
};
var Broadcasts = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      if (payload.react) {
        payload.html = yield render(payload.react);
      }
      const data = yield this.resend.post(
        "/broadcasts",
        {
          name: payload.name,
          audience_id: payload.audienceId,
          preview_text: payload.previewText,
          from: payload.from,
          html: payload.html,
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text
        },
        options
      );
      return data;
    });
  }
  send(id, payload) {
    return __async(this, null, function* () {
      const data = yield this.resend.post(
        `/broadcasts/${id}/send`,
        { scheduled_at: payload == null ? void 0 : payload.scheduledAt }
      );
      return data;
    });
  }
  list() {
    return __async(this, arguments, function* (options = {}) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/broadcasts?${queryString}` : "/broadcasts";
      const data = yield this.resend.get(url);
      return data;
    });
  }
  get(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.get(
        `/broadcasts/${id}`
      );
      return data;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.delete(
        `/broadcasts/${id}`
      );
      return data;
    });
  }
  update(id, payload) {
    return __async(this, null, function* () {
      if (payload.react) {
        payload.html = yield render(payload.react);
      }
      const data = yield this.resend.patch(
        `/broadcasts/${id}`,
        {
          name: payload.name,
          audience_id: payload.audienceId,
          from: payload.from,
          html: payload.html,
          text: payload.text,
          subject: payload.subject,
          reply_to: payload.replyTo,
          preview_text: payload.previewText
        }
      );
      return data;
    });
  }
};
var Contacts = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      const data = yield this.resend.post(
        `/audiences/${payload.audienceId}/contacts`,
        {
          unsubscribed: payload.unsubscribed,
          email: payload.email,
          first_name: payload.firstName,
          last_name: payload.lastName
        },
        options
      );
      return data;
    });
  }
  list(options) {
    return __async(this, null, function* () {
      const _a = options, { audienceId } = _a, paginationOptions = __objRest(_a, ["audienceId"]);
      const queryString = buildPaginationQuery(paginationOptions);
      const url = queryString ? `/audiences/${audienceId}/contacts?${queryString}` : `/audiences/${audienceId}/contacts`;
      const data = yield this.resend.get(url);
      return data;
    });
  }
  get(options) {
    return __async(this, null, function* () {
      if (!options.id && !options.email) {
        return {
          data: null,
          error: {
            message: "Missing `id` or `email` field.",
            name: "missing_required_field"
          }
        };
      }
      const data = yield this.resend.get(
        `/audiences/${options.audienceId}/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`
      );
      return data;
    });
  }
  update(options) {
    return __async(this, null, function* () {
      if (!options.id && !options.email) {
        return {
          data: null,
          error: {
            message: "Missing `id` or `email` field.",
            name: "missing_required_field"
          }
        };
      }
      const data = yield this.resend.patch(
        `/audiences/${options.audienceId}/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`,
        {
          unsubscribed: options.unsubscribed,
          first_name: options.firstName,
          last_name: options.lastName
        }
      );
      return data;
    });
  }
  remove(payload) {
    return __async(this, null, function* () {
      if (!payload.id && !payload.email) {
        return {
          data: null,
          error: {
            message: "Missing `id` or `email` field.",
            name: "missing_required_field"
          }
        };
      }
      const data = yield this.resend.delete(
        `/audiences/${payload.audienceId}/contacts/${(payload == null ? void 0 : payload.email) ? payload == null ? void 0 : payload.email : payload == null ? void 0 : payload.id}`
      );
      return data;
    });
  }
};
function parseDomainToApiOptions(domain) {
  return {
    name: domain.name,
    region: domain.region,
    custom_return_path: domain.customReturnPath
  };
}
var Domains = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      const data = yield this.resend.post(
        "/domains",
        parseDomainToApiOptions(payload),
        options
      );
      return data;
    });
  }
  list() {
    return __async(this, arguments, function* (options = {}) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/domains?${queryString}` : "/domains";
      const data = yield this.resend.get(url);
      return data;
    });
  }
  get(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.get(
        `/domains/${id}`
      );
      return data;
    });
  }
  update(payload) {
    return __async(this, null, function* () {
      const data = yield this.resend.patch(
        `/domains/${payload.id}`,
        {
          click_tracking: payload.clickTracking,
          open_tracking: payload.openTracking,
          tls: payload.tls
        }
      );
      return data;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.delete(
        `/domains/${id}`
      );
      return data;
    });
  }
  verify(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.post(
        `/domains/${id}/verify`
      );
      return data;
    });
  }
};
var Emails = class {
  constructor(resend) {
    this.resend = resend;
  }
  send(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      return this.create(payload, options);
    });
  }
  create(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      if (payload.react) {
        payload.html = yield render(payload.react);
      }
      const data = yield this.resend.post(
        "/emails",
        parseEmailToApiOptions(payload),
        options
      );
      return data;
    });
  }
  get(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.get(
        `/emails/${id}`
      );
      return data;
    });
  }
  list() {
    return __async(this, arguments, function* (options = {}) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/emails?${queryString}` : "/emails";
      const data = yield this.resend.get(url);
      return data;
    });
  }
  update(payload) {
    return __async(this, null, function* () {
      const data = yield this.resend.patch(
        `/emails/${payload.id}`,
        {
          scheduled_at: payload.scheduledAt
        }
      );
      return data;
    });
  }
  cancel(id) {
    return __async(this, null, function* () {
      const data = yield this.resend.post(
        `/emails/${id}/cancel`
      );
      return data;
    });
  }
};
var defaultBaseUrl = "https://api.resend.com";
var defaultUserAgent = `resend-node:${version}`;
var baseUrl = typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
var userAgent = typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
var Resend = class {
  constructor(key) {
    this.key = key;
    this.apiKeys = new ApiKeys(this);
    this.audiences = new Audiences(this);
    this.batch = new Batch(this);
    this.broadcasts = new Broadcasts(this);
    this.contacts = new Contacts(this);
    this.domains = new Domains(this);
    this.emails = new Emails(this);
    if (!key) {
      if (typeof process !== "undefined" && process.env) {
        this.key = process.env.RESEND_API_KEY;
      }
      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Resend("re_123")`'
        );
      }
    }
    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      "User-Agent": userAgent,
      "Content-Type": "application/json"
    });
  }
  fetchRequest(_0) {
    return __async(this, arguments, function* (path, options = {}) {
      try {
        const response = yield fetch(`${baseUrl}${path}`, options);
        if (!response.ok) {
          try {
            const rawError = yield response.text();
            return { data: null, error: JSON.parse(rawError) };
          } catch (err) {
            if (err instanceof SyntaxError) {
              return {
                data: null,
                error: {
                  name: "application_error",
                  message: "Internal server error. We are unable to process your request right now, please try again later."
                }
              };
            }
            const error = {
              message: response.statusText,
              name: "application_error"
            };
            if (err instanceof Error) {
              return { data: null, error: __spreadProps(__spreadValues({}, error), { message: err.message }) };
            }
            return { data: null, error };
          }
        }
        const data = yield response.json();
        return { data, error: null };
      } catch (e) {
        return {
          data: null,
          error: {
            name: "application_error",
            message: "Unable to fetch data. The request could not be resolved."
          }
        };
      }
    });
  }
  post(_0, _1) {
    return __async(this, arguments, function* (path, entity, options = {}) {
      const headers = new Headers(this.headers);
      if (options.headers) {
        for (const [key, value] of new Headers(options.headers).entries()) {
          headers.set(key, value);
        }
      }
      if (options.idempotencyKey) {
        headers.set("Idempotency-Key", options.idempotencyKey);
      }
      const requestOptions = __spreadProps(__spreadValues({
        method: "POST",
        body: JSON.stringify(entity)
      }, options), {
        headers
      });
      return this.fetchRequest(path, requestOptions);
    });
  }
  get(_0) {
    return __async(this, arguments, function* (path, options = {}) {
      const headers = new Headers(this.headers);
      if (options.headers) {
        for (const [key, value] of new Headers(options.headers).entries()) {
          headers.set(key, value);
        }
      }
      const requestOptions = __spreadProps(__spreadValues({
        method: "GET"
      }, options), {
        headers
      });
      return this.fetchRequest(path, requestOptions);
    });
  }
  put(_0, _1) {
    return __async(this, arguments, function* (path, entity, options = {}) {
      const headers = new Headers(this.headers);
      if (options.headers) {
        for (const [key, value] of new Headers(options.headers).entries()) {
          headers.set(key, value);
        }
      }
      const requestOptions = __spreadProps(__spreadValues({
        method: "PUT",
        body: JSON.stringify(entity)
      }, options), {
        headers
      });
      return this.fetchRequest(path, requestOptions);
    });
  }
  patch(_0, _1) {
    return __async(this, arguments, function* (path, entity, options = {}) {
      const headers = new Headers(this.headers);
      if (options.headers) {
        for (const [key, value] of new Headers(options.headers).entries()) {
          headers.set(key, value);
        }
      }
      const requestOptions = __spreadProps(__spreadValues({
        method: "PATCH",
        body: JSON.stringify(entity)
      }, options), {
        headers
      });
      return this.fetchRequest(path, requestOptions);
    });
  }
  delete(path, query) {
    return __async(this, null, function* () {
      const requestOptions = {
        method: "DELETE",
        body: JSON.stringify(query),
        headers: this.headers
      };
      return this.fetchRequest(path, requestOptions);
    });
  }
};

// netlify/functions/sendEmail.js
var MAX_FILE_BYTES = 10 * 1024 * 1024;
function formatNestedField(label, data, indent = 2) {
  const spacing = " ".repeat(indent);
  let formatted = `${label}:
`;
  if (Array.isArray(data)) {
    data.forEach((item, i) => {
      formatted += `${spacing}- Item ${i + 1}:
`;
      if (typeof item === "object" && item !== null) {
        for (const key in item) {
          formatted += `${spacing.repeat(2)}${key}: ${String(item[key])}
`;
        }
      } else {
        formatted += `${spacing.repeat(2)}${String(item)}
`;
      }
    });
  } else if (typeof data === "object" && data !== null) {
    for (const key in data) {
      formatted += `${spacing}${key}: ${String(data[key])}
`;
    }
  } else {
    formatted += `${spacing}${String(data)}
`;
  }
  return formatted;
}
var handler = async (event) => {
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  try {
    const resendApiKey = process.env.RESEND_API_KEY || "re_315USWYB_JQLHZuT6t1nXQBuY6AodMo4y";
    const resend = new Resend(resendApiKey);
    const payload = event.body ? JSON.parse(event.body) : {};
    const { formData } = payload;
    if (!formData || typeof formData !== "object") {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: "No formData received" })
      };
    }
    const attachments = [];
    const textFields = [];
    for (const key in formData) {
      const value = formData[key];
      if (value && value.name && value.base64) {
        const base64Len = typeof value.base64 === "string" ? value.base64.length : 0;
        const approxBytes = Math.floor(base64Len * 3 / 4);
        if (approxBytes > MAX_FILE_BYTES) {
          return {
            statusCode: 413,
            headers: jsonHeaders,
            body: JSON.stringify({
              error: `File "${value.name}" is too large (${Math.round(
                approxBytes / 1024
              )} KB). Max ${(MAX_FILE_BYTES / 1024).toFixed(0)} KB.`
            })
          };
        }
        attachments.push({
          filename: value.name,
          content: value.base64
        });
      } else if (Array.isArray(value) || typeof value === "object" && value !== null) {
        textFields.push(formatNestedField(key, value));
      } else {
        textFields.push(`${key}: ${String(value)}`);
      }
    }
    const textBody = `\u{1F4DD} New Form Submission

${textFields.join("\n")}`;
    const isKYC = formData.type === "SignificantIndividualKYC";
    const userEmail = formData.to;
    const recipients = isKYC && userEmail ? [userEmail, "info@doneotc.com"] : ["info@doneotc.com"];
    const subject = isKYC ? `Please Complete Your KYC Verification` : `New Form Submission`;
    const htmlBody = isKYC ? `
        <p>Hi ${formData.name || "there"},</p>
        <p>You\u2019ve been added as a Significant Individual for DoneOTC.</p>
        <p>Please complete your identity verification by clicking below:</p>
        <p style="margin-top:16px;">
          <a href="${formData.kycLink}" 
             style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">
             Verify Identity
          </a>
        </p>
        <p style="margin-top:12px;">If the button doesn\u2019t work, copy this link:<br>${formData.kycLink}</p>
        <hr style="margin:20px 0;border:0;border-top:1px solid #ccc;">
        <p><em>This email was also sent to DoneOTC Admin for recordkeeping.</em></p>
      ` : `<pre>${textBody}</pre>`;
    await resend.emails.send({
      from: "info@doneotc.com",
      to: recipients,
      subject,
      html: htmlBody,
      attachments: attachments.length ? attachments : void 0
    });
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ message: "Email sent successfully" })
    };
  } catch (err) {
    console.error("sendEmail function error:", err);
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({ error: err?.message || "Internal server error" })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=sendEmail.js.map
