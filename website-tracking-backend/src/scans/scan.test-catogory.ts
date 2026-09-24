import { TestCategory } from "@prisma/client";

export const ACTIVE_TEST: TestCategory[] = [
    TestCategory.SQL_INJECTION,
    TestCategory.XSS,
    TestCategory.RATE_LIMIT,
    TestCategory.BOT,
    TestCategory.FAKE_USER,
    TestCategory.FILE_UPLOAD,
    TestCategory.COMMAND_INJECTION_XXE,
    TestCategory.BROKEN_ACCESS_CONTROL,
    TestCategory.API_MASS_ASSIGNMENT,
]

export const PASSIVE_TEST: TestCategory[] = [
    TestCategory.SECURITY_HEADERS,
    TestCategory.CORS,
    TestCategory.TLS_SSL,
    TestCategory.INFO_DISCLOSURE,
    TestCategory.CLICKJACKING,
    TestCategory.SESSION_COOKIE,
    TestCategory.OPEN_REDIRECT,
    TestCategory.PATH_TRAVERSAL,
    TestCategory.SSRF,
    TestCategory.CSRF,
    TestCategory.JWT,
    TestCategory.DEPENDENCY_CVE,
]