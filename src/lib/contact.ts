/**
 * Universal client-side helper for posting any site form to /api/contact.
 *
 * Every form on the site (newsletter, waitlist/apply, nominate, sponsor,
 * events, generic contact) should call submitContact() — the API route then
 * dispatches a single email to jchhetree@gmail.com via Resend.
 */

export interface ContactPayload {
  email: string;
  name?: string;
  message?: string;
  /** Free-form tag — used to prefix the email subject. */
  source?: string;
}

export interface ContactResult {
  success: boolean;
  /** Resend message id on success. */
  id?: string;
  /** Stable error code or upstream message on failure. */
  error?: string;
  /** HTTP status — useful for distinguishing 400 vs 429 vs 500. */
  status: number;
}

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: { success?: boolean; id?: string; error?: string } = await res
      .json()
      .catch(() => ({}));

    return {
      success: Boolean(data.success),
      id: data.id,
      error: data.error,
      status: res.status,
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
      status: 0,
    };
  }
}
