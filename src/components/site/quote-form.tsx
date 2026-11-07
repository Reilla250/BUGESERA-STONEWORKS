"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const reason = String(form.get("reason") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = {
      name: String(form.get("name") ?? "").trim(),
      company: String(form.get("company") ?? "").trim() || undefined,
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      message: reason && message ? `${reason}: ${message}` : message || undefined,
      items: [],
      attachments: [],
    };

    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus("done");
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data.error ?? "Something went wrong. Please try again or contact us by phone.");
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="font-display text-xl font-bold text-basalt">Message sent successfully</p>
        <p className="mt-2 text-sm text-granite">Our team will contact you soon with the right support for your order or project.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-[1.75rem] border border-[#d8d5d0] bg-[#f6f3ee] p-6 shadow-sm sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-basalt">Full name *</label>
          <input id="name" name="name" required autoComplete="name" className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-basalt">Organisation</label>
          <input id="company" name="company" autoComplete="organization" className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-basalt">Email address *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-basalt">Telephone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-basalt">Location *</label>
          <input id="location" name="location" required autoComplete="street-address" placeholder="Your district or site address" className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="reason" className="mb-2 block text-sm font-medium text-basalt">Reason for contacting us *</label>
          <select
            id="reason"
            name="reason"
            required
            defaultValue=""
            className="h-12 w-full rounded-xl border border-[#d7d0c7] bg-white px-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]"
          >
            <option value="" disabled>Select a reason</option>
            <option value="Sales enquiry">Sales enquiry</option>
            <option value="Order support">Order support</option>
            <option value="Delivery question">Delivery question</option>
            <option value="General question">General question</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-basalt">Message *</label>
          <textarea id="message" name="message" required rows={6} className="w-full rounded-xl border border-[#d7d0c7] bg-white px-3 py-3 text-sm text-basalt outline-none transition focus:border-[#d69d1e] focus:ring-2 focus:ring-[#f6cf77]" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-granite">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-granite/40 text-hivis focus:ring-hivis" />
        <span>I consent to {"Bugesera Stoneworks"} contacting me about this enquiry.</span>
      </label>

      {error && <p role="alert" className="text-sm font-medium text-laterite">{error}</p>}

      <Button type="submit" size="lg" className="w-full rounded-xl bg-[#0f5f4a] text-white hover:bg-[#0b4b3d]" disabled={status === "sending" || !consent}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
